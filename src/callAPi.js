import userEvent from "@testing-library/user-event"
import React, { useEffect, useRef, useState } from "react"


const API = () => {

    const [count, setCount] = useState(100)
    const countId = useRef()
    const preCount = useRef(); 

    function handleGo() {
        countId.current = setInterval(() => {
            setCount(pre => pre-1)
        },1000)
     }

    function handleStop() {
        clearInterval(countId.current)
    }

    return (
        <div>
            <h1>{count}</h1>
            <button onClick={handleGo}>Go </button>
            <button onClick={handleStop}>STOP </button>
        </div>
    )
}

export default API 