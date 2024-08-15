const Contacts = require("../models/contactModel");

const contactCtrl = {
    registerContact: async(req, res) => {
        try {
            const { name, phone } = req.body;

            const contact = await Contacts.findOne({ phone });
            // if (contact)
            //     return res
            //         .status(400)
            //         .json({ msg: "The phone number already exists." });
            // Password Encryption
            if (phone.length > 10)
                return res
                    .status(400)
                    .json({ msg: "Số điện thoại không được vượt quá 10 số." });

            const newContact = new Contacts({
                name,
                phone,
            });
            // Save mongodb
            await newContact.save();
            res.json({ msg: "Đăng ký tư vấn thành công.!" });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },

    getContact: async(req, res) => {
        try {
            const contact = await Contacts.find();
            res.json(contact);
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    deleteContact: async(req, res) => {
        try {
            await Contacts.findByIdAndDelete(req.params.id);
            res.json({ msg: "Xóa người liên hệ thành công.!" });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
};

module.exports = contactCtrl;