# Test Driven Development - user registration system
The task is to add user registration functionality to the program using test driven development.

## How to get the project

To solve the task, proceed as follows:
1. Fork this repository on to your account
2. Clone the forked repo to your computer using `git clone URL`
3. Run `npm install` to instal all needed packages
4. Add Jest testing package `npm install jest`
5. Add Jest script to `package.json`:
```
"scripts": {
   "test": "jest"
}
```
6. Make all necessary changes - write tests and code according to TDD
7. Confirm all changes with test run: `npm run test` or `npx jest`
8. Commit your changes and make a pull request for the original repo on GitHub
9. Grade (1p) is awarded to students:
   - who made the pull request with finished tests and validation code

## Business requirements

**Username**

- Username can be 6-30 characters long.
- Username can contain letters, numbers, and periods. 

**Password**

- Password has to be at least 8 characters long.
- Password should contain at least one lowercase and one uppercase letter.
- Password should contain at least one number. 
