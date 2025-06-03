const supabase = require('../config/database');

class Reservation {
  static async findAll() {
    const { data, error } = await supabase
      .from('reservations')
      .select(`
        *,
        users (*),
        rooms (*, categories_rooms(*))
      `);
    
    if (error) throw error;
    return data;
  }

  static async findById(id) {
    const { data, error } = await supabase
      .from('reservations')
      .select(`
        *,
        users (*),
        rooms (*, categories_rooms(*))
      `)
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data;
  }

  static async create(reservationData) {
    const { data, error } = await supabase
      .from('reservations')
      .insert([reservationData])
      .select();
    
    if (error) throw error;
    return data[0];
  }

  static async update(id, reservationData) {
    const { data, error } = await supabase
      .from('reservations')
      .update(reservationData)
      .eq('id', id)
      .select();
    
    if (error) throw error;
    return data[0];
  }

  static async delete(id) {
    const { error } = await supabase
      .from('reservations')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    return true;
  }

  static async getUserReservations(userId) {
    const { data, error } = await supabase
      .from('reservations')
      .select(`
        *,
        rooms (*, categories_rooms(*))
      `)
      .eq('user_id', userId);
    
    if (error) throw error;
    return data;
  }
}

module.exports = Reservation; 