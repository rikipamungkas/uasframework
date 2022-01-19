const express =require('express')
const dafRouter = require('./router/daftar') //instance object express untuk menjalankan route secara modular
const app = express();


app.use(express.json()); //for parsing application/json
app.use(express.urlencoded({extended: true})) //for parsing application/xx-www-form-urlencoded
app.use(dafRouter);//tambahkan app.use untuk menggunakan module

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/daftar');
const db = mongoose.connection
db.on('error', function(){
    console.log('Koneksi Gagal')
})
db.once('open', function(){
    console.log('Koneksi Berhasil')
})

app.listen(3000, function(){
    console.log('server sedang berjalan')
})

const requestTime = function(req, res, next){
    date = new Date();
    console.log(date);
    next();
}

app.use(requestTime);
app.set('view engine','ejs');
app.use(express.static('public'));

app.get('/date', function(req,res){ //function ini dijalankan ketika berhasil melewati middleware
    const tanggal = `Requested at : "${date}`
    res.send(tanggal)
})

let daftar = [{
    _idProduk: '1', nama: 'miyako', jenis: 'kipas'
}]

//method respon json
app.get('/daftar', function(req,res){
    const daftar={
        _idProduk : '1',
        namaProduk : 'Miyako'
    }
    res.send(daftar)
})

//method respon redirect
// app.get('/about', function(req,res){
//     res.redirect('/daftar')
// })

//halaman notfound
app.get('/about1', function(req,res){
    res.sendStatus(404)
})

app.route('/menu')
.get(function(req,res){
    res.send('Tampilkan daftar produk kipas angin')
})
.post(function(req,res){
    res.send('Tambahkan daftar produk kipas angin')
})
.put(function(req,res){
    res.send('Update daftar produk kipas angin')
})
.delete(function(req,res){
    res.send('Delete daftar produk kipas angin')
})

app.put('/barang/:_idProduk/:nama/:jenis', function(req,res){
    res.send(req.params)
})

//routing sederhana
app.get("/", function(req,res){
    const sp52 = {
        NIM : 1119101832,
        Nama: "Riki Pamungkas",
    };
    res.render ('pages/index',{sp52: sp52})
});

//membuat url about
app.get("/about", function(req,res){
    res.render('pages/about')
})

//method post untuk create atau mengirimkan keserver untuk disimpan di database
app.post('/user', function(req,res){
    res.send('Post!! Tambahkan data mahasiswa')
})

  //update dengan perintah put
app.put('/user', function(req,res){
    res.send('Put!! Update data mahasiswa')
})


  //delete dengan perintah delete
app.delete('/user', function(req,res){
    res.send('Delete!! Hapus datamahaiswa')
})

