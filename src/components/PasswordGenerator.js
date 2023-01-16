import ArrowRightIcon from "../assets/images/icon-arrow-right.svg";
import CopyIcon from "../assets/images/icon-copy.svg";
import "./css/PasswordGenerator.css";
import { useState } from 'react';

function PasswordGenerator(){
    const [passLen, setPassLen] = useState(10);
    const [pass, setPass] = useState("PTx1f5DaFX");
    const [copied, setCopied] = useState("not-copied");
    const [upperCase, setUpperCase] = useState(true);
    const [lowerCase, setLowerCase] = useState(true);
    const [hasNumbers, sethasNumbers] = useState(true);
    const [hasSymbols, sethasSymbols] = useState(false);
    const [strength, setStrength] = useState("medium");

    // functions

    const generatePass = (len, upperCase, lowerCase, hasNumbers, hasSymbols) => {
        const alpha = 'abcdefghijklmnopqrstuvwxyz';
        const calpha = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const nums = '1234567890';
        const specials = '~`!@#$%^&*()-_+={}[]|/\\:;"`<>,.?';
        let nrChar = len;
        let letter = [];
        let randomString = "";

        // check the params of the pass
        if(lowerCase)
            letter.push(alpha);
        if(upperCase)
            letter.push(calpha);
        if(hasNumbers)
            letter.push(nums);
        if(hasSymbols)
            letter.push(specials);
        letter = letter.join("");
        for (let i = 0; i < nrChar; i++) {
            const randomStringNumber = Math.floor(1 + Math.random() * (letter.length - 1));
            randomString += letter.substring(randomStringNumber, randomStringNumber + 1);
        }
        return randomString;
    }

    // event handlers
    const handleSlide = (event) =>{
        setPassLen(event.target.value);
    }

    const delay = (time) => {
        return new Promise(resolve => setTimeout(resolve, time));
      }

    const handleClick = () =>{
        navigator.clipboard.writeText(pass);
        setCopied("copied");
        delay(500).then(() => setCopied("not-copied"));
    }
    
    const handleGenerate = () => {
        // actually generate a pass here
        const password = generatePass(passLen, upperCase, lowerCase, hasNumbers, hasSymbols);
        setPass(password);

        // check pass strength
        let sum = ~~upperCase + ~~lowerCase + ~~hasNumbers + ~~hasSymbols;
        if(passLen < 10)
            setStrength("too-weak");
        else if( passLen >= 20 )
                setStrength("medium");
        else
            switch(sum){
                case 1:
                    setStrength("too-weak");
                    break;
                case 2:
                    setStrength("weak");
                    break;
                case 3:
                    setStrength("medium");
                    break;
                case 4:
                    setStrength("strong");
                    break;
                default: setStrength("too-weak");
            }
    }

    const handleCheck = (event, check, setCheck) => {
        let sum = ~~upperCase + ~~lowerCase + ~~hasNumbers + ~~hasSymbols;
        if( sum === 1)
            {
                event.target.checked = true;
                setCheck(true);
            }
        else
            setCheck(!check);
    }

    return(
        <div className="password-generator">
            <h1>Password Generator</h1>
            <div className="password-wrapper">
                <div className="password">{ pass }</div>
                <button className="clipboard" onClick={handleClick}>
                    <div className={ copied }>
                        Copied!
                    </div>
                    <img src={ CopyIcon } alt="copy icon"></img>
                </button>
            </div>
            <div className="password-params">
                <div className="char-len">
                    <section>
                        <p>Character Length</p>
                        <span>{ passLen }</span>
                    </section>
                    <input className="slider" onChange={ handleSlide } type="range" min="1" max="30" defaultValue={ passLen } id="myRange"></input>
                </div>
                <div className="password-criterias">
                    <div className="criteria">
                        <input 
                        onChange={(event) => {handleCheck(event,upperCase, setUpperCase)}}
                        type="checkbox" id="uppercase" 
                        defaultChecked = { true }
                        name="uppercase" value="uppercase"></input>
                        <label htmlFor="uppercase"> Include Uppercase Letters</label><br></br>
                    </div>
                    <div className="criteria">
                        <input 
                        onChange={(event) => {handleCheck(event, lowerCase, setLowerCase)}}
                        type="checkbox" id="lowercase"
                        defaultChecked = { true }
                        name="lowercase" value="lowercase"></input>
                        <label htmlFor="lowercase"> Include LowerCase Letters</label><br></br>
                    </div>
                    <div className="criteria">
                        <input 
                        onChange={(event) => {handleCheck(event, hasNumbers, sethasNumbers)}}
                        type="checkbox" id="numbers"
                        defaultChecked = { true }
                        name="numbers" value="numbers"></input>
                        <label htmlFor="numbers"> Include Numbers Letters</label><br></br>
                    </div>
                    <div className="criteria">
                        <input
                        onChange={(event) => {handleCheck(event, hasSymbols, sethasSymbols)}} 
                        type="checkbox" id="symbols" name="symbols" value="symbols"></input>
                        <label htmlFor="symbols"> Include Symbols Letters</label><br></br>
                    </div>
                </div>
                <div className="password-strength">
                    <p>Strength</p>
                    <div className="strength">
                        <span>{ strength === "too-weak" ? `${strength.split("-").join(" ")}!`:strength }</span>
                        <div className={`strength-rectangles`}>
                            <div className={`rectangle ${strength}`}></div>
                            <div className={`rectangle ${strength}`}></div>
                            <div className={`rectangle ${strength}`}></div>
                            <div className={`rectangle ${strength}`}></div>
                        </div>
                    </div>
                </div>
                <button className="generate" onClick={ handleGenerate }>
                    <span>Generate</span>
                    <img src={ ArrowRightIcon } alt="right arrow icon"></img>
                </button>
            </div>
        </div>
    );
}

export default PasswordGenerator;