import React, { createContext, useState } from 'react'

// Declaring UserContext to undefined
export const UserContext = createContext("")

// Declaring Default users and Current User Function
export function UserProvider({ children }) {
	const [userEmail, setUserEmail] = useState("");

	const updateUserEmail = (email) => {
		setUserEmail(email);
	};

	return (
		<UserContext.Provider value={{ userEmail, updateUserEmail }}>
			{children}
		</UserContext.Provider>
	)
}