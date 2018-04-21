const express = require('express')
const app = express()
const ip = require('ip')
const iploc = require('iplocation')

app.get('/', (req, res) => res.send(ip.address()))

app.listen(3000, () => console.log('Example app listening on port 3000!'))

// app.get('/', (req, res) => res.send(ip.address()))
