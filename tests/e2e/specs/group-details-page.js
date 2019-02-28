// https://docs.cypress.io/api/introduction/api.html
const { formatData } = require('../support/fixtures');

const getStore = () => cy.window().its('app.$store');

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
    const expectedData = formatData([
      ['  name  ', '  amount  ', '  class   '],
      [' salary ', '18.000.000', 'blue--text'],
      [' market ', '-1.500.000', 'red--text '],
      [' study  ', '-2.300.000', 'red--text '],
    ]);
    cy.visit('/#/groups/group1');
    cy.get('.group-details')
      .find('div[role=listitem]')
      .should(($listItem) => {
        for (let i = 0; i < 3; i += 1) {
          expect($listItem.eq(i).find('.v-list__tile__title')).to.contain(expectedData.rows[i].name);
          const actionTextEle = $listItem.eq(i).find('.v-list__tile__action-text');
          expect(actionTextEle).to.contain(expectedData.rows[i].amount);
          const reg = new RegExp(expectedData.rows[i].class);
          expect(actionTextEle[0].className).to.match(reg);
        }
      });
  });

  it('should display all invoices of group in table', () => {
    const expectedData = formatData([
      ['  name   ', '  amount  ', '      date      ', 'category'],
      ['Invoice 1', '-2.000.000', '01-12-2018 09:00', '  study '],
      ['Invoice 2', '  -300.000', '02-12-2018 09:00', '  study '],
      ['Invoice 5', '18.000.000', '01-12-2018 08:00', '  salary'],
      ['Invoice 7', '-1.500.000', '04-12-2018 10:00', '  market'],
    ]);
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
        for (let i = 0; i < 4; i += 1) {
          const cols = $rows.eq(i).find('td');
          expect(cols).to.have.lengthOf(4);
          expect(cols.eq(0)).to.contain(expectedData.rows[i].name);
          expect(cols.eq(1)).to.contain(expectedData.rows[i].amount);
          expect(cols.eq(2)).to.contain(expectedData.rows[i].date);
          expect(cols.eq(3)).to.contain(expectedData.rows[i].category);
        }
      });
  });

  describe('list invoices', () => {
    it('should sort ascending/descending by amount', () => {
      cy.visit('/#/groups/group1');
      // ascending
      cy.get('.group-details')
        .find('.invoice-table thead th[role=columnheader]')
        .eq(1)
        .click();
      const expectedAscData = formatData([
        ['  name   ', '  amount  ', '      date      ', 'category'],
        ['Invoice 1', '-2.000.000', '01-12-2018 09:00', '  study '],
        ['Invoice 7', '-1.500.000', '04-12-2018 10:00', '  market'],
        ['Invoice 2', '  -300.000', '02-12-2018 09:00', '  study '],
        ['Invoice 5', '18.000.000', '01-12-2018 08:00', '  salary'],
      ]);
      cy.get('.group-details')
        .find('.invoice-table tbody tr')
        .not('.v-datatable__expand-row')
        .should(($rows) => {
          for (let i = 0; i < 4; i += 1) {
            const cols = $rows.eq(i).find('td');
            expect(cols).to.have.lengthOf(4);
            expect(cols.eq(0)).to.contain(expectedAscData.rows[i].name);
            expect(cols.eq(1)).to.contain(expectedAscData.rows[i].amount);
            expect(cols.eq(2)).to.contain(expectedAscData.rows[i].date);
            expect(cols.eq(3)).to.contain(expectedAscData.rows[i].category);
          }
        });
      // descending
      cy.get('.group-details')
        .find('.invoice-table thead th[role=columnheader]')
        .eq(1)
        .click();
      const expectedDescData = formatData([
        ['  name   ', '  amount  ', '      date      ', 'category'],
        ['Invoice 5', '18.000.000', '01-12-2018 08:00', '  salary'],
        ['Invoice 2', '  -300.000', '02-12-2018 09:00', '  study '],
        ['Invoice 7', '-1.500.000', '04-12-2018 10:00', '  market'],
        ['Invoice 1', '-2.000.000', '01-12-2018 09:00', '  study '],
      ]);
      cy.get('.group-details')
        .find('.invoice-table tbody tr')
        .not('.v-datatable__expand-row')
        .should(($rows) => {
          for (let i = 0; i < 4; i += 1) {
            const cols = $rows.eq(i).find('td');
            expect(cols).to.have.lengthOf(4);
            expect(cols.eq(0)).to.contain(expectedDescData.rows[i].name);
            expect(cols.eq(1)).to.contain(expectedDescData.rows[i].amount);
            expect(cols.eq(2)).to.contain(expectedDescData.rows[i].date);
            expect(cols.eq(3)).to.contain(expectedDescData.rows[i].category);
          }
        });
    });
  });
});
