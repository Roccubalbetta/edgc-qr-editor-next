import React, { useEffect, useRef, useState } from "react";
import jsQR from "jsqr";
import { get } from '@andreekeberg/imagedata'
import Camera from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { defaultQrOptions } from "../utilities";
import { changeData } from "../features/qrCode/qrCodeOptions";
import withTransition from "../HOC/withTransition";
import { FACING_MODES} from 'react-html5-camera-photo';


const qr = '/images/Qr.png';
const camera = "/images/Camerasvg.svg";
const image = "/images/Image.svg";
const avanti = "/images/Avanti.svg";
const fasi = "/images/Group 5.svg";


function Page2() {

    const [able, setAble] = useState('auto')

    const [showAlert, setShowAlert] = useState('none')

    useEffect(() => {
        const root = document.documentElement
        root.style.setProperty('--green', "#FFFFFF");
    })

    const qrPanel = useRef()

    const qrOptions = useSelector(state => state.qrOptions.value)
    const dispatch = useDispatch()

    const [qrFound, setFound] = useState(qrOptions.data !== defaultQrOptions.data)


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
    })

    useEffect(() => {
        if (qrCode) {
            qrCode.update(qrOptions)
        }
    }, [qrCode, qrOptions])



    const [cameraIsVisible, setCameraVisibility] = useState(false);

    const inputFile = useRef(null)

    function onImageSelectorClick() {
        inputFile.current.click();
    }

    function notifyQrCodeFound(code) {
        dispatch(changeData(code))
        setFound(true)
    }

    function notifyQrCodeNotFound() {
        setShowAlert('failed');
        setAble('none')

    }

    function onImageInput(file) {
        get(file, (error, imageData) => {
            if (error) {
                console.log(error)
            } else {
                let code = jsQR(imageData.data, imageData.width, imageData.height);
                if (code) {
                    notifyQrCodeFound(code.data)
                } else {
                    notifyQrCodeNotFound()
                }
            }
        })
    }


    function handleTakePhoto(dataUri) {
        get(dataUri, (error, imageData) => {
            if (error) {
                console.log(error)
            } else {
                let code = jsQR(imageData.data, imageData.width, imageData.height);
                if (code) {
                    notifyQrCodeFound(code.data)
                } else {
                    notifyQrCodeNotFound()
                }
            }
        })
        setCameraVisibility(false)
    }


    function onCameraInputClick() {
        setCameraVisibility(true)
    }
    return (
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", height: "100%" }}>
            <div>
                <div className="foto">
                    {cameraIsVisible && <Camera
                        idealFacingMode={FACING_MODES.USER}
                        idealResolution={{ width: window.screen.width, height: window.screen.height }}
                        isFullscreen={true}
                        sizeFactor={1}
                        onTakePhotoAnimationDone={(dataUri) => {
                            handleTakePhoto(dataUri);
                        }}
                    />}

                </div>
                <div className="fase" >
                    <img src={fasi} alt="personalization part 1" />
                </div>
                <div className="qrframe">
                    <div className="frame">
                        {!qrFound ? <img src={qr} className="qr" alt={"qr icon"} /> :
                            <svg ref={qrPanel} viewBox="0 0 1000 1000" style={{ width: 200 }} />}
                    </div>
                    <div style={{ display: showAlert == 'none' ? 'none' : 'block' }} className="alert">
                        <div className="notFound">
                            Qr Code not found
                        </div>
                        <button className="closeButton" onClick={() => {
                            setShowAlert("none"),
                                setAble('auto')
                        }}>
                            <div className="tryAgain">Try Again</div>
                        </button>
                    </div>
                </div>
            </div>
            <div className="panel">
                <div className="guide">
                    Carica il tuo greenpass
                </div>
                <div className="loadOptions" style={{ pointerEvents: able }}>
                    <div className="loadsx" onClick={onCameraInputClick}>
                        <div>
                            <img src={camera} className="icon" alt={"camera icon"} />
                        </div>
                        <div className="loadLabel">
                            Fotocamera
                        </div>
                    </div>
                    <div className="loaddx" onClick={onImageSelectorClick}>
                        <div>
                            <img src={image} className="icon" alt={"gallery icon"} />
                        </div>
                        <div className="loadLabel">
                            Galleria
                        </div>
                        <input type="file" ref={inputFile} accept="image/png, image/jpeg"
                            onChange={e => (onImageInput(e.target.files[0]))} style={{ display: 'none' }} />
                    </div>
                </div>

                <div className="pagineOptions">
                    <Link href="/page25">
                        <div className="buttonAvanti" style={{ display: qrFound ? "block" : "none" }} >
                            <img src={avanti} className="avanti" alt="next page" />
                        </div>
                    </Link>

                    <Link href="/">
                        <div className="buttonIndietro" >
                            <img src={avanti} className="indietro" alt="previous page" />
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    )
}



export default withTransition(Page2)
