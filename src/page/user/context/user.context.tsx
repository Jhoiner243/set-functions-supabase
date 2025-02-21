/* eslint-disable react/react-in-jsx-scope */
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { getFetch } from "../../../hook/getFetchWhitCancel";
import { Rol, UserEntity, UserLoginEntity } from "../types/user.types";


export interface UserContext {
  roles: Rol[] | undefined;
  getUser: UserEntity[];
  onSubmit: (data: UserEntity) => void;
  handleSubmitLogin: (data: UserLoginEntity) => void;
  refreshUsers: () => Promise<void>;
}

const UserCreateContext = createContext<UserContext | null>(null);

export const UserContextProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState<UserEntity[]>([]);
  const [roles, setRoles] = useState<Rol[] | undefined>([])
  const [form, setForm] = useState<UserEntity>()
  const [login, setLogin] = useState<UserLoginEntity>()

  const getUsers = async () => {
    const res = await getFetch<UserEntity[]>('/usuarios', 'GET');
    if (!res) return;
    setData(res);
  };

  const getRoles = async () => {
    const res = await getFetch<Rol[]>('/registerRol', 'GET');
    setRoles(res)
  }

  useEffect(() => {
    getRoles()
  }, [])

  const postUserLogin = async () => {
    const res = await getFetch<UserLoginEntity>('/login', 'POST', login)
    console.log(res)
    if(!res) return
  }

  const postUserRegister= async () => {
    const res = await getFetch<UserEntity>("/register", 'POST',
      form
    )
    if(!res) console.log("No hubo respuesta del backend")
  }

  const handleSubmitLogin = async (data: UserLoginEntity) => {
    setLogin(data)
    await postUserLogin()
  }

  const onSubmit = async(data: UserEntity)  => {
    // Example: Replace with actual form data handling
    setForm(data)
    if(!data) return new Error("Error no hay datos para enviar")
    await postUserRegister()
  };

  return (
    <UserCreateContext.Provider 
      value={{
        roles,
        handleSubmitLogin,
        getUser: data,
        onSubmit,
        refreshUsers: getUsers 
      }}
    >
      {children}
    </UserCreateContext.Provider>
  );
};

// Context consumption hook
export const useUserContext = () => {
  const context = useContext(UserCreateContext);
  if (!context) {
    throw new Error('useUserContext must be used within a UserContextProvider');
  }
  return context;
};