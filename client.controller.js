
 const Client = require("./clients.model.js");


exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Error! Empty content"
        });
    }

    const client = new Client({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email
    });

    Client.create(client, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Error while creating"
            });
        else res.send(data);
    });
};
exports.findAll = (req, res) => {
    Client.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Error while retrieving"
            });
        else res.send(data);
    });
};

exports.findOne = (req, res) => {
    Client.findById(req.params.clientId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Client with id ${req.params.clientId}.`
                });
            } else {
                res.status(500).send({
                    message: "Error while retrieving Client with id " + req.params.clientId
                });
            }
        } else res.send(data);
    });
};


exports.update = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Error! Empty content"
        });
    }

    Client.updateById(
        req.params.clientId,
        new Client(req.body),
        (err, data) => {

            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found Client with id ${req.params.clientId}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error while updating Client with id " + req.params.clientId
                    });
                }
            } else res.send(data);
        }
    );
};

exports.delete = (req, res) => {
    Client.remove(req.params.clientId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Client with id ${req.params.clientId}.`
                });
            } else {
                res.status(500).send({
                    message: "Can not delete Client with id " + req.params.clientId
                });
            }
        } else res.send({ message: `Successful removal` });
    });
};

exports.deleteAll = (req, res) => {
    Client.removeAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Error while removing all clients."
            });
        else res.send({ message: `Successful removal of all clients` });
    });
};

