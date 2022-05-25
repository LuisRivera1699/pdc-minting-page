import "./index.css";
import dog1 from "../../assets/dog1.webp";
import dog2 from "../../assets/dog2.webp";
import dog3 from "../../assets/dog3.webp";
import dog4 from "../../assets/dog4.webp";
import dog5 from "../../assets/dog5.webp";
import dog6 from "../../assets/dog6.webp";
import Header from "../Header";
import TabSelector from "../TabSelector";
import { useEffect, useState } from "react";

const MainLayout = (props) => {
    const dogList = [dog1, dog2, dog3, dog4, dog5, dog6];
    const [dogIdx, setDogIdx] = useState(0);

    useEffect(() => {
        const interval = setInterval(
            () => {
                if (dogIdx === dogList.length-1) {
                    setDogIdx(0);
                } else {
                    let curIdx = dogIdx;
                    setDogIdx(curIdx+1);
                }
            }, 2000
        );

        return () => clearInterval(interval);
    });

    return (
        <div className="page__container">
            <Header/>
            <section className="page__content">
                <div className="__content">
                    <TabSelector/>
                    <div className="image__container">
                        <img src={dogList[dogIdx]} alt=""/>
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