import { Route, Routes } from 'react-router-dom';
import './App.css';
import Preloader from './components/Preloader';
import { Toaster } from "react-hot-toast";

import Intro from './components/Intro.jsx';
import Auth from './pages/Auth.jsx';
import LoginCompany from './pages/LoginCompany';
import UserHome from './modules/user/components/UserHome';
import { useEffect, useState } from 'react';
import CustomCursor from './components/CustomCursor';
import MainDashboard from './modules/user/components/MainDashboard';
import Interviewprep from './modules/user/pages/Interviewprep.jsx';
import AptitudeTest from './modules/user/pages/AptitudeTest.jsx';
import Vidoes from './modules/user/pages/Vidoes.jsx';
import Tips from './modules/user/pages/Tips.jsx';
import MainInterview from './modules/user/pages/MainInterview.jsx';
import VideoMain from './modules/user/pages/VideoMain.jsx';
import Contact from './modules/user/components/Contact';
import JobDetails from './modules/user/pages/JobDetails.jsx';
import CompanyProfile from './modules/user/pages/CompanyProfile.jsx';
import JobVacancies from './modules/user/pages/JobVacancies.jsx';
import AdminDashboard from './modules/admin/components/AdminDashboard.jsx';
import AdminPreloader from './modules/admin/components/AdminPreloader.jsx';
import CompanyDashboard from './modules/company/components/CompanyDashboard.jsx';

// Shopping imports
import Dashboard from "./modules/user/pages/shopping/Dashboard.jsx";
import ShoppingHome from "./modules/user/pages/shopping/ShoppingHome.jsx";
import CategoryPage from "./modules/user/pages/shopping/CategoryPage.jsx";
import ProductDetails from "./modules/user/pages/shopping/ProductDetails.jsx";
import Cart from "./modules/user/pages/shopping/Cart.jsx";
import Checkout from "./modules/user/pages/shopping/Checkout.jsx";
import OrderSuccess from "./modules/user/pages/shopping/OrderSuccess.jsx";
import MyOrders from "./modules/user/pages/shopping/MyOrders.jsx";
import Products from "./modules/user/pages/shopping/Products.jsx";

// Cart Context
import { CartProvider } from './modules/user/pages/shopping/context/CartContext.jsx';
import PleaseLogin from './components/PleaseLogin.jsx';
import Settings from './modules/user/components/Settings.jsx';
import Managevideos from './modules/admin/pages/ManageVideos.jsx';
import NewArrivals from './modules/user/pages/shopping/NewArrivals.jsx';
import Shipping from './modules/user/pages/shopping/Shippung.jsx';
import PaymentSuccess from './modules/user/pages/shopping/PaymentSuccess.jsx';
import CompanyVacancies from './modules/user/pages/CompanyVacancies.jsx';
import ApplyForm from './modules/user/pages/Applyform.jsx';
import JobHome from './modules/user/pages/JobHome.jsx';
import ApplySuccess from './modules/user/pages/ApplySuccess.jsx';
import PaymentErorr from './modules/user/pages/shopping/PaymentErorr.jsx';
import MyApplication from './modules/user/pages/MyApplication.jsx';
import AdminUserDahsBoard from './modules/admin/components/AdminUserDahsboard.jsx';
import { WishlistProvider } from "./modules/user/pages/shopping/context/WishlistContext.jsx";
import WishlistPage from './modules/user/pages/shopping/WishlistPage.jsx';
import RoleSelection from './components/RoleSelection.jsx';
import CandidateProfile from './modules/company/pages/CandidateProfile.jsx';
import UserJobs from './modules/user/pages/UserJobs.jsx';
import UserSettings from './modules/user/pages/UserSetting.jsx';
import AboutPage from './modules/user/components/About.jsx';



function App() {
  const [loading, setLoading] = useState(true);
  const [adminLoading, setAdminLoading] = useState(true);
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setAdminLoading(false), 5000);
    return () => clearTimeout(timer);
  }, []);


  // *toast for add to cart


  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 2000,
          style: {
            background: "#111",
            color: "#fff",
            borderRadius: "12px",
          },
        }}
      />


      <CustomCursor />

      {/* CartProvider wraps ONLY the shopping-related routes */}
      <WishlistProvider>
        <CartProvider>
          <Routes>
            {/* General Routes */}
            <Route path='/' element={loading ? <Preloader /> : <Intro />} />

            <Route path='/intro' element={<Intro />} />
            <Route path='/plslogn' element={<PleaseLogin />} />
            <Route path='/role' element={<RoleSelection />} />

            {/* <Route path='/RoleSelection' element={<RoleSelection />} /> */}
            <Route path="/auth" element={<Auth />} />

            <Route path='/logincompany' element={<LoginCompany />} />
            <Route path='/home' element={<UserHome />} />
            <Route path='/main' element={<MainDashboard />} />

            <Route path="/inter" element={<Interviewprep />} />
            <Route path="/aptitude" element={<AptitudeTest />} />
            <Route path="/videos" element={<Vidoes />} />
            <Route path="/tips" element={<Tips />} />
            <Route path="/maininter" element={<MainInterview />} />
            <Route path="/mainvdo" element={<VideoMain />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<AboutPage />} />

            {/* 
          <Route path="/company/:name" element={<CompanyProfile />} />
          <Route path='/company' element={<JobVacancies />} /> */}


            <Route path='/adminpre' element={adminLoading ? <AdminPreloader /> : <AdminDashboard />} />
            <Route path='/adminDash' element={<AdminDashboard />} />
            <Route path='/settings' element={<Settings />} />
            <Route path='/companyDash' element={<CompanyDashboard />} />
            <Route path='/managevdo' element={<Managevideos />} />
            <Route path='/userslist' element={<AdminUserDahsBoard />} />



            {/* Shopping Routes – now correctly inside CartProvider */}
            <Route path="/Dashboard" element={<Dashboard />} />
            <Route path="/shopping" element={<ShoppingHome />} />
            {/* <Route path="/shopping/:category" element={<CategoryPage />} /> */}

            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="payment-success" element={<PaymentSuccess />} />
            <Route path="payment-error" element={<PaymentErorr />} />
            <Route path="/orders" element={<MyOrders />} />
            <Route path="/newarrival" element={<NewArrivals />} />
            <Route path="/shipping" element={<Shipping />} />
            <Route path="/wishlist" element={<WishlistPage />} />



            <Route path="/products/:category" element={<Products />} />
            <Route path="/category/:type" element={<CategoryPage />} />


            {/* *company */}
            <Route path="/jobhome" element={<JobHome />} />
            <Route path="/Usersettings" element={<UserSettings />} />
            <Route path="/userJobs" element={<UserJobs />} />
            <Route path="/jobs" element={<CompanyVacancies />} />
            <Route path="/jobdetails/:id" element={<JobDetails />} />
            <Route path="/apply/:jobId" element={<ApplyForm />} />
            <Route path="/my-application" element={<MyApplication />} />
            <Route path="/apply/success" element={<ApplySuccess />} />
            <Route path="/product/:id" element={<ProductDetails />} />

            <Route
              path="/candidate-profile/:id"
              element={<CandidateProfile />}
            />



          </Routes>
        </CartProvider>
      </WishlistProvider>
    </>
  );
}

export default App;