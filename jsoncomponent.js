import React from 'react'

import { connect } 
  from 'react-redux'
import { patch }
  from './actions'

const styles = {
  item: { 
    object: {
      padding        : '10px',
      border         : '1px solid #ddd',
      marginLeft     : '30px',
    },
    field: {
      display        : 'flex', 
      flexDirection  : 'row', 
    },
  },
}

class Item extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      expanded : 1 === props.path.length,
    }
  }
  toggleExpanded() {
    const { expanded } = this.state
    this.setState({
      expanded : !expanded,
    })
  }
  renderComponent() {
    const { value, schema, dispatch, path } = this.props
    return (
      <JsonValue 
        dispatch = {dispatch} 
        path     = {path} 
        value    = {value} 
        schema   = {schema}
      />
    )
  }
  render() {
    const { label, value, path } = this.props
    const { expanded } = this.state
    const arrow = ( 
      <a href='#' style={{textDecoration: 'none'}} onClick={::this.toggleExpanded}>{expanded ? (
	<span>&#9660;</span>
      ) : (
        <span>&#9654;</span>
      )}</a>
    )
    return (
      <div style={{marginBottom: '5px'}}>
        {'object' === typeof value ? (
          <div>
	    {/* Nested component */}
            <div style={{display: 'flex', flexDirection: 'row'}}>
	      <div>{label}</div>
	      <div style={{marginLeft: '10px'}}>{arrow}</div>
	    </div>
	    {expanded && <div style={styles.item.object}>{::this.renderComponent()}</div>}
          </div>
        ) : (
          <div style={styles.item.field}>
	    {/* Field-type component */}
            <div style={{minWidth: '60px'}}>{label}</div>
            <div>{::this.renderComponent()}</div>
          </div>
        )}
      </div>
    )
  }
}

class JsonValue extends React.Component {
  render() {
    const { value, schema, path, dispatch } = this.props
    if ('object' === typeof value) {
      if (Array.isArray(value)) {
	return (
	  <div>
	    {value.map((el, i) => (
	      <Item 
	        key      = {i} 
		label    = {i}
		dispatch = {dispatch} 
		path     = {[...path, i]} 
		value    = {value[i]} 
		schema   = {schema[i]} 
	      />
	    ))}
	  </div>
	)
      } else {
        return (
	  <div>
    	    {Object.keys(value).map(key => (
	      <Item 
	        key      = {key} 
		label    = {key}
		dispatch = {dispatch} 
		path     = {[...path, key]} 
		value    = {value[key]} 
		schema   = {schema[key]} 
	      />
	    ))}
	  </div>
	)
      }
    } else {
      switch (schema) {
	case 'string':
	case 'number':
	  return (
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
	  )
	case 'boolean':
	  return (
	    <select value={value} onChange={e => { dispatch(patch(path, e.target.value)) }}> 
	      <option value='true'>true</option>
	      <option value='false'>false</option>
	    </select>
	  )
        default:
	  return <span />
      }
    }
  }
}

class JsonComponent extends React.Component {
  render() {
    const { object, schema, dispatch } = this.props
    return (
      <div>
	{Object.keys(object).map(key => (
	  <Item 
	    key      = {key} 
	    label    = {key}
	    dispatch = {dispatch} 
	    path     = {[key]} 
	    value    = {object[key]} 
	    schema   = {schema[key]}
	  />
	))}
      </div>
    )
  }
}

export default connect(state => state)(JsonComponent)
