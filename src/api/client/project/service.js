const { v7: uuidv7 } = require('uuid');
const moment = require('moment');
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

async function getProjectsByClientId(params) {
  try {
    console.log(params);
    const [rows] = await pool.query(
      `SELECT id, client_id, title, description, status, document_url, category, budget_lower, budget_upper, deadline, created_at, updated_at FROM project WHERE client_id = ?`, [params]
    );
    // console.log(rows);
    return emptyOrRows(rows);
  } catch (error) {
    console.error('Error while getting project by Client Id', error);
    throw error;
  }
};

async function createProject(body) {
  const id = uuidv7();
  const { client_id, title, description, status, document_url, category, budget_lower, budget_upper, deadline } = body;
  const createdAt = moment().format('YYYY-MM-DD HH:mm:ss');
  const updatedAt = createdAt;

  try {
    await pool.query(
      `INSERT INTO project (id, client_id, title, description, status, document_url, category, budget_lower, budget_upper, deadline, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, [id, client_id, title, description, status, document_url, category, budget_lower, budget_upper, deadline, createdAt, updatedAt]
    );
    return { id, client_id, title, description, status, document_url, category, budget_lower, budget_upper, deadline, created_at: createdAt, updated_at: updatedAt };
  } catch (error) {
    console.error('Error while creating project', error);
    throw error;
  }
};

async function updateProjectById(id, body) {
  const { title, description, status, document_url, category, budget_lower, budget_upper, deadline } = body;
  const updatedAt = moment().format('YYYY-MM-DD HH:mm:ss');

  try {
    const [result] = await pool.query(
      `UPDATE project SET title = ?, description = ?, status = ?, document_url = ?, category = ?, budget_lower = ?, budget_upper = ?, deadline = ?, updated_at = ? WHERE id = ?`,
      [title, description, status, document_url, category, budget_lower, budget_upper, deadline, updatedAt, id]
    );
    return result.affectedRows ? { id, title, description, status, document_url, category, budget_lower, budget_upper, deadline, updated_at: updatedAt } : null;
  } catch (error) {
    console.error('Error while updating project', error);
    throw error;
  }
};

async function deleteProjectById(id) {
  try {
    const [result] = await pool.query(
      `DELETE FROM project WHERE id = ?`,
      [id]
    );
    return result.affectedRows ? { message: 'Project deleted successfully' } : null;
  } catch (error) {
    console.error('Error while deleting project', error);
    throw error;
  }
};

module.exports = {
  getAllProjects,
  getProjectById,
  getProjectsByClientId,
  createProject,
  updateProjectById,
  deleteProjectById
};
