import Addexpense from "./addexpense";
import { useState } from "react";
export default function Navbar(props) {
    function handleaddNote() {
        if (display === "hidden") {
            setDisplay("block");
            console.log("Add Note opened");
        }
        else {
            setDisplay("hidden");
            console.log("Add Note closed");
        }
    }
    const [display, setDisplay] = useState("hidden");
    return (
        <div className="bg-[black] w-full flex justify-between p-[20px]">
            <div className="text-white font-bold ">Expense Tracker</div>
            <div onClick={handleaddNote} className="bg-transparent border-[2px] p-[10px] rounded-full  flex justify-center items-center  w-[20px] h-[20px] border-white cursor-pointer  text-white">
                +
            </div>
            <Addexpense display={display} noteslist={props.noteslist} setnoteslist={props.setnoteslist} closeModal={() => setDisplay("hidden")} />
        </div>

    )
}
