/* eslint-disable react/react-in-jsx-scope */
import { createContext, ReactNode, useContext, useState } from "react";
import { getFetch } from "../../../hook/getFetchWhitCancel";

export interface ResponseData  {
  prompts: string
}

interface RedirectAwaitContext {
  onSubmit: (datos: ResponseData[]) => void;
  data: string
}

export const redirectAwaitContext = createContext<RedirectAwaitContext | null>(null)

export const RedirectProviderContext = ({children}: {children: ReactNode}) => {
  const [responseData, setDataResponse] = useState<string>('')

  const getPost = async (datos: ResponseData[]) => {
    const res = await getFetch<string>('/prompts', 'POST', datos)
    if(!res) return
    setDataResponse(res)
  }

  const onSubmit = async (datos: ResponseData[]) => {
    if(datos === undefined) return
    getPost(datos)
  }

  return(
    <redirectAwaitContext.Provider value={{onSubmit,  data: responseData}}>{children}</redirectAwaitContext.Provider>
  )
}

export const useRedirectContext = () => {
  const context = useContext(redirectAwaitContext)

  if (!context) {
    throw new Error('useUserContext must be used within a UserContextProvider');
  }
  return context;
}