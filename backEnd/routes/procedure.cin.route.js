const router = require("express").Router();
const ProcedureCINController = require("../controllers/procedure.cin.controller");

router.get("/", ProcedureCINController.getAllProcedures);
router.get("/stats/", ProcedureCINController.getProcedureStats);
router.get("/:idProcedureCin", ProcedureCINController.getIdProcedure);
router.post("/", ProcedureCINController.addProcedureCIN);
router.put("/:idProcedureCin", ProcedureCINController.updateProcedureCIN);
router.post("/recherche/", ProcedureCINController.SearchProcedure);

module.exports = router;
