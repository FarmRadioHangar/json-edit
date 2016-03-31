import React from 'react'

import { connect } 
  from 'react-redux'
import { patch }
  from './actions'

class JsonValue extends React.Component {
  render() {
    const { value, schema, path, dispatch } = this.props
    if ('object' === typeof value) {
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
		    schema   = {schema[i]}
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
		    schema   = {schema[key]}
		  />
                </dd>
	      </dl>
	    ))}
	  </div>
	)
      }
    } else {
      switch (schema) {
	case 'string':
	case 'number':
	  return (
	    <div>
	      <input 
	        type         = 'text' 
	        value        = {value}
	        onChange     = {e => {
	          dispatch({
	            type  : 'PATCH', 
	            value : e.target.value, 
	            path,
	          })
	        }}
	      />
	    </div>
	  )
	case 'boolean':
	  return (
	    <select value={value} onChange={e => { dispatch(patch(path, e.target.value)) }}> <option value='true'>true</option>
	      <option value='false'>false</option>
	    </select>
	  )
        default:
	  return (
	    <div>{schema}</div>
	  )
      }
    }
  }
}

class JsonComponent extends React.Component {
  render() {
    const { object, schema, dispatch } = this.props
    return (
      <div>
        <div>
	  <pre>
	    {JSON.stringify(object, null, 2)}
	  </pre>
	  <pre>
	    {JSON.stringify(schema, null, 2)}
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
		schema   = {schema[key]}
	      />
            </dd>
	  </dl>
	))}
      </div>
    )
  }
}

export default connect(state => state)(JsonComponent)
