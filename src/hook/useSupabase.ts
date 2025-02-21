import { useEffect, useState } from "react";
import { Iuser } from '@/types/users.types';
import { createClient } from "@supabase/supabase-js";


export const supabaseUrl = import.meta.env.VITE_PUBLIC_URL_SUPABASE
export const supabaseAnonKey = import.meta.env.VITE_PUBLIC_ANO_TOKEN

const supabase = createClient(supabaseUrl, supabaseAnonKey);


export function useSupabase() {
  const [users, setUsers] = useState<Iuser[] | null>([])
  useEffect(() => {
    getUsers()
  }, [])

  const  getUsers = async () => {
    const { data } = await supabase.from("user").select("*")

    if (data) {
      setUsers(data)
    }
    setUsers(data)
  }

  return {users}
}
