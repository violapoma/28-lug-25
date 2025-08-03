import { createContext, useContext, useState } from "react";

const tokenContext = createContext(); 

export function TokenContext({children}) {
  const token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODVhOThmNDRlZjFiYzAwMTVkZjViMDciLCJpYXQiOjE3NTQxNjMxNDEsImV4cCI6MTc1NTM3Mjc0MX0.HgHSwxOdRFu06jkEQ6OfEyBgEEYZ4cn_L_BlW1oBOzs"

  const [commentAuthor, setCommentAuthor] = useState('') ; 

  return (
    <tokenContext.Provider value={{token, commentAuthor, setCommentAuthor}}>
      {children}
    </tokenContext.Provider>
  )
}

export function useToken(){
  return useContext(tokenContext); 
}