const TaskModel = require('../models/TaskModel');
const UserModel = require('../models/UserModel');
const RoomModel = require('../models/RoomModel');

exports.index = async (req, res) => {
    try {
        const [tarefas, usuarios, rooms] = await Promise.all([
            TaskModel.getAll(),
            UserModel.getAll(),
            RoomModel.getAll()
        ]);

        const counts = {
            tarefas: tarefas.length,
            projetos: 0,
            usuarios: usuarios.length,
            rooms: rooms.length
        };

        const taskStatusCounts = {
            Pendente: 0,
            'Em Progresso': 0,
            Concluída: 0
        };

        tarefas.forEach(tarefa => {
            if (taskStatusCounts[tarefa.status] !== undefined) {
                taskStatusCounts[tarefa.status]++;
            }
        });

        // Pega as 5 tarefas mais recentes para a lista de "Atividade Recente"
        const recentTasks = tarefas.slice(0, 5);

        res.render('dashboard/index', { counts, recentTasks, taskStatusCounts });
    } catch (error) {
        console.error("Erro ao carregar o dashboard:", error);
        res.status(500).send("Erro ao carregar o dashboard. Verifique o console do servidor.");
    }
}; 