class Thorvalidator < ActiveModel::Validator 
    def validate(record)
        if record.name.include? 'Thor'
            record.errors[:base] << 'Cannot create another instance of Thor movies. They are all bad. Stop trying to make more.'
        end
    end
end