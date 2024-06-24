const express = require('express');
const morgan = require('morgan');
const createError = require('http-errors');
require('dotenv').config({
    path: './.env',}
);
const AuthRoute = require('./routes/Auth.routes');
const connectDB = require('./helpers/index')
const app = express();
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

connectDB()

app.get('/', async (req, res, next) => {
    res.send('Hello World');
});
app.use('/auth', AuthRoute);

app.use((req, res, next) => {
    // const error = new Error('Not Found');
    // error.status = 404;
    // next(error);
    next(createError.NotFound("This route does not exist"))
});

app.use((err, req, res, next) =>{
    res.status(err.status || 500);
    res.json({
        error: {
            status: err.status,
            message: err.message
        }
    });
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});