import {Routes,Route, Navigate} from 'react-router-dom'
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import VerifyEmailPage from "./pages/VerifyEmailPage"
import {Toaster}from 'react-hot-toast';
import { useAuthStore } from './store/authStore';
import { useEffect } from 'react';

//Redirect authenticated user to the homepage
const RedirectAuthenticatedUser=({children})=>{
const {isAuthenticated,user}=useAuthStore();
  if(isAuthenticated && user.isVerified){
    return <Navigate to="/" replace />
  }
  return children;
}

function App() {
  const {isCheckingAuth,checkAuth,isAuthenticated,user}=useAuthStore()
  useEffect(()=>{
    checkAuth()
  },[checkAuth])
  console.log("isAuthenticated",isAuthenticated);
  console.log("user",user);

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-blue-900 to-emerald-700 flex items-center justify-center relative overflow-hidden">
      <Routes>
          <Route path="/" element={"Home"} />
          <Route path="/signup" element={<RedirectAuthenticatedUser><SignUpPage/></RedirectAuthenticatedUser>} />
          <Route path="/login" element={<LoginPage/>} />
          <Route path="/verify-email" element={<VerifyEmailPage/>} />
          
        </Routes>
        <Toaster/>
      </div>
    </>
  );
}

export default App;
