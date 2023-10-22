import React, { useEffect, useState } from "react";
import IconImage from "../../../assets/img/team-1.jpg";
import { useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const EditProfil = ({ roles, position, primaryTeam, users }) => {
  const { uid } = useParams();
  const token = localStorage.getItem("token");
  const [userDetail, setUserDetail] = useState({});

  const [editUser, setEditUser] = useState("");

  const [imageProfil, setImageProfil] = useState("");
  const [selectRole, setSelectRole] = useState(userDetail?.role?.uid);
  const [selectPosition, setSelectPosition] = useState(userDetail?.role?.uid);
  const [selectPrimaryTeam, setSelectPrimaryTeam] = useState(
    userDetail?.primary_team?.uid
  );
  const [selectSecondaryTeam, setSelectSecondaryTeam] = useState(
    userDetail?.secondary_team?.uid
  );
  const [selectRefUser, setSelectRefUser] = useState(
    userDetail?.refrence_user?.uid
  );
  // console.log(userDetail);
  const getDataUser = (uid, token) => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/users/${uid}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const UserData = res.data.data;
        setUserDetail(res.data.data);
        setEditUser({
          name: UserData.name,
          email: UserData.email,
          telp_number: UserData.telp_number,
          pid: UserData.pid,
          company_name: UserData.company_name,
          reff_uid: UserData.reff_uid,
          position: UserData.position_uid,

          // ... tambahkan properti lainnya sesuai kebutuhan
        });
      })
      .catch((err) => {
        if (err.response.data.message === "Unauthenticated.") {
          localStorage.clear();
          window.location.href = "/login";
        }
      });
  };

  // image

  const handleImageChange = (e) => {
    const selectImage = e.target.files[0];
    setEditUser({
      ...editUser,
      image: selectImage,
    });
    if (selectImage) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImageProfil(e.target.result);
      };
      reader.readAsDataURL(selectImage);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditUser({
      ...editUser,
      [name]: value,
    });
  };

  useEffect(() => {
    getDataUser(uid, token);
  }, [uid, token]);

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    if (editUser.image) {
      formData.append("image", editUser.image);
    }
    formData.append("name", editUser.name);
    formData.append("email", editUser.email);
    formData.append("telp_number", editUser.telp_number);
    formData.append("pid", editUser.pid);
    formData.append("company_name", editUser.company_name);
    formData.append("role_uid", selectRole);
    formData.append("primary_team_uid", selectPrimaryTeam);
    formData.append("secondary_team_uid", selectSecondaryTeam);
    formData.append("position_uid", selectPosition);
    formData.append("reff_uid", selectRefUser);
    console.log(formData);
    try {
      const updateUser = await axios
        .put(`${process.env.REACT_APP_BACKEND_URL}/users/${uid}`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => console.log(res));
      // Swal.fire({
      //   title: "Updated Successfully",
      //   text: "Updated Successfully",
      //   icon: "success",
      // });
      // window.location.reload();
    } catch (error) {
      console.log(error);
      if (error.response) {
        Swal.fire({
          text: error.response.data.message,
          icon: "warning",
        });
      } else {
        Swal.fire({ text: "Something wrong", icon: "error" });
      }
    }
  };

  console.log(selectRefUser);
  return (
    <div className="tab-pane fade profile-edit pt-3" id="profile-edit">
      {/* Profile Edit Form */}
      <form onSubmit={handleUpdateUser}>
        <div className="row mb-3">
          <label className="col-md-4 col-lg-3 col-form-label">
            Profile Image
          </label>
          <div className="col-md-8 col-lg-9">
            <img
              src={imageProfil}
              alt="Profile"
              style={{ width: "150px", height: "120px" }}
            />
            <div className="pt-2">
              <input
                type="file"
                className="form-control"
                accept="image/*"
                onChange={handleImageChange}
                name="image"
              />
            </div>
          </div>
        </div>
        <div className="row mb-3">
          <label className="col-md-4 col-lg-3 col-form-label">Name</label>
          <div className="col-md-8 col-lg-9">
            <input
              name="name"
              type="text"
              className="form-control"
              id="fullName"
              value={editUser.name}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>
        <div className="row mb-3">
          <label className="col-md-4 col-lg-3 col-form-label">Email</label>
          <div className="col-md-8 col-lg-9">
            <input
              name="email"
              type="email"
              className="form-control"
              id="email"
              value={editUser.email}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="row mb-3">
          <label className="col-md-4 col-lg-3 col-form-label">No.Telp</label>
          <div className="col-md-8 col-lg-9">
            <input
              name="telp_number"
              type="number"
              className="form-control"
              value={editUser.telp_number}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="row mb-3">
          <label className="col-md-4 col-lg-3 col-form-label">PID</label>
          <div className="col-md-8 col-lg-9">
            <input
              name="pid"
              type="number"
              className="form-control"
              value={editUser.pid || ""}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="row mb-3">
          <label className="col-md-4 col-lg-3 col-form-label">
            Company Name
          </label>
          <div className="col-md-8 col-lg-9">
            <input
              name="company_name"
              type="text"
              className="form-control"
              value={editUser.company_name || ""}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="row mb-3">
          <label className="col-md-4 col-lg-3 col-form-label">Role</label>
          <div className="col-md-8 col-lg-9">
            <select
              name="role_uid"
              className="form-select"
              value={selectRole || editUser?.role?.uid}
              onChange={(e) => {
                const SelectRoleUid = e.target.value;
                setSelectRole(SelectRoleUid);
              }}
              required
            >
              <option value="">Select Role</option>
              {roles.map((role) => (
                <option key={role.uid} value={role.uid}>
                  {role.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="row mb-3">
          <label className="col-md-4 col-lg-3 col-form-label">Position</label>
          <div className="col-md-8 col-lg-9">
            <select
              name="position_uid"
              className="form-select"
              value={selectPosition || editUser?.position?.uid}
              onChange={(e) => {
                const selectPositionUid = e.target.value;
                setSelectPosition(selectPositionUid);
              }}
            >
              <option value="">Select Position</option>
              {position.map((pos) => (
                <option key={pos.uid} value={pos.uid}>
                  {pos.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="row mb-3">
          <label className="col-md-4 col-lg-3 col-form-label">
            Primary Team
          </label>
          <div className="col-md-8 col-lg-9">
            <select
              name="primary_team_uid"
              className="form-select"
              value={selectPrimaryTeam || editUser?.primary_team?.uid}
              onChange={(e) => {
                const uidPrimaryTeam = e.target.value;
                setSelectPrimaryTeam(uidPrimaryTeam);
              }}
            >
              <option value=" ">Select Primary Team</option>
              {primaryTeam.map((pt) => (
                <option key={pt.uid} value={pt.uid}>
                  {pt.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="row mb-3">
          <label className="col-md-4 col-lg-3 col-form-label">
            Secondary Team
          </label>
          <div className="col-md-8 col-lg-9">
            <select
              name="secondary_team_uid"
              className="form-select"
              value={selectSecondaryTeam || editUser?.secondary_team?.uid}
              onChange={(e) => {
                const uidSecondTeam = e.target.value;
                setSelectSecondaryTeam(uidSecondTeam);
              }}
            >
              <option value=" ">Select Secondary Team</option>
              {primaryTeam.map((pt) => (
                <option key={pt.uid} value={pt.uid}>
                  {pt.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="row mb-3">
          <label className="col-md-4 col-lg-3 col-form-label">Reff User</label>
          <div className="col-md-8 col-lg-9">
            <select
              name="reff_uid"
              className="form-select"
              value={selectRefUser || editUser?.refrence_user?.uid}
              onChange={(e) => {
                const reffUser = e.target.value;
                setSelectRefUser(reffUser);
              }}
            >
              <option value="">Select User</option>
              {users.map((user) => (
                <option key={user.uid} value={user.uid}>
                  {user.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="row mb-3">
          <label className="col-md-4 col-lg-3 col-form-label">Active</label>
          <div className="col-md-8 col-lg-9">
            <select
              name="is_active"
              className="form-select"
              value={editUser.is_active}
              onChange={(e) => {
                const active = e.target.value;
                setEditUser(active);
              }}
            >
              <option value="">Select Choose</option>
              <option value="1">Yes</option>
              <option value="0">No</option>
            </select>
          </div>
        </div>
        <div className="text-center">
          <button type="submit" className="btn btn-primary">
            Save Changes
          </button>
        </div>
      </form>
      {/* End Profile Edit Form */}
    </div>
  );
};

export default EditProfil;
