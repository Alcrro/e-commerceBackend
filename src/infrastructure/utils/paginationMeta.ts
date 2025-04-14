export const getPaginationMeta = (
  page: number,
  limit: number,
  totalRecords: number
) => {
  const totalPages = Math.ceil(totalRecords / limit);
  return {
    currentPage: page,
    totalPages,
    limit,
    totalRecords,
    hasNextPage: page < totalPages,
    hasPrevPage: page > 1,
  };
};
