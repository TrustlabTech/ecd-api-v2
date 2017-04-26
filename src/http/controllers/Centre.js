'use-strict'

/* base libs */
import request from 'request'
/*  libs/modules */
/*  utils/constants */
import { API_V1_BASE, REQUEST_OPTIONS } from '../../constants'

export class CentreController {
  static v1CentreEndpoint = API_V1_BASE + '/centre'

  static getSummary = (req, res) => {
    const uri = CentreController.v1CentreEndpoint + '/' + req.params.id.trim() + '/summary',
          options = REQUEST_OPTIONS(req, uri, 'GET')

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