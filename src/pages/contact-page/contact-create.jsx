import React, { useEffect } from "react";
import { Button, Form, Spinner, Alert } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { contactCreateAsync, contactClearState } from "../../redux/contact-slice";
import { useForm } from "react-hook-form";


function ContactCreate() {
    const dispatch = useDispatch();
    const { isSuccess, isError, isFetching, errorMessage } = useSelector((state) => state.contact);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const history = useHistory();

    const onSubmit = data => {
        dispatch(contactCreateAsync(data))
    }

    useEffect(() => {
        if (isSuccess) {
            history.push("/");
        }
    }, [history, isSuccess]);

    useEffect(() => {
        return dispatch(contactClearState())
    }, [dispatch]);

    return (
        <div>
            <div className="text-center">
                <h2>New contact</h2>
            </div>
            <div className="position-relative">
                {isFetching ? <div className="spin"><Spinner animation="grow" /></div> : ""}
            </div>
            <div className="d-flex justify-content-center">
                <div className="col-md-6">
                    <div className="card p-4">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Firstname</Form.Label>
                                <Form.Control type="text" placeholder="" {...register("firstname", { required: true })} />
                                {errors.firstname && <span className="input-error">This field is required</span>}
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Lastname</Form.Label>
                                <Form.Control type="text" name="lastname" {...register("lastname", { required: true })} />
                                {errors.lastname && <span className="input-error">This field is required</span>}
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Phone</Form.Label>
                                <Form.Control type="text" name="phonenumber" {...register("phonenumber", { required: true })} />
                                {errors.phonenumber && <span className="input-error">This field is required</span>}
                            </Form.Group>

                            <Form.Group className="mt-5">
                                <div className="d-grid gap-2"> <Button type="submit" variant="primary" size="lg">Create</Button>
                                </div>
                            </Form.Group>
                            {isError && <Alert variant="danger" className="text-center mt-3">{errorMessage}!</Alert>}
                        </form>
                        <Link to="/" className="text-center pt-3 ">All Contacts</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ContactCreate;
