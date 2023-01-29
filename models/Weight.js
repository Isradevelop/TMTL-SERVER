const { Schema, model } = require('mongoose');

const WeightSchema = Schema({

    weight:{
        type: String,
        required: true
    },
    client: {
        type: String,
        required: true
    },
    weightDate:{
        type: Date,
        required: true
    },
    created_at: {
        type: Date,
        required: true
    },
    updated_at: {
        type: Date,
        required: true
    },

});

WeightSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});



module.exports = model('Weigth', WeightSchema );