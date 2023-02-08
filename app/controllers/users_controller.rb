class UsersController < ApplicationController
  def show
    @user = User.find(params[:id])
    @users = User.all_except(current_user)
    # 需要依附在room上面 仍然可以用從user profile 看到 room 在 side bar
    @rooms = Room.public_rooms
    @room = Room.new
    @room_name = get_name(@user, current_user)
    @single_room = Room.where(name: @room_name).first || Room.create_private_room([@user, @current_user], @room_name)

    # 要能夠送出訊息啊
    @message = Message.new

    pagy_message = @single_room.messages.order(created_at: :desc)
    @pagy, messages = pagy(pagy_message, items: 5)
    @messages = messages.reverse
    # 總回表
    render 'rooms/index'
  end

  private
  #給一個傳訊員 跟一個接收員所以只要兩個user 私密
  def get_name(user1, user2)
    users = [user1, user2].sort
    "private_#{users[0].id}_#{users[1].id}"
  end
end
