
const sql = require("./models/db.js");

const Client = function(client) {
    this.id = client.id;
    this.first_name = client.first_name;
    this.last_name = client.last_name;
    this.email = client.email;
};

Client.create = (newClient, result) => {
    sql.query("INSERT INTO emails SET ?", newClient, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created client: ", { id: res.insertId, ...newClient });
        result(null, { id: res.insertId, ...newClient });
    });
};

Client.findById = (clientId, result) => {
    sql.query(`SELECT * FROM emails WHERE id = ${clientId}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            //console.log("found client: ", res[0]);
            result(null, res[0]);
            return;
        }

        result({ kind: "not_found" }, null);
    });
};

Client.getAll = result => {
    sql.query("SELECT * FROM emails", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

//        console.log("clients: ", res);
        result(null, res);
    });
};

Client.updateById = (id, client, result) => {
    sql.query(
        "UPDATE emails SET first_name = ?, last_name = ?, email = ? WHERE id = ?",
        [client.first_name, client.last_name, client.email, id],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows ==0) {
                // not found Client with the id
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("updated client: ", { id: id, ...client });
            result(null, { id: id, ...client });
        }
    );
};

Client.remove = (id, result) => {
    sql.query("DELETE FROM emails WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("deleted client with id: ", id);
        result(null, res);
    });
};

Client.removeAll = result => {
    sql.query("DELETE FROM emails", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log(`deleted ${res.affectedRows} clients`);
        result(null, res);
    });
};

module.exports = Client;

