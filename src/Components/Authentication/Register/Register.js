import React, { useState } from "react"
import "./Register.css"
import axios from "axios"
import { useHistory } from "react-router-dom"
import Header from "../../Shared/Header/Header"

const Register = () => {

    const history = useHistory()

    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        reEnterPassword: ""
    })

    const handleChange = e => {
        const { name, value } = e.target
        setUser({
            ...user,
            [name]: value
        })
    }

    const register = () => {
        const { name, email, password, reEnterPassword } = user
        if (name && email && password && (password === reEnterPassword)) {
            axios.post("http://localhost:5000/api/registration", user)
                .then(res => {

                    if (res.data.message) {
                        alert("User already exist")
                    }
                    else {
                        alert("Successfully registered")
                        history.push("/login")
                    }
                })
        } else {
            alert("invalid input")
        }

    }

    return (
        <>
            <Header />
            <div className="register mx-auto my-5">
                {console.log("User", user)}
                <h1>Register</h1>
                <input type="text" name="name" value={user.name} placeholder="Your Name" onChange={handleChange}></input>

                <input type="text" name="email" value={user.email} placeholder="Your Email" onChange={handleChange}></input>

                <input type="password" name="password" value={user.password} placeholder="Your Password" onChange={handleChange}></input>

                <input type="password" name="reEnterPassword" value={user.reEnterPassword} placeholder="Re-enter Password" onChange={handleChange}></input>
                <button className="btn btn-dark w-75 my-2 py-2" onClick={register} >Register</button>
                <div>or</div>
                <button className="btn btn-dark w-75 my-2 py-2" onClick={() => history.push("/login")}>Login</button>
            </div>
        </>
    )
}

export default Register