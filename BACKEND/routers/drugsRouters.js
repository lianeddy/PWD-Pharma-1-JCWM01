const express = require("express");
const { drugsController } = require("../controllers");
const routers = express.Router();

routers.get("/get-drug", drugsController.getDrug);
routers.get("/drug-list", drugsController.drugList);
routers.get("/search-drug", drugsController.searchDrug);
routers.post("/add-obat", drugsController.addData);
routers.patch("/edit-obat/:id", drugsController.editData);
routers.delete("/delete-obat/:idobat", drugsController.deleteData);
routers.get("/sortby/:nama_obat", drugsController.sortBy);
routers.get("/get-raw-drug", drugsController.getRawDrug);
routers.get("/raw-drug-list", drugsController.rawDrugList);

module.exports = routers;

// /get/:id select * from obat where id = req.params.id
