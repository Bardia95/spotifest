module Api::V1
  class SpotifiesController < ApplicationController

    def index
      @spotify_users = Spotify.all
      render json: @spotify_users
    end


    def login
      user_info = RSpotify::User.new(request.env['omniauth.auth'])
      user_hash = user_info.to_hash
      @spotify_user = Spotify.new(user_info: user_hash)
      @spotify_user.spotify_id = @spotify_user.user_info['id']
      token = encode_token({userId: @spotify_user.spotify_id})
      if @spotify_user.save
        redirect_to "http://localhost:3000/?token=#{token}"
      else
        @old_user = Spotify.find_by(spotify_id: @spotify_user.spotify_id)
<<<<<<< HEAD
        token = encode_token({userId: @old_user.spotify_id, admin: @old_user.admin})
=======
        # replace their old user hash with the current one
        @old_user.user_info = user_hash
        @old_user.save
>>>>>>> aca6eb988bb8cd34ceed1ab04b73a5260867964a
        redirect_to "http://localhost:3000/?token=#{token}"
      end
    end

    def show
      render json: @spotify_user
    end


<<<<<<< HEAD
    def create_spotify_playlist
=======
    def create_playlist
>>>>>>> aca6eb988bb8cd34ceed1ab04b73a5260867964a
      @spotify_user_id = params[:spotifyUser]
      @spotify_user = Spotify.find_by(spotify_id: @spotify_user_id)
      @RSpotify_user = RSpotify::User.new(@spotify_user.user_info)
      @festival = Festival.find params[:festival][:id]
      @playlist = @RSpotify_user.create_playlist!(params[:playlistTitle])
      @new_playlist = @spotify_user.playlists.create!(spotify_playlist_info: @playlist, name: params[:playlistTitle])
      # find all artists with params given
      @artists = params[:artistsSelected].map { |artist| Artist.find artist[:id] }
      # this will add all songs to the playlist
<<<<<<< HEAD
      @songs = []
      binding.pry
      @artists.each do |artist|
        @songs << RSpotify::Track.search("artist:#{artist.artist_name}", limit: params[:numberOfSongs])
      end
      @songs.uniq!
      @songs.flatten!
      add_tracks_to_spotify_playlist(@playlist, @songs)
      binding.pry
      add_songs_to_playlist_object(@new_playlist, @songs)
      binding.pry
=======
      @artists.each { |artist| add_tracks_to_playlist(@playlist, artist.songs.limit(params[:numberOfSongs])) }
      @artists.each { |artist| add_songs_to_playlist(@new_playlist, artist.songs.limit(params[:numberOfSongs])) }
>>>>>>> aca6eb988bb8cd34ceed1ab04b73a5260867964a
      render json: @playlist
    end

    def fetch_top_genres
      get_user
      binding.pry
      @top_artists = @RSpotify_user.top_artists
      @genres = @top_artists.map {|artist| artist.genres }.flatten.uniq
      render json: @genres
    end

    def fetch_top_artists
      get_user
      binding.pry
      @top_artists = @RSpotify_user.top_artists
      render json: @top_artists
    end

    def fetch_playlists
      @spotify_user_id = params[:userId]
      @spotify_user = Spotify.find_by(spotify_id: @spotify_user_id)
      @playlists = @spotify_user.playlists
      render json: @playlists
    end

    def destroy
      @spotify_user.destroy
    end

    private

    def add_tracks_to_spotify_playlist(playlist, tracks)
      track_uris = tracks.map {|track| track.uri}.join(",")
      url = playlist.instance_variable_get(:@href) + "/tracks?uris=#{track_uris}"
      RSpotify::User.oauth_post(playlist.instance_variable_get(:@owner).id, url, {})
      tracks
    end

    def add_songs_to_playlist_object(playlist, tracks)
      binding.pry
      tracks.each do |track|
        if Song.find_by spotify_uri: track.uri
          playlist.songs << Song.find_by(spotify_uri: track.uri)
        else
          new_song = Song.create!(spotify_uri: track.uri, song_name: track.name)
          track_id = track.uri.split("track:")[1]
          audio_feature = RSpotify::AudioFeatures.find(track_id)
          if audio_feature && audio_feature.uri
            new_song.audio = Audio.create!(features: @audio_feature)
          end
          playlist.songs << new_song
        end
      end
    end

    def get_user
      @spotify_user_id = params[:userId]
      @spotify_user = Spotify.find_by(spotify_id: @spotify_user_id)
      @RSpotify_user = RSpotify::User.new(@spotify_user.user_info)
    end

    def encode_token(payload={})
      exp = 100.days.from_now
      payload[:exp] = exp.to_i
      JWT.encode(payload, Rails.application.secrets.secret_key_base)
    end
  end
end