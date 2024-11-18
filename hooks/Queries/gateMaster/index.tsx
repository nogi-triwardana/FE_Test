import { gateMasterListService } from "@/services";
import { getErrorMessage } from "@/utils/helpers";
import { useQuery } from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import { useEffect } from "react";
import { gateMasterQueryKeys } from "./query-keys";

const useQueryGateMasterList = (params: TParams) => {
  const { data, isLoading, refetch, error, isError } = useQuery({
    queryKey: gateMasterQueryKeys.lists(params),
    queryFn: gateMasterListService,
  });
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if(isError) {
      enqueueSnackbar(getErrorMessage(error), { variant: "error" });
    }
  }, [isError]);

  return {
    gateMasterListData: data?.data?.data?.rows?.rows ?? [],
    gateMasterIsLoading: isLoading,
    gateMasterRefetch: refetch,
    paginationData: {
      total: data?.data?.data?.count,
      currentPage: data?.data?.data?.current_page,
      lastPage: data?.data?.data?.total_pages,
      limit: 10,
    }
  };
};

export default useQueryGateMasterList;