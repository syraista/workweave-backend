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
    await pool.query('UPDATE Application SET status = ? WHERE id = ?', [status, applicationId]);
    const [rows] = await pool.query('SELECT * FROM Application WHERE id = ?', [applicationId]);
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
