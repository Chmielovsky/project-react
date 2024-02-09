import React from "react";
import { Link } from "react-router-dom";
import { useNavigate, NavigateFunction } from "react-router-dom";
import "./Style/Navigation.css"

interface NavigationBaseProps {
    navigate: NavigateFunction;
}

class NavigationBase extends React.Component<NavigationBaseProps> {
    handleLogout = () => {
        localStorage.removeItem('isLoggedIn');
        this.props.navigate('/');
    }

    render() {
        return (
            <div className="navigation-container">
                <div className="logo">
                    <Link to="/Home" className="logo-text"> <span>ReactBlog</span></Link>
                </div>
                <nav>
                    <ul>
                        <li><Link to="/Home">Home</Link></li>
                        <li><Link to="/Gallery">Gallery</Link></li>
                        <li><Link to="/Blog">Blog</Link></li>
                        <li><button onClick={this.handleLogout}>Logout</button></li>
                    </ul>
                </nav>
            </div>
        )
    }
}

const Navigation: React.FC = () => {
    const navigate = useNavigate();

    return <NavigationBase navigate={navigate} />;
}

export default Navigation;