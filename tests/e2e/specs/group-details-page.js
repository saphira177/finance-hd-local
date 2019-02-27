// https://docs.cypress.io/api/introduction/api.html

describe('Group Details Page', () => {
  it('should contain all categories information of a group', () => {
    cy.visit('/#/groups/group1');
    cy.get('.group-details')
      .find('p.title')
      .should('contain', 'Monthly')
      .should('contain', '15.700.000');
    cy.get('.group-details')
      .find('div[role=listitem]')
      .should('have.length', 3);
  });

  it('should order categories by amount and name', () => {
    cy.visit('/#/groups/group1');
    cy.get('.group-details')
      .find('div[role=listitem]')
      .should(($listItem) => {
        let actionTextEle;
        expect($listItem.eq(0).find('.v-list__tile__title')).to.contain('salary');
        actionTextEle = $listItem.eq(0).find('.v-list__tile__action-text');
        expect(actionTextEle).to.contain('18.000.000');
        expect(actionTextEle[0].className).to.match(/blue--text/);
        expect($listItem.eq(1).find('.v-list__tile__title')).to.contain('market');
        actionTextEle = $listItem.eq(1).find('.v-list__tile__action-text');
        expect(actionTextEle).to.contain('-1.500.000');
        expect(actionTextEle[0].className).to.match(/red--text/);
        expect($listItem.eq(2).find('.v-list__tile__title')).to.contain('study');
        actionTextEle = $listItem.eq(2).find('.v-list__tile__action-text');
        expect(actionTextEle).to.contain('-2.300.000');
        expect(actionTextEle[0].className).to.match(/red--text/);
      });
  });

  it('should display all invoices of group in table', () => {
    cy.visit('/#/groups/group1');
    cy.get('.group-details')
      .find('.invoice-table thead th[role=columnheader]')
      .should(($cols) => {
        expect($cols).to.have.lengthOf(4);
        expect($cols.eq(0)).to.contain('Name');
        expect($cols.eq(1)).to.contain('Amount');
        expect($cols.eq(2)).to.contain('Date');
        expect($cols.eq(3)).to.contain('Category');
      });
    cy.get('.group-details')
      .find('.invoice-table tbody tr')
      .not('.v-datatable__expand-row')
      .should('have.length', 4)
      .and(($rows) => {
        let cols = $rows.eq(0).find('td');
        expect(cols).to.have.lengthOf(4);
        expect(cols.eq(0)).to.contain('Invoice 1');
        expect(cols.eq(1)).to.contain('-2.000.000');
        expect(cols.eq(2)).to.contain('01-12-2018 09:00');
        expect(cols.eq(3)).to.contain('study');
        cols = $rows.eq(1).find('td');
        expect(cols.eq(0)).to.contain('Invoice 2');
        expect(cols.eq(1)).to.contain('-300.000');
        expect(cols.eq(2)).to.contain('02-12-2018 09:00');
        expect(cols.eq(3)).to.contain('study');
        cols = $rows.eq(2).find('td');
        expect(cols.eq(0)).to.contain('Invoice 5');
        expect(cols.eq(1)).to.contain('18.000.000');
        expect(cols.eq(2)).to.contain('01-12-2018 08:00');
        expect(cols.eq(3)).to.contain('salary');
        cols = $rows.eq(3).find('td');
        expect(cols.eq(0)).to.contain('Invoice 7');
        expect(cols.eq(1)).to.contain('-1.500.000');
        expect(cols.eq(2)).to.contain('04-12-2018 10:00');
        expect(cols.eq(3)).to.contain('market');
      });
  });
});
