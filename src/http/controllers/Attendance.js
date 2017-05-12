'use-strict'

/* base libs */
import request from 'request'
import { keccak_256 } from 'js-sha3'
/*  libs/modules */
import StorageProvider from '../../'
/*  utils/constants */
import { API_V1_BASE, REQUEST_OPTIONS } from '../../constants'

const attendeeSample = {
    "type": "Person",
    "id": "did_child",
    "date": "",
    "attended": false,
}
const attendenceObject = {
  "id": "did_ecd_practitioner",
  "deliveredService": {
    "type": "EducationEvent",
    "practitioner": "did_ecd_practitioner",
    "attendees": [], // list of attendeeSample(s)
    "geo": {
      "type": "GeoCoordinates",
      "latitude": "",
      "longitude": "",
    },
  },
}
const verifiableClaim = {
  "@context": [
    "https://w3id.org/identity/v1",
    "https://w3id.org/security/v1",
    "https://w3id.org/amply/v1"
  ],
  "id": "http://example.gov/credentials/3732",
  "type": ["Credential", "AttendanceCredential"],
  "issuer": "did_ecd_centre",
  "issued": "",
  "claim": {}, // should be an AttendanceObject
  "signature": {
    "type": "LinkedDataSignature2015",
    "created": "",
    "creator": "https://example.com/did_of_ecd_practitioner/keys/1",
    "domain": "json-ld.org",
    "nonce": "6165d7e8", // TODO: find out what this is about
    "signatureValue": ""
  },
}

export class AttendanceController {
  static v1AttendanceEnpoint = API_V1_BASE + '/attendance'

  static history = (req, res) => {
    const uri = AttendanceController.v1AttendanceEnpoint + '/' + req.params.id + '/history/' + req.params.year + '/' + req.params.month,
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

  static create = (req, res) => {
    const uri = AttendanceController.v1AttendanceEnpoint + '/bulk',
          options = REQUEST_OPTIONS(req, uri, 'POST', req.body)

    request(options, (error, response, body) => {
      if (!error) {
        if (response.statusCode < 300) {
          res.status(201).json({
            success: true,
            message: '',
            data: {
              attendeeSample,
              attendenceObject,
              verifiableClaim,
            },
          })
        } else {
          res.status(response.statusCode).json(body)
        }
      } else {
        res.status(500).json({ error: 'An error occurred' })
        console.log(error)
      }
    })
  }

  static createVerifiableClaim = async (req, res) => {
    const centreId = req.body.centreId,
          bulkClaim = req.body.bulkClaim,
          singleClaims = req.body.singleClaims

    try {
      const hash = keccak_256.create().update(JSON.stringify(bulkClaim.claim)).hex(),
            CentreModel = StorageProvider.getCentreModel(),
            VCEmbed = StorageProvider.getNewVCSchema(hash, bulkClaim)
      
      const query = { id: centreId },
            update = { id: centreId, $push: { verifiableClaims: VCEmbed } },
            options = { upsert: true, new: true, setDefaultsOnInsert: false }

      const result = await CentreModel.findOneAndUpdate(query, update, options)
      
      // create job for did registration
      const vcJobReqOptions = {
        method: 'POST',
        uri: 'http://localhost:3000/job',
        json: true,
        body: {
          type: 'DELIVERY_SERVICE_RECORD_LIST',
          data: {
            title: 'Verifiable Claims record list',
            centreId,
            singleClaims,
          },
          options: {
            attempts: 5,
            ttl: 1000 * 60,
            priority: 'normal',
          }
        }
      }

      request(vcJobReqOptions, (vcJobError, vcJobResponse, vcJobBody) => {
        if (vcJobError) {
          // if we weren't able to create the job, return an error
          res.status(500).json({ error: 'An error occurred' })
          console.log(vcJobError)
          return
        }

        res.status(201).json({ success: true, message: '', data: {} })
      })
            
    } catch (e) {
      res.status(500).json({ success: false, message: 'An error occurred', data: {} })
      console.log(e)
    }
  }
}