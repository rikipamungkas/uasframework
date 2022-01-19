const express = require('express') //import (require) module expres lalu simpan di const express
const router = express.Router() //instance object express untuk menjalankan route secara modular
const daftarController = require('../controllers/kipas')
const Daftar = require("../models/kipas")
const fs = require('fs');
var multer = require('multer');
var path = require('path');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
})
const upload = multer({ storage: storage, limits: { fieldSize: 10 * 1024 * 1024 } })

router.route('/daftar')
    .get(daftarController.index)
    .post(upload.single('image'), (req, res, next) => {
        const daftar = new Daftar({
            namaProduk: req.body.namaProduk,
            jenis: req.body.jenis,
            password: req.body.password,
            img: {
                data: fs.readFileSync(path.join(__dirname, '../' + '/uploads/' + req.file.filename)),
                contentType: 'image/jpg'
            }
        });
        daftar.save(function (error) {
            if (error) return handleError(error);
            res.redirect('/daftar')
        })
    })

router.get('/daftar/create', daftarController.create)
router.get('/daftar/:_idProduk', daftarController.show)
router.get('/daftar/:_idProduk/edit', daftarController.edit)
router.get('/daftar/:_id/hapus', daftarController.hapus)
router.post('/daftar/update/:_idProduk', daftarController.update)
router.delete('/daftar/:_idProduk', daftarController.delete)



module.exports = router //modul ini sudah di isi dengan route khusus untuk (URL:/daftar)
                        //dan sudah bisa kita exports