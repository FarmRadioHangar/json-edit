import React      from 'react'
import ReactDOM   from 'react-dom'
import reducers   from './reducers'
import JsonObject from './jsonobject'

import { createStore } 
  from 'redux'
import { Provider } 
  from 'react-redux'

const store = createStore(reducers)

const object = {
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
}

ReactDOM.render(
  <Provider store={store}>
    <JsonObject object={object} />
  </Provider>,
  document.getElementById('main')
)
