const { body, query, param, validationResult } = require('express-validator');

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

const userValidators = {
  create: [
    body('name').notEmpty().withMessage('Nome é obrigatório'),
    body('email').isEmail().withMessage('Email inválido'),
    body('password').isLength({ min: 6 }).withMessage('Senha deve ter no mínimo 6 caracteres'),
    validate
  ],
  update: [
    param('id').isNumeric().withMessage('ID inválido'),
    body('name').optional().notEmpty().withMessage('Nome não pode ser vazio'),
    body('email').optional().isEmail().withMessage('Email inválido'),
    body('password').optional().isLength({ min: 6 }).withMessage('Senha deve ter no mínimo 6 caracteres'),
    validate
  ]
};

const roomValidators = {
  create: [
    body('number').notEmpty().withMessage('Número do quarto é obrigatório'),
    body('category_id').isNumeric().withMessage('Categoria inválida'),
    validate
  ],
  update: [
    param('id').isNumeric().withMessage('ID inválido'),
    body('number').optional().notEmpty().withMessage('Número do quarto não pode ser vazio'),
    body('category_id').optional().isNumeric().withMessage('Categoria inválida'),
    validate
  ],
  available: [
    query('startDate').isISO8601().withMessage('Data de início inválida'),
    query('endDate').isISO8601().withMessage('Data de fim inválida'),
    validate
  ]
};

const reservationValidators = {
  create: [
    body('user_id').isNumeric().withMessage('ID do usuário inválido'),
    body('room_id').isNumeric().withMessage('ID do quarto inválido'),
    body('check_in').isISO8601().withMessage('Data de check-in inválida'),
    body('check_out').isISO8601().withMessage('Data de check-out inválida'),
    body('total_price').isFloat({ min: 0 }).withMessage('Preço total inválido'),
    validate
  ],
  update: [
    param('id').isNumeric().withMessage('ID inválido'),
    body('check_in').optional().isISO8601().withMessage('Data de check-in inválida'),
    body('check_out').optional().isISO8601().withMessage('Data de check-out inválida'),
    body('total_price').optional().isFloat({ min: 0 }).withMessage('Preço total inválido'),
    validate
  ]
};

module.exports = {
  userValidators,
  roomValidators,
  reservationValidators
}; 