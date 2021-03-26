const express = require("express");
const router = express.Router();
const controller = require("../controller/filmesController");

router.get("/", controller.getAll);
router.post("/criar", controller.postFilmes);
router.put("/atualiza/:id", controller.putFilmes);
router.delete("/:id", controller.deleteFilmes);


module.exports= router;