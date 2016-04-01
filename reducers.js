import { combineReducers } from 'redux'
import _ from 'lodash'

function typed(value, type) {
  if ('boolean' === type) {
    // translate 'false' to false and 'true' to true
    return JSON.parse(value)
  } else if ('number' === type) {
    return Number(value)
  } else {
    return value
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
      const typedValue = typed(action.value, action.dataType)
      const patched = (data, path, match = true) => {
        const it = (key, val) => {
          const _match = match && key == path[0]
          return (1 === path.length && _match) 
            ? typedValue 
            : patched(val, path.slice(1), _match)
        }
        switch (typeof data) {
          case 'object':
            if (null === data) 
              return null
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
      return patched(state, action.path)
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
