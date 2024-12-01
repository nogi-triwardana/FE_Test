// Effective React Query Keys
// https://tkdodo.eu/blog/effective-react-query-keys#use-query-key-factories
// https://tkdodo.eu/blog/leveraging-the-query-function-context#query-key-factories


export const trafficQueryKeys = {
  all: ['traffic'] as const,
  lists: (filter: TParams | null) => [...trafficQueryKeys.all, filter] as const,
};