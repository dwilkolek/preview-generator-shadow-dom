const express = require('express')
const app = express()
const port = 8080

app.get('/translate', (req, res) => {
    let response = {}
    Object.keys(req.query).map(entity => {

        response[entity] = {};
        req.query[entity].split(',').forEach(id => {
            response[entity][id] = `Rested${entity}WithId${id}`
        });

    })
    setTimeout(() => {
        res.send(response);
    }, 6000);


})

app.use(express.static('dist'))

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))