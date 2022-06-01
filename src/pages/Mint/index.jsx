import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Button from "../../components/Button";
import MainLayout from "../../components/MainLayout";
import "./index.css";

const Mint = (props) => {
    const [mintQuantity, setMintQuantity] = useState(1);
    const [searchParams] = useSearchParams();

    const handleAddMintQuantity = () => {
        if (mintQuantity < 5) {
            setMintQuantity(mintQuantity+1);
        }
    }

    const handleMinusMintQuantity = () => {
        if (mintQuantity > 1) {
            setMintQuantity(mintQuantity-1);
        }
    }

    useEffect(() => {
        console.log(searchParams.get("referrer"));
    });

    return (
        <MainLayout>
            <h1>Mint your peruvian dog!</h1>
            <span className="minted__text">Currently minted</span>
            <span className="minted__text">0 / 3333</span>
            <div className="quantity__container">
                <div className="quantity__button" onClick={handleMinusMintQuantity}>
                    <span className="quantity__text unselectable">-</span>
                </div>
                <div>
                    <span className="quantity__text unselectable">{mintQuantity}</span>
                </div>
                <div className="quantity__button" onClick={handleAddMintQuantity}>
                    <span className="quantity__text unselectable">+</span>
                </div>
            </div>
            <Button text="COMMING SOON" method={()=>{}}/>
            {
                searchParams.get("referrer") ?
                <div className="referrer__container">
                    <small>Referrer address:</small>
                    <small>{searchParams.get("referrer")}</small>
                </div>
                :
                null
            }
        </MainLayout>
    );
}

export default Mint;