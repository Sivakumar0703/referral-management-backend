# Referral Management System Backend

This document provides an overview of the referral management system backend API.

## Technologies Used

* Express.js - web framework for building APIs
* MongoDB - NoSQL database for storing application data
* Packages
    * bcryptjs - password hashing
    * cors - enable cross-origin resource sharing
    * jsonwebtoken - generate and verify JSON Web Tokens (JWT)
    * mongoose - object data modeling for MongoDB
    * multer - handle multipart/form-data requests (file uploads)
    * google-cloud/storage - Google Cloud Storage for file storage

## Base URL

https://referral-management-backend.onrender.com

## User Endpoints (/api/user)

**1. Create User (Signup)**

* Method: POST
* Endpoint: /signup
* Request Body:
    * name (string) - user's name
    * email (string) - user's email address
    * password (string) - user's password

**2. Login**

* Method: POST
* Endpoint: /login
* Request Body:
    * email (string) - user's email address
    * password (string) - user's password
* Response:
    * token (string) - JWT for authentication
    * isAdmin (boolean) - indicates if the user is an admin

**3. Logout**

* Method: POST
* Endpoint: /logout
* Authorization: Bearer <token> (from headers)

## Candidate Endpoints (/api/candidate)

**1. Get All Candidates**

* Method: GET
* Endpoint: /
* Authorization: Bearer <token> (from headers)

**2. Create Candidate**

* Method: POST
* Endpoint: /
* Authorization: Bearer <token> (from headers)
* Request Body:
    * name (string) - candidate's name
    * email (string) - candidate's email address
    * phoneNumber (string) - candidate's phone number
    * jobTitle (string) - candidate's job title
* File Upload:
    * resume (file) - candidate's resume (PDF)
* Response:
    * The resume is uploaded to Google Cloud Storage and the URL is saved in the database.

**3. Update Candidate Job Status**

* Method: PUT
* Endpoint: /:id/status
* Authorization: Bearer <token> (from headers)
* Request Body:
    * jobStatus (string) - new job status for the candidate

## Additional Notes

## Postman Documentation

For detailed API reference and examples, you can view the Postman documentation for this project here:

* [Referral Management System Backend Postman Documentation](https://documenter.getpostman.com/view/26860365/2sAYQakr9M)