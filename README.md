# JWT authentication

An simple example of how to authorize resource acces though http using Json Web Token (JWT) 

### Introduction

This example shows how to use JWT TOKEN for authorization.

JSON Web Token (JWT) is an open standard (RFC 7519) that defines a compact and self-contained way for securely transmitting information between parties as a JSON object.


### How do JSON Web Tokens work?
In authentication, when the user successfully logs in using their credentials, 
a JSON Web Token will be returned. Since tokens are credentials, great care must be taken 
to prevent security issues. In general, you should not keep tokens longer than required.
You also should not store sensitive session data in browser storage due to lack of security.
Whenever the user wants to access a protected route or resource, the user agent should send the 
JWT, typically in the Authorization header using the Bearer schema. 

## Goal 

In this example, a simple API will use a MongoDB database to store its users.
We use JWT token to authorize users to access certain resources. 

### Depdencies

```
$ dotenv
$ express
$ mongoose
$ jsonwebtoken
$ nodemon (dev only)
$ joi (model validation)
$ bcrypt
```