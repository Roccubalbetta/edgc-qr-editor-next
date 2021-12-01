import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { ColorPicker, FramePicker } from "../components";
import withTransition from "../HOC/withTransition";

const qr = '/images/Qr.png';
const avanti = "/images/Avanti.svg";
const fasi = "/images/Group 9.svg";

const colors = ["#000000", "#e91e63", "#9c27b0", "#673ab7",
    "#3f51b5", "#2196f3", "#03a9f4", "#00bcd4"]

const images = [
    { name: "none", value: "" },
    { name: "corner_square", value: "/images/dots/cornerSquare.png" },
    { name: "dot", value: "/images/dots/dot.png" },
    { name: "extra_round", value: "/images/dots/extraRound.png" },
    { name: "classy_corner", value: "/images/dots/classyCorner.png" }
]

function Page5() {

    const [showState, setShowState] = useState("none")

    const [frame, setFrame] = useState({
        shape : "none",
        footer : {
            content : "",
            color : "#000000",
            font : "times new roman",
        }
    })

    useEffect(() => {
        const root = document.documentElement
        root.style.setProperty('--green', "#FFFFFF");
    })

    const qrPanel = useRef()

    const qrOptions = useSelector(state => state.qrOptions.value)
    const dispatch = useDispatch()

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

    const onFramePickerChanged = (value) => {
        value === "none" ? setShowState("none") : setShowState("success")
        setFrame({
            ...frame,
            shape : value
        })
    }

    const onColorPickedChanged = (value) => {
        setFrame({
            ...frame,
            footer : {
                ...frame.footer,
                color: value
            }
        })
    }

    const onFontChanged = (value) => {
        setFrame({
            ...frame,
            footer : {
                ...frame.footer,
                font: value
            }
        })
    }

    const onContentChanged = (value) =>{
        setFrame({
            ...frame,
            footer : {
                ...frame.footer,
                content: value
            }
        })
    }
    return (
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", height: "100%" }}>
            <div>
                <div className="fase" >
                    <img src={fasi} alt="personalization part 5" />
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
                        Un ultimo tocco
                    </div>
                </div>
                <div className="colorframe">
                    <div className="colore">
                        Cornice
                    </div>
                    <div className="colortable">
                        <FramePicker initialValue={frame.shape} images={images} onPick={(v) => onFramePickerChanged(v)}/>
                    </div>
                </div>
                <div style={{ display: showState === "none" ? "none" : "block" }}>
                    <div className="scrittaframe">
                        <div className="colore">
                            Scritta
                        </div>
                        <textarea className="text" cols="30" rows="2" onChange={onContentChanged}/>
                    </div>

                    <div className="fontframe">
                        <div className="colore">
                            Font
                        </div>
                        <div>
                            <select className="tendina" onChange={onFontChanged}>

                                <optgroup style={{ fontFamily: 'arial' }}>
                                    <option>Arial</option>
                                </optgroup>

                                <optgroup style={{ fontFamily: 'verdana' }}>
                                    <option> Veranda </option>
                                </optgroup>

                                <optgroup style={{ fontFamily: 'comic sans' }}>
                                    <option> Comic Sans </option>
                                </optgroup>

                                <optgroup style={{ fontFamily: 'lucida sans' }}>
                                    <option> Lucid Sans </option>
                                </optgroup>

                                <optgroup style={{ fontFamily: 'times new romance' }}>
                                    <option> Times New Romance </option>
                                </optgroup>

                            </select>

                        </div>

                    </div>

                    <div className="colorframe">
                        <div className="colore">
                            Colore scritta
                        </div>
                        <div className="colortable">
                            <ColorPicker initialValue={frame.footer.color} colors={colors} onPick={(c) => onColorPickedChanged(c)} />
                        </div>
                    </div>
                </div>

                <div className="pagineOptions">
                    <Link href="/page7">
                        <div className="buttonAvanti" >
                            <img src={avanti} className="avanti" alt="next page" />
                        </div>
                    </Link>

                    <Link href="/page4">
                        <div className="buttonIndietro" >
                            <img src={avanti} className="indietro" alt="previous page" />
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default withTransition(Page5);
