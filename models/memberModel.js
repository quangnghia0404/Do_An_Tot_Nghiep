const mongoose = require("mongoose");

const memberSchema = new mongoose.Schema({
    member_id: {
        type: String,
        unique: true,
        trim: true,
        required: true,
    },
    name: {
        type: String,
        trim: true,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    images: {
        type: Object,
        required: true,
    },
    duty: {
        type: String,
        required: true,
    },
    checked: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true, //important
});

module.exports = mongoose.model("Members", memberSchema);