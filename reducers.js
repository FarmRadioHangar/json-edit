import { combineReducers } from 'redux'
import _ from 'lodash'

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

function buildSchema(value) {
  if ('object' !== typeof value) {
    return (typeof value)
  } else {
    return Array.isArray(value) 
	? value.map(el => buildSchema(el))
	: _.mapValues(value, buildSchema)
  }
}

function object(state = {}, action) {
  switch (action.type) {
    case 'INIT':
      return action.data
    case 'PATCH':
      return patchedObject(state, action.path, action.value)
    default:
      return state
  }
}

function schema(state = {}, action) {
  switch (action.type) {
    case 'INIT':
      return buildSchema(action.data)
    default:
      return state
  }
}

export default combineReducers({
  object,
  schema,
})
