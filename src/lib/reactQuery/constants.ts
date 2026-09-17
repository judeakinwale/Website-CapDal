import { QueryClient } from "@tanstack/react-query"

export const queryKeys = {}

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            gcTime: 5000,
            staleTime: 10000,
            notifyOnChangeProps: ["data", "error"], // confirm this works as expected
            // refetchInterval: false,
            // refetchOnMount: true,
            // refetchOnReconnect: true,
            // refetchOnWindowFocus: true,
            // refetchIntervalInBackground: false
        }
    }
})