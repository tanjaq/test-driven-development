# Test Driven Development - user registration system
The task is to add tests to registration functionality and mock validation fucntionality.

## How to get the project

To solve the task, proceed as follows:
1. Fork this repository on to your account
2. Clone the forked repo to your computer using `git clone URL` and checkout branch `server-testing`
3. Run `npm install` to instal all needed packages
4. Add Jest testing package `npm install jest` and `npm install supertest`
5. Add Jest script to `package.json`:
```
"scripts": {
   "test": "jest"
}
```
6. Make all necessary changes: finish `app.test.js` tests, write mock implementation for validate username function and add tests to mocked version
7. Confirm all changes with test run: `npm run test` or `npx jest`
8. Commit your changes and make a pull request for the original repo on GitHub on a branch `server-testing`
9. Grade (1p) is awarded to students:
   - who made the pull request with finished tests and validation code

Jest documentation:
https://jestjs.io/docs/expect
https://jestjs.io/docs/mock-function-api


## Business requirements

**Username**

- Username can be 6-30 characters long.
- Username can only contain letters, numbers, and periods. 

**Password**

- Password has to be at least 8 characters long.
- Password should contain at least one lowercase and one uppercase letter.
- Password should contain at least one number. 
- Password should not contain any special characters.  
