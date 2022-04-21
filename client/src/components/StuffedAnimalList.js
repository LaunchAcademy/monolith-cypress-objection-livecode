import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"

const StuffedAnimalList = props => {
  const [stuffedAnimals, setStuffedAnimals] = useState([])
  
  const getStuffedAnimals = async () => {
    try {
      const response = await fetch("/api/v1/stuffed-animals")
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`
        const error = new Error(errorMessage)
        throw(error)
      }
      const stuffedAnimalsData = await response.json()
      setStuffedAnimals(stuffedAnimalsData.stuffedAnimals)
    } catch(err) {
      console.error(`Error in fetch: ${err.message}`)
    }
  }

  useEffect(() => {
    getStuffedAnimals()
  }, [])

  const stuffedAnimalsListItems = stuffedAnimals.map(stuffedAnimal => {
    
    return(
      <li key={stuffedAnimal.id}>
        {stuffedAnimal.name} owned by {stuffedAnimal.owner}
      </li>
    )
  })

  return(
    <>
      <h2>Can you spot all of the stuffed animals in the space?</h2>
      <ul className="stuffed-animals">
        {stuffedAnimalsListItems}
      </ul>
      <Link to="/stuffed-animals/new">Add More to the Collection!</Link>
    </>
  )
}

export default StuffedAnimalList