import tape from 'tape'
import sinon from 'sinon'

import registerWidgetAdapter from './index'

const fakeWindow = {}

tape('DashboardCommunicator', (t) => {

  t.test('Registered Adapter/Widget', (t) => {

    const mockAdapter = {
      getRoutePrefix: widgetName => `test/${widgetName}`
    }

    fakeWindow.globalNS = registerWidgetAdapter(mockAdapter)

    const DashboardCommunicator = fakeWindow.globalNS.registerWidget('myTestWidget')

    t.equals(DashboardCommunicator.getRoutePrefix(), 'test/mytestwidget', 'should return correct route prefix')

    t.end()
  })

  t.test('With callbacks', (t) => {

    const callback = sinon.spy()

    const mockAdapter = {
      getRoutePrefix: widgetName => callback(widgetName),
      goToGridView: () => callback(),
      goToSingleView: () => callback()
    }

    fakeWindow.globalNS2 = registerWidgetAdapter(mockAdapter)

    const DashboardCommunicator = fakeWindow.globalNS2.registerWidget('myTestWidget')

    DashboardCommunicator.getRoutePrefix()
    DashboardCommunicator.goToGridView()
    DashboardCommunicator.goToSingleView()

    t.equals(callback.callCount, 3, 'should be able to run the adapted callbacks')
    t.equals(callback.args[0][0], 'mytestwidget', 'getRoutePrefix should return correct url')

    t.end()
  })

  t.end()
})
