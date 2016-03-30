import React from 'react'

import { connect } 
  from 'react-redux'

function lookupProperty(path, object) {
  if (!path || !object)
    return null
  const head = path[0]
  return 1 === path.length 
	 ? object[head] 
	 : lookupProperty(path.slice(1), object[head])
}

class JsonObject extends React.Component {
  static defaultProps = {
    path: [],
  }
  renderValue(key, value) {
    const { jsonData, path, dispatch } = this.props
    switch (typeof value) {
      case 'number':
      case 'string':
	return (
	  <input 
            onChange={e => {
	      dispatch({
	        type  : 'PATCH',
	        path  : [...path, key], 
                value : e.target.value,
	      })
	    }} 
            type         = 'text' 
            defaultValue = {value} 
            value        = {lookupProperty([...path, key], jsonData)}
          /> 
	)
      case 'boolean':
	return (
	  <select defaultValue={value}> 
	    <option value='true'>true</option>
	    <option value='false'>false</option>
	  </select> 
	)
      case 'object':
	if (Array.isArray(value)) {
	  return (
	    <table>
  	      {value.map((el, i) => (
	        <tr key={i}>
                  <td>{i}</td>
	          <td>{this.renderValue(key, el)}</td>
	        </tr>
	      ))}
	    </table>
	  )
	} else {
          return (
	    <Component
	      object = {value} 
	      path   = {[...path, key]}
	    />
	  )
	}
      default:
    }
  }
  render() {
    const { jsonData, object, path } = this.props
    return (
      <div>
	{Object.keys(object).map(key => (
          <dl key={key}>
            <dt>
              {key}
    	    </dt>
            <dd>
              {this.renderValue(key, object[key])}
            </dd>
	  </dl>
	))}
      </div>
    )
  }
}

const Component = connect(state => ({jsonData: state.object}))(JsonObject)

export default Component
