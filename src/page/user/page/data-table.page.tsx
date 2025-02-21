import { supabaseAnonKey, supabaseUrl } from '@/hook/useSupabase'
import { columns, User } from '@/page/user/components/columns'
import { createClient } from '@supabase/supabase-js'
import { JSX, useEffect, useState } from 'react'
import { DataTable } from '../components/datatable'
import React from 'react'

const supabase = createClient(supabaseUrl,supabaseAnonKey)

export default function PageDataTableUser(): JSX.Element {
  const [user, setGetUser] = useState<User[]>([])

  useEffect(() =>  {
    getUser()
  }, [])

   async function getUser () {
    const { data } = await supabase.from("user").select("*")

    if(data === null) return

    setGetUser(data)
   }

  return (
      <DataTable columns={columns} data={user}/>
      )
}
