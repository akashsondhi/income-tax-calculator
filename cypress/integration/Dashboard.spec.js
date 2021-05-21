describe("Testing Dashboard", () => {
    it("Landing page has all initial fields", ()=> {
        cy.visit("");
        cy.get('#income').should('be.visible');
        cy.get('#year').should('be.visible');
        cy.contains('Annual Income').should('be.visible');
        cy.contains('Tax Year').should('be.visible');
        cy.get('#submit').should('be.visible');
        cy.get('#clear').should('be.visible');
        cy.contains('Income Tax Calculator').should('be.visible');
        cy.get('[data-testid=error]').should('not.exist');
        cy.get('[data-testid=loader]').should('not.exist');
    });

    it("Submit on valid input", ()=> {
        cy.visit("");
        cy.get('#income').type('20,000');
        cy.get('#year').type('2019');
        cy.get('#submit').click();
        cy.get('[data-testid=loader]').should('be.visible');
        cy.get('[data-testid=result]').should('be.visible');
        cy.get('[data-testid=error]').should('not.exist');
        cy.get('[data-testid=loader]').should('not.exist');
    });

    it("Clear after invalid submit", ()=> {
        cy.visit("");
        cy.get('#income').type('20,000');
        cy.get('#year').type('2017');
        cy.get('#submit').click();
        cy.get('[data-testid=error]').should('be.visible');
        cy.get('[data-testid=result]').should('not.exist');
        cy.get('#clear').click();
        cy.get('[data-testid=error]').should('not.exist');
        cy.get('[data-testid=result]').should('not.exist');
        cy.get('[data-testid=loader]').should('not.exist');
        cy.get('#income').should('have.value', '');
        cy.get('#year').should('have.value', '');
    });

    describe('Invalid input scenarios', () => {
        it('Empty income field', () => {
            cy.visit("");
            cy.get('#year').type('2017');
            cy.get('#submit').click();
            cy.get('[data-testid=error]').contains('Fill in the Annual Income field').should('be.visible');
            cy.get('[data-testid=result]').should('not.exist');
        })
        it('Empty year field', () => {
            cy.visit("");
            cy.get('#income').type('20,000');
            cy.get('#submit').click();
            cy.get('[data-testid=error]').contains('Fill in the Tax Year field').should('be.visible');
            cy.get('[data-testid=result]').should('not.exist');
        })

        it('Empty income and tax year field', () => {
            cy.visit("");
            cy.get('#submit').click();
            cy.get('[data-testid=error]').contains('Fill in the Annual Income field').should('be.visible');
            cy.get('[data-testid=error]').contains('Fill in the Tax Year field').should('be.visible');
            cy.get('[data-testid=result]').should('not.exist');
        })

        it('Incorrect income field', () => {
            cy.visit("");
            cy.get('#income').type('20abc');
            cy.get('#year').type('2019');
            cy.get('#submit').click();
            cy.get('[data-testid=error]').contains('Annual Income is not a valid number').should('be.visible');
            cy.get('[data-testid=result]').should('not.exist');
        })

        it('Incorrect year field', () => {
            cy.visit("");
            cy.get('#income').type('20000');
            cy.get('#year').type('201a');
            cy.get('#submit').click();
            cy.get('[data-testid=error]').contains('Tax Year is not a valid number').should('be.visible');
            cy.get('[data-testid=result]').should('not.exist');
        })

        it('Empty Income and Incorrect year field', () => {
            cy.visit("");
            cy.get('#year').type('201a');
            cy.get('#submit').click();
            cy.get('[data-testid=error]').contains('Tax Year is not a valid number').should('be.visible');
            cy.get('[data-testid=error]').contains('Fill in the Annual Income field').should('be.visible');
            cy.get('[data-testid=result]').should('not.exist');
        })

        it('Incorrect income field and empty tax field', () => {
            cy.visit("");
            cy.get('#income').type('20abc');
            cy.get('#submit').click();
            cy.get('[data-testid=error]').contains('Annual Income is not a valid number').should('be.visible');
            cy.get('[data-testid=error]').contains('Fill in the Tax Year field').should('be.visible');
            cy.get('[data-testid=result]').should('not.exist');
        });
    });
    describe("Valid scenarios", ()=> {
        it("Income with comma", ()=> {
            cy.visit("");
            cy.get('#income').type('20,000');
            cy.get('#year').type('2019');
            cy.get('#submit').click();
            const resultDiv = cy.get('[data-testid=result]');
            resultDiv.should('be.visible');
            resultDiv.contains('Result').should('be.visible');
            cy.get('[data-testid=result]').contains('3,000').should('be.visible');
            cy.get('[data-testid=result]').contains('Tax Breakdown').should('be.visible');
        })

        it("Income with decimal", ()=> {
            cy.visit("");
            cy.get('#income').type('200,000.74');
            cy.get('#year').type('2019');
            cy.get('#submit').click();
            const resultDiv = cy.get('[data-testid=result]');
            resultDiv.should('be.visible');
            resultDiv.contains('Result').should('be.visible');
            cy.get('[data-testid=result]').contains('45,711.31').should('be.visible');
            cy.get('[data-testid=result]').contains('Tax Breakdown').should('be.visible');
        })

        it("Median income with decimal", ()=> {
            cy.visit("");
            cy.get('#income').type('100,000.74');
            cy.get('#year').type('2019');
            cy.get('#submit').click();
            const resultDiv = cy.get('[data-testid=result]');
            resultDiv.should('be.visible');
            resultDiv.contains('Result').should('be.visible');
            cy.get('[data-testid=result]').contains('18,141.3').should('be.visible');
            cy.get('[data-testid=result]').contains('Tax Breakdown').should('be.visible');
        })

        it("Very high income with decimal", ()=> {
            cy.visit("");
            cy.get('#income').type('250,000.12');
            cy.get('#year').type('2019');
            cy.get('#submit').click();
            const resultDiv = cy.get('[data-testid=result]');
            resultDiv.should('be.visible');
            resultDiv.contains('Result').should('be.visible');
            cy.get('[data-testid=result]').contains('61,796.29').should('be.visible');
            cy.get('[data-testid=result]').contains('Tax Breakdown').should('be.visible');
        })
    })



})