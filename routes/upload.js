//* Sử dụng thư viện
const router = require('express').Router()
const cloudinary = require('cloudinary')
const fs = require('fs')

//* Sử dụng model khác
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')


//* Úp ảnh trên thư viện cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
})

//* Úp ảnh chỉ có admin mới thực hiện được
router.post('/upload', auth, authAdmin, (req, res) => {
    try {

        //* Kiểm tra xem đã có ảnh hay chưa 
        if (!req.files || Object.keys(req.files).length === 0)
            return res.status(400).json({ msg: 'No files were uploaded.' })

        //* Kiểm tra ảnh nếu lớn hơn 1mb
        const file = req.files.file;
        if (file.size > 1024 * 1024) {

            //* Kiểm tra ảnh nếu sai thì không thêm vào tmp
            removeTmp(file.tempFilePath)
            return res.status(400).json({ msg: "Size too large" })
        }

        //* Kiểm tra định dạng của tệp 
        if (file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/png') {
            removeTmp(file.tempFilePath)
            return res.status(400).json({ msg: "File format is incorrect." })
        }

        //* Úp ảnh lên thư viện cloudinary
        cloudinary.v2.uploader.upload(file.tempFilePath, { folder: "DATN" }, async(err, result) => {
            if (err) throw err;

            removeTmp(file.tempFilePath)
                //* Sau khi úp ảnh sẽ có tỏng file tmp
            res.json({ public_id: result.public_id, url: result.secure_url })
        })
    } catch (err) {
        return res.status(500).json({ msg: err.message });
    }
})

//* Xóa ảnh chỉ có admin mới thực hiện được
router.post('/destroy', auth, authAdmin, (req, res) => {
    try {
        const { public_id } = req.body;
        if (!public_id) return res.status(400).json({ msg: 'No images Selected' })


        //* Xóa ảnh trên cloudinary
        cloudinary.v2.uploader.destroy(public_id, async(err, result) => {
            if (err) throw err;

            res.json({ msg: "Deleted Image" })

        })

    } catch (err) {
        return res.status(500).json({ msg: err.message })
    }

})

const removeTmp = (path) => {
    fs.unlink(path, (err) => {
        if (err) throw err;
    })
}

module.exports = router;