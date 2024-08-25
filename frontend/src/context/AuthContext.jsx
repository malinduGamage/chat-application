import { createContext, useState, useContext } from "react";

export const AuthContext = createContext();

export const useAuthContext = () => {
    return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
    const [authUser, setAuthUser] = useState(JSON.parse(localStorage.getItem('chat-user')) || null);

    const saveUser = (user) => {
        setAuthUser(user);
        localStorage.setItem('chat-user', JSON.stringify(user));
    }

    return (
        <AuthContext.Provider value={{ authUser, setAuthUser: saveUser }}>
            {children}
        </AuthContext.Provider>
    );
}
