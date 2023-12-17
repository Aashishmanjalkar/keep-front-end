import React, { createContext,useState } from 'react'

export const Context = createContext();
const AppContext = (props) => {
    const [fetchNotes, setfetchNotes] = useState('');
  return (
    <Context.Provider value={{
        fetchNotes,
        setfetchNotes
    }}>
        {props.children}
    </Context.Provider>
  )
}

export default AppContext