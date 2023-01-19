// /// <reference types="cypress" />

context("New Stuffed Animal Form Page", () => {
  beforeEach(() => {    
    // needed because we have uniqueness validation!
    cy.task("db:truncate", "StuffedAnimal")
    
    cy.visit("/stuffed-animals/new")
  })

  it.only("creates a new list item when the form is submitted correctly", () => {
    cy.get("#name")
      .type("Poro")
      .should("have.value", "Poro")

    cy.get("#owner")
      .type("LA")
      .should("have.value", "LA")

    cy.get(".new-stuffed-animal-form")
      .submit()

    // Valid ways to check that we are on the right page
    // cy.url().should("eq", "http://localhost:8765/stuffed-animals")
    // cy.url().should('include', '/stuffed-animals') 
    cy.location('pathname').should('eq', '/stuffed-animals')
    // cy.get("h2").should("have.text", "Can you spot all of the stuffed animals in the space?")


    cy.get("li")
      .last()
      .should("have.text", "Poro owned by LA")
  })

  it("remains on the new item form page if the form is submitted without a name and displays errors", () => {
    // get the form and submit it                 
    cy.get(".new-stuffed-animal-form")
      .submit()

    // get the h2 tag, and ensure it has the text Add Your New Frand
    cy.get("h2").should("have.text", "Add Your New Frand")
    
    // get the errors element, and ensure it has the text Name: is a required property
    cy.get(".errors").should("have.text", "Name: is a required property")
  })
})

