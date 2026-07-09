const mongoose = require("mongoose");

const tripSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    destination: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Destination",
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    startDate: {
      type: Date,
      required: true,
    },

    endDate: {
      type: Date,
      required: true,
    },

    travelers: {
      type: Number,
      default: 1,
    },

    budget: {
      type: Number,
      default: 0,
    },

    selectedLessons: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Lesson",
      },
    ],

    itinerary: [
      {
        day: Number,
        activity: String,
      },
    ],

    travelNotes: {
      type: String,
    },

    status: {
      type: String,
      enum: ["Planning", "Booked", "Completed"],
      default: "Planning",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Trip", tripSchema);