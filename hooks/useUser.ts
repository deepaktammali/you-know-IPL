import axios from "axios";
import { useCallback } from "react";
import useSWR from "swr";

export default function useUser(){
    const userFetcher = useCallback(
        async ()=>{
          const response = await axios.get('/api/user');
          return response;
        },
        [],
      );

    const {error,data: response} = useSWR('/api/user',userFetcher);

    return {
        isLoading: error==undefined && response==undefined,
        isError: error,
        user:response?.data?.user
    };
}