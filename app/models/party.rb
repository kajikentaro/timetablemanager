class Party < ApplicationRecord
    generate_public_uid
    serialize :dates, Array
    serialize :times, Array
    serialize :groups, Array
    def to_param
        public_uid
    end
end
