const { Schema, model } = require('mongoose');

const ClientSchema = Schema({

    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,     
        required: true
    },
    address:{
        type: String,     
        required: true
    },
    zone:{
        type: String,     
        required: true
    },
    date_of_bird:{
        type: Date,
        required: true
    },
    telephone:{
        type: String,     
        required: true
    },
    email:{
        type: String,     
        required: true
    },
    vip:{
        type: Boolean,
        required: true
    },
    isActive:{
        type: Boolean,
        required: true
    },
    initial_weight:{
        type: String,
        required: true
    },
    objetive_weight:{
        type: String,
        required: true
    },
    payments:{
        type: Array,
        default: [String]
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

ClientSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});



module.exports = model('Client', ClientSchema );

