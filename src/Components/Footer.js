import "./Footer.css";
import logo from "../assests/images/GitHub_Logo.png";
import icon from "../assests/images/GitHub-Mark.png";


function Footer() {
    return (
        <>
            <footer className="footer">
                <a
                    href="https://github.com/AadarshVenu/covidIndia"
                    target="blank"
                >
                    <div className="github-link">
                        <img
                            src={icon}
                            alt="github-icon"
                            className="github-icon"
                        />
                        <img
                            src={logo}
                            alt="github-logo"
                            className="github-logo"
                        />
                    </div>
                </a>
            </footer>
        </>
    );
}

export default Footer;
