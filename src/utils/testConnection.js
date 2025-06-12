const pool = require('../config/database');

async function testConnection() {
  try {
    console.log('Testando conexão com o banco de dados...');
    
    // Testa a conexão
    const client = await pool.connect();
    console.log('✅ Conexão com o banco estabelecida com sucesso!');
    
    // Testa uma query simples
    const result = await client.query('SELECT NOW() as current_time');
    console.log('✅ Query de teste executada com sucesso:', result.rows[0]);
    
    // Verifica se a tabela pagamentos existe
    const tableCheck = await client.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = 'pagamentos'
      );
    `);
    
    if (tableCheck.rows[0].exists) {
      console.log('✅ Tabela "pagamentos" encontrada!');
    } else {
      console.log('⚠️  Tabela "pagamentos" não encontrada. Execute o script de inicialização do banco.');
    }
    
    client.release();
    process.exit(0);
  } catch (error) {
    console.error('❌ Erro ao conectar com o banco de dados:');
    console.error('Mensagem:', error.message);
    console.error('Código:', error.code);
    
    if (error.code === 'ECONNREFUSED') {
      console.error('\n💡 Possíveis soluções:');
      console.error('1. Verifique se o PostgreSQL está rodando');
      console.error('2. Verifique as configurações no arquivo .env');
      console.error('3. Verifique se o banco de dados existe');
    }
    
    process.exit(1);
  }
}

testConnection(); 