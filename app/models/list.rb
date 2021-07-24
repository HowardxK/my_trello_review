class List < ApplicationRecord
  acts_as_list scope: :user # 根據 user 做 scope

  belongs_to :user

  has_many :cards, -> { order(position: :asc) }, dependent: :destroy 
  # 刪除列表時 會同步 刪除 列表下的卡片

  validates :name, presence: true
end
