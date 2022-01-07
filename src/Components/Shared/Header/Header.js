import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { userContext } from '../../../App';


const Header = () => {
    const [billingsAmount, setBillingsAmount] = useState([])
    const [loggedUser, setLoggedUser] = useContext(userContext)

    const history = useHistory()

    useEffect(() => {
        fetch("http://localhost:5000/allBillings")
            .then(res => res.json())
            .then(data => {
                setBillingsAmount(data);
            })
    }, [billingsAmount])

    const total = billingsAmount.reduce((total, item) => total + parseInt(item?.amount), 0);
    const location = useLocation()

    // logout
    const handleLogout = () => {
        sessionStorage.removeItem("user")
        history.push("/login")
    }
    let email = sessionStorage.getItem("user");

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">DESCO POWER</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse d-flex" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <a className="nav-link active fw-bold" aria-current="page" href="#">
                                {
                                    location.pathname === ("/register") ? <span></span> :
                                        <span>Paid Total : ${total}</span>
                                            &&
                                            location.pathname === ("/login") ? <span></span> :
                                            <span>Paid Total : ${total}</span>
                                }

                            </a>
                        </li>
                    </ul>
                    {email && <button onClick={handleLogout} className="btn btn-danger">Log Out</button>}
                </div>
            </div>
        </nav>
    );
};

export default Header;