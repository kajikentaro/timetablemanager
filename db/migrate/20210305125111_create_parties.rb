class CreateParties < ActiveRecord::Migration[6.1]
  def change
    create_table :parties do |t|
      t.string :name
      t.string :public_uid
      t.string :dates  
      t.string :times  
      t.string :groups 
      t.timestamps
    end
  end
end
