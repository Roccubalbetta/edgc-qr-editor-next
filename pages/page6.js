import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useSelector } from "react-redux";
import withTransition from "../HOC/withTransition";
const qr = '/images/Qr.png';
const avanti = "/images/Avanti.svg";
const fasi = "/images/Group 11.svg";


function Page7() {

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

    return (
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", height: "100%" }}>
            <div>
                <div className="fase" >
                    <img src={fasi} alt="personalization part 7" />
                </div>

                <div className="qrframe">
                    <div className="frame">
                        <svg ref={qrPanel} viewBox="0 0 1000 1000" style={{ width: 200 }} />
                    </div>
                </div>
            </div>

            <div className="panel">
                <div className="guideframe">
                    <div className="guide">
                        Hai finito!
                    </div>
                </div>

                <div className="loadconclusione">
                    <div className="conclusione">
                        <div className="subConc">
                            E ora?
                        </div>

                        <div className="testoConc">
                            Non resta che usare il tuo nuovo “accessorio”
                        </div>

                        <div className="subConc">
                            Che progetto bellissimo! Come potrò mai ripagarvi?<br />
                        </div>

                        <div className="testoConc">
                            Grazie mille! Se ci tieni a essere anche te partecipe di questo progetto, puoi offrire un
                            caffè agli sviluppatori con il bottone qui sotto.<br />
                        </div>

                        <div className="subConc">
                            Oppure?<br />
                        </div>

                        <div className="testoConc">
                            Puoi condividere il progetto con un amic*! é gratis e noi siamo contenti lo stesso!
                        </div>

                    </div>
                    <div className="pagineOptions">
                        <Link href="/page7">
                            <div className="buttonAvanti" >
                                <img src={avanti} className="avanti" alt="next page" />
                            </div>
                        </Link>

                        <Link href="/page5">
                            <div className="buttonIndietro" >
                                <img src={avanti} className="indietro" alt="previous page" />
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default withTransition(Page7);
