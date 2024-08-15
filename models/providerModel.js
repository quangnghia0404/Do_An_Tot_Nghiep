const mongoose = require("mongoose");

const providerSchema = new mongoose.Schema({
    provider_id: {
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
    address: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    images: {
        type: Object,
        required: true,
    },

    checked: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true, //important
});

module.exports = mongoose.model("Providers", providerSchema);