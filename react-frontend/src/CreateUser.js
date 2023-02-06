import { useAuth } from "./context/AuthProvider";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

export const CreateUser = () => {
    const { value } = useAuth();
    const navigate = useNavigate();

    const handleCreation = async () => {

        var createUsername = document.getElementById("createUsername").value;
        var createPassword = document.getElementById("createPassword").value;
        var createValidatePassword = document.getElementById("createValidatePassword").value;

        const token = axios.post('http://localhost:5000/account/register', {
        username: createUsername,
        password: createPassword,
        validatePassword: createValidatePassword
        })
        .then(function (response) {
        navigate("/landing");
        })
        .catch(function (error) {
        alert(error.response.data);
        console.log(error)
        });
    }

    return (
    <>
    <div className="grid">
        <h2>Create User (Public)</h2>

        <div className="row">
            <h4>Enter Username</h4>
            <input type="text" id="createUsername"></input>
        </div>

        <div className="row">
            <h4>Enter Password</h4>
            <input type="password" id="createPassword"></input>
        </div>

        <div className="row">
            <h4>Validate Password</h4>
            <input type="password" id="createValidatePassword"></input>
        </div>

        <div className="row">
        <button type="button" onClick={handleCreation}>
            Create User
        </button>
        </div>
    </div>
    </>
);
};