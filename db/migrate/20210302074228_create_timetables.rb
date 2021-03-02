class CreateTimetables < ActiveRecord::Migration[6.1]
  def change
    create_table :timetables do |t|

      t.timestamps
    end
  end
end
