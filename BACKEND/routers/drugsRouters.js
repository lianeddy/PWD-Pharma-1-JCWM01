const express = require("express");
const { drugsController } = require("../controllers");
const routers = express.Router();

routers.get("/get", drugsController.getData);
routers.post("/add-obat", drugsController.addData);
routers.patch("/edit-obat/:id", drugsController.editData);
routers.delete("/delete-obat/:idobat", drugsController.deleteData);

module.exports = routers;

// /get/:id select * from obat where id = req.params.id