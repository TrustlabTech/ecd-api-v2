'use-strict'

/* base libs */
import express from 'express'
/*  libs/modules */
/*  utils/constants */
import { ClassController } from '../controllers'

const centreClass = express.Router()

/**
 * ##############################################
 * # CRUD
 * ##############################################
 */
centreClass.get('/', (req, res, next) => { // eslint-disable-line no-unused-vars
})

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
centreClass.get('/attendance/:id', (req, res, next) => { // eslint-disable-line no-unused-vars
  ClassController.fetch(req, res)
})

export default centreClass