const app = require("express")();
const bodyParser = require("body-parser");

app.use(bodyParser.json());

let clients = [
  { id: 1, nome: "Francis" },
  { id: 2, nome: "Rogério" },
  { id: 3, nome: "Lindomar" },
];

app.get("/clients", (req, res) => res.json(clients));

app.get("/clients/:id", (req, res) =>
  res.json(clients.filter((value) => value.id == req.params.id))
);

app.post("/clients", (req, res) => {
  const client = req.body;
  clients.push(client);
  res.json(client);
});

app.put("/clients/:id", (req, res) => {
  const id = req.params.id;
  const nome = req.body.nome;

  let client = clients.filter((value) => value.id == id);

  client[0].nome = nome;

  res.json(client[0]);
});

app.delete("/clients/:id", (req, res) =>
  res.json(clients.filter((value) => value.id != req.params.id))
);

app.listen(3000);
