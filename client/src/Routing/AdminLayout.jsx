import { Navigate, useOutlet } from "react-router-dom";
import { useAuth} from "../hooks/useAuth";
import { AppBar } from "./AppBar";

export const AdminLayout = () => {
    const {user} = useAuth();
    const outlet = useOutlet();
    // const isAdmin = DBConnection.verifyAdmin(user).then(() => {
    //     if(!isAdmin){
    //         return <Navigate to="/dashboard"/>;
    //     }
    // })

    if (!user) {
        return <Navigate to="/"/>;
    }

    return (
        <div>
            <AppBar
                pages={[
                    {label: "News & About", path: "about"},
                    {label: "Search Auctions", path: "search"},
                    {label: "Create Auction", path: "create"},
                    {label: "View Your Bids", path: "bids"},
                ]}
            />
            {outlet}
        </div>
    );
};
