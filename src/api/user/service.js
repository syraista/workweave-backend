const { pool } = require("../../config/configdb");
const { emptyOrRows } = require("../../utils/helper");
const moment = require('moment');

async function getUserData(userId) {
  try {
    const [rows] = await pool.query(
      `SELECT id, name, username, email, role, jenis_kelamin, birth_date, profile_picture, phone_number, bio, address, created_at, updated_at 
       FROM User 
       WHERE id = ?`, 
      [userId]
    );
    return emptyOrRows(rows);
  } catch (error) {
    console.error('Error while getting project by ID', error);
    throw error;
  }
}

async function getUserDataByWorkerId(workerId) {
  try {
    const [rows] = await pool.query(
      `SELECT 
        User.id,
        User.name,
        User.username,
        User.email,
        User.role,
        User.jenis_kelamin,
        User.birth_date,
        User.profile_picture,
        User.phone_number,
        User.bio,
        User.address,
        User.created_at,
        User.updated_at,
        Worker.rating
      FROM 
        Worker
      JOIN 
        User ON Worker.id = User.id
      WHERE 
        Worker.id = ?`, [workerId]
    );

    return rows.length ? rows[0] : null;
  } catch (error) {
    console.error('Error while getting user data by worker ID', error);
    throw error;
  }
}

async function updateUser(userId, body) {
  const updatedAt = moment().format('YYYY-MM-DD HH:mm:ss');

  let fields = [];
  let values = [];

  Object.keys(body).forEach(key => {
    fields.push(`${key} = ?`);
    values.push(body[key]);
  });

  if (fields.length === 0) {
    throw new Error('No fields to update');
  }

  values.push(updatedAt);
  values.push(userId);

  const query = `UPDATE User SET ${fields.join(', ')}, updated_at = ? WHERE id = ?`;

  try {
    const [result] = await pool.query(query, values);
    
    if (result.affectedRows === 0) {
      throw new Error('User not found or no changes made');
    }

    return { id: userId, ...body, updated_at: updatedAt };
  } catch (error) {
    console.error('Error while updating user', error);
    throw error;
  }
};

async function getWorkerDataByProjectId(projectId) {
  const query = `
    SELECT 
      a.id,
      u.id AS user_id,
      u.name,
      u.profile_picture,
      a.status AS application_status
    FROM 
      Application a
    JOIN 
      Worker w ON a.worker_id = w.id
    JOIN 
      User u ON w.id = u.id
    WHERE 
      a.project_id = ?;
  `;

  try {
    const [rows] = await pool.query(query, [projectId]);
    return emptyOrRows(rows);
  } catch (error) {
    console.error('Error while retrieving application by application ID', error);
    throw error;
  }
}

async function getApplicationByWorkerId(workerId) {
  try {
    const [rows] = await pool.query('SELECT * FROM Application WHERE worker_id = ?', [workerId]);
    return emptyOrRows(rows);
  } catch (error) {
    console.error('Error while retrieving application by worker ID', error);
    throw error;
  }
};

module.exports = {
  getUserData,
  getUserDataByWorkerId,
  updateUser,
  getWorkerDataByProjectId,
  getApplicationByWorkerId
};