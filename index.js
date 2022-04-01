const express = require("express");
const teamsRoutes = require("./src/routes/teams");
const jogadoresRoutes = require("./src/routes/Jogadores");
const positionsRoutes = require("./src/routes/positions");
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(teamsRoutes);
app.use(jogadoresRoutes);
app.use(positionsRoutes);

app.listen(port, () => {
  console.log(`meu servidor esta funcionando em; http://localhost:${port}`);
});
