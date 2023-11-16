import { useState } from "react";
export const usePagination = () => {
  const [page, setPage] = useState<any>(1);
  const goNextPage = () => {
    setPage((prev: any) => prev + 1);
  };

  const goPrevPage = () => {
    setPage((prev: any) => prev - 1);
  };

  return [page, goNextPage, goPrevPage, setPage];
};
