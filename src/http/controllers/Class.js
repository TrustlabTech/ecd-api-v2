'use-strict'

/* base libs */
import request from 'request'
/*  libs/modules */
/*  utils/constants */
import { API_V1_BASE, REQUEST_OPTIONS } from '../../constants'

export class ClassController {
  static v1ClassEndpoint = API_V1_BASE + '/class'

  static fetch = (req, res) => {
    const uri = ClassController.v1ClassEndpoint + '/attendance/' + req.params.id,
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