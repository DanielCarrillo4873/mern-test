const express = require('express')
const dotenv = require('dotenv');
const morgan = require('morgan');
const path = require('path');

const envConfig = dotenv.config();

if(envConfig.error){
    throw envConfig.error
}

const app = express()

app.set('port', process.env.PORT || 3000)
app.use(morgan('dev'));
app.use('/', express.static(path.join(__dirname, 'frontent/build')));

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/test', (req, res) => {
    res.json({
        test: true,
        message: 'This is a test!!!',
        code: 200
    })
})

app.all('*', (req, res) => {
    res.status(404)
    res.json({
        message: `Route "${req.url}" does not exist`,
        error: true
    })
})

app.listen(app.get('port'), () => {
    console.log(`Server running on port ${app.get('port')}`)
})