import React from 'react'
import ReactDOM from 'react-dom'

class JsonObject extends React.Component {
  renderValue(value) {
    switch (typeof value) {
      case 'number':
      case 'string':
	return (
	  <input type='text' defaultValue={value} /> 
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
	    <div>
  	      {value.map(this.renderValue)}
	    </div>
	  )
	} else {
          return (
	    <JsonObject object={value} />
	  )
	}
      default:
    }
  }
  render() {
    const { object } = this.props
    return (
      <div>
	{Object.keys(object).map(key => (
          <dl>
            <dt>
              {key}
    	    </dt>
            <dd>
              {this.renderValue(object[key])}
            </dd>
	  </dl>
	))}
      </div>
    )
  }
}

const object = {
  tigo1: {
    imei: '1301312371823719278319237',
  },
  vodacom1: {
    imei: '1301312355555555278319237',
    afsdf: [{b: 'hello'}, false, false, NaN],
  },
  abc: {
    def: {
      ghi: {
      },
      x: 123123123,
    },
  },
}

ReactDOM.render(
  <JsonObject object={object} />,
  document.getElementById('main')
)
