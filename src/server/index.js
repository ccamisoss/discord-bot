const express = require("express");
const { PORT } = require("../config");
const routes = require("./routes");
const { authenticate } = require("../hooks");

const app = express();

app.use(express.json());

app.use('/api', authenticate, routes);

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = { app, server };
