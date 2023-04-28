const express = require('express');
const usersRouter = require('./routes/api/users');
const routes = require('./routes');

const app = express();
const port = 3000;

// Use the router
app.use('/', routes);

// Use the API router
app.use(express.json());
app.use('/api/users', usersRouter);

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});