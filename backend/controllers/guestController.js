import Guest from "../models/Guest.js";

export const getAll = async (req, res, next) => {
  try {
    const { status, q } = req.query;
    const filter = {};
    if (status) filter.status = status;
    if (q) {
      filter.$or = [
        { name: { $regex: q, $options: "i" } },
        { phone: { $regex: q, $options: "i" } },
        { email: { $regex: q, $options: "i" } },
        { room: { $regex: q, $options: "i" } },
      ];
    }
    const guests = await Guest.find(filter).sort({ createdAt: -1 });
    res.json(guests);
  } catch (err) {
    next(err);
  }
};

export const getById = async (req, res, next) => {
  try {
    const guest = await Guest.findById(req.params.id);
    if (!guest) return res.status(404).json({ message: "Guest not found" });
    res.json(guest);
  } catch (err) {
    next(err);
  }
};

export const create = async (req, res, next) => {
  try {
    const guest = await Guest.create(req.body);
    res.status(201).json(guest);
  } catch (err) {
    next(err);
  }
};

export const update = async (req, res, next) => {
  try {
    const guest = await Guest.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!guest) return res.status(404).json({ message: "Guest not found" });
    res.json(guest);
  } catch (err) {
    next(err);
  }
};

export const checkout = async (req, res, next) => {
  try {
    const guest = await Guest.findByIdAndUpdate(
      req.params.id,
      { status: "Checked Out", checkout: new Date() },
      { new: true }
    );
    if (!guest) return res.status(404).json({ message: "Guest not found" });
    res.json(guest);
  } catch (err) {
    next(err);
  }
};

export const remove = async (req, res, next) => {
  try {
    const guest = await Guest.findByIdAndDelete(req.params.id);
    if (!guest) return res.status(404).json({ message: "Guest not found" });
    res.json({ message: "Guest deleted", id: req.params.id });
  } catch (err) {
    next(err);
  }
};
