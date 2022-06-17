import "./index.css";
import dogs from "../../assets/dogs.gif";
import Header from "../Header";
import TabSelector from "../TabSelector";
import { useEffect } from "react";
import ReactGA from 'react-ga';

const MainLayout = (props) => {

    useEffect(() => {
        ReactGA.initialize('UA-232339733');
    }, []);

    return (
        <div className="page__container">
            <Header/>
            <section className="page__content">
                <div className="__content">
                    <TabSelector/>
                    <div className="image__container">
                        <img src={dogs} alt=""/>
                    </div>
                    <div className="child__content">
                        {props.children}
                    </div>
                </div>
            </section>
        </div>
    );
}

export default MainLayout;