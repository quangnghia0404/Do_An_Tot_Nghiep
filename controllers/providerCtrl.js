const Providers = require("../models/providerModel");

const providerCtrl = {
    getProviders: async(req, res) => {
        try {
            const providers = await Providers.find();

            res.json(providers);
        } catch (error) {
            return res.status(500).json({ msg: err.message });
        }
    },
    createProvider: async(req, res) => {
        try {
            const { provider_id, name, email, address, phone, images } = req.body;
            if (!images)
                return res.status(400).json({ msg: "Không có hình ảnh để upload." });

            const provider = await Providers.findOne({ provider_id });
            if (provider)
                return res.status(400).json({ msg: "Nhà cung cấp đã tồn tại.!" });

            const newProvider = await Providers({
                provider_id,
                name: name.toLowerCase(),
                email,
                phone,
                images,
                address,
            });

            await newProvider.save();
            res.json({ msg: "Thêm nhà cung cấp thành công.!" });
        } catch (error) {
            return res.status(500).json({ msg: err.message });
        }
    },
    deleteProvider: async(req, res) => {
        try {
            await Providers.findByIdAndDelete(req.params.id);
            res.json({ msg: "Xóa nhà cung cấp thành công.!" });
        } catch (error) {
            return res.status(500).json({ msg: err.message });
        }
    },
    updateProvider: async(req, res) => {
        try {
            const { provider_id, name, email, address, phone, images } = req.body;
            if (!images)
                return res.status(400).json({ msg: "Không có hình ảnh để upload." });

            await Providers.findOneAndUpdate({ _id: req.params.id }, {
                provider_id,
                name: name.toLowerCase(),
                email,
                phone,
                images,
                address,
            });

            res.json({ msg: "Cập nhật nhà cung cấp thành công.!" });
        } catch (error) {
            return res.status(500).json({ msg: err.message });
        }
    },
};

module.exports = providerCtrl;