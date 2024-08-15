const Coupons = require("../models/couponModel");
class APIfeatures {
    constructor(query, queryString) {
        this.query = query;
        this.queryString = queryString;
    }
    filtering() {
        const queryObj = {...this.queryString }; //queryString = req.query

        const excludedFields = ["page", "sort", "limit"];
        excludedFields.forEach((el) => delete queryObj[el]);

        let queryStr = JSON.stringify(queryObj);

        //* Trả về 1 chuỗi hay tất cả các phần tử trùng với 1 chuỗi hay 1 function bạn gọi
        queryStr = queryStr.replace(
            /\b(gte|gt|lt|lte|regex)\b/g,
            (match) => "$" + match
        );

        //* gte = lớn hơn hoặc bằng
        //* lte = Nhỏ hơn hoặc bằng
        //* lt = Nhỏ hơn
        //* lte = lớn hơn
        //* regex = tìm kiếm gần đúng hoặc đúng
        this.query.find(JSON.parse(queryStr));

        return this;
    }

    sorting() {
        if (this.queryString.sort) {
            //* Chia chuỗi sắp xếp thành nhiều chuỗi con và kết hợp với dấu cách. Sau đó sắp xếp theo chiều tăng dần
            const sortBy = this.queryString.sort.split(",").join(" ");
            this.query = this.query.sort(sortBy);
        } else {
            //* Sắp xếp theo chiều giảm dần
            this.query = this.query.sort("-createdAt");
        }

        return this;
    }

    paginating() {
        const page = this.queryString.page * 1 || 1;
        const limit = this.queryString.limit * 1 || 10;
        const skip = (page - 1) * limit;
        this.query = this.query.skip(skip).limit(limit);
        return this;
    }
}
const couponCtrl = {
    getCoupons: async(req, res) => {
        try {
            const features = new APIfeatures(Coupons.find(), req.query)
                .filtering()
                .sorting()
                .paginating();

            const coupons = await features.query;

            res.json({
                status: "success",
                result: coupons.length,
                coupons: coupons,
            });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    createCoupon: async(req, res) => {
        try {
            const {
                coupon_id,
                name_user,
                name_product,
                amount,
                price,
                provider,
                note,
            } = req.body;

            //* Kiểm tra xem id của phiếu nhập đã tồn tại hay chưa
            const coupon = await Coupons.findOne({ coupon_id });
            if (coupon)
                return res.status(400).json({ msg: "Phiếu nhập hàng này đã tồn tại." });

            if (amount > 100)
                return res
                    .status(400)
                    .json({ msg: "Số lượng nhập hàng hông được vượt quá 100" });

            const newCoupon = await Coupons({
                coupon_id,
                name_user,
                name_product,
                amount,
                price,
                provider,
                note,
            });
            await newCoupon.save();
            res.json({ msg: "Thêm phiếu nhập hàng thành công.!" });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    deleteCoupon: async(req, res) => {
        try {
            await Coupons.findByIdAndDelete(req.params.id);
            res.json({ msg: "Xóa phiếu nhập hàng thành công.!" });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    updateCoupon: async(req, res) => {
        try {
            const { name_product, name_user, amount, price, provider, note } =
            req.body;

            await Coupons.findOneAndUpdate({ _id: req.params.id }, {
                name_product,
                name_user,
                amount,
                price,
                provider,
                note,
            });

            res.json({ msg: "Cập nhật phiếu nhập hàng thành công.!" });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
};

module.exports = couponCtrl;