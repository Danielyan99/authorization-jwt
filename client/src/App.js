import './styles/main.scss'
import Navbar from "./components/Navbar";
import AuthPage from "./pages/AuthPages";
import {BrowserRouter as Router} from 'react-router-dom'
import {useContext, useEffect, useState} from "react";
import {Context} from "./index";
import {observer} from "mobx-react-lite";
import LoginFrom from "./components/LoginFrom";
import UserService from "./services/UserService";

function App() {
  const {store} = useContext(Context);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      store.checkAuth();
    }
  }, [])
  if (store.isLoading) {
    return <div>Loading ...</div>
  }

  const getUsers = async () => {
    try {
      const response = await UserService.fetchUsers();
      setUsers(response.data);
    } catch (e) {
      console.log(e)
    }
  }

  if (!store.isAuth) {
    return (
      <Router>
        <div className="App">
          <Navbar />
          <div className="container">
            <AuthPage />
          </div>
        </div>
      </Router>
    )
  }

  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="container">
          <h1>{store.isAuth ? `User is authenticated: ${store.user.email} ` : 'User is not authenticated'}</h1>
          <button onClick={() => store.logout()}>logout</button>
        </div>
        <div>
          <button onClick={getUsers}>Get Users</button>
        </div>
        {users.map(user => <div key={user.email}>{user.email}</div>)}
      </div>
    </Router>
  );
}

export default observer(App);
