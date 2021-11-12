import React, { useEffect } from "react";
import { Button, Table, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { contactClearState, contactDeleteAsync, contactFetchAsync } from "../../redux/contact-slice";

function ContactList() {
  const dispatch = useDispatch();
  const { contacts, isFetching } = useSelector((state) => state.contact);

  useEffect(() => {
    dispatch(contactFetchAsync());
  }, [dispatch]);

  useEffect(() => {
    return dispatch(contactClearState())
  }, [dispatch]);

  const handleDelete = (value) => {
    dispatch(contactDeleteAsync({ id: value }))
  }
  return (
    <div>
      <div className="page-title">
        <h2>List contact</h2>
        <Link to="/contact-create"> <Button variant="primary" size="sm"> New Contact</Button></Link>
      </div>
      <div className="position-relative">
        {isFetching ? <div className="spin"><Spinner animation="grow" /></div> : ""}
        <Table striped bordered hover >
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Phone number</th>
              <th width="15%" className="text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{item.firstname}</td>
                  <td>{item.lastname}</td>
                  <td>{item.phonenumber}</td>
                  <td className="text-center"><Button variant="info" size="sm" >Edit </Button> <Button variant="danger" size="sm" onClick={() => handleDelete(item.id)} >Delete</Button></td>
                </tr>
              )
            })}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default ContactList;
