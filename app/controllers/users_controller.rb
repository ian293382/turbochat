class UsersController < ApplicationController
  def show
    @user = User.find(params[:id])
    @users = User.all_except(current_user)
    # 需要依附在room上面 仍然可以用從user profile 看到 room 在 side bar
    @room = Room.new
    @rooms = Room.public_rooms
    @room_name = get_name(@user, current_user)
    @single_room = Room.where(name: @room_name).first || Room.create_private_room([@user, current_user], @room_name)

    # 要能夠送出訊息啊
    @message = Message.new
    @messages = Message.where(room_id: @single_room).order(created_at: :asc)
    # 總回表
    render 'rooms/index'
  end

  private
  #給一個傳訊員 跟一個接收員所以只要兩個user 私密
  def get_name(user1, user2)
    user = [user1, user2].sort
    "private_#{user[0].id}_#{user[1].id}"
  end
end
