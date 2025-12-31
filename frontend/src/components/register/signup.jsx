import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import Loading from "../loading"
import BASE_URL from "../../../config/api";
export default function Signup() {
    const [username, setusername] = useState("")
    const [password, setpassword] = useState("")
    const [email, setemail] = useState("")
    const [error, seterror] = useState(false)
    const [errormsg, seterrormsg] = useState("")
    const navigate = useNavigate()
    const [loading, setloading] = useState(false);
    useEffect(() => {
        if (!error) return;
        const t = setTimeout(() => {
            seterror(false)
        }, 2000)
        return () => clearTimeout(t)
    }, [error])

    async function handlesignup(e) {
        e.preventDefault()
        try {
            setloading(true);
            // const res = await fetch("http://localhost:3008/user/signup", {
            const res = await fetch(`${BASE_URL}/user/signup`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: 'include',
                body: JSON.stringify({
                    username: username,
                    password: password,
                    email: email
                })
            })
            if (res.ok) {
                navigate("/")
            }
            if (res.status === 409) {
                seterror(true)
                seterrormsg("User Already Exists.Try with other email or username")
            }
        }
        catch (err) {
            console.error("Error during signup:", err);
        }
        finally {
            setloading(false);
        }
    }
    if (loading) {
        return <Loading />
    }
    return (
        <div className="bg-amber-900 h-[100vh] w-[100vw] flex justify-center items-center">
            <div className="bg-white p-[10px] flex flex-col justify-center items-center">
                <div className="mt-[5px] mb-[5px]">
                    <h1>SIGN UP</h1>
                </div>
                <div >
                    <form onSubmit={handlesignup} className="flex flex-col gap-[5px]">
                        <input onChange={(e) => setusername(e.target.value)} value={username} type="text" className="p-[5px]  text-[12px] outline-none border-[5px] border-[#dc0000]" placeholder="Enter the Username" required />
                        <input onChange={(e) => setpassword(e.target.value)} value={password} type="password" className="p-[5px]  text-[12px] outline-none border-[5px] border-[#dc0000]" placeholder="Enter the Password" required />
                        <input onChange={(e) => setemail(e.target.value)} value={email} type="email" className="p-[5px]  text-[12px] outline-none border-[5px] border-[#dc0000]" placeholder="Enter the Email" required />
                        <div className="flex justify-center items-center">
                            <button type="submit" className="bg-amber-900 p-[10px] text-white">Sign Up</button>
                        </div>
                    </form>
                </div>
                <div className="flex">
                    <p>
                        Already have a account?
                    </p>
                    <Link to="/"> <span className="text-blue-500">Login</span></Link>
                </div>
            </div>
            <div className={`bg-red-500 text-white p-4 rounded fixed top-0  ${error ? "block" : "hidden"}`} >
                <h2>{errormsg}</h2>
            </div>
        </div>
    )
}