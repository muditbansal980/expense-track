import {useNavigate} from "react-router-dom"
import {useState} from "react"
import {Link} from "react-router-dom"
import Loading from "../loading"
import BASE_URL from "../../../config/api";
export default function Login() {
    const [username, setusername] = useState("")
    const [password, setpassword] = useState("")
    const [loading,setloading]= useState(false)
    const navigate = useNavigate()
    async function handlelogin(e) {

        e.preventDefault()
        try{
            setloading(true);
        // const res = await fetch("http://localhost:3008/user/login", {
        const res = await fetch(`${BASE_URL}/user/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials:'include',
            body: JSON.stringify({
                username: username,
                password: password
            })
        })
        if(res.ok){
            navigate("/main")
        }
        if(res.status === 404){
            navigate("/Signup")
        }
        }
        catch(err){
            console.error("Error during login:", err);
        }
        finally{
            setloading(false);
        }
    }
    if(loading){
        return <Loading/>
    }
    return (
        <div className="bg-amber-900 h-[100vh] w-[100vw] flex justify-center items-center">
            <div className="bg-white p-[10px] flex flex-col justify-center items-center">
                <div>
                    <h1 className="text-[#bd0202]">LOGIN</h1>
                </div>
                <div>
                    <form onSubmit={handlelogin} className="flex flex-col gap-[10px] ">
                        <input value={username} onChange={(e)=>setusername(e.target.value)} type="text" className="outline-none border-[5px] border-[#dc0000] p-[5px] text-amber-900" placeholder="Enter the Username" required></input>
                        <input value={password} onChange={(e)=>setpassword(e.target.value)} type="password" className="outline-none border-[5px] border-[#dc0000] p-[5px]  text-amber-900" placeholder="Enter the Password" required></input>
                        <div className="flex justify-center ">
                            <button type="submit" className="bg-amber-900 p-[10px] text-white">LOGIN</button>
                        </div>
                    </form>
                </div>
                <div className="flex">
                    <p>
                        Don't have a account already?
                    </p>
                    <Link to="/signup"><span className="text-blue-500">Signup</span></Link>
                </div>
            </div>
        </div>
    )
}