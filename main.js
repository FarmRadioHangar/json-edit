import React      from 'react'
import ReactDOM   from 'react-dom'
import reducers   from './reducers'
import JsonObject from './jsoncomponent'

import { createStore } 
  from 'redux'
import { Provider } 
  from 'react-redux'

const store = createStore(reducers)

ReactDOM.render(
  <Provider store={store}>
    <JsonObject />
  </Provider>,
  document.getElementById('main')
)
