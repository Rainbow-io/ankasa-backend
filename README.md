# Blanja

This is Backend for Ankasa App.


## Built With

- [Node.js]
- [Mysql]
- [Express.js]


## Installation

1. Clone the repo
   ```sh
   git clone https://github.com/Rainbow-io/ankasa-backend.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Start the Application
   ```sh
   npm start
   ```

## Additional

    This project has been deployed on heroku
> [HEROKU LINK](https://ankasa-rainbow.herokuapp.com/)



## API Endpoint

auth endpint

    POST    auth/login
    POST    auth/register

user endpoint

    GET     /app/profile
    GET     /app/profile/:id
    PUT     /app/profile/:id/form
    PUT     /app/profile/:id/picture
    PUT     /app/profile/:id/picture/link
    POST    /app/list-flight


booking endpoint

    GET     /list/:id
    GET     /detail/:id
    GET     /list/success/:id
    GET     /list/payment/:id
    POST    /insert
    POST    /list
    PUT     /list/pay/:id

