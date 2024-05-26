import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { OTP } from "./components/Auth/OTP";
import { DetailOrder } from "./components/TrackOrder/DetailOrder";
import { AboutUSPage } from "./pages/AboutUs/AboutUSPage";
import { ContactUSPage } from "./pages/ContactUs/ContactUSPage";
import DashboardPage from "./pages/Dashboard/DashboardPage";
import { Error404 } from "./pages/error/Error404";
import { FeaturesPages } from "./pages/Features/FeaturesPages";
import Forgetpass from "./pages/ForgotPassword/Forgetpass";
import ResetPasswordPage from "./pages/ForgotPassword/Resetpass";
import { LoginPage } from "./pages/Login/LoginPage";
import { Mainpage } from "./pages/Mainpages/Mainpage";
import { Signuppage } from "./pages/Signup/Signuppage";
import { TrackOrderHome } from "./pages/TrackOrder/TrackOrderHome";
import VerifyPage from "./pages/verifyPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Mainpage />} />
          <Route path="/login" element={<LoginPage />} />

          <Route path="/signup" element={<Signuppage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          {/* <Route path="/admin" element={<AdminComp />} /> */}
          <Route path="/aboutus" element={<AboutUSPage />} />
          <Route path="/contactus" element={<ContactUSPage />} />
          <Route path="/features" element={<FeaturesPages />} />
          <Route path="/trackorder" element={<TrackOrderHome />} />
          <Route path="/orders/:orderid" element={<DetailOrder />} />
          <Route path="/*" element={<Error404 />} />

          <Route path="/confirmotp" element={<OTP />} />
          <Route path="/forgot-password" element={<Forgetpass />} />
          <Route
            path="/resetPassword/:resetToken"
            element={<ResetPasswordPage />}
          />
          <Route path="/:verify" element={<VerifyPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
