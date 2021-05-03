This full stack project is a <strong>Travel Blog Application</strong> that allow users to post blogs with image links, like and comment on those posts.<br>

<a href="https://react-travel-blog2021.herokuapp.com" target="_blank"><strong>Live Demo</strong></a><br>

## Built with:
- **React** for creating a SPA
- **Redux** for global state
- **Express** for making back-end development
- **react-router-dom** for managing navigation
- **bcryptjs** for hashing passwords
- **JWT** for token creation and authentication
- **Mongoose** for connecting to the database (MongoAtlas)
- **SASS** for better css organization and readability
- **Material-Ui & React-Jss** for styling


## Features:

- Create and read entries
- Create users
- Hashed passwords
- Token authentication
- Protected routes


## Local Development

```bash
git clone https://github.com/zxmvd/react-travel-blog.git
```

This app consists of two npm projects, there are two places to run `npm` commands:

1. **Node API server** in `server/` directory
1. **React UI** in `client/` directory

### Run the API server

```bash
cd server

# install server dependencies
npm install

# Start the server
npm start
```

### Run the React UI

The React app is configured to proxy backend requests to the local Node server. (See [`"proxy"`](client/package.json))

In a separate terminal from the API server, start the UI:

```bash
cd client

# Initial setup
npm install

# Start the server
npm start
```

### Setting environment variables

Fill dotenv in `server/` directory with database information, create a jwtsecretkey and then save the file as ".env".

Example
```bash
MONGODB_URI='your_database_uri'

PORT = 3001

TEST_MONGODB_URI='your_test_database_uri'

SECRET ='any value'
```

### Creating new production build of the frontend
```bash
cd server

# Builds the frontend and copies the production version under the backend repository.
npm run build:ui
```


