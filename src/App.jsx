import { useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Outlet, Navigate } from "react-router-dom";
import PaymentPage from './pages/payment-page/payment-page';

function App() {

  useEffect(() => {
    console.log('API URL:', process.env.REACT_APP_API_URL);
    console.log('REACT_APP_RAZORPAY_KEY_ID:', process.env.REACT_APP_RAZORPAY_KEY_ID);
    console.log('REACT_APP_EXPO_APP_URL:', process.env.REACT_APP_EXPO_APP_URL);
  }, [])
  return (
    <Router>
         <Routes>
           <Route path="/payment/:id" element={<PaymentPage />} />
         </Routes>
       </Router>
  );
}

export default App;
