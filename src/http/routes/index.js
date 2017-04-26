'use-strict'

/* base libs */
/*  libs/modules */
import eis from './eis' // test only
import child from './child'
import staff from './staff'
import classes from './class'
import centre from './centre'
import attendance from './attendance'
/*  utils/constants */

// wrapper function (the exported one)
const fill = (router, version) => {
  switch (version) {
    case 'v2':
      return v2(router)
    case 'v3':
      return v3(router)
  default:
    throw new Error('[FATAL](ROUTER): unrecognized API version')
  }
}

const v2 = (router) => {
  // test only
  router.use('/eis', eis)

  router.use('/child', child)
  router.use('/staff', staff)
  router.use('/class', classes)
  router.use('/centre', centre)
  router.use('/attendance', attendance)

  return router
}

const v3 = (router) => {
  return router
}

export default fill