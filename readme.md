Version numbers of all technologies used in building the project:

    "react": "^17.0.1",
    "express": "^4.17.1",
    "nodeJS": "10.13.0",
    "jquery": "^3.5.1",
    "MongoDB": "v4.4.1"

## Using the database:

I have included the data/db folder in the root directory, so 

mongod --dbpath="root:\data\db" 

should do the trick. After that, run mongod to start the MongoDB server. 
If you want to query and add new data, open a new terminal and run the following commands:

1) mongo
2) use studentDB

You can then view all the collections and respective documents

## Running the backend:

1) Go to root directory
2) cd backend
3) node server.js (Port 8000)

## Running the frontend:

1) Go to root directory
2) cd frontend
3) cd my-app
3) npm install (Port 3000)
