const path = require('path');
const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-override');
const { engine } = require('express-handlebars');

const route = require('./routes');
const db = require('./config/db');


const app = express();
const port = 3000;


//Connect to DB
db.connect();

app.use(express.static(path.join(__dirname, 'public')));
// midlewere xử lý dữ liệu từ form submit (tích hợp trong express)
app.use(
    express.urlencoded({
        extended: true,
    }),
);
// submit data dạng Json
app.use(express.json());

app.use(methodOverride('_method'));

// HTTP logger
// app.use(morgan("combined"));

// Template engine
app.engine('.hbs', engine({ extname: '.hbs', helpers:{ sum: (a,b) => a + b }}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources','views'));

//Home, search ,contact

// Routes init
route(app);

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
