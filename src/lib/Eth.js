'use-strict'

import web3 from 'web3'

// Wrapper around Ethereum Web3 API
export default class Eth {
  constructor(host, timeout) {
    this.provider = new web3(web3.providers.HttpProvider(host, timeout))
  }

  
}