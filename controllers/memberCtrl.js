//* Sử dụng model khác
const Members = require("../models/memberModel");

//* Chỉ có admin mới có quyền thực hiện các tác vụ này
const memberCtrl = {
    //* Lấy giá trị của sản phẩm
    getMembers: async(req, res) => {
        try {
            const members = await Members.find();

            res.json(members);
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },

    //* Tạo sản phẩm mới
    createMember: async(req, res) => {
        try {
            const { member_id, name, content, images, duty } = req.body;
            if (!images)
                return res.status(400).json({ msg: "Không có hình ảnh để upload.!" });

            const member = await Members.findOne({ member_id });
            if (member)
                return res.status(400).json({ msg: "Nhân viên này đã tồn tại.!" });

            const newMember = await Members({
                member_id,
                name: name.toLowerCase(),
                content,
                images,
                duty,
            });

            await newMember.save();
            res.json({ msg: "Thêm nhân viên thành công.!" });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },

    //* Xóa sản phẩm
    deleteMember: async(req, res) => {
        try {
            await Members.findByIdAndDelete(req.params.id);
            res.json({ msg: "Xóa nhân viên thành công.!" });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },

    //* Sửa sản phẩm
    updateMember: async(req, res) => {
        try {
            const { name, content, images, duty } = req.body;
            if (!images) return res.status(400).json({ msg: "No images upload." });

            await Members.findOneAndUpdate({ _id: req.params.id }, {
                name: name.toLowerCase(),
                content,
                images,
                duty,
            });

            res.json({ msg: "Cập nhật nhân viên thành công.!" });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
};

module.exports = memberCtrl;