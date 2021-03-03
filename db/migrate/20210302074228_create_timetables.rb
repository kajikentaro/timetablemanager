class CreateTimetables < ActiveRecord::Migration[6.1]
  def change
    create_table :timetables do |t|
      t.column :id, 'int primary key'
      t.string :name
      t.string :data
      t.timestamps
    end
  end
end
