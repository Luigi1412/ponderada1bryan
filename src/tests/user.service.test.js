const UserService = require('../services/UserService');
const User = require('../models/User');

// Mock do modelo User
jest.mock('../models/User');

describe('UserService', () => {
  beforeEach(() => {
    // Limpa todos os mocks antes de cada teste
    jest.clearAllMocks();
  });

  describe('createUser', () => {
    it('should create a user successfully', async () => {
      const mockUser = {
        id: 1,
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123'
      };

      User.findAll.mockResolvedValue([]);
      User.create.mockResolvedValue(mockUser);

      const result = await UserService.createUser(mockUser);
      expect(result).toEqual(mockUser);
      expect(User.create).toHaveBeenCalledWith(mockUser);
    });

    it('should throw error if email already exists', async () => {
      const mockUser = {
        email: 'existing@example.com',
        password: 'password123'
      };

      User.findAll.mockResolvedValue([{ email: 'existing@example.com' }]);

      await expect(UserService.createUser(mockUser))
        .rejects
        .toThrow('Email já está em uso');
    });
  });

  describe('updateUser', () => {
    it('should update user successfully', async () => {
      const mockUser = {
        id: 1,
        name: 'Updated Name'
      };

      User.findById.mockResolvedValue({ id: 1, email: 'test@example.com' });
      User.update.mockResolvedValue(mockUser);

      const result = await UserService.updateUser(1, mockUser);
      expect(result).toEqual(mockUser);
      expect(User.update).toHaveBeenCalledWith(1, mockUser);
    });

    it('should throw error if user not found', async () => {
      User.findById.mockResolvedValue(null);

      await expect(UserService.updateUser(1, {}))
        .rejects
        .toThrow('Usuário não encontrado');
    });
  });

  describe('deleteUser', () => {
    it('should delete user successfully', async () => {
      User.findById.mockResolvedValue({ id: 1 });
      User.delete.mockResolvedValue(true);

      const result = await UserService.deleteUser(1);
      expect(result).toBe(true);
      expect(User.delete).toHaveBeenCalledWith(1);
    });

    it('should throw error if user not found', async () => {
      User.findById.mockResolvedValue(null);

      await expect(UserService.deleteUser(1))
        .rejects
        .toThrow('Usuário não encontrado');
    });
  });
}); 