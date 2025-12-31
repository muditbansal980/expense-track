import Navbar from "./navbar";
import { useState, useEffect } from "react";
import Loading from "./loading";
import Datefilter from "./filters/date";
import BASE_URL from "../../config/api";

export default function mainpage() {
    const [data, setData] = useState([]);
    const [editdata, setEditdata] = useState(null);
    const [loading, setLoading] = useState(false);
    const editbox = document.getElementById("edit-modal");
    useEffect(() => {
        fetchNotes("all");
    }, []);
    // Fetch existing notes from backend when component mounts
    async function fetchNotes(days) {
        try {
            setLoading(true);
            // const res = await fetch("http://localhost:3008/crud/addexpense", {
            const res = await fetch(`${BASE_URL}/crud/addexpense?days=${encodeURIComponent(days)}`, {
                method: "GET",
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json"
                }
            });
            console.log(res);
            if (res.ok) {
                const data = await res.json();
                setData(data);
            }
            else {
                console.error("Failed to fetch notes");
            }
        } catch (error) {
            console.error("Error fetching notes:", error);
        }
        finally {
            setLoading(false);
        }
    }


    if (loading) {
        return <Loading />
    }
    async function handleEdit(id) {
        try {
            // const res = await fetch(`http://localhost:3008/crud/editexpense/${id}`, {
            const res = await fetch(`${BASE_URL}/crud/editexpense/${id}`, {
                method: "PATCH",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    title: editdata.title,
                    price: editdata.price,
                })
            });
            if (res.ok) {
                const updatedData = await res.json();
                setData(data.map(item => item._id === id ? updatedData : item));
            }
        }
        catch (error) {
            console.error("Error editing expense:", error);
        }
        finally {
            editbox.style.display = "none";
        }
    }
    async function handleDelete(id) {
        try {
            // const res = await fetch(`http://localhost:3008/crud/deleteexpense/${id}`, {
            const res = await fetch(`https://expense-track-lidg.onrender.com/crud/deleteexpense/${id}`, {
                method: "DELETE",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            if (res.ok) {
                setData(data.filter(item => item._id !== id));
            }
        } catch (error) {
            console.error("Error deleting expense:", error);
        }
    }



    return (
        <div>
            <Navbar noteslist={data} setnoteslist={setData} />
            <Datefilter onFilter={fetchNotes} />
            <div className="bg-amber-950 min-h-screen p-[20px]">
                {data.map((data) => {
                    return (
                        <div key={data._id} className="bg-white text-black p-[10px] rounded-[10px] mb-[10px] flex justify-between items-center">
                            <div>
                                <h2 className="font-bold text-[20px]">{data.title}</h2>
                                <p className="mt-[5px]">{data.price}</p>
                            </div>
                            <div className="rounded-[5px] flex gap-[10px] hover:cursor-pointer " >
                                <button className="p-[5px]  bg-amber-100" onClick={() => setEditdata(data)}>Edit</button>
                                <button className="p-[5px] bg-amber-100" onClick={() => handleDelete(data._id)}>Delete</button>
                            </div>
                        </div>
                    )
                })}
            </div>
            {editdata && (
                <div id="edit-modal" className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[100] bg-gray-800 text-white flex flex-col ">
                    <input className="outline-none border-[1px] border-white margin-[10px] placeholder=Title" value={editdata.title} onChange={(e) => setEditdata({ ...editdata, title: e.target.value })}></input>
                    <input className="outline-none border-[1px] border-white margin-[10px] placeholder=Price" value={editdata.price} onChange={(e) => setEditdata({ ...editdata, price: e.target.value })}></input>
                    <button onClick={() => handleEdit(editdata._id)}>Save</button>
                </div>
            )}
        </div>
    )
}
