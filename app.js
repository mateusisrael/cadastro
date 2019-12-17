const express = require('express');
const app = express();
const body_parser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId


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



app.route('/')
    .get((req, res, next) => {
        res.render('home.ejs');
        next();
    });

// app.get('/users', (req, res, next) => {
//     res.send(users_data_json.users);
//     next();

// });
// function guardarDados(res) {
//     lista.push(res);
// }

app.route('/cadastro')
    .get((req, res, next) => {
        let cursor = cadastros.find().toArray((err, result) => {
            if(err) return console.log(err);

            res.render('cadastro.ejs', {lista: result});
        });
    });


app.route('/cadastrar')
    .post((req, res, next) => {

        cadastros.save(req.body, (err, result) => {
            if(err) return console.log(err);
            console.log(`Salvo no banco de dados! ${result}`);
            res.redirect('/cadastro');
        });
        // guardarDados(req.body);
    });
    

app.route('/edit/:name')
    .get((req, res) => {

        let cursor = cadastros.find().toArray((err, result) => {
            let name = req.params.name;
            console.log(`Edit ${name}`);
            res.render('cadastro.ejs', {lista: result});
        });
    })


app.route('/delete/:id')
    .get((req, res) => {
        let id = req.params.id;

        console.log(`Delete: ${req.params.id}`)

        db.collection('cadastros').deleteOne({_id: ObjectId(id)}, (err, result) => {
            if (err) return res.send(500, err)
            console.log('Deletado do Banco de Dados!')
            res.redirect('/cadastro')
        }) ;
    });



function iniciar() {

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
}

iniciar();