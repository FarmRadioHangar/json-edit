import { combineReducers } from 'redux'
import _ from 'lodash'

const initialObject = {
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

function cast(value, type) {
  if (!type)
    return value
  switch (type) {
    case 'boolean': {
      if ('string' === typeof value) {
	return ('true' === value)
      } else {
	return !!value
      }
    }
    default:
      return value
  }
}

function patchedObject(data, path, value, valueType, match = true) {
  const it = (key, val) => {
    const match_ = match && key == path[0]
    return (1 === path.length && match_) 
  	? cast(value, valueType)
  	: patchedObject(val, path.slice(1), value, valueType, match_)
  }
  switch (typeof data) {
    case 'object':
      return Array.isArray(data) 
	      ? data.map((item, i) => it(i, item))
	      : _.mapValues(data, (val, key) => it(key, val))
    case 'number':
    case 'string':
    case 'boolean':
    default:
      return data
  }
}

function object(state = initialObject, action) {
  switch (action.type) {
    case 'PATCH':
      return patchedObject(state, action.path, action.value, action.valueType)
    default:
      return state
  }
}

export default combineReducers({
  object,
})
