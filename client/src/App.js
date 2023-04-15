import {createRoutesFromElements, defer, Route} from "react-router";
import {createBrowserRouter} from "react-router-dom";
import {ProtectedLayout} from "./Routing/ProtectedLayout";
import {HomeLayout} from "./Routing/HomeLayout";
import {AuthLayout} from "./Routing/AuthLayout";
import {LoginPage} from "./Pages/LoginPage";
import {RegisterPage} from "./Pages/RegisterPage";
import {LandingPage} from "./Pages/LandingPage";
import {WelcomePage} from "./Pages/WelcomePage";
import {AdminLayout} from "./Routing/AdminLayout";
import {SearchAuctionsPage} from "./Pages/SearchAuctionsPage";
import {UsersBidsPage} from "./Pages/UsersBidsPage";
import {CreateAuctionPage} from "./Pages/CreateAuctionPage";

//TODO
// add search page
// add auction view page, you should see current bid, next bid and be able to place a bid
// what happens when you win
// what happens when you get outbid
// User page?
const getUserData = () =>
    new Promise((resolve) =>
        setTimeout(() => {
          const user = window.localStorage.getItem("user");
          resolve(user);
        }, 0)
    );
export const router = createBrowserRouter(
    createRoutesFromElements(
        <Route
            element={<AuthLayout />}
            loader={() => defer({ userPromise: getUserData() })}>

          <Route element={<HomeLayout />}>
              <Route path="/" element={<WelcomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Route>

          <Route path="/dashboard" element={<ProtectedLayout />}>
              <Route path="about" element={<LandingPage />} />
              <Route path="search" element={<SearchAuctionsPage />} />
              <Route path="bids" element={<UsersBidsPage />} />

          </Route>
            <Route path="/admin" element={<AdminLayout />}>
                <Route path="about" element={<LandingPage />} />
                <Route path="search" element={<SearchAuctionsPage />} />
                <Route path="create" element={<CreateAuctionPage />} />
                <Route path="bids" element={<UsersBidsPage />} />
            </Route>
        </Route>
    )
);