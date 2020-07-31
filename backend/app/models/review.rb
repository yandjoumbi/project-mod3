class Review < ApplicationRecord
    belongs_to :movie
    validates :comment, uniqueness: true, presence: true
    validates :username, presence: true
    validates_with Ragnarokvalidator, on: :create
    
end
