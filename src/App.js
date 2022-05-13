import { useState, useEffect } from 'react';
import UserData from './components/UserData.js';
import Login from './components/Login.js';
import { Route, BrowserRouter, Routes } from 'react-router-dom';

function App() {
  const [loginStatus, setloginStatus] = useState(0);

  //return the App file
  const getLoginStatus = (status) => {
    setloginStatus(status);
    console.log(loginStatus);
  };

  // useEffect(() => {}, [loginStatus]);
  return (
    <div>
      {loginStatus === 1 ? (
        <BrowserRouter>
          <Routes>
            <Route
              path='/'
              element={<UserData statushandler={getLoginStatus} />}
            ></Route>
          </Routes>
        </BrowserRouter>
      ) : (
        <Login statushandler={getLoginStatus} />
      )}
    </div>
  );
}

export default App;
