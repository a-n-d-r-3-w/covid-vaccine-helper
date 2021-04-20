const submitZipCode = () => {
  cy.intercept('https://depservices.cvs.com/dep/memberevents/publishmemberevents/*').as('getEvents')
  cy.get('#address').type('{enter}')
  cy.wait('@getEvents')
  cy.wait(1000);
  cy.get('body').then(($body) => {
    if ($body.text().includes('there are currently no appointments available')) {
      submitZipCode()
    } else {
      cy.readFile('alarm.mp3', 'base64').then((mp3) => {
        const uri = 'data:audio/mp3;base64,' + mp3
        const audio = new Audio(uri)
        audio.play()
      })
    }
  })
}

const clickScheduledYourAppointmentNow = () => {
  cy.visit('https://www.cvs.com')
  cy.contains('Schedule a COVID-19 vaccine').click()

  // Alabama
  cy.get(':nth-child(1) > ul > :nth-child(1) > div > .type__link__text > .link__text').click()

  // Schedule an appointment now
  cy.get('#vaccineinfo-AL > .modal__inner > .modal__content > .component__main > :nth-child(1) > .box > .boxcontainer > .box-container > .content__wrapper > .aem-Grid > :nth-child(3) > .rte-component-wraper > :nth-child(2) > .link__text > strong').click()

  cy.wait(3000);
  cy.get('body').then(($body) => {
    if ($body.text().includes('We are adding more appointments for you')) {
      clickScheduledYourAppointmentNow()
    }
  })
}

describe('My COVID script', () => {
  it('Visits CVS', () => {
    clickScheduledYourAppointmentNow()
    
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
    cy.get('#address').type('02459')

    submitZipCode()
  })
})
