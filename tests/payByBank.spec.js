const homeScreen = {
  beginHostedCheckout(region = 'AU', customerType = 'new-customer') {
    cy.visit('/new').wait(2000);
    cy.get('select[data-testid="region-selector"]').select(region);
    cy.get(`label[for="${customerType}"]`).click();
    cy.get(`button[data-testid="create-hosted-checkout"]`).click();
  },
}

const payByBankScreen = {
  searchField: 'input[data-testid="search-banks-input"]',
  searchResult: 'li[data-testid="bank-search-result"]',
  accountNameField: 'input[data-testid="ACCOUNT_NAME"]',
  accountNameFieldError: 'span[data-testid="client-error-ACCOUNT_NAME"]',
  bsbNumberField: 'input[data-testid="BSB_NUMBER"]',
  bsbNumberFieldError: 'span[data-testid="error-BSB_NUMBER"]',
  accountNumberField: 'input[data-testid="ACCOUNT_NUMBER"]',
  accountNumberFieldError: 'span[data-testid="client-error-ACCOUNT_NUMBER"]',
  submitButton: 'form button[type="submit"]',
  processingIndicator: 'span[data-testid="processing"]',
  paymentFailedMessage: 'div[data-testid="payment-failed"]',
  changeBankButton: 'button[data-testid="change-bank"]',
  cancelPaymentButton: 'button[data-testid="cancel-payment"]',

  selectBankFromSearchResults(bankName) {
    cy.get(this.searchField).type(bankName);
    cy.get(this.searchResult).contains(bankName).click()
  },

  enterAccountDetails(accountName, bsbNumber, accountNumber, rememberMe = false) {
    cy.get(this.accountNameField).click().type(accountName).blur();
    cy.get(this.bsbNumberField).click().type(bsbNumber).blur();
    cy.get(this.accountNumberField).click().type(accountNumber).blur();
  },

  clickContinue() {
    cy.get(this.submitButton).contains('Continue').click();
  },

  seePayToAgreementIsReady() {
    cy.get('p').contains('PayTo Agreement is ready').should('be.visible');
  },

  seePaymentComplete() {
    cy.get('p').contains('Payment complete', { timeout: 10000 }).should('be.visible');
  },

  seePaymentFailed() {
    cy.get(this.processingIndicator).should('not.exist');
    cy.get(this.paymentFailedMessage, { timeout: 10000 }).should('be.visible', {});
    cy.get(this.changeBankButton).should('be.visible');
    cy.get(this.cancelPaymentButton).should('be.visible');
  },

  getFieldError(field) {
    let fieldName = field.replace(/ /g, '_').toUpperCase();
    return cy.get(`span[data-testid="client-error-${fieldName}"]`).invoke('text');
  },
}


describe('Happy Path', () => {
  it('creates payment successfully', () => {
    homeScreen.beginHostedCheckout('AU', 'new-customer');
    payByBankScreen.selectBankFromSearchResults('Mock Bank AU');
    payByBankScreen.enterAccountDetails('Dorian Jacobs', '111114', '12345678');
    payByBankScreen.clickContinue();
    payByBankScreen.seePayToAgreementIsReady();
    payByBankScreen.seePaymentComplete();
  });
});

describe('Sad Path', () => {
  it("fails to create payment when account has insufficient funds", () => {
    cy.visit('/new');
    homeScreen.beginHostedCheckout('AU', 'new-customer');
    payByBankScreen.selectBankFromSearchResults('Mock Bank AU');
    payByBankScreen.enterAccountDetails('Dorian Jacobs', '111114', '030324');
    payByBankScreen.clickContinue();
    payByBankScreen.seePayToAgreementIsReady();
    payByBankScreen.seePaymentFailed();
  });
});
