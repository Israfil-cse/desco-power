import React, { useContext, useEffect, useState } from 'react';
import './BlinigsManager.css'
import { useForm } from "react-hook-form";
import { billContext } from '../../../App';


const BilingsManager = () => {
    const { register, handleSubmit, reset } = useForm();

    const [searchResult, setSearchResult] = useContext(billContext)

    const [billings, setBillings] = useState([])


    const id = Math.ceil(Math.random() * 1000);

    const onSubmit = data => {
        data.id = "DP_" + id;
        fetch("http://localhost:5000/api/add-billing", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged) {
                    alert("Bill added successfully")
                }
                else {
                    alert("Sorry! Something wrong")
                }
            })
        reset();
    };

    useEffect(() => {
        fetch("http://localhost:5000/allBillings")
            .then(res => res.json())
            .then(data => {
                setBillings(data);
            })
    }, [])

    const handleSearch = (event) => {
        const searchText = event.target.value;

        const matchedProduct = billings.filter(person => (person.phone === searchText) || (person.email.toLowerCase().includes(searchText.toLowerCase())) || (person.name.toLowerCase().includes(searchText.toLowerCase()))
        );

        setSearchResult(matchedProduct);
    }


    return (
        <>
            <nav className="navbar navbar-light bg-light mt-5">
                <div className="container-fluid d-flex justify-content-between">
                    <div className="d-flex justify-content-between">
                        <a className="navbar-brand">Billings </a>
                        <input className="form-control w-100 me-2" type="search" onChange={handleSearch} placeholder="Search" />
                    </div>
                    <button className="btn btn-dark" type="submit" data-bs-toggle="modal" data-bs-target="#exampleModal">Add New Bill</button>
                </div>
            </nav>

            <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">New Bill</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <label>Full Name*:</label>
                                <input type="text" {...register("name", { required: true })} className="form-control mb-3" />
                                <label>Email*:</label>
                                <input type="email" {...register("email", { required: true })} className="form-control mb-3" />
                                <label>Phone*:</label>
                                <input type="tel" {...register("phone", { required: true })} className="form-control mb-3" />
                                <label>Paid Amount*:</label>
                                <input type="number" {...register("amount", { required: true })} className="form-control mb-3" />
                                <p>[Note: * indicates required field]</p>
                                <div className="modal-footer">
                                    <button type="submit" className="btn btn-dark">Add Bill</button>
                                </div>
                            </form>
                        </div>

                    </div>
                </div>
            </div>

        </>

    );
};

export default BilingsManager;