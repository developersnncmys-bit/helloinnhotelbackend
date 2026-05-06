import Payment from "../models/Payment.js";

export const getAll = async (req, res, next) => {
  try {
    const { status, method, q } = req.query;
    const filter = {};
    if (status) filter.status = status;
    if (method) filter.method = method;
    if (q) {
      filter.$or = [
        { guest: { $regex: q, $options: "i" } },
        { booking: { $regex: q, $options: "i" } },
      ];
    }
    const payments = await Payment.find(filter).sort({ date: -1 });
    res.json(payments);
  } catch (err) {
    next(err);
  }
};

export const getById = async (req, res, next) => {
  try {
    const payment = await Payment.findById(req.params.id);
    if (!payment) return res.status(404).json({ message: "Payment not found" });
    res.json(payment);
  } catch (err) {
    next(err);
  }
};

export const create = async (req, res, next) => {
  try {
    const payment = await Payment.create(req.body);
    res.status(201).json(payment);
  } catch (err) {
    next(err);
  }
};

export const update = async (req, res, next) => {
  try {
    const payment = await Payment.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!payment) return res.status(404).json({ message: "Payment not found" });
    res.json(payment);
  } catch (err) {
    next(err);
  }
};

export const remove = async (req, res, next) => {
  try {
    const payment = await Payment.findByIdAndDelete(req.params.id);
    if (!payment) return res.status(404).json({ message: "Payment not found" });
    res.json({ message: "Payment deleted", id: req.params.id });
  } catch (err) {
    next(err);
  }
};

export const summary = async (_req, res, next) => {
  try {
    const result = await Payment.aggregate([
      {
        $group: {
          _id: "$status",
          total: { $sum: "$amount" },
          count: { $sum: 1 },
        },
      },
    ]);
    const summary = { Paid: 0, Pending: 0, Refunded: 0, count: 0 };
    result.forEach((r) => {
      summary[r._id] = r.total;
      summary.count += r.count;
    });
    res.json(summary);
  } catch (err) {
    next(err);
  }
};
