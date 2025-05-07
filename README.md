# FrostGrave 2nd Edition Front End App

This is the start of an express server that will be used in my capstone project. It is a data server for a miniature wargame called [Frostgrave 2nd Edition](https://boardgamegeek.com/boardgame/317519/frostgrave-second-edition). Players put together a small band of hapless mercenaries, lead by a wizard and his/her unlucky apprentice as they explore the ruins of an ancient frozen city.

## Description

There are currently 3 categories of data each with multiple sub tables. Reference data is read only data and give reference rules for the game an cannot be modified. There is also a user database that has only get methds for now. Lastly there is the warband database that contains wizard, apprentice and follower data that can be created, modified, and deleted.

I've also create a view to see a POST request in order to make a new wizard. More endpoints will be documented inside. Data is stored in MongoDB using mongoose.

## Things I learned doing this project

- How to handle connections and route to mongoDB
- Handling routes using express
- Creating views using EJS
- Creating Schema and Models via mongoose
- Writing documentation for API endpoints

## Getting Started

### Dependencies

- "@emotion/react": "^11.14.0",
- "@emotion/styled": "^11.14.0",
- "@mui/material": "^7.1.0",
- "react": "^19.1.0",
- "react-dom": "^19.1.0",
- "react-router-dom": "^7.5.3"

### Installing

```
$ npm install @mui/material @emotion/react @emotion/styled
$ npm install @fontsource/roboto
$ npm install @mui/icons-material
```

### Executing program

- you will need a .env file with the following

```
// .env in the root

ATLAS_URI="your.mongo.db.connection.string"

PORT=5050 // or whatever your desired port number

```

- I've set up a script in the package.json to be able to run nodemon

```
$ npm run dev
```

- This will run default on [localhost:5050](http://localhost:5050/)
- There is a [documentation page](http://localhost:5050/documentation) with plenty of information on how to use this API

## Authors

Contributors names and contact info

Gregory Jung - [Portfolio](https://tenor2000.github.io/react-portfolio/)

## Version History

- v0.2 data storage now connected to mongodb:

  - use of mongoose for connections
  - data restructured
  - seed data enabled to reset to default if need be
  - more comprehensive documentation

- v0.1 basic endpoints are working for:
  - api/reference
  - api/warbands/wizards
  - api/warbands/apprentices
  - api/warbands/followers
  - api/users

## Acknowledgments

Inspiration, code snippets, etc.

- [awesome-readme](https://github.com/matiassingers/awesome-readme)
- [Joseph McCullough](https://www.josephamccullough.com/)

## Rubric Checklist
