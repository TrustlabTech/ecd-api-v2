'use-strict'

/* base libs */
import request from 'request'
import mongoose from 'mongoose'
/*  libs/modules */
import StorageProvider from '../../'
/*  utils/constants */
import { API_V1_BASE, REQUEST_OPTIONS } from '../../constants'

export class ChildController {
  static v1ChildEndpoint = API_V1_BASE + '/child'

  static create = (req, res) => {

    if (!req.body.keypair) {
      res.status(400).json(['parameter \'keypair\' is required for API v2'])
      return
    }

    const keypair = req.body.keypair,
          ownerAddress = '0x' + keypair.address
    
    // remove keypair from req.body before forwarding it to API v1
    // because it causes a 500 error
    // TODO: fix API v1 endpoint, it should simply ignore unexpected
    // body params, instead of try processing it and then fail with 500 code
    delete req.body.keypair

    const uri = ChildController.v1ChildEndpoint,
          options = REQUEST_OPTIONS(req, uri, 'POST', req.body)

    request(options, async (error, response, body) => {
      if (!error) {
        if (response.statusCode === 201 || response.statusCode === 200) {

          const id = body.id, // id of the v1 SQL database
                ChildModel = StorageProvider.getChildModel(),
                child = new ChildModel({
                  id,
                  did: '',
                  ddo: '',
                  eth: {
                    pubkey: keypair.publicKey,
                    privkey: keypair.privateKey,
                    address: ownerAddress,
                  }
                })
          
          let objectId = ''
          try {
            // store child
            const record = await child.save()
            objectId = record._id
          } catch (e) {
            res.status(500).json(['Could not create child (v2)'])
            console.log(e)
            return
          }

          // create job for did registration
          const eisJobReqOptions = {
            method: 'POST',
            uri: 'http://localhost:3000/job',
            json: true,
            body: {
              type: 'eis',
              data: {
                title: 'DID registration for ' + id,
                objectId,
                address: ownerAddress
              },
              options: {
                attempts: 5,
                priority: 'high',
              }
            }
          }

          request(eisJobReqOptions, async (jobserviceError, jobserviceResponse, jobserviceBody) => {
            if (jobserviceError) {
              // if we weren't able to create the job, return an error
              res.status(500).json({ error: 'An error occurred' })
              console.log(jobserviceError)
              return
            }

            res.status(201).json(Object.assign({}, body, { eisJobId: jobserviceBody.id }))
          })
          
        } else
          res.status(response.statusCode).json(body)

      } else {
        res.status(500).json({ error: 'An error occurred' })
        console.log(error)
      }
    })
  }

  static getClass = (req, res) => {
    const uri = ChildController.v1ChildEndpoint + '/class/' + req.params.id,
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