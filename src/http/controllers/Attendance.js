'use-strict'

/* base libs */
import request from 'request'
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
const claimObject = {
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
              claimObject,
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

  static createVerifiableClaim = (req, res) => {
    console.log(req.body)
    res.status(200).json({ success: true, message: '', data: {} })    
  }
}