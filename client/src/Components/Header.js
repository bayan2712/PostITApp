import { Navbar, Nav, NavItem, NavLink } from "reactstrap";
import logo from "../Images/logo-t.png";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../Features/UserSlice";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handlelogout = async () => {
    dispatch(logout());
    
    await new Promise((resolve) => setTimeout(resolve, 100));

    navigate("/login"); 
  };

  return (
    <>
      <Navbar className="header">
        <Nav>
          <NavItem>
            <Link>
              <img src={logo} className="logo" />
            </Link>
          </NavItem>
          <NavItem>
            <Link to="/">Home</Link>
          </NavItem>
          <NavItem>
            <Link to="/profile">Profile</Link>
          </NavItem>
          <NavItem>
            <Link onClick={handlelogout}>Logout</Link>
          </NavItem>
        </Nav>
      </Navbar>
    </>
  );
};

export default Header;
