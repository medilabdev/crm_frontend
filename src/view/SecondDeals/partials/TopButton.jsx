import { faPersonCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const TopButton = () => {
  const position = localStorage.getItem("position");
  const role = localStorage.getItem("role");
  return (
    <div className="row">
      <div className="col mb-2">
        <div className="d-flex float-end">
          {position === "_dLjLFdH-Nw8vg" || role === "hG5sy_dytt95" ? (
            <a
              href="/create-deals"
              className="btn btn-primary"
              style={{ fontSize: "0.85rem", fontWeight: "600" }}
            >
              Add Deals
            </a>
          ) : (
            ""
          )}

          {/* {position !== "_dLjLFdH-Nw8vg" ? (
            <a
              href="/deals-second/need-approval"
              className="btn btn-outline-primary ms-2"
              style={{ fontSize: "0.85rem", fontWeight: "600" }}
            >
              <FontAwesomeIcon icon={faPersonCircleCheck} className="me-1" />{" "}
              Need Approval
            </a>
          ) : (
            ""
          )} */}
          {position === "pRGYXVKdzCPoQ8" ? (
          <a href="/deals-second/assign-deals" className="btn btn-primary ms-2" style={{ fontSize: "0.85rem", fontWeight: "600" }}>Assign Deals</a>
          ) : "" }
        </div>
      </div>
    </div>
  );
};

export default TopButton;
