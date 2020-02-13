# xAPI Profile Server
The profile server is based on the MERN (Mongo, Express, React, Node) stack. All source files are included in the zip. 

### Project Structure
Root Project folder/  
|  _base project files - Readme, server app, dependencies list.._  
| -- client/ - React app, React dependencies list, UI components, HTML assets, etc  
| -- server/ - Express app, server routes, profile db models

## Dependencies
Development environment dependencies to run the profile server. Download and install.

- node: https://nodejs.org/en/download/
- yarn: https://yarnpkg.com/
- mongo: https://www.mongodb.com/download-center/community

## Client
A React Single Page App created using `yarn create react-app client`. Follow the [Readme](./client/README.md) for development and builds. You will need to `$:client yarn` to install node_modules.

## Server
Express server configured to serve a React SPA. It also has the API designed for the Profile server. It uses MongoDB as its database.

## Setup
1. In a terminal, start the mongodb server `mongod`
1. Extract the project
1. In a new terminal navigate inside the project folder and enter the command `yarn` to install node modules
1. Verify there is an `.env` file at the root of the project. If not,
    1. Create the missing `.env` file and add `connectionString=mongodb://localhost:27017/profileServer`
1. Type `yarn start` to start the profile server
1. Open another terminal and navigate to `<project_folder>/client`
1. Type `yarn` to install the profile client modules
1. Then type `yarn start` to start the client app.

## Run
A browser tab should open and show the index page of the app after executing the `yarn start` command in the client folder. _If it didn't automatically open, you can navigate to http://localhost:3000_


# High-Level List of Features / Tasks
The following is a list of tasks performed / features added for a given deliverable. 

## Feb 7 Deliverable
**Project Environment**  
- Set up project structure  
- Installed MERN stack   
- Configured dev environment   

**Server**  
- Created an initial Express app   
- Created ODM to reflect concepts necessary for creating and publishing a profile  
- Created the REST API routes necessary for creating and publishing a profile  
- Created routes to deliver the client app  

**Client**  
- Created home view for a logged-in, registered user that shows a list of Organizations the user is a member of  
- Created bare-bones organization pages necessary for profile creation  
- Created Profile pages  
    - Created Profile details view  
    - Created Edit Profile form  
- Created Statement Template pages  
    - Created Statement Template details view  
    - Created Statement Template create & edit forms  
    - Created Statement Template search and add template view  
- Created Pattern pages  
    - Created Pattern details view  
    - Created Pattern create & edit forms  
    - Created Pattern search and add template view  
- Created Concept pages  
    - Created Pattern details view  
    - Created Pattern create & edit forms   
    - Created Pattern search and add template view  
- Added client side state management  
    - Created client state model  
    - Created client state management actions  
- Added client API proxy for accessing server API  
- Started connecting views to client state  
