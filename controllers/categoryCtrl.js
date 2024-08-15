//* Sử dụng model khác
const Category = require("../models/categoryModel");
const Products = require("../models/productModel");

const categoryCtrl = {
    //* Lấy giả trị của sản phẩm
    getCategories: async(req, res) => {
        try {
            const categories = await Category.find();

            res.json(categories);
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    //* Tạo 1 sản phẩm mới
    createCategory: async(req, res) => {
        try {
            //* Xác định giá trị role = 1 cho phép admin đăng nhập. Sau đó admin có thể
            //* thêm mới, xóa và sửa đổi.
            const { name } = req.body;
            const category = await Category.findOne({ name });
            //* Kiểm tra tên sản phẩm đã tồn tại hay chưa
            if (category)
                return res.status(400).json({ msg: "Loại sản phẩm đã tồn tại" });

            const newCategory = await Category({ name });

            //* Lưu sản phẩm vào database
            await newCategory.save();
            res.json({ msg: "Thêm loại sản phẩm thành công" });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    //* Xoá sản phẩm
    deleteCategory: async(req, res) => {
        try {
            const products = await Products.findOne({ category: req.params.id });
            if (products)
                return res
                    .status(400)
                    .json({ msg: "Vui lòng xóa các sản phẩm có liên quan.!" });
            //* Lọc tìm ra id sản phẩm và xóa nó đi
            await Category.findByIdAndDelete(req.params.id);
            res.json({ msg: "Xóa loại sản phẩm thành công." });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    //* Sủa đổi sản phẩm
    updateCategory: async(req, res) => {
        try {
            const { name } = req.body;
            //* Lọc tìm ra id sản phẩm và update
            await Category.findOneAndUpdate({ _id: req.params.id }, { name });

            res.json({ msg: "Sửa loại sản phẩm thành công." });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
};

module.exports = categoryCtrl;