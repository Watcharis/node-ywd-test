import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import createTabletMariadb from './database/create_schema'
import InitRoute from './src/route'

const app = express()
const port = process.env.PORT || 3000


app.use(bodyParser.urlencoded({ extended: false }))

// # set payload from json
app.use(bodyParser.json())

app.use(cors())

createTabletMariadb()

const initroute = new InitRoute(app)

initroute.routeApi()


app.listen(port, async() => {
    console.log(`app listening on port ${port}`)
})