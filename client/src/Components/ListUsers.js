import {
  Form,
  FormGroup,
  Input,
  Label,
  Button,
  Container,
  Row,
  Col,
} from "reactstrap";
import { useState } from "react";

import { userSchemaValidation } from "../Validations/UserValidations";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSelector, useDispatch } from "react-redux";
import { addUser, deleteUser, updateUser } from "../Features/UserSlice";
import { Link } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const ListUsers = () => {
  const userList = useSelector((state) => state.users.value);
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");

  const {
    register,
    handleSubmit, 
    formState: { errors },
  } = useForm({
    resolver: yupResolver(userSchemaValidation), 
  });

  const handleDelete = (email) => {
    dispatch(deleteUser(email));
  };

  const dispatch = useDispatch();

  const handleUpdate = (email) => {
    const userData = {
      name: name,
      email: email,
      password: password,
    };
    dispatch(updateUser(userData));
  };

  return (
    <Container fluid>
      <Row>
        <Col md={6}>
          List of Users
          <table>
            <tbody>
              {userList.map((user) => (
                <tr key={user.email}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.password}</td>
                  <td>
                    <Button onClick={() => handleDelete(user.email)}>
                      Delete User
                    </Button>
                    <Link
                      to={`/update/${user.email}/${user.name}/${user.password}`}
                    >
                      <Button color="primary">Update User</Button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Col>
      </Row>
    </Container>
  );
};

export default ListUsers;
