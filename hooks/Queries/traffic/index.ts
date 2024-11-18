import { getTrafficListService } from "@/services";
import { useQuery } from "@tanstack/react-query"
import { trafficQueryKeys } from "./query-keys";
import { useEffect } from "react";
import { getErrorMessage } from "@/utils/helpers";
import { useSnackbar } from "notistack";

const useQueryGetTrafficList = (params: TParams) => {
  const { data, isLoading, refetch, error, isError } = useQuery({
    queryKey: trafficQueryKeys.lists(params),
    queryFn: getTrafficListService,
  });
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if(isError) {
      enqueueSnackbar(getErrorMessage(error), { variant: "error" });
    }
  }, [isError]);

  return {
    trafficListData: data?.data?.data?.rows?.rows ?? [],
    trafficIsLoading: isLoading,
    trafficRefetch: refetch,
    paginationData: {
      total: data?.data?.data?.count,
      currentPage: data?.data?.data?.current_page,
      lastPage: data?.data?.data?.total_pages,
      limit: 10,
    }
  };
};

export default useQueryGetTrafficList;