import "./index.css";
import dogs from "../../assets/dogs.gif";
import Header from "../Header";
import TabSelector from "../TabSelector";
import { useEffect } from "react";
import ReactGA from 'react-ga';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const MainLayout = (props) => {

    useEffect(() => {
        ReactGA.initialize('UA-232339733-1');
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
            <ToastContainer position="bottom-right"/>
        </div>
    );
}

export default MainLayout;