//here make routes for all views(Interfaces)
import React, { Suspense } from 'react';
import { Route, Switch } from "react-router-dom";
import Auth from "../hoc/auth";
import HomePage from "./views/HomePage/HomePage.js";
import LoginPage from "./views/LoginPage/LoginPage.js";
import UserRegisterationPage from "./views/UserRegistrationPage/UserRegisterationPage.js";
import NavBar from "./views/NavBar/NavBar";
import Footer from "./views/Footer/Footer"
import ProductUploadPage from './views/ProductUploadPage/ProductUploadPage'
import ProductDetailPage from './views/ProductDetailPage/ProductDetailPage';
import ShoppingCartPage from './views/ShoppingCartPage/ShoppingCartPage';
import AdminPage from './views/AdminPage/AdminPage';
import StoreManagerPage from './views/StoreManagerPage/StoreManagerPage';
import Wishlist from './views/Wishlist/Wishlist';
// import AdminManagement from './views/AdminManagement/Admin';

function App() {

  return (
    <Suspense fallback={(<div>Loading.........</div>)}>
      <NavBar />
      <div style={{ paddingTop: '75px', minHeight: 'calc(100vh - 80px)' }}>
        
        {/* <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL,
            and its used to route between views of app */}
        <Switch>
          <Route exact path="/product/upload" component={Auth(ProductUploadPage, true)} />
          <Route exact path="/product/:productId" component={Auth(ProductDetailPage, null)} />
          <Route exact path="/wishlist" component={Auth(Wishlist, false)} />
          <Route exact path="/user/cart" component={Auth(ShoppingCartPage, null)} />
          <Route exact path="/admin" component={Auth(AdminPage, null)} />
          <Route exact path="/StoreManager" component={Auth(StoreManagerPage, null)} />
          <Route exact path="/" component={Auth(HomePage, null)} />
          <Route exact path="/login" component={Auth(LoginPage, false)} />
          <Route exact path="/register" component={Auth(UserRegisterationPage, false)} />
{/* <Route path="/adminManagement" component={AdminManagement}  /> */}

        </Switch>
      </div>
      <Footer />
    </Suspense>
  );
}

export default App;
