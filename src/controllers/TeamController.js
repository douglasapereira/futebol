const db = require("../database/database");

class TeamsController {
  static async index(request, response) {
    try {
      const rows = await db.query("SELECT * FROM times");
      return response.status(200).json(rows);
    } catch (error) {
      return response.status(400).json(error.message);
    }
  }
  static async create(request, response) {
    try {
      const { name, city } = request.body;
      const { insertId } = await db.query(
        `INSERT INTO jogadores (name,city,created_at,updated_at) VALUES ("${name}", "${city}", now(), now())`
      );

      const row = await db.query(`SELECT * FROM times WHERE id = ${insertId}`);

      return response.status(200).json(row[0]);
    } catch (error) {
      return response.status(400).json(error.message);
    }
  }
  static async update(request, response) {
    try {
      const { id } = request.params;

      const { name, city } = request.body;
      const { affectedRows } = await db.query(
        `UPDATE times SET name="${name}", city="${city}", updated_at=now() WHERE id = ${id}`
      );

      if (affectedRows === 0) {
        throw new error("cannot update.");
      }
      const row = await db.query(`SELECT * FROM times WHERE id = ${id}`);

      return response.status(200).json(row[0]);
    } catch (error) {
      return response.status(400).json(error.message);
    }
  }
  static async quickUpdate(request, response) {
    try {
      const { id } = request.params;
      const { name } = request.body;
      const { affectedRows } = await db.query(
        `UPDATE times SET name="${name}", updated_at=now() WHERE id = ${id}`
      );
      if (affectedRows === 0) {
        throw new error("cannot updated.");
      }
      const row = await db.query(`SELECT * FROM times WHERE id = ${id}`);

      return response.status(200).json(row[0]);
    } catch (error) {
      return response.status(400).json(error.message);
    }
  }
  static async destroy(request, response) {
    try {
      const { id } = request.params;
      const { name, age } = request.body;
      const { affectecRows } = await db.query(
        `DELETE FROM times WHERE id = ${id}`
      );
      if (affectedRows === 0) {
        throw new error("cannot updated.");
      }
      const row = await db.query(`SELECT * FROM times WHERE id = ${id}`);

      return response.status(200).json(row[0]);
    } catch (error) {
      return response.status(400).json(error.message);
    }
  }
}
module.exports = TeamsController;
