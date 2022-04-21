import React, { useState } from "react"
import { Redirect } from "react-router-dom"

import ErrorList from "./ErrorList"
import translateServerErrors from "../services/translateServerErrors"

const StuffedAnimalForm = props => {
  const [newStuffedAnimal, setNewStuffedAnimal] = useState({
    name: "",
    owner: ""
  })

  const [errors, setErrors] = useState([])
  const [shouldRedirect, setShouldRedirect] = useState(false)

  const addStuffedAnimal = async () => {
    try { 
      const response = await fetch("/api/v1/stuffed-animals", {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json"
        }),
        body: JSON.stringify(newStuffedAnimal)
      })
      const body = await response.json()
      if (!response.ok) {
        if(response.status === 422) {
          const newErrors = translateServerErrors(body.errors)
          return setErrors(newErrors)
        } else {
          const errorMessage = `${response.status} (${response.statusText})`
          const error = new Error(errorMessage)
          throw(error)
        }
      } else {
        setShouldRedirect(true)
      }
    } catch(error){
      console.error(error.message)
    }
  }

  const handleInputChange = event => {
    setNewStuffedAnimal({
      ...newStuffedAnimal,
      [event.currentTarget.name]: event.currentTarget.value
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    addStuffedAnimal()
  }

  if (shouldRedirect) {
    return <Redirect to="/stuffed-animals" />
  }

  return (
    <>
      <h2>Add Your New Frand</h2>
      <ErrorList errors={errors} />
      <form onSubmit={handleSubmit} className="callout" >
        <label>
         Name:
          <input
            type="text"
            name="name"
            id="name"
            onChange={handleInputChange}
            value={newStuffedAnimal.name}
          />
        </label>

        <label>
          Owner:
          <input
            type="text"
            id="owner"
            name="owner"
            onChange={handleInputChange}
            value={newStuffedAnimal.owner}
          />
        </label>

        <div className="button-group">
          <input className="button" type="submit" value="Yay!" />
        </div>
      </form>
    </>
  )
}

export default StuffedAnimalForm