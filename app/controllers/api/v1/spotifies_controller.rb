module Api::V1
  class SpotifiesController < ApplicationController

    def index
      @spotify_users = Spotify.all
      render json: @spotify_users
    end

    def login
      refresh_info = request.env['omniauth.auth']
      user_info = RSpotify::User.new(refresh_info)
      user_hash = user_info.to_hash
      @spotify_user = Spotify.new(user_info: user_hash, refresh: refresh_info)
      @spotify_user.spotify_id = @spotify_user.user_info['id']
      token = encode_token({userId: @spotify_user.spotify_id})
      if @spotify_user.save
        redirect_to "http://localhost:3000/?token=#{token}"
      else
        @old_user = Spotify.find_by(spotify_id: @spotify_user.spotify_id)
        @old_user.refresh = refresh_info
        @old_user.user_info = user_info.to_hash
        @old_user.save
        token = encode_token({userId: @old_user.spotify_id, admin: @old_user.admin})
        binding.pry
        redirect_to "http://localhost:3000/?token=#{token}"
      end
    end

    def ios_login
       headers = {
        "Accept"  => "application/json",
        "Content-Type" => "application/json",
        "Authorization" => "Bearer #{params[:accessToken]}"
       }

      result = HTTParty.get(
        "https://api.spotify.com/v1/me",
        :headers => headers
        )
      @old_user = Spotify.find_by(spotify_id: result["id"])
      render json: @old_user.spotify_id
    end

    def show
      render json: @spotify_user
    end


    def create_spotify_playlist
      get_user
      binding.pry
      @festival = Festival.find params[:festival][:id]
      @playlist = @RSpotify_user.create_playlist!(params[:playlistTitle])
      @new_playlist = @spotify_user.playlists.create!(spotify_playlist_info: @playlist, name: params[:playlistTitle])
      # find all artists with params given
      @artists = params[:artistsSelected].map { |artist| Artist.find artist[:id] }
      # this will add all songs to the playlist
      @songs = []
      @artists.each do |artist|
        @songs << RSpotify::Track.search("artist:#{artist.artist_name}", limit: params[:numberOfSongs])
      end
      @songs.uniq!
      @songs.flatten!
      add_tracks_to_spotify_playlist(@playlist, @songs)
      add_songs_to_playlist_object(@new_playlist, @songs)
      render json: @playlist
    end

    def fetch_top_genres
      get_user
      @top_artists = @RSpotify_user.top_artists
      @genres = @top_artists.map {|artist| artist.genres }.flatten.uniq
      render json: @genres
    end

    def fetch_top_artists
      get_user
      @top_artists = @RSpotify_user.top_artists
      render json: @top_artists
    end

    def fetch_playlists
      get_user
      @playlists = @spotify_user.playlists
      render json: @playlists
    end

    def destroy
      @spotify_user.destroy
    end

    def delete_playlist
      @playlist = Playlist.find(params[:playlistId])
      @playlist.destroy
    end

    private

    def add_tracks_to_spotify_playlist(playlist, tracks)
      tracks = tracks.each_slice(100).to_a
      tracks.each do |array|
        track_uris = array.map {|track| track.uri}.join(",")
        url = playlist.instance_variable_get(:@href) + "/tracks?uris=#{track_uris}"
        RSpotify::User.oauth_post(playlist.instance_variable_get(:@owner).id, url, {})
      end
    end

    def add_songs_to_playlist_object(playlist, tracks)
      tracks.each do |track|
        if Song.find_by spotify_uri: track.uri
          playlist.songs << Song.find_by(spotify_uri: track.uri)
        else
          new_song = Song.create!(spotify_uri: track.uri, song_name: track.name)
          track_id = track.uri.split("track:")[1]
          playlist.songs << new_song
        end
      end
    end

    def get_user
      @spotify_user_id = params[:userId]
      @spotify_user = Spotify.find_by(spotify_id: @spotify_user_id)
      @RSpotify_user = RSpotify::User.new(@spotify_user.refresh)
      user_hash = @RSpotify_user.to_hash
      @spotify_user.user_info = user_hash
    end

    def encode_token(payload={})
      exp = 100.days.from_now
      payload[:exp] = exp.to_i
      JWT.encode(payload, Rails.application.secrets.secret_key_base)
    end
  end
end