class CreateMovies < ActiveRecord::Migration[6.0]
  def change
    create_table :movies do |t|
      t.string :name
      t.integer :average_rating
      t.string :image_url

      t.timestamps
    end
  end
end
