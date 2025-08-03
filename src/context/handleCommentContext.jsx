import { useContext, createContext, useState } from "react";

const handleCommentContext = createContext(); 

export function HandleCommentProvider({children}) {

  const [editingComment, setEditingComment] = useState(null);
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);

  return (
    <handleCommentContext.Provider value={{editingComment, setEditingComment, isAccordionOpen, setIsAccordionOpen}}>
      {children}
    </handleCommentContext.Provider>
  )
}

export function useHandleCommentContext() {
  return useContext(handleCommentContext); 
}