import { createContext, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "./useLocalStorage";

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children, userData }) => {
    const [user, setUser] = useLocalStorage('user', null);
    const navigate = useNavigate();

    const login = async (data) => {
        //TODO
        // Make this function work like it should with DB methods
        // ---

        setUser(data.username);
        navigate("/dashboard/about", { replace: true });

        // if(await DBConnection.verifyUserPassword([data.username, data.password]) === 1){ // If user exists in our database and the credentials pass
        //     setUser(data.username);
        //     navigate("/dashboard/about", { replace: true });
        // }else if (await DBConnection.verifyUserPassword([data.username, data.password]) === -1) { // If user exists in our database and the credentials pass
        //     setUser(data.username);
        //     navigate("/admin/about", {replace: true});
        // }else {
        //     setUser(null);
        //     alert("Incorrect Username or Password")
        // }
    };

    const register = async (data) => {
        //TODO
        // Make this work with DB methods to add a new user to the database
        // ---
        // await FunctionThatAddsUser(await data.username, await data.password)
        // console.log("done waiting for addUser()")
        //await DBConnection.addUser([data.fName, data.lName, data.address, data.cardNumber, data.username, data.password])
        setUser(data.username);
        navigate("/dashboard/about", { replace: true });
    };

    const logout = () => {
        setUser(null);
        navigate("/", { replace: true });
    };

    const value = useMemo(
        () => ({
            user,
            login,
            register,
            logout
        }),
        [user]
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    return useContext(AuthContext);
};
