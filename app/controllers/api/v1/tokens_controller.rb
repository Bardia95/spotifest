module Api::V1
  class TokensController < SpotifyController
    def create
      @user = User.find_by(email: params[:email])
      # binding.pry
      if @user&.authenticate(params[:password])
        render json: {
          jwt: encode_token({id: @user.id, email: @user.email, spotify_user_info: @user.spotify_user_info})
        }
      else
        head :not_found
      end
    end

    private
    def encode_token(payload={})
      exp = 100.days.from_now
      payload[:exp] = exp.to_i
      JWT.encode(payload, Rails.application.secrets.secret_key_base)
    end
  end
end
