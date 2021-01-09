![MongoDB](https://img.shields.io/badge/MongoDB-4.4.1-fcba03)
![Express](https://img.shields.io/badge/Express-^4.17.1-green)
![React](https://img.shields.io/badge/React-^17.0.1-blueviolet)
![NodeJS](https://img.shields.io/badge/NodeJS-10.13.0-red)

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
