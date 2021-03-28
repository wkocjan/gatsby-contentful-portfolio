describe('Test the landing page', () => {
  before(() => {
    cy.visit('/')
  })
  it('Navigate to landing page', () => {
    cy.get('[data-cy=author]').contains('Hello, I\'m Kranthi Lakum')
    cy.get('[data-cy=greet]').contains('Welcome to my website.')
    cy.get('[data-cy=Home]').contains('Home')
    cy.get('[data-cy=About]').contains('About')
    cy.get('[data-cy=Blog]').contains('Blog')
    cy.get('[data-cy=Travel-Log]').contains('Travel-Log')
  })

  it('Test blog post on Landing page', () => {
    cy.get('[data-cy=blog').then(() => {
      cy.get('[data-cy=docusaurus').contains('Writing project documentation with Docusaurus')
    })
  })

  it('Test Travel-Log post on Landing page', () => {
    cy.get('[data-cy=travel-log').then(() => {
      cy.get('[data-cy=rome-2019').contains('Rome 2019')
    })
  })

  it('Navigate to About page', () => {
    cy.get('[data-cy=About]').click()
    cy.url().should('include', '/about')
  })

  it('Navigate to Blog page', () => {
    cy.get('[data-cy=Blog]').click()
    cy.url().should('include', '/blog')
  })

  it('Navigate to Travel-Log page', () => {
    cy.get('[data-cy=Travel-Log]').click()
    cy.url().should('include', '/travel-log')
  })

  it('Navigate to Home page', () => {
    cy.get('[data-cy=Home]').click()
    cy.url().should('include', '/')
  })
})
