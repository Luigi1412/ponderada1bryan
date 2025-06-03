const UserService = require('../services/UserService');

class UserController {
  static async create(req, res) {
    try {
      const user = await UserService.createUser(req.body);
      res.status(201).json(user);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async getAll(req, res) {
    try {
      const users = await UserService.getAllUsers();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getById(req, res) {
    try {
      const user = await UserService.getUser(req.params.id);
      res.status(200).json(user);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

  static async update(req, res) {
    try {
      const user = await UserService.updateUser(req.params.id, req.body);
      res.status(200).json(user);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async delete(req, res) {
    try {
      await UserService.deleteUser(req.params.id);
      res.status(204).send();
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }
}

module.exports = UserController; 