import React      from 'react'
import ReactDOM   from 'react-dom'
import reducers   from './reducers'
import JsonTree   from './jsontree'

import { createStore } 
  from 'redux'
import { Provider } 
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
  "batters": {
    "batter": [
      { "id": "1001", "type": "Regular" },
      { "id": "1002", "type": "Chocolate" },
      { "id": "1003", "type": "Blueberry" },
      { "id": "1004", "type": "Devil's Food" }
    ]
  },
  "topping": [
    { "id": "5001", "type": "None" },
    { "id": "5002", "type": "Glazed" },
    { "id": "5005", "type": "Sugar" },
    { "id": "5007", "type": "Powdered Sugar" },
    { "id": "5006", "type": "Chocolate with Sprinkles" },
    { "id": "5003", "type": "Chocolate" },
    { "id": "5004", "type": "Maple" }
  ]
}))

class App extends React.Component {
  render() {
    return (
      <div>
        <JsonTree />
        <button>
          Save
        </button>
      </div>
    )
  }
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('main')
)
