const express = require('express')
const app = express()
app.use(express.json())
const port = 2000
var cors = require('cors')

//#region Mongo
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://alenakolesovar:NcOxReoeSIumEjDi@cluster-web-develop.owxqtu3.mongodb.net/serial');

const Serial = mongoose.model('Serial', {
    name: String,
    poster: String,
    actors: [String],
    description: String
});

//#endregion

app.use(cors())

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/api/serial', async (req, res) => {
    let allSerials = await Serial.find()
    res.json(allSerials)
})

app.post('/api/serial', async (req, res) => {
    let serial = req.body

    if(!serial._id) serial._id = new mongoose.Types.ObjectId()
    await Serial.findByIdAndUpdate(serial._id, serial, {upsert: true})
    res.json({'status': true})
})

app.post('/api/serial/delete', async (req, res) => {
    let serial = req.body
    await Serial.findByIdAndDelete(serial._id)
    res.json({'status': true})
})

app.listen(port, () => {
    console.log(`Example app listening on http://localhost:${port}`)
})