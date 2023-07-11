# Employee Review System

## About

This is a web application with user registration, login, and various management features.  It utilizes the Express.js framework and MongoDB for the database.

Admin users can assign reviews to other users and manage users.
An employee can login can see the reviews that they have given in the past and the current reviews assigned to him/her.

## Technology Used
- Node.js
- Express.js
- MongoDB
- EJS (Embedded JavaScript) for views

## Local Setup
To set up the project locally, follow these steps:

1. Clone the repository:

   ```
   git clone https://github.com/arpitjain310/employee-review-system.git
   cd employee-review-system
   ```
2. Install the dependencies:

    ```
    npm install
    ```

3. Create a .env file in the root directory and add the following environment variables:

    ```
    PORT=<port-number>
    MONGODB_URI=<mongodb-uri>
    SECRET_KEY=<secret-key>
    ```
Replace <port-number> with the desired port number for the server, and <mongodb-uri> with the URI to your MongoDB database and <secret-key> with your desired session key.

4. Start the application:

    ```
    npm start
    ```

Open your web browser and visit http://localhost:< port-number > to access the application.

## Usage

* Register a new user by visiting the signup page.
* Login with your registered credentials on the home page.
* Navigate through the different sections and perform management operations as per your user type.

## Directory Structure

* config: Contains the configuration files, including the MongoDB connection setup.
* controllers: Handles the business logic for each route.
* models: Defines the database models and schemas.
* routes: Defines the API routes and their corresponding controller actions.
* views: Contains the EJS templates for rendering views.

