import tape from 'tape'
import sinon from 'sinon'

import Observer from './index'

const fakeWindow = {}

tape('Observer', (t) => {
  const myObserver = new Observer()
  const myFunc1 = sinon.spy()
  const myFunc2 = sinon.spy()
  const myFunc3 = sinon.spy()
  const myFunc4 = sinon.spy()

  myObserver.subscribe('doSomething', myFunc1)
  myObserver.subscribe('doSomething', myFunc2)
  myObserver.subscribe('doNothing', myFunc3)
  myObserver.subscribe('doNothing', myFunc4)
  myObserver.unsubscribe(myFunc1)
  myObserver.unsubscribe(myFunc4)
  myObserver.publish('doSomething', 'testar', {})
  myObserver.subscribe('doSomething', myFunc1)
  myObserver.publish('doSomething', 'testar igen', {})

  const handlers = myObserver._getHandlers()

  t.equal(myFunc1.calledWith('testar'), false, 'should have unsubscribe func1')
  t.equal(myFunc1.calledWith('testar igen'), true, 'should have re-subscribed func1')
  t.equal(myFunc1.callCount, 1, 'should have one call total on func1')

  t.equal(myFunc2.calledWith('testar'), true, 'should have called func2')
  t.equal(myFunc2.calledWith('testar igen'), true, 'should have called func2 a second time')
  t.equal(myFunc2.callCount, 2, 'should have two calls total on func2')

  t.equal(myFunc3.called, false, 'should not call myFunc3 at all')

  t.equal(handlers.doNothing.length, 1, 'should have one "doNothing" handlers')
  t.equal(handlers.doSomething.length, 2, 'should have two "doSomething" handlers')

  t.end()
})


tape('Observer as singleton', (t) => {

  const myObserver = new Observer()
  fakeWindow.myObserver = myObserver

  const test1 = myObserver
  const test2 = fakeWindow.myObserver
  const test3 = fakeWindow.myObserver

  test1.subscribe('hiFromFakeWindow', (data) => {
    t.equals(data, 'testing')
  })

  test2.subscribe('hiFromFakeWindow', (data) => {
    t.equals(data, 'testing')
  })

  test2.subscribe('hiAgain', (data) => {
    t.equals(data, 'well hello again')
  })

  test3.publish('hiAgain', 'well hello again', {})

  test1.publish('hiFromFakeWindow', 'testing', {})
  test2.publish('hiFromFakeWindow', 'testing', {})

  t.end()

})
