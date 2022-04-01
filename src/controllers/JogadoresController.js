const db = require("../database/database");

class JogadorController {
  static async index(request, response) {
    try {
      const rows = await db.query("SELECT * FROM jogadores");
      return response.status(200).json(rows);
    } catch (error) {
      return response.status(400).json(error.message);
    }
  }
  static async create(request, response) {
    try {
      const { name, age, reservation } = request.body;
      const { insertId } = await db.query(
        `INSERT INTO jogadores (name, age, reservation, created_at,updated_at) VALUES ("${name}", "${age}", "${reservation}", now(), now())`
      );

      const row = await db.query(
        `SELECT * FROM jogadores WHERE id = ${insertId}`
      );

      return response.status(200).json(row[0]);
    } catch (error) {
      return response.status(400).json(error.message);
    }
  }
  static async update(request, response) {
    try {
      const { id } = request.params;

      const { name, age, reservation } = request.body;
      const { affectedRows } = await db.query(
        `UPDATE jogadores SET name="${name}", age="${age}", reservation="${reservation}", updated_at=now() WHERE id = ${id}`
      );

      if (affectedRows === 0) {
        throw new error("cannot update.");
      }
      const row = await db.query(`SELECT * FROM jogadores WHERE id = ${id}`);

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
        `UPDATE jogadores SET name="${name}", updated_at=now() WHERE id = ${id}`
      );
      if (affectedRows === 0) {
        throw new error("cannot updated.");
      }
      const row = await db.query(`SELECT * FROM jogadores WHERE id = ${id}`);

      return response.status(200).json(row[0]);
    } catch (error) {
      return response.status(400).json(error.message);
    }
  }
  static async destroy(request, response) {
    try {
      const { id } = request.params;
      const { affectedRows } = await db.query(
        `DELETE FROM jogadores WHERE id = ${id}`
      );
      if (affectedRows === 0) {
        throw new error("cannot updated.");
      }
      const row = await db.query(`SELECT * FROM jogadores WHERE id = ${id}`);

      return response.status(200).json(row[0]);
    } catch (error) {
      return response.status(400).json(error.message);
    }
  }
}
module.exports = JogadoresController;
