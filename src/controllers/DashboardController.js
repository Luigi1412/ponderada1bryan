const TarefaModel = require('../models/TarefaModel');
const ProjetoModel = require('../models/ProjetoModel');
const UsuarioModel = require('../models/UsuarioModel');
const RoomModel = require('../models/RoomModel');

exports.index = async (req, res) => {
    try {
        const [tarefas, projetos, usuarios, rooms] = await Promise.all([
            TarefaModel.getAll(),
            ProjetoModel.getAll(),
            UsuarioModel.getAll(),
            RoomModel.getAll()
        ]);

        const counts = {
            tarefas: tarefas.length,
            projetos: projetos.length,
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