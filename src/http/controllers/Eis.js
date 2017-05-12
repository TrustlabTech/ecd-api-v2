'use-strict'

import request from 'request'
import wrapper from 'identity-service-wrapper'

const getJobRequestOptions = (req) => {
  const id = req.body.id, // API v1 id of the resource
        type = req.body.type // resource type (staff | centre)

  const resolvedType = type === 'centre' ? 'IDENTITY_SERVICE_CENTRES' 
                     : type === 'practitioner' ? 'IDENTITY_SERVICE_PRACTITIONERS'
                     : type === 'child' ? 'IDENTITY_SERVICE_CHILDREN' : '' // will be a no-op

  return {
    method: 'POST',
    uri: 'http://localhost:3000/job',
    json: true,
    body: {
      type: resolvedType,
      data: {
        title: 'DID registration for ' + type + ' ' + id,
        id,
      },
      options: {
        attempts: 5,
        priority: 'critical',
      }
    }
  }
}

export class EisController {
  
  static create = (req, res) => {
    request(getJobRequestOptions(req), (jobserviceError, jobserviceResponse, jobserviceBody) => {
      if (jobserviceError) {
        // if we weren't able to create the job, return an error
        res.status(500).json({ error: 'An error occurred' })
        console.log(jobserviceError)
        return
      }

      res.status(201).json({ eisJobId: jobserviceBody.id })
    })
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