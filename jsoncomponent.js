import React from 'react'

import { connect } 
  from 'react-redux'

class JsonValue extends React.Component {
  render() {
    const { value, path, dispatch } = this.props
    switch (typeof value) {
      case 'number':
      case 'string':
	return (
	  <div>
	    <input 
	      type         = 'text' 
	      defaultValue = {value}
	      value        = {value}
	      onChange     = {e => {
	        dispatch({
		  type      : 'PATCH', 
		  value     : e.target.value, 
		  valueType : typeof value,
		  path,
		})
	      }}
	    />
	  </div>
        )
      case 'boolean':
	return (
	  <select defaultValue={value} onChange={e => {
	      dispatch({
                type      : 'PATCH', 
                value     : e.target.value, 
		valueType : 'boolean',
                path,
	      })
	    }}>
	    <option value={true}>true</option>
	    <option value={false}>false</option>
	  </select>
        )
      case 'object':
	if (Array.isArray(value)) {
	  return (
	    <table>
	      {value.map((el, i) => (
  	        <tr key={i}>
  	          <td>{i}</td>
  	          <td>
	            <JsonValue 
		      dispatch = {dispatch} 
		      path     = {[...path, i]} 
		      value    = {value[i]} 
		    />
		  </td>
  	        </tr>
	      ))}
	    </table>
	  )
	} else {
	  return (
	    <div>
    	      {Object.keys(value).map(key => (
                <dl key={key}>
                  <dt>
                    {key} 
    	          </dt>
                  <dd>
	            <JsonValue 
		      dispatch = {dispatch} 
		      path     = {[...path, key]} 
		      value    = {value[key]} 
		    />
                  </dd>
	        </dl>
	      ))}
	    </div>
	  )
	}
      default:
	return <span />
    }
  }
}

class JsonComponent extends React.Component {
  render() {
    const { object, dispatch } = this.props
    return (
      <div>
        <div>
	  <pre>
	    {JSON.stringify(object, null, 2)}
	  </pre>
        </div>
	{Object.keys(object).map(key => (
          <dl key={key}>
            <dt>
              {key}
    	    </dt>
            <dd>
	      <JsonValue 
	        dispatch = {dispatch} 
		path     = {[key]} 
		value    = {object[key]} 
	      />
            </dd>
	  </dl>
	))}
      </div>
    )
  }
}

export default connect(state => state)(JsonComponent)
