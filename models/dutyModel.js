//* Sử dụng thư viện
const mongoose = require('mongoose')


const dutySchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        trim: true,
        unique: true
    }
}, {
    //* Lấy thời gian thực tế
    timestamps: true
})

module.exports = mongoose.model("Duty", dutySchema)