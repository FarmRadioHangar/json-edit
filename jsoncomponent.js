import React from 'react'

import { connect } 
  from 'react-redux'
import { patch }
  from './actions'

const styles = {
  layout: {
    row: {
      display       : 'flex', 
      flexDirection : 'row',
      alignItems    : 'center',
    },
  },
  text: {
    fontFamily      : 'monospace', 
    fontSize        : '12px', 
    lineHeight      : '20px',
  },
  arrow : {
    color           : '#999', 
    marginLeft      : '1px', 
    cursor          : 'pointer',
  },
}

function isEmpty(value) {
  if ('object' !== typeof value || !value)
    return false
  return (Array.isArray(value) && !value.length) || !Object.keys(value).length
}

class Item extends React.Component {
  static defaultProps = {
    indentation : 13,
    delimiter   : '',
  }
  constructor(props) {
    super(props)
    this.state = {
      expanded : 1 === props.path.length,
      edit     : false,
      errors   : '',
    }
  }
  toggleExpanded() {
    const { expanded } = this.state
    this.setState({
      expanded : !expanded,
    })
  }
  toggleEdit() {
    const { edit } = this.state
    this.setState({
      edit : !edit,
    })
  }
  validate(e) {
    const value = e.target.value
    if ('number' === this.props.schema) {
      let errors = ''
      if (isNaN(value)) {
	errors = 'Not a valid number.'
      }
      this.setState({errors})
    }
  }
  render() {
    const { 
      delimiter, 
      dispatch,
      indentation, 
      label, 
      path, 
      schema, 
      value, 
    } = this.props
    const { 
      edit,
      errors,
      expanded, 
    } = this.state
    const indent = `${indentation}px`
    const [ lb, rb ] = Array.isArray(value) ? ['[', ']'] : ['{', '}']
    const arrow = ( 
      <span style={styles.arrow} onClick={::this.toggleExpanded}>{expanded ? (
	<span>&#9660;</span>
      ) : (
        <span>&#9654;</span>
      )}</span>
    )
    const empty = isEmpty(value)
    return (
      <div style={1 === path.length ? {} : {marginLeft: indent}}>
        {'object' === typeof value ? (
          <div>
	    {/* Nested component */}
            <div style={styles.layout.row}>
	      <div style={{width: indent}}>{!empty && value && arrow}</div>
	      {value ? (
	        <div>{label && `${label}: `}{expanded ? lb : empty ? lb+rb+delimiter : `${lb}...${rb}${delimiter}`}</div>
	      ) : (
	        <div>{label && `${label}: `}null{delimiter}</div>
	      )}
	    </div>
	    {expanded && value && (
              <div>
	        <JsonValue {...this.props} />
		<div style={{marginLeft: indent}}>{rb}{delimiter}</div>
	      </div>
	    )}
          </div>
        ) : (
          <div style={{...styles.layout.row, height: edit ? '60px' : '21px'}}>
	    {/* Field-type component */}
	    <div style={{width: indent}} />
	    {edit ? (
	      <div>
                <div style={styles.layout.row}>
	          {label && <div>{label}:&nbsp;</div>}
	          <div>
                    <input 
                      ref          = 'input'
                      type         = 'text' 
                      style        = {{...styles.text, border: '1px solid #ddd', padding: '0 3px'}}
                      defaultValue = {value}
		      onChange     = {::this.validate}
                    /> 
                  </div>
	          <div>
		    {errors}
                  </div>
                </div>
                <div style={{...styles.layout.row, marginTop: '5px'}}>
                  <button onClick={() => {
	            dispatch(patch(path, this.refs.input.value)); this.toggleEdit()}
	          }>Save</button>
                  <button style={{marginLeft: '5px'}} onClick={() => this.toggleEdit()}>Cancel</button>
                </div>
	      </div>
	    ) : (
              <div>{label && <span>{label}:&nbsp;</span>}
	        <a href='#' onClick={() => 'boolean' === schema ? dispatch(patch(path, !JSON.parse(value))) : this.toggleEdit()}>
		  {''+value}
		</a>{delimiter}
              </div>
	    )}
          </div>
        )}
      </div>
    )
  }
}

class JsonValue extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    const { value, schema, path, dispatch } = this.props
    if ('object' === typeof value) {
      if (Array.isArray(value)) {
	return (
	  <div>
	    {value.map((el, i) => (
	      <Item 
	        key       = {i} 
	        dispatch  = {dispatch} 
	        path      = {[...path, i]} 
	        value     = {value[i]} 
	        schema    = {schema[i]} 
		delimiter = {i === value.length-1 ? '' : ','}
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
      return <span />
    }
  }
}

class JsonComponent extends React.Component {
  render() {
    const { object, schema, dispatch } = this.props
    return (
      <div style={styles.text}>
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
