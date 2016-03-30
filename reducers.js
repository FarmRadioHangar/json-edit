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

const initialSchema = {
  tigo1: {
    imei: 'string',
  },
  vodacom1: {
    imei: 'string',
    afsdf: [{b: 'string'}, 'boolean', 'boolean', 'number'],
  },
  abc: {
    def: {
      ghi: {},
      x: 'number',
    },
  },
}

//function cast(value, type) {
//  if (!type)
//    return value
//  switch (type) {
//    case 'boolean': {
//      if ('string' === typeof value) {
//	return ('true' === value)
//      } else {
//	return !!value
//      }
//    }
//    default:
//      return value
//  }
//}

function patchedObject(data, path, value, match = true) {
  const it = (key, val) => {
    const match_ = match && key == path[0]
    return (1 === path.length && match_) 
  	? value
  	: patchedObject(val, path.slice(1), value, match_)
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
      return patchedObject(state, action.path, action.value)
    default:
      return state
  }
}

function schema(state = initialSchema, action) {
  switch (action.type) {
    default:
      return state
  }
}

export default combineReducers({
  object,
  schema,
})
