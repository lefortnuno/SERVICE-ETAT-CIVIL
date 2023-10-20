const router = require("express").Router();
const utilisateurController = require("../controllers/utilisateur.controller");
const middlewareAuth = require("../middlewares/auth.middlewares");

router.get("/", utilisateurController.getAllUtilisateurs);
router.get(
  "/numeroCompte/",
  utilisateurController.getLastNumeroCompteUtilisateur
);
router.get("/:idUtilisateur", utilisateurController.getIdUtilisateur);
router.post("/", utilisateurController.addUtilisateur);
router.post("/seConnecter", utilisateurController.loginUtilisateur);

router.put(
  "/photoPDP/:id",
  utilisateurController.addPhotoPdp
);
router.put("/:idUtilisateur", utilisateurController.updateUtilisateur);
// router.put("/etat/:idUtilisateur", utilisateurController.etatUtilisateur);

router.get("/recherche/:valeur", utilisateurController.searchUtilisateur);

router.delete(
	"/:id", 
	utilisateurController.deleteUtilisateur
);


module.exports = router;
