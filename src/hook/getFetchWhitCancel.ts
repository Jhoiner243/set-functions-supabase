/* eslint-disable @typescript-eslint/no-explicit-any */
import { VITE_API_URL } from "@/config/config.env";
import { ApiError } from "../applications/custom-error";

type cacheMode =  'no-store' | 'reload' | 'force-cache'

const cache = new Map<string, unknown>()

export const getFetch = async <ResponseType, RequestType = any > (
  url: string,
  method: 'GET' | 'POST' | 'DELETE' | 'PUT' = 'GET',
  data?: RequestType | null | undefined,
  headers?: Record<string, string>,
  cacheMode: cacheMode = 'no-store',
  timeout?: number
): Promise<ResponseType | undefined> => {
  const  abortController = new AbortController()
  const signal = abortController.signal

  const timeoutId = timeout ? setTimeout(() => abortController.abort(), timeout) : null

  try {
    const response = await fetch(`${VITE_API_URL}${url}`, {
      method,
      body: data ? JSON.stringify(data) : null,
      headers: {
       "Content-Type": "application/json",
       ...headers
      },
      credentials: 'include',
      signal,
      cache: cacheMode
    }
  )

  if(!response.ok){
   if(response.status === 401){ throw new ApiError(url, response.status, "Unathorized", "Access no autorizado")}
  new ApiError(url, response.status, "Fetch Error", response.statusText);
  }

  let responseData: ResponseType | null = null
  try {
    const contentType = response.headers.get("content-type")

    if(contentType && contentType.includes("application/json")){
      responseData = await response.json()
    } else {
      throw new ApiError(
        url,
        500,
        "Invalid Contet-Type",
        "Expected JSON or text response pero recibe diferente content-type"
      )
    }
  } catch(jsonError) {
    if(jsonError instanceof SyntaxError){
      throw new ApiError(url, 500, "JSON parser error", "Failed to parse JSON response")
    }else{
      throw new ApiError(
        url,
        500,
        "Unknow error",
        "An unknow error ocurred while parsing JSON response"
      )
    }
  }

  if(!responseData){
    throw new ApiError(url, 500, "Fetch error", "No response data found");
  }

  if(cacheMode !== "no-store"){
    cache.set(url, responseData)
  }

  return responseData;
  } catch(err: unknown){
    if(err instanceof ApiError){
      throw err
    }

    if (err instanceof Error && err.name === "AbortError") {
			throw new ApiError(url, 499, "Abort Error", "Client Closed Request");
		}

    if (cacheMode !== "no-store" && cache.has(url)) {
			return cache.get(url) as ResponseType;
		}

    throw new ApiError(url, 500, "Internal Error", "Internal Server Error");
  } finally {
		if (timeoutId) {
			clearTimeout(timeoutId);
		}
		abortController.abort();
	}
};
