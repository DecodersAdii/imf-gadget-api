const Gadget = require('../models/Gadget');

const getAllGadgets = async (req, res) => {
  const { status } = req.query; // Get the status from query parameters
    
  let whereClause = {};
  if (status) {
    whereClause.status = status; // Filter by status if provided
  }

  const gadgets = await Gadget.findAll({ where: whereClause });
  const gadgetsWithProbability = gadgets.map(gadget => ({
    ...gadget.toJSON(),
    missionSuccessProbability: Math.floor(Math.random() * 100),
  }));
  res.json(gadgetsWithProbability);
};

const addGadget = async (req, res) => {
  const { name } = req.body;
  const codename = `The ${name}`;
  const gadget = await Gadget.create({ name: codename });
  res.status(201).json(gadget);
};

const updateGadget = async (req, res) => {
  const { id } = req.params;
  const { name, status } = req.body;
  const gadget = await Gadget.findByPk(id);
  if (gadget) {
    gadget.name = name || gadget.name;
    gadget.status = status || gadget.status;
    await gadget.save();
    res.json(gadget);
  } else {
    res.status(404).json({ message: 'Gadget not found' });
  }
};

const decommissionGadget = async (req, res) => {
  const { id } = req.params;
  const gadget = await Gadget.findByPk(id);
  if (gadget) {
    gadget.status = 'Decommissioned';
    gadget.decommissionedAt = new Date();
    await gadget.save();
    res.json({ message: 'Gadget decommissioned' });
  } else {
    res.status(404).json({ message: 'Gadget not found' });
  }
};

const selfDestruct = async (req, res) => {
  const { id } = req.params;
  const gadget = await Gadget.findByPk(id);
  if (gadget) {
    const confirmationCode = Math.floor(100000 + Math.random() * 900000);
    res.json({ confirmationCode, message: 'Self-destruct sequence initiated' });
  } else {
    res.status(404).json({ message: 'Gadget not found' });
  }
};

module.exports = {
  getAllGadgets,
  addGadget,
  updateGadget,
  decommissionGadget,
  selfDestruct,
};
