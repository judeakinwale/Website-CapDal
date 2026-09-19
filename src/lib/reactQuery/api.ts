"use client";
import { toast } from "sonner";
import {
  DefinedInitialDataOptions,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { RequestInit } from "next/dist/server/web/spec-extension/request";
import { tryStringify } from "@/utils/json";

const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3001";

// no initial fetch or refetch without explicit refetch
export const noUpdateQueryArgs: Partial<
  DefinedInitialDataOptions<any, Error, any, readonly unknown[]>
> = {
  enabled: false,
  refetchOnMount: false,
  refetchOnWindowFocus: false,
  refetchOnReconnect: false,
  staleTime: Infinity,
};

type id = string | number;

export const handleId = (id?: id | false): string => {
  return id === false ? "" : `/${id || ""}`;
};

export const handleQueryArgs = <T>(
  args?:
    | false
    | Partial<DefinedInitialDataOptions<T, Error, T, readonly unknown[]>>,
) => {
  if (args === false) return noUpdateQueryArgs;
  return {};
};

export const handleSuccessMessage = (
  msg?: string | false,
  defaultMsg?: string,
) => {
  if (msg === false) return;
  msg ||= defaultMsg;
  msg && toast.success(msg);
};

export const getValidAPIResponse = async (response: Response) => {
  if (!response.ok) {
    throw new Error(response.statusText || "Error contacting server");
  }
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.error || data?.message || "Error contacting server");
  }
  return data;
};

export const getItems = async (relativeUrl: string) => {
  const url = `${BASE_URL}${relativeUrl}`;
  const response = await fetch(url, {
    method: "GET",
    credentials: "include",
  });
  const data = await getValidAPIResponse(response);
  return data?.data || data?.results || data?.referrals;
};

export const getItemsWithQuery = async (
  relativeUrl: string,
  queryParams?: Record<string, string | number>,
) => {
  const url = new URL(`${BASE_URL}${relativeUrl}`);
  if (queryParams) {
    Object.entries(queryParams).forEach(([key, value]) => {
      url.searchParams.append(key, String(value));
    });
  }
  const response = await fetch(url.toString(), {
    method: "GET",
    credentials: "include",
  });

  const data = await getValidAPIResponse(response);
  return data;
};

export const getItem = async (relativeUrl: string, id?: id | false) => {
  const idSection = handleId(id);
  const url = `${BASE_URL}${relativeUrl}${idSection}`;
  const response = await fetch(url, {
    method: "GET",
    credentials: "include",
  });
  const data = await getValidAPIResponse(response);
  return data?.data || data?.results || data;
};

export const createItem = async (relativeUrl: string, formData: any) => {
  const url = `${BASE_URL}${relativeUrl}`;
  const response = await fetch(url, {
    method: "POST",
    body: tryStringify(formData),
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await getValidAPIResponse(response);
  return data?.data || data?.results;
};

export const updateItem = async (
  relativeUrl: string,
  formData: any,
  id?: id | false,
  method: RequestInit["method"] = "PUT",
) => {
  const idSection = handleId(id);
  const url = `${BASE_URL}${relativeUrl}${idSection}`;
  console.log({ formData });
  const response = await fetch(url, {
    method: method,
    body: tryStringify(formData),
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await getValidAPIResponse(response);
  return data?.data || data?.results;
};

export const deleteItem = async (relativeUrl: string, id?: id | false) => {
  const idSection = handleId(id);
  const url = `${BASE_URL}${relativeUrl}${idSection}`;
  const response = await fetch(url, {
    method: "DELETE",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await getValidAPIResponse(response);
  return data;
};

export const getMutationResult = async (
  relativeUrl: string,
  method: string = "GET",
  payload?: Record<string, any>,
) => {
  const url = relativeUrl?.startsWith("http")
    ? relativeUrl
    : `${BASE_URL}${relativeUrl}`;
  const response = await fetch(url, {
    method: method,
    body: tryStringify(payload),
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await getValidAPIResponse(response);
  return data?.data || data?.results || data;
};

export const useGetItems = <T>(
  relativeUrl: string,
  placeholder?: T[],
  args?:
    | false
    | Partial<DefinedInitialDataOptions<T[], Error, T[], readonly unknown[]>>,
) => {
  args = handleQueryArgs<T[]>(args);

  return useQuery<T[]>({
    placeholderData: placeholder,
    queryFn: async () => await getItems(relativeUrl),
    queryKey: [relativeUrl],
    ...args,
  });
};

export const useGetItem = <T>(
  relativeUrl: string,
  id?: id | false,
  // placeholder?: any,
  args?:
    | false
    | Partial<DefinedInitialDataOptions<T, Error, T, readonly unknown[]>>,
) => {
  args = handleQueryArgs<T>(args);

  return useQuery<T>({
    // placeholderData: placeholder,
    queryFn: async () => await getItem(relativeUrl, id),
    queryKey: [relativeUrl, id],
    ...args,
  });
};

export const useCreateItem = <T>(
  relativeUrl: string,
  successMessage?: string | false,
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: Record<string, any>) =>
      await createItem(relativeUrl, payload),
    async onSuccess(data, variables, context) {
      console.log({ data, variables, context });
      await queryClient.invalidateQueries({ queryKey: [relativeUrl] });

      handleSuccessMessage(successMessage, "Item created successfully");
    },
    onError(error, variables, context) {
      console.log({ error, variables, context });
      toast.error(
        error?.message ||
          "An error occurred while submitting your request. Please try again.",
      );
    },
  });
};

export const useCreateMultipleItems = <T>(
  relativeUrl: string,
  successMessage?: string,
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payloadList: Record<string, any>[]) => {
      const res = await Promise.all(
        payloadList?.map(async (payload) => {
          return createItem(relativeUrl, payload);
        }),
      );
      return res;
    },
    async onSuccess(data, variables, context) {
      console.log({ data, variables, context });
      await queryClient.invalidateQueries({ queryKey: [relativeUrl] });

      const msg = successMessage ? successMessage : "Item created successfully";
      toast.success(msg);
    },
    onError(error, variables, context) {
      console.log({ error, variables, context });
      toast.error(
        error?.message ||
          "An error occurred while submitting your request. Please try again.",
      );
    },
  });
};

export const useUpdateItem = <T>(
  relativeUrl: string,
  id?: id | false,
  successMessage?: string | false,
  idKey: string = "id",
  // method: string = "PUT"
) => {
  const queryClient = useQueryClient();

  function getPayloadId(payload: any) {
    return id === false ? id : payload?.[idKey];
  }

  return useMutation({
    mutationFn: async (payload: any) =>
      // await updateItem(relativeUrl, payload, getPayloadId(payload), method),
      await updateItem(relativeUrl, payload, getPayloadId(payload)),
    async onSuccess(data, variables, context) {
      console.log({ data, variables, context });
      await queryClient.invalidateQueries({ queryKey: [relativeUrl] });

      handleSuccessMessage(successMessage, "Item updated successfully");
    },
    onError(error, variables, context) {
      console.log({ error, variables, context });
      toast.error(
        error?.message ||
          "An error occurred while submitting your request. Please try again.",
      );
    },
  });
};

export const useDeleteItem = <T>(
  relativeUrl: string,
  successMessage?: string | false,
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id?: id | false) => await deleteItem(relativeUrl, id),
    async onSuccess(data, variables, context) {
      console.log({ data, variables, context });
      await queryClient.invalidateQueries({ queryKey: [relativeUrl] });

      handleSuccessMessage(successMessage, "Item deleted successfully");
    },
    onError(error, variables, context) {
      console.log({ error, variables, context });
      toast.error(
        error?.message ||
          "An error occurred while submitting your request. Please try again.",
      );
    },
  });
};

type args = {
  relativeUrl?: string;
  method?: string;
  payload?: Record<string, any>;
};

export const useGetMutationResult = <T>(
  relativeUrl?: string,
  method: string = "GET",
  payload?: Record<string, any>,
  successMessage?: string,
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (args?: args) => {
      const validRelativeUrl = args?.relativeUrl || relativeUrl;
      const validMethod = args?.method || method;

      const isGetMethod = validMethod === "GET" || validMethod === "Head";
      const validPayload = isGetMethod
        ? undefined
        : { ...(args?.payload || {}), ...(payload || {}) };

      const res = getMutationResult(
        validRelativeUrl!,
        validMethod,
        validPayload,
      );
      return res;
    },
    async onSuccess(data, variables, context) {
      console.log({ data, variables, context });
      await queryClient.invalidateQueries({ queryKey: [relativeUrl] });

      // handleSuccessMessage(successMessage, "Successful");
    },
    onError(error, variables, context) {
      console.log({ error, variables, context });
      toast.error(
        error?.message ||
          "An error occurred while submitting your request. Please try again.",
      );
    },
  });
};
