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
// verify current token
staff.get('/login', (req, res, next) => { // eslint-disable-line no-unused-vars
  return res.status(204).json({ success: true, message: 'Token is valid', data: {} })
})

staff.post('/login', (req, res, next) => { // eslint-disable-line no-unused-vars
  StaffController.auth(req, res)
})

/**
 * ##############################################
 * # DOMAIN LOGIC
 * ##############################################
 */

export default staff