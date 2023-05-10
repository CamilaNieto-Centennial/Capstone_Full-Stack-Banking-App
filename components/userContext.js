import React from 'react'

// Declaring UserContext to undefined
export const UserContext = React.createContext(undefined)

// Declaring Default users and Current User Function
export function UserProvider({ children }) {
	return (
		<UserContext.Provider value={{users:[{name:"Kmi", email:"kmi@gmail.com", password:"1234", balance:100}], current_user:["Guest", 0, "email"]}}>
			{ children }
		</UserContext.Provider>
	)
}