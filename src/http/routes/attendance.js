'use-strict'

/* base libs */
import express from 'express'
/*  libs/modules */
/*  utils/constants */
import { AttendanceController } from '../controllers'

const attendance = express.Router()

/**
 * ##############################################
 * # CRUD
 * ##############################################
 */
attendance.get('/:id/history/:year/:month', (req, res, next) => { // eslint-disable-line no-unused-vars
  AttendanceController.history(req, res)
})

attendance.post('/bulk', (req, res, next) => { // eslint-disable-line no-unused-vars
  AttendanceController.create(req, res)
})

attendance.post('/claims', (req, res, next) => { // eslint-disable-line no-unused-vars
  AttendanceController.createVerifiableClaim(req, res)
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

export default attendance