import "./index.css";
import dogs from "../../assets/dogs.gif";
import Header from "../Header";
import TabSelector from "../TabSelector";

const MainLayout = (props) => {
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