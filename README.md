# MalindoTestUI

This is a React UI CRUD Application developed with React Router & Axios. 
We can consume REST APIs for CRUD operations via UI components providing valid 
API Authentication Key via request header.

Technology:

    - React 16
    - react-router-dom 5.1.2
    - axios 0.19.2
    - bootstrap 4.4.1


Instructions to run the application:

1) Make sure you run the API project first

2) Download the Web Application from the git repo to your local directory

https://github.com/manojhome/MalindoTestUI

3) Go to file http-common.js and include ur API Authentication key below

     "Authorization": ''

4) In the same file replace the PORT number for the REST API url as per your local host

    ex: baseURL: "https://localhost:44345/api/"

5) Save everything and build the application running below command under given directory

    MalindoTestUI\react-ui> npm run-script build

6) Run the project with below command

    MalindoTestUI\react-ui> npm start 

7) Enjoy your REACT UI with CRUD operations!
