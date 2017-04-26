'use-strict'

/* base libs */
import express from 'express'
/*  libs/modules */
/*  utils/constants */
import { StaffController } from '../controllers'

const staff = express.Router()

/**
 * ##############################################
 * # CRUD
 * ##############################################
 */
staff.post('/', (req, res, next) => { // eslint-disable-line no-unused-vars
})

/**
 * ##############################################
 * # AUTH
 * ##############################################
 */
staff.post('/login', (req, res, next) => { // eslint-disable-line no-unused-vars
  StaffController.auth(req, res)
})

/**
 * ##############################################
 * # DOMAIN LOGIC
 * ##############################################
 */

export default staff