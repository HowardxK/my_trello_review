class Card < ApplicationRecord
  acts_as_list scope: :list # 根據 list 做 scope

  belongs_to :list

  validates :name, presence: true
end
