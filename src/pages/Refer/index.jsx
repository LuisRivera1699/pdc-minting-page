import { useState } from "react";
import Button from "../../components/Button";
import MainLayout from "../../components/MainLayout";
import "./index.css";

const Refer = (props) => {
    const [showUrl, setShowUrl] = useState(false);
    const [coppied, setIsCoppied] = useState(false);

    const handleCopyToClipboard = () => {
        setIsCoppied(true);
        navigator.clipboard.writeText(`${window.location.origin}?referrer=0x8306865FAb8dEC66a1d9927d9ffC4298500cF7Ed`);
    }

    return (
        <MainLayout>
            <h1>Refer minters and earn $ETHs!</h1>
            <span>We give 10% to referrer holders and 1% to non holders referrers per each referral mint.</span>
            <span className={!showUrl ? '__mb20' : ''}>Click the button below to get your referrer url and start referring.</span>
            <div className={`rurl__container ${!showUrl ? 'hidden' : ''}`}>
                {
                    coppied ?
                    <span className="coppied__disclaimer">URL coppied to clipboard!</span> :
                    <span onClick={handleCopyToClipboard}>{window.location.origin}?referrer=0x8306865FAb8dEC66a1d9927d9ffC4298500cF7Ed</span>
                }
            </div>
            <Button text="GET REFERRER URL" method={() => {setShowUrl(true)}}/>
        </MainLayout>
    );
}

export default Refer;