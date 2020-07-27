class CreateReviews < ActiveRecord::Migration[6.0]
  def change
    create_table :reviews do |t|
      t.string :username
      t.string :comment
      t.integer :rating
      t.integer :likes
      t.integer :movie_id

      t.timestamps
    end
  end
end
