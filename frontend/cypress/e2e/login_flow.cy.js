describe('Login Flow', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    it('allows a student to select a role and view the login form', () => {
        // Check if on selection page
        cy.contains('Select Portal').should('be.visible');

        // Select Student Portal
        cy.contains('Student Portal').click();

        // Verify login form is visible
        cy.contains('Welcome Back').should('be.visible');
        cy.get('input[type="email"]').should('be.visible');
        cy.get('input[type="password"]').should('be.visible');
    });

    it('shows error on invalid login', () => {
        cy.contains('Student Portal').click();

        cy.get('input[type="email"]').type('invalid@student.com');
        cy.get('input[type="password"]').type('wrongpassword');
        cy.contains('Sign In').click();

        // The toast message should appear
        cy.contains('Invalid credentials').should('be.visible');
    });
});
