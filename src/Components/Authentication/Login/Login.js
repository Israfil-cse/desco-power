import React, { useContext, useEffect, useState } from "react"
import "./Login.css"
import axios from "axios"
import { useHistory } from "react-router-dom"
import { userContext } from "../../../App"
import Header from "../../Shared/Header/Header"
import Swal from 'sweetalert2'


const Login = () => {
    const [loggedUser, setLoggedUser] = useContext(userContext)
    const history = useHistory()

    const [user, setUser] = useState({
        email: "",
        password: ""
    })

    const handleChange = e => {
        const { name, value } = e.target
        setUser({
            ...user,
            [name]: value
        })
    }

    const login = () => {
        axios.post("https://enigmatic-meadow-75433.herokuapp.com/api/login", user)
            .then(res => {
                Swal.fire({

                    text: (res.data.message),
                    
                  })
                // alert(res.data.message)
                setLoggedUser(res.data.user)
                let person = { email: res.data.user.email };
                let value = JSON.stringify(person);
                sessionStorage.setItem("user", value);

                history.push("/")
            })
    }


    return (
        <>
            <Header />
            <div className="login mx-auto my-5 py-5">
                <h1>Login</h1>
                <input type="text" name="email" value={user.email} onChange={handleChange} placeholder="Enter your Email"></input>
                <input type="password" name="password" value={user.password} onChange={handleChange} placeholder="Enter your Password" ></input>
                <button className="btn btn-dark w-75 my-2 py-2" onClick={login}>Login</button>
                <div>or</div>
                <button className="btn btn-dark w-75 my-2 py-2" onClick={() => history.push("/register")}>Register</button>
            </div>
        </>
    )
}

export default Login