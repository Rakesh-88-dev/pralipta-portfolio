import {
  getPublicPortfolio,
} from "../services/public.service.js";

export const getPublicPortfolioData = async (
  req,
  res,
  next
) => {
  try {
    const portfolio = await getPublicPortfolio();

    return res.status(200).json({
      success: true,
      data: portfolio,
    });
  } catch (error) {
    next(error);
  }
};