import Message from "../models/Message.js";

export const getMessages = async (page = 1, limit = 10) => {
  const currentPage = Math.max(Number(page) || 1, 1);
  const pageLimit = Math.min(
    Math.max(Number(limit) || 10, 1),
    100
  );

  const skip = (currentPage - 1) * pageLimit;

  const [messages, total] = await Promise.all([
    Message.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(pageLimit),
    Message.countDocuments(),
  ]);

  return {
    messages,
    pagination: {
      page: currentPage,
      limit: pageLimit,
      total,
      totalPages: Math.ceil(total / pageLimit),
      hasNextPage: currentPage * pageLimit < total,
      hasPreviousPage: currentPage > 1,
    },
  };
};

export const getMessageById = async (id) => {
  const message = await Message.findById(id);

  if (!message) {
    const error = new Error("Message not found");
    error.statusCode = 404;
    throw error;
  }

  return message;
};

export const createMessage = async (data) => {
  return Message.create(data);
};

export const updateMessage = async (id, data) => {
  const message = await Message.findByIdAndUpdate(
    id,
    data,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!message) {
    const error = new Error("Message not found");
    error.statusCode = 404;
    throw error;
  }

  return message;
};

export const deleteMessage = async (id) => {
  const message = await Message.findByIdAndDelete(id);

  if (!message) {
    const error = new Error("Message not found");
    error.statusCode = 404;
    throw error;
  }

  return message;
};