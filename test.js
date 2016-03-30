var _ = require('lodash')

function patchObject(data, path, value) {
  switch (typeof data) {
    case 'object':
      if (Array.isArray(data)) {
	if (1 !== path.length) 
	  return data.map(_.id)
	return data.map((item, i) => {
	  return i == path[0] ? value : item
	})
      } else {
        return _.mapValues(data, (val, key) => {
	  if (path[0] !== key) 
	    return Object.assign({}, val)
	  return 1 === path.length 
		? value 
		: patchObject(val, path.slice(1), value)
	})
      }
    case 'number':
    case 'string':
    case 'boolean':
    default:
      return data
  }
}

var obj = {
  hello: {
    x: {
      stuff: [1,2,3,4],
    },
  },
  someOtherKey: {
    y: 4123132,
  },
}

var r = patchObject(obj, ['hello', 'x', 'stuff', 1], 'newValue')

console.log(JSON.stringify(r));
