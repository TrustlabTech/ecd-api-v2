'use-strict'

/* base libs */
import request from 'request'
/*  libs/modules */
import StorageProvider from '../../'
/*  utils/constants */
import { API_V1_BASE, REQUEST_OPTIONS } from '../../constants'

export class StaffController {
  static v1StaffEndpoint = API_V1_BASE + '/staff'

  static auth = (req, res) => {
    const uri = StaffController.v1StaffEndpoint + '/login',
          options = REQUEST_OPTIONS(req, uri, 'POST', req.body)
          
    request(options, async (error, response, body) => {
      if (!error) {
        try {
          const centreInfo = await StorageProvider.getCentreModel().findOne({ id: body.user.centre.id }).select('did').exec()
          const staffInfo = await StorageProvider.getPractitionerModel().findOne({ id: body.user.id }).select('did').exec()

          if (staffInfo)
            body.user.did = staffInfo.did ? staffInfo.did : 'did:dummy'
          else
            body.user.did = 'did:dummy'

          if (centreInfo)
            body.user.centre.did = centreInfo.did ? centreInfo.did : 'did:dummy'
          else
            body.user.centre.did = 'did:dummy'
          
          res.status(response.statusCode).json(body)
        } catch (e) {
          res.status(500).json({ error: 'An error occurred' })
          console.log(e)
        }
      } else {
        res.status(500).json({ error: 'An error occurred' })
        console.log(error)
      }
    })
  }
}