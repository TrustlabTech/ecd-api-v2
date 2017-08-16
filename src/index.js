'use-strict'

import dotenv from 'dotenv'
// make .env variable available
// to process.env
dotenv.config()

/*  base libs */
import cors from 'cors'
import jwt from 'express-jwt'
import express from 'express'
import bodyParser from 'body-parser'
//import validator from 'express-validator'
/*  libs/modules */
import routes from './http/routes'
import StorageProvider from './http/models'
/*  utils/constants */

// init db connection and make it available to others modules
export default new StorageProvider().init()

const
  app = express(),
  port = process.env.PORT || 8080

app.use(cors())
app.use(bodyParser.json())
//app.use(validator())
app.use(jwt({ secret: process.env.JWT_SECRET }).unless({ path: [{ url: '/staff/login', methods: ['POST'] }] }))

// customize express-jwt error-handling
// it replies HTML by default, but we wanna json here
app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  if (err.name === 'UnauthorizedError') {
    res.status(401).json({ error: err.message })
  }
})

const
  v2 = routes(express.Router(), 'v2'),
  v3 = routes(express.Router(), 'v3')

app.use('/', v2) // default version
app.use('/v2', v2)
app.use('/v3', v3)

app.listen(port, () => {
  console.log('[INFO] Amply API v2 listening on port ' + port) // eslint-disable-line no-console
})


