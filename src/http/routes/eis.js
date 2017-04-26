'use-strict'

/* base libs */
import express from 'express'
/*  libs/modules */
import wrapper from 'identity-service-wrapper'
/*  utils/constants */

const eis = express.Router()

eis.get('/:did', (req, res) => { // eslint-disable-line no-unused-vars

  const identityService = wrapper('http://' + process.env.ETH_TX_HOST + ':' + process.env.ETH_TX_PORT)
  
  identityService.verify(req.params.did, (err, ddo) => {
    if (err)
      res.status(404).json({ error: err })
    else
      res.status(200).json({ ddo })
  })
})

export default eis