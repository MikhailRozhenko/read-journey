import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';

import LoginPage from './pages/LoginPage/LoginPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import { fetchCurrentUser } from './redux/auth/operations';
import { selectIsLoggedIn } from './redux/auth/selectors';

function App() {
  const dispatch = useDispatch();

  const [isAuthChecked, setIsAuthChecked] = useState(false);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  useEffect(() => {
    let isActive = true;

    dispatch(fetchCurrentUser()).finally(() => {
      if (isActive) {
        setIsAuthChecked(true);
      }
    });

    return () => {
      isActive = false;
    };
  }, [dispatch]);

  if (!isAuthChecked) {
    return <p>Checking authorization...</p>;
  }

  return (
    <Routes>
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />

      <Route
        path="/recommended"
        element={
          isLoggedIn ? (
            <main>
              <h1>Recommended</h1>
              <p>Ты авторизован!</p>
            </main>
          ) : (
            <Navigate to="/register" replace />
          )
        }
      />

      <Route
        path="/"
        element={
          <Navigate to={isLoggedIn ? '/recommended' : '/register'} replace />
        }
      />

      <Route
        path="*"
        element={
          <Navigate to={isLoggedIn ? '/recommended' : '/register'} replace />
        }
      />
    </Routes>
  );
}

export default App;
