import { Link } from "react-router-dom";
import React from "react";
import "./SideBar.css";

function SideBar(props) {
    return (
        <div className="side-nav active" onMouseLeave={props.show}>
            <ul>
                <li>
                    <Link
                        to="/"
                        style={{ textDecoration: "none", color: "#43464a" }}
                        onClick={props.show}
                    >
                        Home
                    </Link>
                </li>
                <li>
                    <Link
                        to="/emergency"
                        style={{ textDecoration: "none", color: "#43464a" }}
                        onClick={props.show}
                    >
                        Emergency Contact
                    </Link>
                </li>
            </ul>
        </div>
    );
}

export default SideBar;
