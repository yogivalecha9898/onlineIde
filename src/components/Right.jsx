import { useState } from "react"
import "../styles/right.css"

const Right = () => {

    const[lang, setLang] = useState("71")
    const[code, setCode] = useState("")
    const[input, setInput] = useState("") 
    const[output, setOutput] = useState("")

    const handleSubmit = async () => {
        // console.log(lang, code, input)
        const options = {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'Content-Type': 'application/json',
                'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com',
                'X-RapidAPI-Key': 'f84c4e41d3mshf8390d33ddd20fdp17467bjsn87492f6e91c8'
            },
            body: JSON.stringify({
                language_id : lang,
                source_code: code, 
                stdin : input
            })
        }
        
        const requesting = await fetch('https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=true&fields=*', options)
        let response = await requesting.json()
        console.log(response)

        let solution = {
            status: { description: "Queue" },
            stderr: null,
            compile_output: null,
        }   

        while(solution.status.description !== "Accepted" && solution.stderr == null && solution.compile_output == null) {
            console.log(response.token)
            if(response.token) {
                const optionsHere = {
                    method: "GET",
                    headers: {
                        "x-rapidapi-host": "judge0-ce.p.rapidapi.com",
                        "x-rapidapi-key": "f84c4e41d3mshf8390d33ddd20fdp17467bjsn87492f6e91c8"
                    }
                }
                const getSolution = await fetch(`https://judge0-ce.p.rapidapi.com/submissions/${response.token}?base64_encoded=true`, optionsHere)
                solution = await getSolution.json();
                console.log(solution)
            }
        }
        // console.log(response)
        if (solution.stdout) {
            alert("Successfully executed!")
            setOutput(window.atob(solution.stdout))
        } else if (solution.stderr) {
            alert("Error!")
            setOutput(window.atob(solution.stderr))
        } else {
            alert("Compilation error!")
            setOutput(window.atob(solution.compile_output))
        }
    }

    return (
        <div className="right">
            <div className="select">
                <p>Type your code here</p>
                <select onChange = {e => setLang(e.target.value)}>
                    <option value = "71">Python</option>
                    <option value = "62">Java</option>
                    <option value = "50">C</option>
                </select>
            </div>
            <div className="code">
                <textarea onChange = {e => setCode(e.target.value)} placeholder="Code here"></textarea>
            </div>
            <div className="userInput">
                <textarea onChange = {e => setInput(e.target.value)} placeholder="User Input"></textarea>
            </div>
            <div className="output">
                <div className="run">
                    <p>Output</p>
                    <button onClick = {() => handleSubmit()}>Run</button>
                </div>
                <div className="result">
                    {output}
                </div>
            </div>
            {/* {lang} */}
        </div>
    )
}

export default Right