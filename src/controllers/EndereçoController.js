const EnderecoService = require('../services/EnderecoService');

class EnderecoController {
  static async criar(req, res) {
    try {
      const endereco = await EnderecoService.createEndereco(req.body);
      res.status(201).json(endereco);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
  static async listar(req, res) {
    const enderecos = await EnderecoService.getAllEnderecos();
    res.json(enderecos);
  }
  static async buscarPorId(req, res) {
    const endereco = await EnderecoService.getEndereco(req.params.id);
    if (endereco) res.json(endereco);
    else res.status(404).json({ error: 'Endereço não encontrado' });
  }
  static async atualizar(req, res) {
    try {
      const endereco = await EnderecoService.updateEndereco(req.params.id, req.body);
      res.json(endereco);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
  static async deletar(req, res) {
    try {
      await EnderecoService.deleteEndereco(req.params.id);
      res.status(204).end();
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
}

module.exports = EnderecoController;