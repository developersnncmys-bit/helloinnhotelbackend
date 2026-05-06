import Room from "../models/Room.js";

export const getAll = async (req, res, next) => {
  try {
    const { status, type } = req.query;
    const filter = {};
    if (status) filter.status = status;
    if (type) filter.type = type;
    const rooms = await Room.find(filter).sort({ no: 1 });
    res.json(rooms);
  } catch (err) {
    next(err);
  }
};

export const getById = async (req, res, next) => {
  try {
    const room = await Room.findById(req.params.id);
    if (!room) return res.status(404).json({ message: "Room not found" });
    res.json(room);
  } catch (err) {
    next(err);
  }
};

export const create = async (req, res, next) => {
  try {
    const room = await Room.create(req.body);
    res.status(201).json(room);
  } catch (err) {
    next(err);
  }
};

export const update = async (req, res, next) => {
  try {
    const room = await Room.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!room) return res.status(404).json({ message: "Room not found" });
    res.json(room);
  } catch (err) {
    next(err);
  }
};

export const remove = async (req, res, next) => {
  try {
    const room = await Room.findByIdAndDelete(req.params.id);
    if (!room) return res.status(404).json({ message: "Room not found" });
    res.json({ message: "Room deleted", id: req.params.id });
  } catch (err) {
    next(err);
  }
};
