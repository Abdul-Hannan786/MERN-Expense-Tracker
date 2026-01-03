/* eslint-disable react-refresh/only-export-components */
import { createContext, useState } from "react";

export const UserContext = createContext(null);

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Function to update user
  const updateUser = (userData) => {
    setUser(userData);
  };

  // Function to clear user data (e.g, on logout)
  const clearUser = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, setUser, updateUser, clearUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
