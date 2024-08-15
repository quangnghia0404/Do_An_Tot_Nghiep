//* Sử dụng model thư mục khác
const Users = require('../models/userModel')

const authAdmin = async(req, res, next) => {
    try {
        //* Lấy thông tin của user thông qua id
        const user = await Users.findOne({
                _id: req.user.id
            })
            //* Kiểm tra giá trị role nếu = 0 thì không có quyền đăng nhâp
        if (user.role === 0)
            return res.status(400).json({ msg: "Admin resources access denied" })

        next()

    } catch (err) {
        return res.status(500).json({ msg: err.message })
    }
}

module.exports = authAdmin;