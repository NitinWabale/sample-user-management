# Sample User and Token Service
This is responsible for user management and token management.

DB used is `MySQL`

## Installation

Reference package.json for supported versions of NodeJs and NPM.

```sh
npm install
```

## Debug
```sh
Just clik on debug in VS code, configuration is added
```
## Run
```sh
node app\index.js
```

## Service Operations

### Create

**POST** /users/register

        Create a new user.

        For creating an user , please reference the below schema

        Request:

            username
            password
            firstName
            lastName
            email

        Response:

                status: 200 success
                        500 error
                body: same as request body

        Note: - This is public endpoint

**POST** /users/authenticate

        validate user and return user.

        For login/authenticate an user , please reference the below schema

        Request:

            username
            password

        Response:

                status: 200 success
                        500 error
                username
                password
                hash: <<empty>>
                firstName
                lastName
                email
                token: <<JWT token for next admin calls>>
    Note: - This is public endpoint
                 
**POST** /token/create

        Create a token for user and return token.
        For token creation , please reference the below schema

        Request:
            username
            issuerName
            expiry
            status

        Response:

            status: 200 success
                    500 error
            username
            issuerName
            key_name
            expiry
            status
            createdDate

    Note: - This is not public endpoint, need Authorization header with JWT token

**POST** /token/validate

        validate a token for user and response.
        For token validation , please reference the below schema

        Request:
            username
            key_name

        Response:

            status: 200 success
                    500 error

    Note: - This is public endpoint

### Retrieve

**GET** /token/all
        Request:
            JWT Token in header
        Response:
            [Tokens]
            status: 200 success
                    500 error

 Retrieve a all tokens.
 Note: - This is not public endpoint, need Authorization header with JWT token

### Update

**PATCH** /token/revoke

    update token status for give token id

            Request:
                JWT Token in header
                status
                token id
            Response:
                [Token]
                status: 200 success
                        500 error

    retirn updated token.
    Note: - This is not public endpoint, need Authorization header with JWT token

