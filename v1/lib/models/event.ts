import mongoose from "mongoose"

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide a title"],
      maxlength: [100, "Title cannot be more than 100 characters"],
    },
    description: {
      type: String,
      required: [true, "Please provide a description"],
    },
    price: {
      type: Number,
      required: [true, "Please provide a price"],
      min: [0, "Price cannot be negative"],
    },
    category: {
      type: String,
      required: [true, "Please provide a category"],
      enum: ["Hackathon", "Workshop", "Competition", "Symposium", "Other"],
    },
    image: {
      type: String,
      required: [true, "Please provide an image URL"],
    },
    date: {
      type: String,
      required: [true, "Please provide a date"],
    },
    time: {
      type: String,
      required: [true, "Please provide a time"],
    },
    location: {
      type: String,
      required: [true, "Please provide a location"],
    },
    capacity: {
      type: Number,
      required: [true, "Please provide a capacity"],
      min: [1, "Capacity must be at least 1"],
    },
  },
  {
    timestamps: true,
  },
)

export default mongoose.models.Event || mongoose.model("Event", eventSchema)
