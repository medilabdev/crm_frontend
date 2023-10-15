import React from "react";
import IconImage from "../../../assets/img/team-1.jpg";

const EditProfil = () => {
  return (
    <div className="tab-pane fade profile-edit pt-3" id="profile-edit">
      {/* Profile Edit Form */}
      <form>
        <div className="row mb-3">
          <label className="col-md-4 col-lg-3 col-form-label">
            Profile Image
          </label>
          <div className="col-md-8 col-lg-9">
            <img src={IconImage} alt="Profile" />
            <div className="pt-2">
              <input type="file" className="form-control" accept="image/*" />
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
            />
          </div>
        </div>
        <div className="row mb-3">
          <label className="col-md-4 col-lg-3 col-form-label">Email</label>
          <div className="col-md-8 col-lg-9">
            <input
              name="company"
              type="email"
              className="form-control"
              id="email"
            />
          </div>
        </div>
        <div className="row mb-3">
          <label className="col-md-4 col-lg-3 col-form-label">No.Telp</label>
          <div className="col-md-8 col-lg-9">
            <input name="telp_number" type="number" className="form-control" />
          </div>
        </div>
        <div className="row mb-3">
          <label className="col-md-4 col-lg-3 col-form-label">PID</label>
          <div className="col-md-8 col-lg-9">
            <input name="pid" type="number" className="form-control" />
          </div>
        </div>
        <div className="row mb-3">
          <label className="col-md-4 col-lg-3 col-form-label">
            Company Name
          </label>
          <div className="col-md-8 col-lg-9">
            <input name="company_name" type="text" className="form-control" />
          </div>
        </div>
        <div className="row mb-3">
          <label className="col-md-4 col-lg-3 col-form-label">Role</label>
          <div className="col-md-8 col-lg-9">
            <select name="role_uid" className="form-select">
              <option disabled selected>
                Select Role
              </option>
              <option value="">Team 1</option>
              <option value="">Team 2</option>
            </select>
          </div>
        </div>
        <div className="row mb-3">
          <label className="col-md-4 col-lg-3 col-form-label">
            Primary Team
          </label>
          <div className="col-md-8 col-lg-9">
            <select name="primary_team" className="form-select">
              <option disabled selected>
                Select Primary Team
              </option>
              <option value="">Team 1</option>
              <option value="">Team 2</option>
            </select>
          </div>
        </div>
        <div className="row mb-3">
          <label className="col-md-4 col-lg-3 col-form-label">Position</label>
          <div className="col-md-8 col-lg-9">
            <select name="position_uid" className="form-select">
              <option disabled selected>
                Select Position
              </option>
              <option value="">1</option>
              <option value="">2</option>
            </select>
          </div>
        </div>
        <div className="row mb-3">
          <label className="col-md-4 col-lg-3 col-form-label">Active</label>
          <div className="col-md-8 col-lg-9">
            <select name="is_active" className="form-select">
              <option disabled selected>
                Select Choose
              </option>
              <option value="">Yes</option>
              <option value="">No</option>
            </select>
          </div>
        </div>
        <div className="row mb-3">
          <label className="col-md-4 col-lg-3 col-form-label">Reff User</label>
          <div className="col-md-8 col-lg-9">
            <select name="position_uid" className="form-select">
              <option disabled selected>
                Select Position
              </option>
              <option value="">1</option>
              <option value="">2</option>
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
