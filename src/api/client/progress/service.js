const { v7: uuidv7 } = require('uuid');
const moment = require('moment');

const { pool } = require("../../../config/configdb");
const { emptyOrRows } = require("../../../utils/helper");

async function createProgress(projectId, body) {
  const id = uuidv7();
  const { workerId } = body;
  const createdAt = moment().format('YYYY-MM-DD HH:mm:ss');
  const updatedAt = createdAt;

  try {
    await pool.query(
      `INSERT INTO Progress (id, project_id, worker_id, description, status, document_url, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)`, [id, projectId, workerId, null, "not_started", null, createdAt, updatedAt]
    );
    return { id, projectId, description: null, status: "not_started", created_at: createdAt, updated_at: updatedAt };
  } catch (error) {
    console.error('Error while creating progress', error);
    throw error;
  }
};

async function getProgressByProjectId(projectId) {
  try {
    const [rows] = await pool.query(
      `SELECT * FROM Progress WHERE project_id = ?`, [projectId]
    );
    return rows;
  } catch (error) {
    console.error('Error while fetching progress by project ID', error);
    throw error;
  }
}

async function getProgressByProgressId(projectId, progressId) {
  try {
    const [rows] = await pool.query(
      `SELECT * FROM Progress WHERE id = ? AND project_id = ?`, [progressId, projectId]
    );
    return rows[0];
  } catch (error) {
    console.error('Error while fetching progress by progress ID', error);
    throw error;
  }
}

module.exports = {
  createProgress,
  getProgressByProjectId,
  getProgressByProgressId
};