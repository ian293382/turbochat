class RoomsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_status
  def index
    @room = Room.new
    @rooms = Room.public_rooms

    @users = User.all_except(current_user)
  end

  def create
    @room = Room.create(name: params['room']['name'])
  end

  def show
    @single_room = Room.find(params[:id])
    @rooms = Room.public_rooms
    @users = User.all_except(current_user)
    @room = Room.new
    @message = Message.new

    pagy_message = @single_room.messages.order(created_at: :desc)
    @pagy, messages = pagy(pagy_message, items: 10)
    @messages = messages.reverse

    render 'index'
  end

  private

  def set_status
    current_user.update(status: User.statuses[:online]) if current_user
  end
end
