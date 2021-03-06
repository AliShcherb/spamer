
module.exports = app => {
    const clients = require("./client.controller.js");

    app.post("/clients", clients.create);
    app.get("/clients", clients.findAll);
    app.get("/clients/:clientId", clients.findOne);
    app.put("/clients/:clientId", clients.update);
    app.delete("/clients/:clientId", clients.delete);
    app.delete("/clients", clients.deleteAll);
    app.post("/submit", clients.submit);
};