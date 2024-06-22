const { pool } = require("../../../config/configdb");
const { emptyOrRows } = require("../../../utils/helper");

async function getAllProjects() {
  try {
    const [rows] = await pool.query(
      `SELECT id, client_id, title, description, status, document_url, category, budget_lower, budget_upper, deadline, created_at, updated_at FROM project`
    );
    return emptyOrRows(rows);
  } catch (error) {
    console.error('Error while getting all projects', error);
    throw error;
  }
};

async function getProjectById(params) {
  try {
    const [rows] = await pool.query(
      `SELECT id, client_id, title, description, status, document_url, category, budget_lower, budget_upper, deadline, created_at, updated_at FROM project WHERE id = ?`, [params]
    );
    return rows.length ? rows[0] : null;
  } catch (error) {
    console.error('Error while getting project by ID', error);
    throw error;
  }
};

module.exports = {
  getAllProjects,
  getProjectById,
};
