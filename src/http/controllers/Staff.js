'use-strict'

/* base libs */
import request from 'request'
/*  libs/modules */
/*  utils/constants */
import { API_V1_BASE, REQUEST_OPTIONS } from '../../constants'

export class StaffController {
  static v1StaffEndpoint = API_V1_BASE + '/staff'

  static auth = (req, res) => {
    const uri = StaffController.v1StaffEndpoint + '/login',
          options = REQUEST_OPTIONS(req, uri, 'POST', req.body)
          
    request(options, (error, response, body) => {
      if (!error) {
        res.status(response.statusCode).json(body)
      } else {
        res.status(500).json({ error: 'An error occurred' })
        console.log(error)
      }
    })
  }
}