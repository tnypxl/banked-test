# Banked Test

## Summary

### Approach

Cypress was chosen because it is fast to setup, debug, and maintain. I used a shoestring page-object implementation to keep things a little DRY and readable.

In future iterations I'd improve this repo by doing one or more the following:

- Integrate with CI/CD tooling
- Caputre Reference numbers for debugging for use bug reports
- More comprehensive coverage of screen elements and additional behaviors
- Support cross-browser test execution
- Merge test code into repo of the application under test for simpler collaboration and CI/CD logistics between QAs and Devs.

### Issue with the 'Pay By Bank' flow

Searching for and selecting a bank is very flaky. A new url occurs aftering clicking on the search field causing the results to go away. I tried all manner of implicit and explicit waits and neither solves it completely. My recommendation would be to determine what's causing the page to re-render and fixing it. There is a screenshot for context: `screenshots/payByBank.spec.js/Happy Path -- creates payment successfully (failed).png`

## Run the tests

To run the Cypress tests locally (on macOS or Linux), you can use the following commands:

### On your machine

1. Prerequisites: `Node.js` and `Docker`
1. Clone the repo
1. Run `npm i` in your terminal

#### Run tests in a browser

```bash
npm run cypress:open
```

#### Run tests in your terminal

```bash
npm run cypress:run
```

#### Run tests using Docker

```bash
npm run cypress:docker
```
