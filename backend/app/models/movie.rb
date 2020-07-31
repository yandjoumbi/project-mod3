class Movie < ApplicationRecord
    has_many :reviews
    validates :name, uniqueness: true, presence: true
    validates :image_url, presence: true
    validates_with Thorvalidator, on: :create
end
