import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Account from "./pages/Account";
import ForgotPassword from "./pages/ForgotPassword";
import ChangePassword from "./pages/ChangePassword";
import Home from "./pages/Home";
import InvalidPage from "./pages/InvalidPage.jsx";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ProtectedRoute from "./utils/ProtectedRoute";
import { Toaster } from "react-hot-toast";
import Loader from "./components/Loader.jsx";
import { useSelector } from "react-redux";

function App() {
  const loader = useSelector((state) => state.loader.value);
  return (
    <BrowserRouter>
      <div className="min-h-screen w-full overflow-x-hidden flex flex-col items-center gap-10 pt-10">
        {loader && <Loader />}

        <Header />

        <Toaster position="bottom-center" reverseOrder={false} />

        {/* Main Content */}
        <div className="w-full max-w-[1200px] flex-1 px-4 py-6 sm:py-12 lg:py-16 flex flex-col items-center justify-center">
          <Routes>
            <Route path="/*" element={<InvalidPage />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/change-password" element={<ChangePassword />} />

            {/* Protected Routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="/account" element={<Account />} />
              <Route path="/" element={<Home />} />
            </Route>
          </Routes>
        </div>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
