import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },

    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      maxlength: 200,
    },

    subject: {
      type: String,
      trim: true,
      maxlength: 200,
      default: "",
    },

    message: {
      type: String,
      required: true,
      trim: true,
      maxlength: 5000,
    },

    status: {
      type: String,
      enum: ["unread", "read", "replied", "archived"],
      default: "unread",
    },

    repliedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const Message = mongoose.model("Message", messageSchema);

export default Message;