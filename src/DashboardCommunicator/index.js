
class DashboardInterface {
  getRoutePrefix() {
    return this.adapter.getRoutePrefix(this.widgetName.toLowerCase())
  }

  goToGridView() {
    this.adapter.goToGridView()
  }

  goToSingleView() {
    this.adapter.goToSingleView()
  }
}

class DashboardCommunicator extends DashboardInterface {
  constructor(name, adapter) {
    super()
    this.widgetName = name
    this.adapter = adapter
  }
}

const registerWidgetAdapater = (adapter) => {
  return {
    registerWidget: (name) => {
      return new DashboardCommunicator(name, adapter)
    }
  }
}

export default registerWidgetAdapater
