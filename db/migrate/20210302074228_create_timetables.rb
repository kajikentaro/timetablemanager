class CreateTimetables < ActiveRecord::Migration[6.1]
  def change
    create_table :timetables do |t|
      t.string :name
      t.string :party
      t.string :timetable
      t.string :group
      t.timestamps
    end
  end
end
