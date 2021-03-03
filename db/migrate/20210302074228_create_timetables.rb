class CreateTimetables < ActiveRecord::Migration[6.1]
  def change
    create_table :timetables do |t|
      t.string :name
      t.string :timetable
      t.integer :row
      t.integer :col
      t.timestamps
    end
  end
end
