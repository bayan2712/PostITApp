import { useSelector } from "react-redux";
import { Row } from "reactstrap";
import { useState } from "react";
import { useForm } from "react-hook-form";

const UsersTest = () => {
 
  const userList = useSelector((state) => state.users.value);
 
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  return (
    <div>
      <h1>Redux Toolkit Implementation</h1>
      Name
      <input
        type="text" 
      />
      <br />
      Email
      <input type="text" />
      <br />
      Password
      <input type="text" />
      <br />
      <button>Save</button>
      <Row>
        <div>
          List of Users
          <table>
            <tbody>
              {userList.map((user) => (
                <tr key={user.email}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.password}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Row>
    </div>
  );
};

export default UsersTest;
