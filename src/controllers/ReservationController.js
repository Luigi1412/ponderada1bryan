const ReservationModel = require('../models/ReservationModel');

// Lista todas as reservas
exports.listar = async (req, res) => {
  try {
    const reservations = await ReservationModel.getAll();
    res.status(200).json(reservations);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar reservas: ' + err.message });
  }
};

// Outros métodos do controller (criar, obter, etc.) podem ser adicionados aqui. 