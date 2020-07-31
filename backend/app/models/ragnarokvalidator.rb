class Ragnarokvalidator < ActiveModel::Validator 
    def validate(record)
        if record.movie_id === 6 && record.rating != 0
            record.errors[:base] << 'Ragnarok must be rated 0 stars'
        end
    end
end