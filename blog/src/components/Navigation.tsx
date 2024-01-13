import React from "react";
import { Link } from "react-router-dom";
import "./Style/Navigation.css"

export default class Navigation extends React.Component {
    render() {
        return (
            <div className="navigation-container">
            <div className="logo">
                <span>ReactBlog</span>
            </div>
            <nav>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/Gallery">Gallery</Link></li>
                    <li><Link to="/Blog">Blog</Link></li>
                </ul>
            </nav>
        </div>
        )
    }

}