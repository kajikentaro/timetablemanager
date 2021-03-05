class CreateParties < ActiveRecord::Migration[6.1]
  def change
    create_table :parties do |t|
      t.string :name
      t.string :dates  ,array: true
      t.string :times  ,array: true
      t.string :groups ,array: true
      t.timestamps
    end
  end
end
