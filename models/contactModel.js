//* Sử dụng thư viện
const mongoose = require("mongoose");

const ContactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    phone: {
        type: String,
        required: true,
        unique: true,
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model("Contacts", ContactSchema);