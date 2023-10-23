import axios from "axios";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";

const ChangePassword = () => {
  const { uid } = useParams();
  const token = localStorage.getItem("token");
  const [inputPass, setInputPass] = useState({
    password: "",
    confirm_password: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const handleChange = (e) => {
    setInputPass({
      ...inputPass,
      [e.target.name]: e.target.value,
    });
  };

  // console.log(inputPass);
  const submitInput = async (e) => {
    e.preventDefault();

    if (inputPass.password !== inputPass.confirm_password) {
      setConfirmPassword("Password and confirm password not same");
    } else {
      setConfirmPassword("");
    }
    try {
      const changePass = await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/users/${uid}/change-password`,
        inputPass,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // console.log(changePass);
      Swal.fire({
        text: "Successfully updated password",
        icon: "success",
      });
      window.location.reload();
    } catch (err) {
      Swal.fire({
        text: "Password and Confirm Password not same",
        icon: "danger",
      });
    }
  };
  return (
    <div className="tab-pane change-password fade pt-3" id="change-password">
      <form action="post" onSubmit={submitInput}>
        <div className="row mb-3">
          <label className="col-md-4 col-lg-3 col-form-label">Password</label>
          <div className="col-md-8 col-lg-9">
            <input
              type="password"
              className="form-control"
              name="password"
              value={inputPass.password}
              onChange={(e) => setInputPass({...inputPass, password: e.target.value})}
            />
          </div>
        </div>
        <div className="row mb-3">
          <label className="col-md-4 col-lg-3 col-form-label">
            Confirm Password
          </label>
          <div className="col-md-8 col-lg-9">
            <input
              type="password"
              className="form-control"
              name="confirm_password"
              value={inputPass.confirm_password}
              onChange={(e) => setInputPass({...inputPass, confirm_password: e.target.value})}
            />
            {confirmPassword && <p className="text-danger">{confirmPassword}</p>}
          </div>
        </div>
        <div className="text-center">
          <button type="submit" className="btn btn-primary">
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChangePassword;
