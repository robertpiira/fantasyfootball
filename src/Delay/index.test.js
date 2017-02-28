import tape from 'tape'
import sinon from 'sinon'

import delay from './index'

tape('delay', (t) => {

  const fn = sinon.spy()

  t.plan(2)

  delay(100).then(fn)

  setTimeout( () => t.equal(fn.called, false, 'should not have been called'), 90)
  setTimeout( () => t.equal(fn.called, true, 'should have been called'), 110)

})
