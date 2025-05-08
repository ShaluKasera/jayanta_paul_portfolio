const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const {
  createAchievement,
  getAllAchievements,
  updateAchievement,
  deleteAchievement,
} = require("../controllers/achievement");

const {
  createAssistantship,
  getAllAssistantship,
  updateAssistantship,
  deleteAssistantship,
} = require("../controllers/assistantship");

const {
  createFellowship,
  getAllFellowship,
  updateFellowship,
  deleteFellowship,
} = require("../controllers/fellwoship")

const {
  createPublication,
  getAllPublications,
  updatePublication,
  deletePublication,
} = require("../controllers/publication");

const {
    createReferee,
    getAllReferees,
    updateReferee,
    deleteReferee,
  } = require("../controllers/referees");

  const {
    createResponsibility,
    getAllResponsibilities,
    updateResponsibility,
    deleteResponsibility,
  } = require("../controllers/responsibility");

  const {
    createSkill,
    getAllSkills,
    updateSkill,
    deleteSkill,
  } = require("../controllers/skill");

//acheivement
router.post("/acheivement",auth, createAchievement);
router.get("/acheivement", getAllAchievements);
router.put("/acheivement/:id", auth,updateAchievement);
router.delete("/acheivement/:id", auth,deleteAchievement);

//assistanship
router.post("/assistantship",auth, createAssistantship);
router.get("/assistantship", getAllAssistantship);
router.put("/assistantship/:id",auth, updateAssistantship);
router.delete("/assistantship/:id",auth, deleteAssistantship);

//fellowship
router.post("/fellowship", auth,createFellowship);
router.get("/fellowship", getAllFellowship);
router.put("/fellowship/:id",auth, updateFellowship);
router.delete("/fellowship/:id",auth, deleteFellowship);

//publication
router.post("/publication",auth, createPublication);
router.get("/publication", getAllPublications);
router.put("/publication/:id", auth,updatePublication);
router.delete("/publication/:id",auth, deletePublication);

//referee
router.post("/referee",auth, createReferee);
router.get("/referee", getAllReferees);
router.put("/referee/:id",auth, updateReferee);
router.delete("/referee/:id",auth, deleteReferee);

//responsibility
router.post("/responsibility",auth, createResponsibility);
router.get("/responsibility", getAllResponsibilities);
router.put("/responsibility/:id",auth, updateResponsibility);
router.delete("/responsibility/:id",auth, deleteResponsibility);

//skills
router.post("/skills",auth, createSkill);
router.get("/skills", getAllSkills);
router.put("/skills/:id",auth, updateSkill);
router.delete("/skills/:id",auth, deleteSkill);

module.exports = router;
