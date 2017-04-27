'use-strict'

import request from 'request'
import wrapper from 'identity-service-wrapper'

export class EisController {
  
  static create = (req, res) => {

  }

  static verify = (req, res) => {
    const IdentityService = wrapper('http://' + process.env.ETH_TX_HOST + ':' + process.env.ETH_TX_PORT)
    IdentityService.verify(req.params.did, (err, ddo) => {
      if (err)
        res.status(404).json({ error: err })
      else
        res.status(200).json({ ddo })
    })
  }
}