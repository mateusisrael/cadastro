const express = require('express');
const app = express();
const body_parser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;



let log = (req, res, next) => {
    let date = new Date();
    let hora = `${date.getHours()}:${date.getMinutes()}`
    console.log(`${hora}: ${req.method}`);
    next();    
}



app.use(express.static('public'));
app.use(log);
app.use(body_parser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');



app.get('/', (req, res, next) => {
    res.render('index.ejs');
    next();

});

app.get('/users', (req, res, next) => {
    res.send(users_data_json.users);
    next();
    
});

let lista = [

];

function guardarDados(res) {
    lista.push(res);
}

app.get('/cadastro', (req, res, next) => {
    res.render('cadastro.ejs', {lista: lista});
});

app.post('/cadastrar', (req, res, next) => {
    console.log(req.body);
    cadastros.save(req.body, (err, result) => {
        if(err) return console.log(err);
        console.log('Salvo no banco de dados');
        res.redirect('/cadastro');
    });
    // guardarDados(req.body);
});

app.route('/edit/:name')
    .get((req, res) => {
        let name = req.params.name;
        console.log(`Edit ${name}`);
        res.render('cadastro.ejs', {lista: lista});
    })

const mongo_login = { user:"cadastrosdb2", password:"V3rTsptdVtEhkAV3" };
const uri = `mongodb+srv://${mongo_login.user}:${mongo_login.password}@cluster0-pix3k.mongodb.net/test?retryWrites=true&w=majority`;

MongoClient.connect(uri, (err, client) => {
    if(err) return console.log(err);


    db = client.db('CRUD');
    cadastros = db.collection('cadastros');

// Importante: Lembrar de permitir o acesso do ip ao servidor mogodb.

    app.listen(3000, () => {
        console.log('Server on http://localhost:3000');
    });

});
