class CreateTmps < ActiveRecord::Migration[6.1]
  def change
    create_table :tmps do |t|

      t.timestamps
    end
  end
end
