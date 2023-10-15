import React from "react";

const ChangePassword = () => {
  return (
    <div className="tab-pane change-password fade pt-3" id="change-password">
      <form action="">
        <div className="row mb-3">
          <label className="col-md-4 col-lg-3 col-form-label">Password</label>
          <div className="col-md-8 col-lg-9">
            <input type="password" className="form-control" name="password" />
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
              name="confirm-password"
            />
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
