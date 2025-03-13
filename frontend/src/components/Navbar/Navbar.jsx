import { NavLink,useNavigate,Link } from "react-router-dom"
import { FaHome,FaHeart } from "react-icons/fa";
import { FaBowlFood } from "react-icons/fa6";
import { useState,useEffect } from "react";
import Login from "../loginAndRegister/Login";
import { IoLogInSharp,  IoLogOutSharp } from "react-icons/io5";

function Navbar(){
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const [isLogin, setIsLogin] = useState(false);
    const [token,setToken] = useState("")
    useEffect(() => {
        setToken(localStorage.getItem("token"))
        setIsLogin(token ? true : false);
    }, [isOpen,token])
    const toggle = () => {
        setIsOpen(true);
    }

    const handelLogout = () => {
        localStorage.removeItem("token");
        sessionStorage.removeItem("token");
        setIsLogin(false);
        navigate('/')
    }

    const navbar = [
        {
            name:"Home",
            url:"/",
            icon:<FaHome />,
        },
        {
            name:"My Recipe",
            url:"/myrecipe",
            icon:<FaBowlFood />,
        },
        {
            name:"Favorite",
            url:"/favorite",
            icon:<FaHeart />,
        },
    ]
    return (
        <>
            <nav className="navbar flex justify-between shadow-lg shadow-green-100/50 items-center p-4 bg-white sticky top-0 z-10">
                <div className="text-3xl font-bold"><Link to="/"> Recipe App</Link></div>
                <ul  className="flex">
                {isLogin ? (
                        <>
                            {navbar.map((item, index) => (
                            <li className="flex mx-2" key={index}>
                                <NavLink
                                    to={item.url}
                                    className={({ isActive }) =>
                                    isActive
                                        ? "flex gap-1 items-center text-emerald-600"
                                        : "flex gap-1 items-center hover:text-emerald-600"
                                    }
                                >
                                    {item.icon}
                                    <span>{item.name}</span>
                                </NavLink>
                            </li>
                            ))}
                            <li
                            className="flex gap-1 items-center hover:text-emerald-600 cursor-pointer"
                            onClick={handelLogout}
                            >
                            < IoLogOutSharp  /> Logout
                            </li>
                        </>
                        ) : (
                        <li
                            className="flex gap-1 items-center hover:text-emerald-600 cursor-pointer"
                            onClick={toggle}
                        >
                            <IoLogInSharp /> Login
                        </li>
                        )}

                    
                </ul>
            </nav>
            {isOpen && <Login setIsOpen={setIsOpen} />}
        </>

    )
}
export default Navbar