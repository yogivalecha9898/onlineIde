import { useState } from "react"
import "../styles/left.css"

const Left = () => {

    const queList = [
        {
            title: "1",
            question: "Lorem 1 ipsum dolor sit amet consectetur adipisicing elit. Molestiae totam, quidem asperiores expedita id"
        },
        {
            title: "2",
            question: "Lorem 2 ipsum dolor sit amet consectetur adipisicing elit. Molestiae totam, quidem asperiores expedita id"
        },
        {
            title: "3",
            question: "Lorem 3 ipsum dolor sit amet consectetur adipisicing elit. Molestiae totam, quidem asperiores expedita id"
        }
    ]

    const[clickQue, setClickQue] = useState("")

    return (
        <div className="left">
            {/* Even the left will comprise of 2 sections */}
            <div className="questionsList">
                <div className="list">Sr. No</div>
                {queList.map(options => {
                    return (
                        <div 
                            key = {options.title}
                            id = {"question" + options.title}
                            className = "list qList" 
                            onClick = {() => {
                                setClickQue(options.title)
                                if(clickQue != "") document.getElementById("question" + clickQue).style.background = ""    
                                document.getElementById("question" + options.title).style.background = "lightgray"   
                            }}
                        >
                            {options.title}
                        </div>
                    )
                })}
            </div>
            <div className="questions">
                Problem: <br></br>
                {clickQue !== "" ? queList[clickQue - 1].question : ""}
            </div>
        </div>
    )
}

export default Left