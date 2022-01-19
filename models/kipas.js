const mongoose = require('mongoose')
const { Schema } = mongoose

const daftarSchema = new Schema({
    namaProduk: String,
    jenis: String,
    password: String,
    img:{
        data: Buffer, contentType: String
    }
}, { timestamps: true })

const daftar = mongoose.model('daftar', daftarSchema)
module.exports = daftar