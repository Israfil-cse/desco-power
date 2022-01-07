import React, { useContext, useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { billContext } from '../../App';


const Billing = () => {
    const { register, handleSubmit, reset } = useForm();

    const [remove, setRemove] = useState(false)

    const [searchResult, setSearchResult] = useContext(billContext)

    const [pageCount, setPageCount] = useState(0);
    const [page, setPage] = useState(0);
    const size = 10;

    useEffect(() => {
        fetch(`http://localhost:5000/api/billing-list?page=${page}&&size=${size}`)
            .then(res => res.json())
            .then(data => {
                setSearchResult(data.result)
                const count = data.count;
                const pageNumber = Math.ceil(count / 10);
                setPageCount(pageNumber)
            })
    }, [page, remove, searchResult])


    const handleDelete = (id) => {
        const proceed = window.confirm("Are you sure you want to delete?");
        if (proceed) {
            fetch(`http://localhost:5000/api/delete-billing/${id}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' }
            })
                .then(res => res.json())
                .then(data => {
                    if (data.deletedCount > 0) {
                        alert("Bill successfully deleted!")
                        setRemove(!remove)
                    };
                })
        }
    }

    const [bill, setBill] = useState({});

    const handleEdit = (id) => {
        fetch(`http://localhost:5000/allBillings/${id}`)
            .then((res) => res.json())
            .then((data) => setBill(data));
    }


    const onSubmit = data => {

        const id = bill?._id

        fetch(`http://localhost:5000/api/update-billing/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.modifiedCount > 0) {
                    alert("Bill updated successfully!");
                    reset(setBill({}));
                }
            });
    }

    return (
        <>
            <table className="table table-border text-center mt-5">
                <thead>
                    <tr className="border">
                        <th className="text-secondary text-left" scope="col">Sr No</th>
                        <th className="text-secondary" scope="col">Billing ID</th>
                        <th className="text-secondary" scope="col">Full Name</th>
                        <th className="text-secondary" scope="col">Email</th>
                        <th className="text-secondary" scope="col">Phone</th>
                        <th className="text-secondary" scope="col">Paid Amount</th>
                        <th className="text-secondary" scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        searchResult.map((service, index) =>
                            <tr>
                                <td>{index + 1}</td>
                                <td>{service?.id}</td>
                                <td>{service?.name}</td>
                                <td>{service?.email}</td>
                                <td>+88{service?.phone}</td>
                                <td>${service?.amount}</td>
                                <td>
                                    <button className="btn btn-light" type="submit" data-bs-toggle="modal" data-bs-target="#editBilling" onClick={() => handleEdit(service?._id)}>Edit</button>
                                    <button className="btn btn-light ms-2" onClick={() => handleDelete(service?._id)}>Delete</button>
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
            <div className="modal fade" id="editBilling" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <label>Full Name*:</label>
                                <input type="text" defaultValue={bill?.name} {...register("name", { required: true })} className="form-control mb-3" />

                                <label>Email*:</label>
                                <input type="email" defaultValue={bill?.email} {...register("email", { required: true })} className="form-control mb-3" />

                                <label>Phone*:</label>
                                <input type="tel" defaultValue={bill?.phone} {...register("phone", { required: true })} className="form-control mb-3" />

                                <label>Paid Amount*:</label>
                                <input type="number" defaultValue={bill?.amount} {...register("amount", { required: true })} className="form-control mb-3" />
                                <p>[Note: * indicates required field]</p>
                                <div className="modal-footer">
                                    <button type="submit" className="btn btn-dark">Edit</button>
                                </div>
                            </form>
                        </div>

                    </div>
                </div>
            </div>
            <div className="pagination">
                {
                    [...Array(pageCount).keys()]
                        .map(number => <button key={number} onClick={() => setPage(number)} className={page === number ? "selected" : ""}>{number + 1}
                        </button>)
                }
            </div>
        </>
    );
};

export default Billing;