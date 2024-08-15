const Duty = require("../models/dutyModel");

const dutyCtrl = {
    getDuties: async(req, res) => {
        try {
            const duties = await Duty.find();
            res.json(duties);
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    createDuty: async(req, res) => {
        try {
            //* Xác định giá trị role = 1 cho phép admin đăng nhập. Sau đó admin có thể
            //* thêm mới, xóa và sửa đổi.
            const { name } = req.body;
            const duty = await Duty.findOne({ name });
            //* Kiểm tra tên sản phẩm đã tồn tại hay chưa
            if (duty)
                return res.status(400).json({ msg: "This duty already exists." });

            const newDuty = await Duty({ name });

            //* Lưu sản phẩm vào database
            await newDuty.save();
            res.json({ msg: "Thêm chức vụ thành công.!" });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    deleteDuty: async(req, res) => {
        try {
            await Duty.findByIdAndDelete(req.params.id);
            res.json({ msg: "Xóa chức vụ thành công.!" });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    //* Sủa đổi sản phẩm
    updateDuty: async(req, res) => {
        try {
            const { name } = req.body;
            //* Lọc tìm ra id sản phẩm và update
            await Duty.findOneAndUpdate({ _id: req.params.id }, { name });

            res.json({ msg: "Cập nhật chức vụ thành công.!" });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
};

module.exports = dutyCtrl;