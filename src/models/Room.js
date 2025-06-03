const supabase = require('../config/database');

class Room {
  static async findAll() {
    const { data, error } = await supabase
      .from('rooms')
      .select('*, categories_rooms(*)');
    
    if (error) throw error;
    return data;
  }

  static async findById(id) {
    const { data, error } = await supabase
      .from('rooms')
      .select('*, categories_rooms(*)')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data;
  }

  static async create(roomData) {
    const { data, error } = await supabase
      .from('rooms')
      .insert([roomData])
      .select();
    
    if (error) throw error;
    return data[0];
  }

  static async update(id, roomData) {
    const { data, error } = await supabase
      .from('rooms')
      .update(roomData)
      .eq('id', id)
      .select();
    
    if (error) throw error;
    return data[0];
  }

  static async delete(id) {
    const { error } = await supabase
      .from('rooms')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    return true;
  }

  static async getAvailableRooms(startDate, endDate) {
    const { data, error } = await supabase
      .from('rooms')
      .select('*, categories_rooms(*)')
      .not('id', 'in', 
        supabase
          .from('reservations')
          .select('room_id')
          .gte('check_in', startDate)
          .lte('check_out', endDate)
      );
    
    if (error) throw error;
    return data;
  }
}

module.exports = Room; 