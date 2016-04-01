import React      from 'react'
import ReactDOM   from 'react-dom'
import reducers   from './reducers'
import JsonTree   from './jsontree'

import { createStore } 
  from 'redux'
import { Provider, connect } 
  from 'react-redux'
import { init }
  from './actions'

const store = createStore(reducers)

// Example data borrowed from https://adobe.github.io/Spry/samples/data_region/JSONDataSetSample.html#Example3
store.dispatch(init({
  "id": "0001",
  "void": null,
  "type": "donut",
  "name": "Cake",
  "ppu": 0.55,
  "active": false,
  "batters": {
    "batter": [
      { "id": "1001", "type": "Regular" },
      { "id": "1002", "type": "Chocolate" },
      { "id": "1003", "type": "Blueberry" },
      { "id": "1004", "type": "Devil's Food" }
    ]
  },
  "topping": [
    { "id": "5001", "type": "None", "active": true },
    { "id": "5002", "type": "Glazed", "active": true },
    { "id": "5005", "type": "Sugar", "active": true },
    { "id": "5007", "type": "Powdered Sugar", "active": true },
    { "id": "5006", "type": "Chocolate with Sprinkles", "active": true },
    { "id": "5003", "type": "Chocolate", "active": true },
    { "id": "5004", "type": "Maple", "active": true }
  ]
}))

class App extends React.Component {
  render() {
    const { object } = this.props
    return (
      <div style={{display: 'flex', flexDirection: 'row'}}>
        <div style={{flex: 1}}>
          <JsonTree ref='tree' />
        </div>
        <div style={{flex: 1, border: '1px solid #999', backgroundColor: '#fafafa', padding: '8px'}}>
          <pre style={{margin: 0}}>{JSON.stringify(object, null, 2)}</pre>
        </div>
      </div>
    )
  }
}

const AppComponent = connect(state => state)(App)

ReactDOM.render(
  <Provider store={store}>
    <AppComponent />
  </Provider>,
  document.getElementById('main')
)
