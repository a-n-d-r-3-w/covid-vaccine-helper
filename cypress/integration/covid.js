describe('My COVID script', () => {
    it('Visits CVS', () => {
      cy.visit('https://www.cvs.com')
      cy.contains('Schedule a COVID-19 vaccine').click()

      // Alabama
      cy.get(':nth-child(1) > ul > :nth-child(1) > div > .type__link__text > .link__text').click()

      // Schedule an appointment now
      cy.get('#vaccineinfo-AL > .modal__inner > .modal__content > .component__main > :nth-child(1) > .box > .boxcontainer > .box-container > .content__wrapper > .aem-Grid > :nth-child(3) > .rte-component-wraper > :nth-child(2) > .link__text > strong').click()

      cy.contains('Before we schedule your vaccine')
      cy.get(':nth-child(2) > fieldset > .radio-btn-wrapper > :nth-child(2) > label').click()
      cy.get(':nth-child(3) > fieldset > .radio-btn-wrapper > :nth-child(2) > label').click()
      cy.get(':nth-child(4) > fieldset > .radio-btn-wrapper > :nth-child(2) > label').click()
      cy.get('.btn-control').click()

      cy.contains('I need to start vaccination.').click()
      cy.contains('Continue scheduling').click()

      cy.get('#jurisdiction').select('Massachusetts')
      cy.contains('Continue scheduling').click()

      cy.contains('Confirm eligibility')
      cy.get('#q1_0').type('40')
      cy.contains('All others age 16 and over').click()
      cy.get('#qconsent').click()
      cy.wait(3000)
      cy.get('.btn-control').click()

      cy.contains('Start scheduling').click()
      cy.get('#address').type('02459{enter}')

    })
  })