const supabase = require('../config/database');

class User {
  static async findAll() {
    const { data, error } = await supabase
      .from('users')
      .select('*');
    
    if (error) throw error;
    return data;
  }

  static async findById(id) {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data;
  }

  static async create(userData) {
    const { data, error } = await supabase
      .from('users')
      .insert([userData])
      .select();
    
    if (error) throw error;
    return data[0];
  }

  static async update(id, userData) {
    const { data, error } = await supabase
      .from('users')
      .update(userData)
      .eq('id', id)
      .select();
    
    if (error) throw error;
    return data[0];
  }

  static async delete(id) {
    const { error } = await supabase
      .from('users')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    return true;
  }
}

module.exports = User; 