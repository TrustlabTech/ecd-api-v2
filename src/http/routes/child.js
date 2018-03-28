'use-strict'

/* base libs */
import express from 'express'
/*  libs/modules */
import { ChildController } from '../controllers'
/*  utils/constants */

const child = express.Router()

/**
 * ##############################################
 * # CRUD
 * ##############################################
 */
child.post('/', (req, res) => {
  ChildController.create(req, res)
})

child.patch('/:id', (req, res) => {
  ChildController.update(req, res)
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
child.get('/class/:id', (req, res) => {
  ChildController.getClass(req, res)
})

child.get('/center/:id', (req, res) => {
    ChildController.getCenter(req, res)
})
export default child