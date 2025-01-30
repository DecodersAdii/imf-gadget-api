const express = require('express');
const router = express.Router();
const gadgetController = require('../controllers/gadgetController');
const authenticateJWT = require('../middleware/auth');
// routes/gadgetRoutes.js
router.get('/gadgets', gadgetController.getAllGadgets); // Remove authenticateJWT
router.get('/gadgets', authenticateJWT, gadgetController.getAllGadgets);
router.post('/gadgets', authenticateJWT, gadgetController.addGadget);
router.patch('/gadgets/:id', authenticateJWT, gadgetController.updateGadget);
router.delete('/gadgets/:id', authenticateJWT, gadgetController.decommissionGadget);
router.post('/gadgets/:id/self-destruct', authenticateJWT, gadgetController.selfDestruct);

module.exports = router;