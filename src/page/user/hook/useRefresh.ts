"use client"

import { useEffect, useState } from "react";


export const useRefreshData = <T>(
  fetchData: () => Promise<{data: T[]}>
): {
  data: T[],
  refreshData: () => Promise<void>
} => {
  const [data, setData] = useState<T[]>([]);

  const refreshData = async (): Promise<void> => {
    const {data} = await fetchData();

    setData(data)
  };

  useEffect(() => {
    refreshData()
  }, [])

  return {data, refreshData}
}