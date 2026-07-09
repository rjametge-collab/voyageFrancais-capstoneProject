const mongoose = require("mongoose");
const Trip = require("../models/Trips");

const validateObjectIdValue = (value, fieldName) => {
  if (value === undefined || value === null) {
    return value;
  }

  if (Array.isArray(value)) {
    return value.map((item) => validateObjectIdValue(item, fieldName));
  }

  if (typeof value !== "string") {
    return value;
  }

  const trimmed = value.trim();

  if (!trimmed) {
    return value;
  }

  if (!mongoose.Types.ObjectId.isValid(trimmed)) {
    throw new Error(`${fieldName} must be a valid ObjectId`);
  }

  return trimmed;
};

const normalizeTripPayload = (payload = {}) => {
  const normalizedPayload = { ...payload };

  if (normalizedPayload.user !== undefined) {
    normalizedPayload.user = validateObjectIdValue(normalizedPayload.user, "user");
  }

  if (normalizedPayload.destination !== undefined) {
    normalizedPayload.destination = validateObjectIdValue(normalizedPayload.destination, "destination");
  }

  if (normalizedPayload.selectedLessons !== undefined) {
    normalizedPayload.selectedLessons = validateObjectIdValue(normalizedPayload.selectedLessons, "selectedLessons");
  }

  return normalizedPayload;
};

// GET all trips
const getTrips = async (req, res) => {
  try {
    const trips = await Trip.find()
      .populate("user", "firstName lastName email")
      .populate("destination")
      .populate("selectedLessons");

    res.status(200).json(trips);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET one trip
const getTripById = async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id)
      .populate("user", "firstName lastName email")
      .populate("destination")
      .populate("selectedLessons");

    if (!trip) {
      return res.status(404).json({
        message: "Trip not found",
      });
    }

    res.status(200).json(trip);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// CREATE trip
const createTrip = async (req, res) => {
  try {
    const normalizedPayload = normalizeTripPayload(req.body);
    const trip = await Trip.create(normalizedPayload);

    res.status(201).json({
      success: true,
      message: "Trip created successfully",
      trip,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// UPDATE trip
const updateTrip = async (req, res) => {
  try {
    const normalizedPayload = normalizeTripPayload(req.body);
    const trip = await Trip.findByIdAndUpdate(
      req.params.id,
      normalizedPayload,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!trip) {
      return res.status(404).json({
        success: false,
        message: "Trip not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Trip updated successfully",
      trip,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// DELETE trip
const deleteTrip = async (req, res) => {
  try {
    const trip = await Trip.findByIdAndDelete(req.params.id);

    if (!trip) {
      return res.status(404).json({
        message: "Trip not found",
      });
    }

    res.status(200).json({
      message: "Trip deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getTrips,
  getTripById,
  createTrip,
  updateTrip,
  deleteTrip,
};