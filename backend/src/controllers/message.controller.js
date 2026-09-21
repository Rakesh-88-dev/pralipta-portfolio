import {
  getMessages as getMessagesService,
  getMessageById as getMessageByIdService,
  createMessage as createMessageService,
  updateMessage as updateMessageService,
  deleteMessage as deleteMessageService,
} from "../services/message.service.js";

import {
  sendContactNotification,
} from "../services/email.service.js";

export const getMessages = async (req, res, next) => {
  try {
    const { page, limit } = req.query;

    const result = await getMessagesService(page, limit);

    return res.status(200).json({
      success: true,
      data: result.messages,
      pagination: result.pagination,
    });
  } catch (error) {
    next(error);
  }
};

export const getMessage = async (req, res, next) => {
  try {
    const message = await getMessageByIdService(req.params.id);

    return res.status(200).json({
      success: true,
      data: message,
    });
  } catch (error) {
    next(error);
  }
};

export const createMessage = async (req, res, next) => {
  try {
    const message = await createMessageService(req.body);

    // Send email notification after the message is saved.
    // Email failure should not prevent the contact message
    // from being successfully stored in MongoDB.
    try {
      await sendContactNotification(message);
    } catch (emailError) {
      console.error(
        "Contact notification email failed:",
        emailError
      );
    }

    return res.status(201).json({
      success: true,
      message: "Message sent successfully",
      data: message,
    });
  } catch (error) {
    next(error);
  }
};

export const updateMessage = async (req, res, next) => {
  try {
    const message = await updateMessageService(
      req.params.id,
      req.body
    );

    return res.status(200).json({
      success: true,
      message: "Message updated successfully",
      data: message,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteMessage = async (req, res, next) => {
  try {
    await deleteMessageService(req.params.id);

    return res.status(200).json({
      success: true,
      message: "Message deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};