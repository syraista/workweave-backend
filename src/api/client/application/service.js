const { pool } = require("../../../config/configdb");
const { emptyOrRows } = require("../../../utils/helper");

// Get applications by project ID
async function getApplicationsByProjectId(projectId) {
  try {
    const [rows] = await pool.query('SELECT * FROM Application WHERE project_id = ?', [projectId]);
    return emptyOrRows(rows);
  } catch (error) {
    console.error('Error while retrieving applications by project ID', error);
    throw error;
  }
}

// Get application by application ID
async function getApplicationByApplicationId(applicationId) {
  try {
    const [rows] = await pool.query('SELECT * FROM Application WHERE id = ?', [applicationId]);
    return emptyOrRows(rows[0]);
  } catch (error) {
    console.error('Error while retrieving application by application ID', error);
    throw error;
  }
}

// Update application status by project ID
async function updateApplicationStatusByApplicationId(applicationId, status) {
  try {
    // Update the status of the specified application
    await pool.query('UPDATE Application SET status = ? WHERE id = ?', [status, applicationId]);

    // Fetch the project ID of the updated application
    const [rows] = await pool.query('SELECT * FROM Application WHERE id = ?', [applicationId]);

    if (rows.length === 0) {
      throw new Error('Application not found');
    }

    // Update the project status to 'in_progress' if the application status is accepted
    if (status === 'accepted') {
      const projectId = rows[0].project_id;
      await pool.query('UPDATE Project SET status = ? WHERE id = ?', ['in_progress', projectId]);

      // Reject all other applications for the same project
      await pool.query('UPDATE Application SET status = ? WHERE project_id = ? AND id != ?', ['rejected', projectId, applicationId]);
      const [rowsProject] = await pool.query('SELECT * FROM Project WHERE id = ?', [projectId]);
    }
    return emptyOrRows(rows[0]);
  } catch (error) {
    console.error('Error while updating application status by project ID', error);
    throw error;
  }
}

module.exports = {
  getApplicationsByProjectId,
  getApplicationByApplicationId,
  updateApplicationStatusByApplicationId
};
