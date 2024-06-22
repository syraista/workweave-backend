const moment = require('moment');

const { pool } = require("../../../config/configdb");
const { emptyOrRows } = require("../../../utils/helper");

async function submitProgress(projectId, progressId, body) {
  const { description, status, document_url } = body;
  const updatedAt = moment().format('YYYY-MM-DD HH:mm:ss');

  const [result] = await pool.query(
    'UPDATE Progress SET description = ?, status = ?, document_url = ?, updated_at = ? WHERE id = ? AND project_id = ?',
    [description, status, document_url, updatedAt, progressId, projectId]
  );
  
  if (result.affectedRows === 0) {
    throw new Error('Progress not found or no changes made');
  }

  return { id: progressId, description, status, document_url, updated_at: updatedAt };
};

async function getProgressByProjectId(projectId) {
  try {
    const [rows] = await pool.query(
      `SELECT * FROM Progress WHERE project_id = ?`, [projectId]
    );
    return emptyOrRows(rows);
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
    return rows.length ? rows[0] : null;
  } catch (error) {
    console.error('Error while fetching progress by progress ID', error);
    throw error;
  }
}

module.exports = {
  submitProgress,
  getProgressByProjectId,
  getProgressByProgressId
};
