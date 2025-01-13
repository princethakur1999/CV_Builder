import mongoose from "mongoose";

const userDataSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    photo: {
      type: String,
      default:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUOdfo4lewXJYT_2xPo_Xu2Lj6XPn78X9UJA&s",
    },
    phone: {
      type: String,
    },
    country: {
      type: String,
    },
    state: {
      type: String,
    },
    linkedin: {
      type: String,
    },
    github: {
      type: String,
    },
    dob: {
      type: Date,
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "others"],
    },
    education: [
      {
        qualification: {
          type: String,
        },
        board: {
          type: String,
        },
        percentage: {
          type: String,
        },
        year: {
          type: String,
        },
      },
    ],
    skills: {
      type: [String],
    },
    projects: [{}],
    languages: {
      type: [String],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("UserData", userDataSchema);
