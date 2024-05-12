import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Mainpage } from "./pages/Mainpages/Mainpage";
import { LoginPage } from "./pages/Login/LoginPage";
import { Signuppage } from "./pages/Signup/Signuppage";
import DashboardPage from "./pages/Dashboard/DashboardPage";
import { AboutUSPage } from "./pages/AboutUs/AboutUSPage";
import { ContactUSPage } from "./pages/ContactUs/ContactUSPage";
import { FeaturesPages } from "./pages/Features/FeaturesPages";
import { Error404 } from "./pages/error/Error404";
import { TrackOrderHome } from "./pages/TrackOrder/TrackOrderHome";
import { DetailOrder } from "./components/TrackOrder/DetailOrder";
import { OTP } from "./components/Auth/OTP";
import Forgetpass from "./pages/ForgotPassword/Forgetpass";
import ResetPasswordPage from "./pages/ForgotPassword/Resetpass";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Mainpage />} />
          <Route path="/login" element={<LoginPage />} />

          <Route path="/signup" element={<Signuppage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/aboutus" element={<AboutUSPage />} />
          <Route path="/contactus" element={<ContactUSPage />} />
          <Route path="/features" element={<FeaturesPages />} />
          <Route path="/trackorder" element={<TrackOrderHome />} />
          <Route path="/orders/:orderid" element={<DetailOrder />} />
          <Route path="/*" element={<Error404 />} />

          <Route path="/confirmotp" element={<OTP />} />
          <Route path="/forgot-password" element={<Forgetpass />} />
          <Route path="/resetPassword/:resetToken" element={<ResetPasswordPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
