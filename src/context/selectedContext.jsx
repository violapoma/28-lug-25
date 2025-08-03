import { createContext, useContext, useState } from "react";

const selectedContext = createContext(); 

// tutti quelli che devono avere accesso a selected vanno chiusi in questo tag <SelectedProvider> ... </SelectedProvider>
export function SelectedProvider({children}) {

  //stato selected
  const [selected, setSelected] = useState('');
  const [title, setTitle] = useState('');

  return (
    <selectedContext.Provider value={ {selected, setSelected, title, setTitle} }>
      {children}
    </selectedContext.Provider>
  )
}

// Hook personalizzato, lo usano i figli 
export function useSelected(){
  return useContext(selectedContext); 
}

/**
 * const {selected, setSelected} = useSelected(); -> destructuring dell'oggetto stesso nome di value 
 * const {selected:asin} = useSelected(); -> prende selected e lo chiama asin
 */