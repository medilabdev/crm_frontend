import React, { useEffect, useState } from "react";
import IconImage from "../../../assets/img/team-1.jpg";
import { useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const EditProfil = ({ roles, position, primaryTeam, users, uidLocal }) => {
  const { uid } = useParams();
  const token = localStorage.getItem("token");
  const [editUser, setEditUser] = useState({});
  const [oldImage, setOldImage] = useState({});
  const getDataUser = (uid, token) => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/users/${uid ? uid : uidLocal}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const UserData = res.data.data;
        setEditUser({
          name: UserData.name,
          email: UserData.email,
          telp_number: UserData.telp_number,
          pid: UserData.pid,
          company_name: UserData.company_name,
          role_uid: UserData?.role?.uid,
          position_uid: UserData?.position?.uid,
          reff_uid: UserData?.refrence_user?.uid,
          secondary_team_uid: UserData?.secondary_team?.uid,
          primary_team_uid: UserData?.primary_team?.uid,
        });
        setOldImage(UserData.image);
      })
      .catch((err) => {
        if (err.response.data.message === "Unauthenticated.") {
          localStorage.clear();
          window.location.href = "/login";
        }
      });
  };
  // image
  const [image, setImage] = useState(null);
  const handleImageChange = (e) => {
    const selectImage = e.target.files[0];
    setImage(selectImage);
    if (selectImage) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target.result);
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
    if (image) {
      formData.append("image", image);
    }
    formData.append("name", editUser.name);
    formData.append("email", editUser.email);
    formData.append("telp_number", editUser.telp_number);
    formData.append("pid", editUser.pid);
    formData.append("company_name", editUser.company_name || "");
    formData.append("role_uid", editUser.role_uid || "");
    formData.append("primary_team_uid", editUser.primary_team_uid || "");
    formData.append("secondary_team_uid", editUser.secondary_team_uid || "");
    formData.append("position_uid", editUser.position_uid || "");
    formData.append("reff_uid", editUser.reff_uid || "");
    formData.append("_method", "put");
      //  for (const pair of formData.entries()) {
      //   console.log(pair[0] + ": " + pair[1]);
      // }
    try {
      const updateUser = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/users/${uid ? uid : uidLocal}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      ).then((res) => {
        Swal.fire({
          title: res.data.message,
          text: "Successfullly created deals",
          icon: "success",
        }).then((res) => {
          if (res.isConfirmed) {
            window.location.reload();
          }
        });
      })
    } catch (error) {
      if (error.response) {
        Swal.fire({
          text: error.response.data.message,
          icon: "warning",
        });
      } else {
        Swal.fire({ text: error.response.data.message, icon: "error" });
      }
    }
  };

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
              src={image ? image : oldImage}
              alt="Profile"
              style={{ width: "150px", height: "120px" }}
            />
            <div className="pt-2">
              <input
                type="file"
                className="form-control"
                accept="image/*"
                name="image"
                onChange={handleImageChange}
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
              value={editUser.role_uid}
              onChange={(e) => {
                const RoleUid = e.target.value;
                setEditUser({
                  ...editUser,
                  role_uid: RoleUid,
                });
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
              value={editUser.position_uid}
              onChange={(e) => {
                const posUid = e.target.value;
                setEditUser({
                  ...editUser,
                  position_uid: posUid,
                });
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
              value={editUser.primary_team_uid}
              onChange={(e) => {
                const PtUid = e.target.value;
                setEditUser({
                  ...editUser,
                  primary_team_uid: PtUid,
                });
              }}
            >
              <option value="">Select Primary Team</option>
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
              value={editUser.secondary_team_uid}
              onChange={(e) => {
                const StUid = e.target.value;
                setEditUser({
                  ...editUser,
                  secondary_team_uid: StUid,
                });
              }}
            >
              <option value="">Select Secondary Team</option>
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
              value={editUser.reff_uid}
              onChange={(e) => {
                const RefUid = e.target.value;
                setEditUser({
                  ...editUser,
                  reff_uid: RefUid,
                });
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
