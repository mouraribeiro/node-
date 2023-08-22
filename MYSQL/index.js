const express = require('express')

const exphbs = require('express-handlebars')

const mysql = require('mysql')

const app = express()

app.use(
    express.urlencoded({
        extended: true,
    }),
)

app.use(express.json())
 
app.engine('handlebars', exphbs.engine())
app.set('view engine','handlebars')

app.use(express.static("public"));


app.get('/',(req,res) => {
    res.render('home')
})

app.post('/books/insertbook', (req,res)=>{
    const title = req.body.title
    const pageqty = req.body.pageqty

    const query = `INSERT INTO books (??,??) VALUES (?,?)`
    const data = ['title','pageqty',title,pageqty]

    conn.query(query,data, function(err){
        if (err){
            console.log(err)
        }
        res.redirect("/")
    })

})
app.get('/books', (req,res)=> {
    const query = `SELECT * FROM books`
    conn.query(query, function(err,data){
        if (err){
            console.log(err)
            return
        }
        const books = data
        console.log(books)
        res.render('books', {books})
    })
    
})
app.get('/books/:id', (req,res) => {
    const id = req.params.id
    const query = `SELECT * FROM books WHERE ?? = ?`
    const data = ['id', id]
    conn.query(query, data,function(err,data){
        if (err){
            console.log(err)
            return
        }
        const book = data[0]
        console.log(book)
        res.render('book', {book})
    })
})

app.get('/books/edit/:id', (req,res) => {
    const id = req.params.id
    const query = `SELECT * FROM books WHERE ?? = ?`
    const data = ['id', id]

    conn.query(query, data,function(err,data){
        if (err){
            console.log(err)
            return
        }
        const book = data[0]
        
        res.render('editbook', {book})
    })
})

app.post('/books/updatebook', (req,res)=>{
    const id = req.body.id
    const title = req.body.title
    const pageqty = req.body.pageqty


    const query = `UPDATE books SET title = '${title}', pageqty = ${pageqty} WHERE id = ${id}`

  conn.query(query, function (err) {
    if (err) {
      console.log(err)
    }

    res.redirect(`/books`)
  })
})
app.post('/books/remove/:id', (req,res)=> {
    const id = req.params.id


    const query = `DELETE * FROM books WHERE ?? = ?`
    const data = ['id',id]
    
  conn.query(query, function (err) {
    if (err) {
      console.log(err)
    }

    res.redirect(`/books`)
  })
})



const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'nodemysql'
})

conn.connect(function(err){
    if (err){
        console.log(err)
    }
    console.log('Conectou ao MYSQL')
    app.listen(3000)

})