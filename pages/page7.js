import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import "@fontsource/nanum-pen-script";
import { useDispatch, useSelector } from "react-redux"; // Defaults to weight 400.
import withTransition from "../HOC/withTransition";
const share = '/images/Share.svg';
const qr = '/images/Qr.png';

const image = "/images/Image.svg";
const fasi = "/images/Group 10.svg";



function Page6() {

    useEffect(() => {
        const root = document.documentElement
        root.style.setProperty('--green', "#FFFFFF");
    })

    //window.scrollTo(0, 0);

    const qrPanel = useRef()

    const qrOptions = useSelector(state => state.qrOptions.value)

    const [qrCode, setQrCode] = useState(null)

    useEffect(() => {
        const dynamicImports = async () => {
            const QRCodeStyling = (await import("qr-code-styling")).default
            setQrCode(new QRCodeStyling(qrOptions))
        }
        dynamicImports()
    }, [])

    useEffect(() => {
        if (qrCode) {
            qrCode.append(qrPanel.current)
        }
    }, [qrCode])


    useEffect(() => {
        if (qrCode) {
            qrCode.update(qrOptions)
        }
    }, [qrCode, qrOptions])

    const onDownloadClicked = () => {
        qrCode.download({ extension: "jpeg" })
    }

    return (
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", height: "100%" }}>
            <div>
                <div className="fase" >
                    <img src={fasi} alt="personalization part 6" />
                </div>

                <div className="qrframe">
                    <div className="frame">
                        <svg ref={qrPanel} viewBox="0 0 1000 1000" style={{ width: 200 }} />
                    </div>
                </div>
            </div>

            <div className="panel7">
                <div className="guideframe">
                    <div className="guide">
                        Scarica la tua opera
                    </div>
                </div>

                <div className="loadOptions">
                    <div className="loadsx">
                        <div>
                            <img src={share} className="icon" alt="share" />
                        </div>
                        <div className="loadLabel">
                            Condividila
                        </div>
                    </div>
                    <div className="loaddx" onClick={onDownloadClicked}>
                        <div>
                            <img src={image} className="icon" alt="save in gallery" />
                        </div>
                        <div className="loadLabel">
                            Salva in Galleria
                        </div>
                    </div>
                </div>
                <div className="consiglioFrame">
                    <div className="consiglio">
                        Inviatela su Whatsapp (così non la perdi)
                    </div>
                </div>
                <button className="caffeButtonConc">
                    <Link href='/' className="caffe">Offrici un caffè</Link>
                </button>
                <div style={{marginBottom: 60}}>
                    <Link href='/'>Torna alla home</Link>
                </div>
            </div>
        </div>
    )
}

export default withTransition(Page6);
