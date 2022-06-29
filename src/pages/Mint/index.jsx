import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Button from "../../components/Button";
import MainLayout from "../../components/MainLayout";
import "./index.css";
import ReactGA from 'react-ga';
import { ethers } from "ethers";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "../../utils/contracts/contracts";
import { useAuthContext } from "../../context/AuthContext";
import { toast } from 'react-toastify';
import openseaSVG from "../../assets/opensea.svg";


const Mint = (props) => {
    const [mintQuantity, setMintQuantity] = useState(1);
    const [searchParams] = useSearchParams();

    const [totalSupply, setTotalSupply] = useState(0);
    const [balance, setBalance] = useState(0);
    const [saleStage, setSaleStage] = useState(false);

    const { currentAccount } = useAuthContext();

    const MAX_SUPPLY = 3333;

    const handleAddMintQuantity = () => {
        if (mintQuantity < 20) {
            setMintQuantity(mintQuantity+1);
        }
    }

    const handleMinusMintQuantity = () => {
        if (mintQuantity > 1) {
            setMintQuantity(mintQuantity-1);
        }
    }

    const getTotalSupply = async () => {
        try {
            const {ethereum} = window;

            if (ethereum) {
                const provider = new ethers.providers.Web3Provider(ethereum);
                const signer = provider.getSigner();
                const pdcContract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

                let tSupply = await pdcContract.totalSupply();
                let sStage = await pdcContract.saleStage();

                setTotalSupply(tSupply.toNumber());
                setSaleStage(sStage);
            }
        } catch (error) {
            console.error(error);
        }
    }

    const getBalance = async () => {
        try {
            const { ethereum } = window;

            if (ethereum) {
                const provider = new ethers.providers.Web3Provider(ethereum);
                const signer = provider.getSigner();
                const pdcContract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

                let b = await pdcContract.balanceOf(currentAccount);

                setBalance(b.toNumber());
            }
        } catch (error) {
            console.error(error);
        }
    }

    const mint = async () => {
        if (saleStage === 0 || saleStage === 2 || balance === 20) {
            return;
        }

        try {
            const { ethereum } = window;

            if (ethereum) {
                const provider = new ethers.providers.Web3Provider(ethereum);
                const signer = provider.getSigner();
                const pdcContract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

                let amount = (0.015 * mintQuantity).toFixed(3);

                let mintTxn = await pdcContract.publicMint(mintQuantity, searchParams.get("referrer") ? searchParams.get("referrer") : "0x0000000000000000000000000000000000000000", {value: ethers.utils.parseEther(amount.toString())});

                await mintTxn.wait();

                toast.success('Successfully minted your Peruvian Dog. You can now go to Opensea and see it! :D');

                getBalance();
            }
        } catch (error) {
            console.error(error);
            toast.error(error.message);
        }
    }

    useEffect(() => {
        console.log(searchParams.get("referrer"));
    });

    useEffect(() => {
        if (currentAccount) {
            getTotalSupply();
            getBalance();
        }
    });

    useEffect(() => {
        ReactGA.pageview('/mint');
    }, []);

    return (
        <MainLayout>
            <h1>Mint your peruvian dog!</h1>
            <span className="minted__text">Currently minted</span>
            <span className="minted__text">{totalSupply} / {MAX_SUPPLY}</span>
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
            <Button text={
                saleStage === 0 ?
                "COMMING SOON" :
                saleStage === 1 ?
                balance < 20 ? "MINT NOW" : "MAX MINTS REACHED" :
                "SOLD OUT"
            } method={mint}/>
            {
                searchParams.get("referrer") ?
                <div className="referrer__container">
                    <small>Referrer address:</small>
                    <small>{searchParams.get("referrer")}</small>
                </div>
                :
                null
            }
            {
                totalSupply > 0 ?
                <div className="rrss__container">
                    <small>See our collection on Opensea.</small>
                    <a href="https://opensea.io/collection/peruvian-dog-club" target="_blank" rel="noreferrer"><img src={openseaSVG} alt=""/></a>
                </div> :
                null
            }
        </MainLayout>
    );
}

export default Mint;