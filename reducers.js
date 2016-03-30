import { combineReducers } from 'redux'

function buildPatch(path, value) {
  if (!path.length)
    return {}
  return {
    [ path[0] ] : 1 === path.length 
	? value 
	: buildPatch(path.slice(1), value)
  }
}

function object(state = {}, action) {
  switch (action.type) {
    case 'PATCH':
      return Object.assign({}, state, buildPatch(action.path, action.value))
    default:
      return state
  }
}

export default combineReducers({
  object,
})
