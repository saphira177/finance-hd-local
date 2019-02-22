// https://docs.cypress.io/api/introduction/api.html

describe('Creage group dialog', () => {
  it('should contain all categories information of a group', () => {
    cy.visit('/');
    cy.get('div.v-speed-dial > .v-btn')
      .click();
    cy.get('div.v-speed-dial > .v-speed-dial__list')
      .find('button.v-btn')
      .eq(1)
      .click();
    cy.get('div.create-group-dialog')
      .find('div.v-text-field input')
      .type('New Group');
    cy.get('div.create-group-dialog')
      .find('div.v-card__actions button')
      .eq(1)
      .click();
    cy.get('.v-content__wrap')
      .find('div[role=listitem]')
      .find('a')
      .should(($item) => {
        expect($item).to.have.length(3);
        expect($item.first().find('.v-list__tile__title')).to.contain('Monthly');
        expect($item.eq(1).find('.v-list__tile__title')).to.contain('Rent');
        expect($item.eq(2).find('.v-list__tile__title')).to.contain('New Group');
      });
  });
});
