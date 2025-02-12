import { Iuser } from '@/types/users.types';
import { createClient } from "@supabase/supabase-js";
import { ReactNode, useEffect, useState } from "react";
import React from 'react';

const supabaseUrl = import.meta.env.VITE_PUBLIC_URL_SUPABASE
const supabaseAnonKey = import.meta.env.VITE_PUBLIC_ANO_TOKEN

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const Home = (): ReactNode => {

  const [users, setUser] = useState<Iuser[] | null>([])
  useEffect(() => {
    getUsers()
  }, [])

  const  getUsers = async () => {
    const { data } = await supabase.from("user").select("*")

    if (data) {
      setUser(data)
    }
    setUser(data)
  }
  return (
    <div>
      {
        users?.map((user) => {
          return (
            <ul key={user.id}>
              <li>
                {
                  user.name
                }
                {
                  user.last_name
                }
              </li>
              <p> Mi edad es: {user.age}</p>
          </ul>
          )
        })
      }
    </div>
  )
}

