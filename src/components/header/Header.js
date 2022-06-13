import logo from "../../logo.svg";

import { Navbar, Container, Nav } from "react-bootstrap";
import {Link} from "react-router-dom";

import "./header.scss";


const Header = () => {
	return (
		<header className="header">
			<Navbar bg="primary" variant="dark">
				<Container>
					<Link to="/" className="navbar-brand"><img src={logo}/></Link>
					<Nav className="me-auto">
						<Link to="/posts" className="nav-link">Posts</Link>
						<Link to="/add-post" className="nav-link">Add post</Link>
					</Nav>
				</Container>
			</Navbar>	
		</header>
			
	);
};

export default Header;
