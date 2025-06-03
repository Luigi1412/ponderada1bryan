const supabase = require('./config/database');

async function testConnection() {
  try {
    // Tenta fazer uma query simples
    const { data, error } = await supabase
      .from('users')
      .select('count(*)', { count: 'exact' });

    if (error) throw error;

    console.log('✅ Conexão com Supabase estabelecida com sucesso!');
    console.log(`Total de usuários: ${data.count}`);

  } catch (error) {
    console.error('❌ Erro ao conectar com Supabase:', error.message);
  }
}

testConnection(); 