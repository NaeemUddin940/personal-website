interface LoadMoreProps {
  initialLoad: number;
  data: Data[];
  nextLoad?: number;
}

export const loadMore = ({
  initialLoad,
  data,
  nextLoad,
}: LoadMoreProps): Data[] => {
  const limit = typeof nextLoad === "number" ? nextLoad : initialLoad;

  return data.slice(0, limit);
};
