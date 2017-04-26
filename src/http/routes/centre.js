'use-strict'

/* base libs */
import express from 'express'
/*  libs/modules */
/*  utils/constants */
import { CentreController } from '../controllers'

const centre = express.Router()

/**
 * ##############################################
 * # CRUD
 * ##############################################
 */

/**
 * ##############################################
 * # AUTH
 * ##############################################
 */

/**
 * ##############################################
 * # DOMAIN LOGIC
 * ##############################################
 */

centre.get('/:id/summary', (req, res, next) => { // eslint-disable-line no-unused-vars
  CentreController.getSummary(req, res)
})

export default centre