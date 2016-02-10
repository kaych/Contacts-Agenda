class Contact < ActiveRecord::Base

  def self.search(id, first_name, last_name, email)
    search_result = self.all
    search_result = search_result.where('id LIKE ?', "%#{id}%") if id.present? 
    search_result = search_result.where('first_name LIKE ?', "%#{first_name}%") if first_name.present? 
    search_result = search_result.where('last_name LIKE ?', "%#{last_name}%") if last_name.present? 
    search_result = search_result.where('email LIKE ?', "%#{email}%") if email.present? 
    search_result
  end

end