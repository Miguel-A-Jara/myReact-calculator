import React, { useState } from "react";
import Button from "./Button";

const CalculatorLayout = () => {
    //States
    const [calc, setCalc] = useState("");
    const [result, setResult] = useState("");

    //Special operands
    const ops = ["/", "*", "+", "-", "."];

    //Creates digits from 0 to 9
    const createDigits = () => {
        const digits = [];

        for (let i = 9; i >= 0; i--) {
            digits.push(
                <Button
                    key={i}
                    value={i.toString()}
                    callback={(e) => updateCalc(e.target.innerHTML)}
                ></Button>
            );
        }

        return digits;
    };

    //Updates the "calc" state
    const updateCalc = (value) => {
        if (
            (ops.includes(value) && calc === "") ||
            (ops.includes(value) && ops.includes(calc.slice(-1)))
        ) {
            return;
        }

        setCalc(calc + value);

        if (!ops.includes(value)) {
            setResult(eval(calc + value).toString());
        }
    };

    //Used by "DEL" to delete last character
    const deleteLast = () => {
        if (calc === "") {
            return;
        }

        const value = calc.slice(0, -1);

        setCalc(value);
    };

    //Used by "CLR" to clear the display
    const clearCalc = () => {
        setCalc("");
        setResult("");
    };

    //Used by "=" to calculate the expression
    const calculate = () => {
        if (calc === "") {
            return;
        }
        setCalc(eval(calc).toString());
    };

    return (
        <>
            <h2>Miguel's Calculator</h2>
            <div className="calculator">
                <div className="display">
                    {result ? <span>({result})</span> : ""}&nbsp; {calc || "0"}
                </div>

                <div className="operators">
                    <Button
                        value={"+"}
                        callback={(e) => updateCalc(e.target.innerHTML)}
                    ></Button>
                    <Button
                        value={"-"}
                        callback={(e) => updateCalc(e.target.innerHTML)}
                    ></Button>
                    <Button
                        value={"/"}
                        callback={(e) => updateCalc(e.target.innerHTML)}
                    ></Button>
                    <Button
                        value={"*"}
                        callback={(e) => updateCalc(e.target.innerHTML)}
                    ></Button>

                    <Button
                        value={"DEL"}
                        callback={() => deleteLast()}
                    ></Button>
                    <Button value={"CLR"} callback={() => clearCalc()}></Button>
                </div>

                <div className="digits">
                    {createDigits()}

                    <Button
                        value={"."}
                        callback={(e) => updateCalc(e.target.innerHTML)}
                    ></Button>
                    <Button value={"="} callback={() => calculate()}></Button>
                </div>
            </div>
        </>
    );
};

export default CalculatorLayout;
