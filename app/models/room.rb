class Room < ApplicationRecord
  validate_:uniqueness_of :name
  scope :public_rooms, -> { where(is_private: false) }
end
