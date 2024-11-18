// Effective React Query Keys
// https://tkdodo.eu/blog/effective-react-query-keys#use-query-key-factories
// https://tkdodo.eu/blog/leveraging-the-query-function-context#query-key-factories


export const gateMasterQueryKeys = {
  all: ['gate-master'] as const,
  lists: (filter: TParams | null) => [...gateMasterQueryKeys.all, filter] as const,
};