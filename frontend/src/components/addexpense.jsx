import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "./loading";
export default function AddNote(props) {
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [display, setDisplay] = useState(props.display);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    async function handleadd(e) {
        e.preventDefault();
        try {
            setLoading(true);
            // <------------POST request to add note to backend-------------->
            const res = await fetch("http://localhost:3008/crud/addexpense", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    title: title,
                    price: price,
                })

            });
            if (res.status === 201) {
                setTitle("");
                setPrice("");
                setDisplay("hidden");
                props.setnoteslist([...props.noteslist, { "title": title, "price": price }]);
            }
            if (res.status === 404) {
                navigate("/")
            }
            if(res.status===406){
                navigate("/");
            }
        } catch (error) {
            console.error("Error adding note:", error);
        }
        finally {
            setLoading(false);
        }
    }
    if (loading) {
        return <Loading />
    }
    return (
        <div id="addNote" onClick={() => props.closeModal && props.closeModal()} className={`fixed inset-0 ${props.display} z-[100] bg-black/50 flex items-center justify-center`}>
            <div onClick={(e) => e.stopPropagation()} className="border-[1px] border-white p-[6px] rounded-[10px] bg-gray-800 text-white w-[90%] max-w-md">
                <div className="flex justify-center items-center">
                    <h1>AddExpense</h1>
                </div>
                <div className="m-[10px] flex  items-center">
                    <label htmlFor="title" className="mr-[45px]">Title</label><br />
                    <input value={title} onChange={e => setTitle(e.target.value)} id="title" placeholder="Enter Title" type="text" className="border-[1px] border-white outline-none ml-[10px] p-[5px]  bg-black text-white" />
                </div>
                <div className="m-[10px] flex items-center">
                    <label htmlFor="content" className="mr-[20px]">Content</label><br />
                    <textarea value={price} onChange={e => setPrice(e.target.value)} id="content" placeholder="Enter Content" className="border-[1px] border-white outline-none ml-[10px] p-[5px] bg-black text-white"></textarea>
                </div>
                <div className="flex justify-center items-center mt-[10px]">
                    <button onClick={handleadd} className="bg-white hover:cursor-pointer text-black p-[5px] rounded-[5px]">Add Expense</button>
                </div>
            </div>

        </div>
    )
}   