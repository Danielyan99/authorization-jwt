import {NavLink} from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <div className="nav-wrapper navbar blue-grey ">
        <a href="#" className="brand-logo">Todo App</a>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          <li><a href="/">Login</a></li>
          {/*<li><NavLink to='/'>Login</NavLink></li>*/}
        </ul>
      </div>
    </nav>
  )
}

export default Navbar