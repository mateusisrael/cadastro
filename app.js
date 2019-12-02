const express = require('express');
const app = express();
const body_parser = require('body-parser');

let log = (req, res, next) => {
    let date = new Date();
    let hora = `${date.getHours()}:${date.getMinutes()}`
    console.log(`${hora}: ${req.method}`);
    next();    
}



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


app.get('/cadastro', (req, res, next) => {
    res.render('cadastro.ejs');
});


app.post('/cadastrar', (req, res, next) => {
    console.log(req.body);
    res.redirect('/cadastro');
});


app.listen(3000, () => {
    console.log('Server on http://localhost:3000');
});
