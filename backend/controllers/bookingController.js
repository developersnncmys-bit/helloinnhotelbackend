import Booking from "../models/Booking.js";

export const getAll = async (req, res, next) => {
  try {
    const { status, source, q } = req.query;
    const filter = {};
    if (status) filter.status = status;
    if (source) filter.source = source;
    if (q) {
      filter.$or = [
        { guest: { $regex: q, $options: "i" } },
        { phone: { $regex: q, $options: "i" } },
        { room: { $regex: q, $options: "i" } },
      ];
    }
    const bookings = await Booking.find(filter).sort({ createdAt: -1 });
    res.json(bookings);
  } catch (err) {
    next(err);
  }
};

export const getById = async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: "Booking not found" });
    res.json(booking);
  } catch (err) {
    next(err);
  }
};

export const create = async (req, res, next) => {
  try {
    const booking = await Booking.create(req.body);
    res.status(201).json(booking);
  } catch (err) {
    next(err);
  }
};

export const update = async (req, res, next) => {
  try {
    const booking = await Booking.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!booking) return res.status(404).json({ message: "Booking not found" });
    res.json(booking);
  } catch (err) {
    next(err);
  }
};

export const remove = async (req, res, next) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id);
    if (!booking) return res.status(404).json({ message: "Booking not found" });
    res.json({ message: "Booking deleted", id: req.params.id });
  } catch (err) {
    next(err);
  }
};
