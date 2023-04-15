import { createContext, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "./useLocalStorage";
import { get, post } from "../common/expressFunctions"

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children, userData }) => {
    const [user, setUser] = useLocalStorage('user', null);
    const navigate = useNavigate();

    const login = async (data) => {
        //TODO
        // Make this function work like it should with DB methods
        // ---

        get("/db/login", data)
            .then(response => {
                if (response === "-1"){
                    setUser(data.username);
                    navigate("/admin/about", {replace: true});
                }else if (response === "1"){
                    setUser(data.username);
                    navigate("/dashboard/about", { replace: true });
                }else{
                    setUser(null);
                    alert("Incorrect Username or Password")
                }
            }).catch(console.error)
    };

    const register = async (data) => {
        //TODO
        // Make this work with DB methods to add a new user to the database
        // ---
        // await FunctionThatAddsUser(await data.username, await data.password)
        // console.log("done waiting for addUser()")

        console.log(data);

        await post("/db/register", data)
            .catch(console.error)
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
