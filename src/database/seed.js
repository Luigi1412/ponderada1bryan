const pool = require('../config/database');

async function seedCategories() {
  const client = await pool.connect();
  try {
    console.log('Verificando se as categorias já existem...');
    const res = await client.query('SELECT COUNT(*) FROM categorias_quartos');
    if (res.rows[0].count > 0) {
      console.log('A tabela de categorias já contém dados. Nenhuma ação necessária.');
      return;
    }

    console.log('Inserindo categorias de quarto padrão...');
    const categories = [
      { nome: 'Standard', descricao: 'Quarto padrão com comodidades essenciais.' },
      { nome: 'Deluxe', descricao: 'Quarto com mais espaço e conforto adicional.' },
      { nome: 'Suíte', descricao: 'Suíte espaçosa com área de estar separada e luxos.' },
      { nome: 'Econômico', descricao: 'Opção mais acessível para viajantes com orçamento limitado.' }
    ];

    for (const cat of categories) {
      await client.query(
        'INSERT INTO categorias_quartos (nome, descricao) VALUES ($1, $2)',
        [cat.nome, cat.descricao]
      );
    }

    console.log('Categorias inseridas com sucesso!');
  } catch (err) {
    console.error('Erro ao inserir categorias:', err.stack);
  } finally {
    client.release();
  }
}

async function seedUsers() {
    const client = await pool.connect();
    try {
        console.log('Verificando se usuários já existem...');
        const res = await client.query('SELECT COUNT(*) FROM users');
        if (res.rows[0].count > 0) {
            console.log('A tabela de usuários já contém dados. Nenhuma ação necessária.');
            return;
        }

        console.log('Inserindo usuários padrão...');
        const users = [
            { nome: 'Admin User', email: 'admin@example.com', senha: 'adminpassword' },
            { nome: 'Common User', email: 'user@example.com', senha: 'userpassword' }
        ];

        for (const user of users) {
            await client.query(
                'INSERT INTO users (nome, email, senha) VALUES ($1, $2, $3)',
                [user.nome, user.email, user.senha]
            );
        }

        console.log('Usuários padrão inseridos com sucesso!');
    } catch (err) {
        console.error('Erro ao inserir usuários:', err.stack);
    } finally {
        client.release();
    }
}

async function seedRooms() {
    const client = await pool.connect();
    try {
        console.log('Verificando se quartos já existem...');
        const res = await client.query('SELECT COUNT(*) FROM rooms');
        if (res.rows[0].count > 0) {
            console.log('A tabela de quartos já contém dados. Nenhuma ação necessária.');
            return;
        }

        console.log('Inserindo quarto padrão...');
        const firstCategory = await client.query('SELECT id FROM categorias_quartos ORDER BY id LIMIT 1');

        if (firstCategory.rows.length > 0) {
            await client.query(
                'INSERT INTO rooms (numero_quarto, descricao, preco_por_noite, status, categoria_id) VALUES ($1, $2, $3, $4, $5)',
                ['101', 'Quarto de teste padrão.', 150.00, 'Disponível', firstCategory.rows[0].id]
            );
            console.log('Quarto padrão inserido com sucesso!');
        } else {
            console.log('Não foi possível criar quarto padrão: nenhuma categoria encontrada.');
        }
    } catch (err) {
        console.error('Erro ao inserir quarto:', err.stack);
    } finally {
        client.release();
    }
}

async function seedReservations() {
    const client = await pool.connect();
    try {
        console.log('Verificando se reservas já existem...');
        const res = await client.query('SELECT COUNT(*) FROM reservations');
        if (res.rows[0].count > 0) {
            console.log('A tabela de reservas já contém dados. Nenhuma ação necessária.');
            return;
        }

        console.log('Inserindo reserva padrão...');
        
        // Pega o primeiro usuário e o primeiro quarto para criar uma reserva
        const firstUser = await client.query('SELECT id FROM users ORDER BY id LIMIT 1');
        const firstRoom = await client.query('SELECT id FROM rooms ORDER BY id LIMIT 1');

        if (firstUser.rows.length > 0 && firstRoom.rows.length > 0) {
            const reserva = {
                user_id: firstUser.rows[0].id,
                room_id: firstRoom.rows[0].id,
                data_checkin: '2024-12-01',
                data_checkout: '2024-12-05'
            };
            await client.query(
                'INSERT INTO reservations (user_id, room_id, data_checkin, data_checkout) VALUES ($1, $2, $3, $4)',
                [reserva.user_id, reserva.room_id, reserva.data_checkin, reserva.data_checkout]
            );
            console.log('Reserva padrão inserida com sucesso!');
        } else {
            console.log('Não foi possível criar reserva padrão: usuários ou quartos não encontrados.');
        }
    } catch (err) {
        console.error('Erro ao inserir reserva:', err.stack);
    } finally {
        client.release();
    }
}

async function seedAll() {
    await seedCategories();
    await seedUsers();
    await seedRooms();
    await seedReservations();
    // No futuro, outras funções de seed podem ser chamadas aqui.
    console.log('Seed concluído.');
    pool.end();
}

seedAll(); 