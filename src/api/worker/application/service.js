const { v7: uuidv7 } = require('uuid');
const moment = require('moment');

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
};

// Get application by application ID
async function getApplicationByApplicationId(applicationId) {
  try {
    const [rows] = await pool.query('SELECT * FROM Application WHERE id = ?', [applicationId]);
    return emptyOrRows(rows[0]);
  } catch (error) {
    console.error('Error while retrieving application by application ID', error);
    throw error;
  }
};

async function applyProject(projectId, body) {
  const id = uuidv7();
  const { worker_id } = body;
  const status = 'pending';
  const createdAt = moment().format('YYYY-MM-DD HH:mm:ss');

  try {
    await pool.query(
      `INSERT INTO Application (id, project_id, worker_id, status, created_at)
      VALUES (?, ?, ?, ?, ?)`, [id, projectId, worker_id, status, createdAt]
    );
    return { id, project_id: projectId, worker_id, status, created_at: createdAt };
  } catch (error) {
    console.error('Error while applying for project', error);
    throw error;
  }
};


module.exports = {
  getApplicationsByProjectId,
  getApplicationByApplicationId,
  applyProject
};
