const getPagination = (page, limit) => {
  const currentPage = Math.max(Number(page) || 1, 1);
  const pageLimit = Math.min(
    Math.max(Number(limit) || 10, 1),
    100
  );

  return {
    page: currentPage,
    limit: pageLimit,
    skip: (currentPage - 1) * pageLimit,
  };
};

export default getPagination;