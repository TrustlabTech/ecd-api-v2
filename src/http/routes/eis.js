'use-strict'

/* base libs */
import express from 'express'
/*  libs/modules */
import { EisController } from '../controllers'
/*  utils/constants */

const eis = express.Router()

// create (async through Jobs Service)
eis.post('/', (req, res) => {
  EisController.create(req, res)
})

// verify (sync)
eis.get('/:did', (req, res) => {
  EisController.verify(req, res)
})

export default eis