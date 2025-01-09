import {Routes,Route, Navigate} from 'react-router-dom'
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import VerifyEmailPage from "./pages/VerifyEmailPage"
import {Toaster}from 'react-hot-toast';
import { useAuthStore } from './store/authStore';
import { useEffect } from 'react';
import HomePage from './pages/HomePage';
import LoadingSpinner from './components/LoadingSpinner';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
//Protected route that require authentications
const ProtectRoute=({children})=>{
  const {isAuthenticated,user}=useAuthStore();
  if(!isAuthenticated){
    return <Navigate to="/login" replace/>

  }
  if(!user.isVerified){
    return <Navigate to="/verify-email" replace/>
  }
  return children;
}
//Redirect authenticated user to the homepage
const RedirectAuthenticatedUser=({children})=>{
const {isAuthenticated,user}=useAuthStore();
  if(isAuthenticated && user.isVerified){
    return <Navigate to="/" replace />
  }
  return children;
}

function App() {
  const {isCheckingAuth,checkAuth}=useAuthStore()
  useEffect(()=>{
    checkAuth()
  },[checkAuth])

  // console.log("isAuthenticated",isAuthenticated);
  // console.log("user",user);
  if(isCheckingAuth) return <LoadingSpinner/>
  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-blue-900 to-emerald-700 flex items-center justify-center relative overflow-hidden">
      <Routes>
          <Route path="/" element={<ProtectRoute><HomePage/></ProtectRoute>} />
          <Route path="/signup" element={<RedirectAuthenticatedUser><SignUpPage/></RedirectAuthenticatedUser>} />
          <Route path="/login" element={<RedirectAuthenticatedUser><LoginPage/></RedirectAuthenticatedUser>} />
          <Route path="/verify-email" element={<VerifyEmailPage/>} />
          <Route path="/forgot-password" element={<RedirectAuthenticatedUser><ForgotPasswordPage/></RedirectAuthenticatedUser>} />
          <Route path="/reset-password/:token" element ={<RedirectAuthenticatedUser><ResetPasswordPage/></RedirectAuthenticatedUser>}/>
        </Routes>
        <Toaster/>
      </div>
    </>
  );
}

export default App;
