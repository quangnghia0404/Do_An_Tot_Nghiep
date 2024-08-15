const mongoose = require("mongoose");

const couponSchema = new mongoose.Schema({
    coupon_id: {
        type: String,
        unique: true,
        trim: true,
        required: true,
    },
    name_user: {
        type: String,
        // trim: true,
        required: true,
    },
    name_product: {
        type: String,
        // trim: true,
        required: true,
    },
    amount: {
        type: Number,
        trim: true,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    provider: {
        type: String,
        required: true,
    },
    note: {
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

module.exports = mongoose.model("Coupons", couponSchema);