const express = require('express')
const exphbs = require('express-handlebars')
const conn = require('./db/conn')

const User = require('./models/User')

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

app.get('/', function (req, res) {
    res.render('home')
  })
  
  app.get('/users/create', function (req, res) {
    res.render('adduser')
  })
  
  app.post('/users/create', async function (req, res) {
    const name = req.body.name
    const occupation = req.body.occupation
    let newsletter = req.body.newsletter
  
    if (newsletter === 'on') {
      newsletter = true
    }else{
        newsletter = false
    }
    console.log(req.body)

  
    await User.create({ name, occupation, newsletter })
  
    res.redirect('/')
  })
  
  // Criar tabelas e rodar o app
  conn
    .sync()
    .then(() => {
      app.listen(3000)
    })
    .catch((err) => console.log(err))