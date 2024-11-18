import axiosInstance from "@/utils/interceptors";
import { trafficQueryKeys } from "@/hooks/Queries/traffic/query-keys";
import { QueryFunctionContext } from "@tanstack/react-query";

type TTrafficService = QueryFunctionContext<ReturnType<typeof trafficQueryKeys['lists']>>;

export const getTrafficListService = async ({
  queryKey: [ , params]
}: TTrafficService): Promise<any> => {
  const response = await axiosInstance.get('/lalins', { params });

  return response;
};