# PR-jobs

## Documentation
https://docs.google.com/document/d/1dtVfDtdB8EQDJHakX-ZsGw1VzZgFUKcEEe632TdKOzA/edit?usp=sharing

## How To Run
1. Run npm install to install dependencies
2. Config MySQL with the following:
  - user: root
  - host: localhost
  - password: ''
  - database: prjobs_db
3. Create following Table:

Users

``CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(20) NOT NULL,
  `email` text NOT NULL,
  `password` text NOT NULL,
  `contactNumber` text NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username_UNIQUE` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=132 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci``

Consultants

``CREATE TABLE `consultants` (
  `id` int NOT NULL AUTO_INCREMENT,
  `companyName` text NOT NULL,
  `email` text NOT NULL,
  `contactNumber` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=49 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci``

4. Run `node createKeyPair` to create RSA 256 public/private key pair for encrypting JWT Token.

5. Run `node server`, the server will run on port 3001

## Authentication
  - Avaialble APIs: 
    - http://localhost:3001/
    - http://localhost:3001/register/user
      - Create user with : ``username:test,
        email:test@gmail.com,
        password:password,
        contactNumber:848499292``
      - Password will be hashed using `BCrypt` 
    - http://localhost:3001/login
      - Login with `username` and `password` and system will verify and return JWT Token if user exists.
    - http://localhost:3001/user/protected
      - Authorized route for signed in user only. System will extract JWT Token from Authorization Header to verify.
    - http://localhost:3001/logout
      - Redirect user to `/` route
