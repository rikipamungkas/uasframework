const { response } = require("express")
const daftar = require("../models/kipas")
const Daftar = require("../models/kipas")

// let daftar=[
//     {idProduk: '1', namaProduk: 'Miyako', jenis: 'Kipas'},
//     {idProduk: '2', namaProduk: 'Yasaka', jenis: 'Kipas'},
// ]


module.exports = {
    index: function (request, response) {
        let keyword = {}
        if (request.query.keyword) {
            keyword = { namaProduk: { $regex: request.query.keyword } }
        }
        Daftar.find(keyword, "namaProduk _id", function (error, daftar) {
            if (error) console.log(error)
            response.render('pages/daftar/index', { daftar })
        })
    },
    create: function (request, response) {
        response.render('pages/daftar/create', { daftar })
    },
    show: function (request, response) {
        const _idProduk = request.params._idProduk
        // const data = daftar.filter(daftar =>{
        //     return daftar.idProduk == idProduk
        // })
        daftar.findById(_idProduk, function (error, data) {
            if (error) console.log(error)
            response.render('pages/daftar/show', { daftar: data })
        })
    },
    get: function (req, res) {
        if (daftar.length > 0) {
            res.json({
                status: true,
                data: daftar,
                method: req.method,
                URL: req.url,
                tanggal: new Date()
            })
        }
        else {
            res.json({
                status: false,
                massage: 'Data Produk Masih Kosong'
            })
        }
        res.json(daftar);
    },
    tambah: function (req, res) {
        const daftar = new Daftar({
            namaProduk: req.body.namaProduk,
            jenis: req.body.jenis,
            password: req.body.password
        })//tambahkan data kipas di database
        daftar.save(function (error) {
            if (error) return handlesError(error);
            res.redirect('/daftar')
        })
    },
    edit: function (request, response) {
        const _idProduk = request.params._idProduk
        daftar.findById(_idProduk, function (error, data) {
            if (error) console.log(error)
            response.render('pages/daftar/edit', { daftar: data })
        })
    },
    update: function (req, res) {
        const _id = req.body._id
        const id = req.body.id
        const namaProduk = req.body.namaProduk
        const jenis = req.body.jenis
        const password = req.body.password
        const filter = { _id: _id };
        const update = {
            id: id,
            namaProduk: namaProduk,
            jenis: jenis,
            password: password,
        };
        daftar.updateOne(filter, update, function (err) {
            res.redirect('/daftar')
        });
    },
    hapus: function (req, res) {
        const id = req.params._id
        daftar.deleteOne({ _id: id }, function (err) {
            if (err) return console.log(err);
            res.redirect('/daftar')
        });
    },
    delete: function (req, res) {
        const id = req.params.idProduk;
        let pesan = false
        daftar.filter(produk => {
            if (produk.idProduk == id) {
                const index = daftar.indexOf(produk)
                daftar.splice(index, 1)
                res.send({
                    status: true,
                    data: daftar,
                    message: "Produk berhasil dihapus",
                    method: req.method,
                    url: req.url,
                    tanggal: new Date()
                })
                pesan = true
            }
        })
        if (pesan == false) {
            res.json({
                status: false,
                message: "Produk tidak ditemukan"
            })
        }
        res.json(daftar)//delete data kipas di database
    }
}