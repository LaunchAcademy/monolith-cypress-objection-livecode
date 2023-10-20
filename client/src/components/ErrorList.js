import React from "react"
import _ from 'lodash'


const ErrorList = props => {

  console.log(props.errors)

  const errantFields = Object.keys(props.errors)
  if (errantFields.length > 0) {
    let index = 0
    const listItems = errantFields.map(field => {
      index++

      if (props.errors[field].includes("already in use.")) {
        return (
          <li key={index}>
            {_.capitalize(props.errors[field])}
          </li>
        )
      } else {
        return (
          <li key={index}>
            {field}: {props.errors[field]}
          </li>
        )
      }

    })
    return (
      <div className="errors callout alert">
        <ul>{listItems}</ul>
      </div>
    )
  } else {
    return ""
  }
}

export default ErrorList