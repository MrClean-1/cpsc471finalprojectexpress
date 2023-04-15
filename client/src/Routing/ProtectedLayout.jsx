import {Navigate, useNavigate, useOutlet} from "react-router-dom";
import { useAuth} from "../hooks/useAuth";
import { AppBar } from "./AppBar";
import { get } from "../common/expressFunctions"

export const ProtectedLayout = () => {
    const {user} = useAuth();
    const outlet = useOutlet();
    const navigate = useNavigate();
    get("/db/isAdmin", {username: user})
        .then(response => {
        if(response !== "false"){
            navigate("/admin/about", {replace: true});
        }
    }).catch(console.error)

    if (!user) {
        return <Navigate to="/"/>;
    }

        return (
            <div>
                <AppBar
                    pages={[
                        {label: "News & About", path: "about"},
                        {label: "Search Auctions", path: "search"},
                        {label: "View Your Bids", path: "bids"},
                    ]}
                />
                {outlet}
            </div>
        );
};
