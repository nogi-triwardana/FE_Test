import { gateMasterQueryKeys } from "@/hooks/Queries/gateMaster/query-keys";

type TGateMasterService = QueryFunctionContext<ReturnType<typeof gateMasterQueryKeys['lists']>>;