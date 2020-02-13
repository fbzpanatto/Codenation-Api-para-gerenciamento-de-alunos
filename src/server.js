const express = require('express')
const app = express()

const bodyParser = require('body-parser')

app.use(bodyParser.json())

const { 
    getAll,
    getById,
    create,
    updateById,
    deleteById } = require('./controller/index')


app.get('/v1/students', getAll)

app.get('/v1/students/:studentId', getById)

app.post('/v1/students', create)

app.patch('/v1/students/:studentId', updateById)

app.delete('/v1/students/:studentId', deleteById)

module.exports = {
    app
}

