import { Navigate, useOutlet } from "react-router-dom";
import { useAuth} from "../hooks/useAuth";
import { AppBar } from "./AppBar";

export const HomeLayout = () => {
    const { user } = useAuth();
    const outlet = useOutlet();

    //TODO
    // we need to check here if the user is an admin or not
    // if they are we send them to /admin/about
    if (user) {
        return <Navigate to="/dashboard/about" replace />;
    }

    return (
        <div>
            <AppBar
                pages={[
                    { label: "Home", path: "/" },
                    { label: "Login", path: "/login" }
                ]}
            />
            {outlet}
        </div>
    );
};