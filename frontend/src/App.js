import React from 'react';
import { AuthProvider, useAuth } from './components/AuthContext';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Logout from './components/Logout';
import ProductList from './components/ProductList';
import Details from './components/Details';
import Form from './components/Form';
import Payment from './components/Payment';
import AddCar from './components/AddCar';
import UserPanel from './components/UserPanel';
import EditCar from './components/EditCar';
import Orders from './components/Orders';
import EditOrder from './components/EditOrder';


const ProtectedRoute = ({ element: Component }) => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? <Component /> : <Navigate to="/login" replace />;
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
          <Routes>
            <Route path="/" element={<p>Welcome to the app!</p>} />
            <Route path="/products" element={<ProductList />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/details/:id" element={<Details />} />
            <Route path="/form" element={<Form />} />
            <Route path="/edit-order/:id" element={<EditOrder />} />
            <Route path="/navbar" element={<Navbar />} />
            <Route path="/orders" element={<Orders />} />
            {/* Obsługa trasy dla płatności z opcjonalnym rentId */}
            <Route path="/payment" element={<Payment />} />
            <Route path="/payment/:rentId" element={<Payment />} />
            <Route path="/user-panel" element={<UserPanel />} />
            <Route path="/edit/:id" element={<EditCar />} />
            <Route path="/add-car" element={<AddCar />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
