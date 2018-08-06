class Song < ApplicationRecord
  belongs_to :artist, optional: true
  has_and_belongs_to_many :playlists
  has_one :audio

  validates :song_name, presence:true
  validates :spotify_uri, presence:true
  # end
end
