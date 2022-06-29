import "./index.css"
import logo from "../../assets/logo.webp";

const Header = (props) => {
    return (
        <header>
            <img src={logo} alt=""/>
            <span className="header__option"><a href="https://peruviandogclub.io" target="_blank" rel="noreferrer">Website</a></span>
            <span className="header__option"><a href="https://bald-syzygy-1a8.notion.site/WHITEPAPER-ESPA-OL-7e87005c96d64d05b0fd33920fe2dabe" target="_blank" rel="noreferrer">Whitepaper</a></span>
        </header>
    );
}

export default Header;