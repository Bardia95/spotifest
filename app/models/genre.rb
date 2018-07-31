class Genre < ApplicationRecord
  has_and_belongs_to_many :artists
  validates :name, uniqueness: true
end
