const { v7: uuidv7 } = require('uuid');
const moment = require('moment');
const { pool } = require('../../config/configdb');

async function registerUser(body) {
  const { name, username, email, password, role, jenis_kelamin, birth_date, phone_number, bio, address } = body;
  const id = uuidv7();
  const createdAt = moment().format('YYYY-MM-DD HH:mm:ss');
  const updatedAt = createdAt;

  try {
    await pool.query(
      `INSERT INTO User (id, name, username, email, password, role, jenis_kelamin, birth_date, profile_picture, phone_number, bio, address, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [id, name, username, email, password, role, null, null, null, null, null, null, createdAt, updatedAt]
    );

    if (role === 'client') {
      await pool.query(
        `INSERT INTO Client (id) VALUES (?)`, [id]
      );
    } else if (role === 'worker') {
      await pool.query(
        `INSERT INTO Worker (id) VALUES (?)`, [id]
      );
    }
    
    return { id, name, username, email, role, jenis_kelamin, birth_date, phone_number, bio, address, created_at: createdAt, updated_at: updatedAt };
  } catch (error) {
    console.error('Error while registering user', error);
    throw error;
  }
};

async function checkSessionUser(sessionId) {
  try {
    const [rows] = await pool.query(
      `SELECT * FROM Session WHERE id = ?`, [sessionId]
    );
    if (rows.length === 0) {
      throw new Error('Invalid or expired session');
    }
    return rows[0];
  } catch (error) {
    console.error('Error while checking session', error);
    throw error;
  }
}

async function loginUser(body) {
  const { email, password } = body;

  try {
    const [rows] = await pool.query(
      `SELECT * FROM User WHERE email = ? AND password = ?`, [email, password]
    );
    if (rows.length === 0) {
      throw new Error('Invalid email or password');
    }

    const user = rows[0];
    const sessionId = uuidv7();
    const loginTime = moment().format('YYYY-MM-DD HH:mm:ss');

    await pool.query(
      `INSERT INTO Session (id, user_id, is_login, login_time) VALUES (?, ?, ?, ?)`,
      [sessionId, user.id, true, loginTime]
    );

    return { userId: user.id, sessionId, name: user.name, email: user.email, role: user.role, loginTime };
  } catch (error) {
    console.error('Error while logging in user', error);
    throw error;
  }
}

async function logoutUser(sessionId) {
  const logoutTime = moment().format('YYYY-MM-DD HH:mm:ss');

  try {
    const [result] = await pool.query(
      `UPDATE Session SET is_login = ?, logout_time = ? WHERE id = ? AND is_login = ?`,
      [false, logoutTime, sessionId, true]
    );

    if (result.affectedRows === 0) {
      throw new Error('Session not found or already logged out');
    }

    return { sessionId, logoutTime };
  } catch (error) {
    console.error('Error while logging out user', error);
    throw error;
  }
}



module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  checkSessionUser
};
