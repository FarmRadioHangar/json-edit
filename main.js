import React      from 'react'
import ReactDOM   from 'react-dom'
import reducers   from './reducers'
import JsonObject from './jsoncomponent'

import { createStore } 
  from 'redux'
import { Provider } 
  from 'react-redux'
import { init }
  from './actions'

const store = createStore(reducers)

store.dispatch(init({
  tigo1: {
    imei: 'texttexttext',
  },
  vodacom1: {
    imei: '1301312355555555278319237',
    afsdf: [{b: 'hello'}, false, false, NaN],
  },
  abc: {
    def: {
      ghi: {},
      x: 123123123,
    },
  },
}))

ReactDOM.render(
  <Provider store={store}>
    <JsonObject />
  </Provider>,
  document.getElementById('main')
)
