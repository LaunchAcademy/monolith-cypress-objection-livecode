// /// <reference types="cypress" />

context("New Stuffed Animal Form Page", () => {
  beforeEach(() => {    
    cy.visit("/stuffed-animals/new")
  })

  it("creates a new list item when the form is submitted correctly", () => {
    cy.get("#name")
      .type("Poro")
      .should("have.value", "Poro")

    cy.get("#owner")
      .type("Everyone at Launch Academy")
      .should("have.value", "Everyone at Launch Academy")

    cy.get("form")
      .contains("Yay!")
      .click()

    cy.url().should("eq", "http://localhost:8765/stuffed-animals")
    cy.url().should('include', '/stuffed-animals') 

    cy.get("li")
      .last()
      .should("have.text", "Poro owned by Everyone at Launch Academy")
  })

  it("remains on the new item form page if the form is submitted without a name and displays errors", () => {
    cy.get("form").submit()

    cy.get("h2").should("have.text", "Add Your New Frand")
    cy.contains("h2", "Can you spot all of the stuffed animals in the space?").should("not.exist")
    
    cy.get(".errors").should("have.text", "Name: is a required property")
  })
})
