//* Sử dụng model khác
const Products = require("../models/productModel");

//* Lọc, sắp xếp và phân trang
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

//* Chỉ có admin mới có quyền thực hiện các tác vụ này
const productCtrl = {
    //* Lấy giá trị của sản phẩm
    getProducts: async(req, res) => {
        try {
            const features = new APIfeatures(Products.find(), req.query)
                .filtering()
                .sorting()
                .paginating();

            const products = await features.query;

            res.json({
                status: "success",
                result: products.length,
                products: products,
            });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },

    //* Tạo sản phẩm mới
    createProduct: async(req, res) => {
        try {
            //* Khởi tạo các truờng thuộc tính của sản phẩm
            const {
                product_id,
                title,
                price,
                description,
                content,
                images,
                category,
                provider,
            } = req.body;
            //* Kiểm tra có hình ảnh hay chưa
            if (!images)
                return res.status(400).json({ msg: "Không có hình ảnh để upload" });

            //* Kiểm tra xem id của sản phẩm đã tồn tại hay chưa
            const product = await Products.findOne({ product_id });
            if (product)
                return res.status(400).json({ msg: "Sản phẩm đã tồn tại.!" });

            //* Khởi tạo các trường thuộc tính của sản phẩm
            const newProduct = await Products({
                product_id,
                title: title.toLowerCase(),
                sold,
                price,
                description,
                content,
                images,
                category,
                provider,
            });

            //* tạo sản phẩm và lưu vào database
            await newProduct.save();
            res.json({ msg: "Thêm sản phẩm thành công.!" });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },

    //* Xóa sản phẩm
    deleteProduct: async(req, res) => {
        try {
            //* Lọc tìm ra sản phẩm và xóa
            await Products.findByIdAndDelete(req.params.id);
            res.json({ msg: "Xóa sản phẩm thành công.!" });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },

    //* Sửa sản phẩm
    updateProduct: async(req, res) => {
        try {
            //* Khởi tạo và kiểm tra xem có hình ảnh hay chưa
            const { title, price, description, content, images, category, provider } =
            req.body;
            if (!images)
                return res.status(400).json({ msg: "Không có hình ảnh để upload." });

            //* Lọc tìm ra sản phẩm và sửa
            await Products.findOneAndUpdate({ _id: req.params.id }, {
                title: title.toLowerCase(),
                price,
                description,
                content,
                images,
                category,
                provider,
            });

            res.json({ msg: "Cập nhật sản phẩm thành công.!" });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
};

module.exports = productCtrl;