import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { auth } from "./firebase";

import StorefrontIcon from '@material-ui/icons/Storefront';

import './Login.css';

export default function Login() {
  const [user, setUser] = useState({
    email: '',
    password: ''
  });

  const history = useHistory();

  const signIn = e => {
    e.preventDefault();
    auth
      .signInWithEmailAndPassword(user.email, user.password)
      .then(auth => {
        history.push('/');
      })
      .catch(error => console.error(error.message))
  }

  const register = e => {
    e.preventDefault();
    auth
      .createUserWithEmailAndPassword(user.email, user.password)
      .then(auth => {
        if (auth) {
          history.push('/');
        }
      })
      .catch(error => console.error(error.message))
  }

  return (
    <div className='login'>
      <Link to='/' style={{ textDecoration: "none" }}>
        <div className="login__logo">
          <StorefrontIcon className="login__logoImage" fontSize="large" />
          <h2 className="login__logoTitle">eSHOP</h2>
        </div>
      </Link>

      <div className='login__container'>
        <h1>Sign-in</h1>

        <form>
          <h5>E-mail</h5>
          <input type='text' value={user.email} onChange={e => setUser({ ...user, email: e.target.value })} />

          <h5>Password</h5>
          <input type='password' value={user.password} onChange={e => setUser({ ...user, password: e.target.value })} />

          <button type='submit' className='login__signInButton' onClick={signIn}>Sign In</button>
        </form>

        <p>
          By signing-in you agree to the eShop Website Conditions of Use & Sale. Please
          see our Privacy Notice, our Cookies Notice and our Interest-Based Ads Notice.
        </p>

        <button className='login__registerButton' onClick={register}>Create your eShop Account</button>
      </div>
    </div>
  )
}