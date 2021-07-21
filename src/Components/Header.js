import "./Header.css";
import SideBar from "./SideBar";
import * as FaIcons from "react-icons/fa";
import { useState } from "react";
import { Link } from "react-router-dom";

function Header() {
    const [showNav, setShowNav] = useState(false);
    return (
        <>
            <header className="header">
                <FaIcons.FaAlignJustify
                    className="nav-icon"
                    onClick={() => setShowNav(!showNav)}
                    onMouseEnter={() => setShowNav(!showNav)}
                />
                <Link
                    to="/"
                    style={{ textDecoration: "none", color: "#43464a" }}
                >
                    {" "}
                    <h3 className="heading"> COVID-19 India</h3>
                </Link>
            </header>
            {showNav && <SideBar show={() => setShowNav(!showNav)} />}
        </>
    );
}

export default Header;
