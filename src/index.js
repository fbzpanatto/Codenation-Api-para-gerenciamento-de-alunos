const { app } = require('./server')

app.listen(4000, function () {
    console.info('%s listening at port %s', 'Students API', 4000)
})