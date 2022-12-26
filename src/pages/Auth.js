import React, { useState } from 'react';
import './auth.scss';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';

const initialState = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const Auth = ({ setActive, setUser }) => {
  const [state, setState] = useState(initialState);
  const [signUp, setSignUp] = useState(false);
  const { firstName, lastName, email, password, confirmPassword } = state;

  const navigate = useNavigate();

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleAuth = async (e) => {
    e.preventDefault();
    if (!signUp) {
      if (email && password) {
        const { user } = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        setUser(user);
        setActive('home');
      } else {
        return console.log('Something goes wrong.');
      }
    } else {
      if (password !== confirmPassword) {
        return console.log('Password does not match.');
      }
      if (firstName && lastName && email && password) {
        const { user } = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        await updateProfile(user, { displayName: `${firstName} ${lastName}` });
        setActive('home');
      } else {
        return console.log('Something goes wrong.');
      }
    }
    navigate('/');
  };

  return (
    <div>
      <div className='login-container container'>
        <div className='login-text'>
          <div className='login-title'>{!signUp ? 'Sign-in' : 'Sign-up'}</div>
        </div>
        <div className='container-login-form'>
          <form className='login-form' onSubmit={handleAuth}>
            {signUp && (
              <>
                <div>
                  <input
                    className='inputbar'
                    type='text'
                    placeholder='firstName'
                    name='firstName'
                    value={firstName}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <input
                    className='inputbar'
                    type='text'
                    placeholder='lastName'
                    name='lastName'
                    value={lastName}
                    onChange={handleChange}
                  />
                </div>
              </>
            )}
            <div>
              <input
                className='inputbar'
                type='email'
                name='email'
                placeholder='email'
                value={email}
                onChange={handleChange}
              />
            </div>
            <div>
              <input
                className='inputbar'
                type='password'
                placeholder='password'
                name='password'
                value={password}
                onChange={handleChange}
              />
            </div>
            {signUp && (
              <div>
                <input
                  className='inputbar'
                  type='password'
                  placeholder='confirmPassword'
                  name='confirmPassword'
                  value={confirmPassword}
                  onChange={handleChange}
                />
              </div>
            )}

            <div className='button-container'>
              <button
                className={`btn ${!signUp ? 'btn sign-in' : 'btn sign-up'}`}
                type='submit'
              >
                {!signUp ? 'Sign-in' : 'Sign-up'}
              </button>
            </div>
          </form>
          <div>
            {!signUp ? (
              <>
                <div className='account-text'>
                  <p>
                    Don't have an account ?{' '}
                    <span
                      className='btn-signup'
                      onClick={() => setSignUp(true)}
                    >
                      Sign Up
                    </span>
                  </p>
                </div>
              </>
            ) : (
              <>
                <div className='account-text'>
                  <p>
                    Already have an account ?{' '}
                    <span
                      className='btn-signup'
                      onClick={() => setSignUp(false)}
                    >
                      Sign In
                    </span>
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
