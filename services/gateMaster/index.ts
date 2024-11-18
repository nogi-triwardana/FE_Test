import axiosInstance from "@/utils/interceptors"
import { gateMasterQueryKeys } from "@/hooks/Queries/gateMaster/query-keys";
import { QueryFunctionContext } from "@tanstack/react-query";

type TGateMasterService = QueryFunctionContext<ReturnType<typeof gateMasterQueryKeys['lists']>>;

export const gateMasterListService = async({
  queryKey: [ , params]
}: TGateMasterService): Promise<any> => {
  const response = await axiosInstance.get('/gerbangs', { params });

  return response;
};

export const postGateMasterService = async (payload: any) => {
  const response = await axiosInstance.post('/gerbangs', payload);

  return response;
};

export const putGateMasterService = async (payload: any) => {
  const response = await axiosInstance.put('/gerbangs', payload);

  return response;
};

export const deleteGateMasterService = async (data: any) => {
  const response = await axiosInstance.delete('/gerbangs', { data });

  return response;
}