const pool = require('./config/database');

async function testConnection() {
    try {
        const client = await pool.connect();
        console.log('Conexão com o banco de dados estabelecida com sucesso!');
        await client.release();
    } catch (err) {
        console.error('Erro ao conectar com o banco de dados:', err.message);
    } finally {
        process.exit();
    }
}

testConnection(); 