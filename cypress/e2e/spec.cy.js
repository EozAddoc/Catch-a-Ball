describe('login and homepage', () => {
  it('passes', () => {
    cy.visit('http://localhost:3000/')

    cy.get('[alt="right button"]').click()
    
    cy.get('#exampleFormControlInput1').type("usertest")
    cy.get('#exampleFormControlInput2').type("test@test.com")
    cy.get('#exampleFormControlInput3').type("bad_password")
    cy.get('.bg-primary').click()
    cy.get('.text-red-500')

    cy.get('#exampleFormControlInput3').clear().type("azertyuiop1!")
    cy.get('.bg-primary').click()

    cy.wait(5000)
    cy.get('.grid > :nth-child(1)').click()
    cy.get('.grid > :nth-child(2)').click()
    cy.get('.grid > :nth-child(3)').click()

    cy.wait(5000)
    cy.get('.grid > :nth-child(1)').click()

    cy.wait(5000)
    cy.get('[data-cy="deck"]').find('img').should('have.length', 3)

    cy.get('.text-center > :nth-child(2) > .items-center').click()
    cy.get(':nth-child(2) > .no-underline').click()

    cy.get('.personnel-img')
    cy.wait(3000)

    cy.visit('http://localhost:3000/deck')
    cy.wait(3000)
    cy.get('[data-cy=deck]').find('img').should('have.length', 6)

    cy.visit('http://localhost:3000/arena')
    cy.get(':nth-child(1) > .bg-yellow-300 > .mt-3').click()
    cy.get('.bg-routeN > :nth-child(1) > :nth-child(1) > :nth-child(1) > .bottom-10').click()

    cy.wait(5000)
    cy.get('#default-search').type("a")
    cy.get('.text-white > .ml-6').click()
    cy.get(':nth-child(1) > .bg-yellow-300 > .m-2 > button > .m-3').click()
    cy.get('h2').click()
    cy.get('.bg-routeN > :nth-child(1) > :nth-child(1) > :nth-child(1) > .bottom-10').click()
  })
})

describe('other pages not accessible if not logged in', () => {
  it('passes', () => {
    cy.visit('http://localhost:3000/home')
    cy.url().should('eq', 'http://localhost:3000/')

    cy.visit('http://localhost:3000/search')
    cy.url().should('eq', 'http://localhost:3000/')

    cy.visit('http://localhost:3000/profile')
    cy.url().should('eq', 'http://localhost:3000/')

    cy.visit('http://localhost:3000/shop')
    cy.url().should('eq', 'http://localhost:3000/')

    cy.visit('http://localhost:3000/arena')
    cy.url().should('eq', 'http://localhost:3000/')

    cy.visit('http://localhost:3000/deck')
    cy.url().should('eq', 'http://localhost:3000/')

    cy.visit('http://localhost:3000/signup/pokemon')
    cy.url().should('eq', 'http://localhost:3000/')

    cy.visit('http://localhost:3000/signup/avatar')
    cy.url().should('eq', 'http://localhost:3000/')
  })
})