const app = require("express")();
const bodyParser = require("body-parser");

app.use(bodyParser.json());

let clients = [
  { id: 1, nome: "Francis" },
  { id: 2, nome: "Rogério" },
  { id: 3, nome: "Lindomar" },
];
function log(req, res, next) {
  const { url, method } = req;
  console.log(`${method} - ${url} at ${new Date()}`);
  return next();
}

app.use(log);

app.get("/clients", (req, res) => res.status(200).json(clients));

app.get("/clients/:id", (req, res) => {
  const { id } = req.params;
  const client = clients.find((value) => value.id == id);
  if (client == undefined) {
    res.status(400).json({ error: "Não encontrado" });
  } else {
    res.status(200).json(client);
  }
});

app.post("/clients", (req, res) => {
  const client = req.body;
  clients.push(client);
  res.status(201).json(client);
});

app.put("/clients/:id", (req, res) => {
  const id = req.params.id;
  const nome = req.body.nome;

  let client = clients.find((value) => value.id == id);
  if (client == undefined) {
    res.status(400).send();
  } else {
    client.nome = nome;
    res.status(200).json(client);
  }
});

app.delete("/clients/:id", (req, res) => {
  const { id } = req.params;
  const index = clients.findIndex((value) => value.id == id);
  if (index == -1) {
    res.status(400).send();
  } else {
    clients.splice(index, 1);
    res.status(204).send();
  }
});

app.listen(3000);
