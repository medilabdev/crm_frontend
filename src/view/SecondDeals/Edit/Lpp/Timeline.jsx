import React from "react";

const Timeline = ({ statusKerjaSama, handleInputTimeline }) => {
  return (
    <div>
      <table className="table table-sm caption-top table-bordered">
        <caption className="fw-bold fs-5">Timeline</caption>
        <thead className="text-center table-info">
          <tr>
            <th colSpan="13">Minggu</th>
          </tr>
        </thead>
        <thead className="table-primary">
          <tr>
            <th scope="col" className="fw-bold">
              Process
            </th>
            <th scope="col">1</th>
            <th scope="col">2</th>
            <th scope="col">3</th>
            <th scope="col">4</th>
            <th scope="col">5</th>
            <th scope="col">6</th>
            <th scope="col">7</th>
            <th scope="col">8</th>
            <th scope="col">9</th>
            <th scope="col">10</th>
            <th scope="col">11</th>
            <th scope="col">12</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="fw-semibold">
              {statusKerjaSama === "hs_L0YxrtdK1"
                ? "Replace"
                : statusKerjaSama === "ls_Y7hsg13Gg"
                  ? "New HD"
                  : statusKerjaSama === "jR_1YgF86Ll"
                    ? "Expand"
                    : ""}
            </td>
            <td>
              <input
                type="checkbox"
                name="timeline01"
                onChange={handleInputTimeline}
                value="1"
                id=""
                className="form-check-input border-secondary"
              />
            </td>
            <td>
              <input
                type="checkbox"
                name="timeline02"
                onChange={handleInputTimeline}
                id=""
                className="form-check-input border-secondary"
              />
            </td>
            <td>
              <input
                type="checkbox"
                name="timeline03"
                onChange={handleInputTimeline}
                id=""
                className="form-check-input border-secondary"
              />
            </td>
            <td>
              <input
                type="checkbox"
                name="timeline04"
                onChange={handleInputTimeline}
                id=""
                className="form-check-input border-secondary"
              />
            </td>
            <td>
              <input
                type="checkbox"
                name="timeline05"
                onChange={handleInputTimeline}
                id=""
                className="form-check-input border-secondary"
              />
            </td>
            <td>
              <input
                type="checkbox"
                name="timeline06"
                onChange={handleInputTimeline}
                id=""
                className="form-check-input border-secondary"
              />
            </td>
            <td>
              <input
                type="checkbox"
                name="timeline07"
                onChange={handleInputTimeline}
                id=""
                className="form-check-input border-secondary"
              />
            </td>
            <td>
              <input
                type="checkbox"
                name="timeline08"
                onChange={handleInputTimeline}
                id=""
                className="form-check-input border-secondary"
              />
            </td>
            <td>
              <input
                type="checkbox"
                name="timeline09"
                onChange={handleInputTimeline}
                id=""
                className="form-check-input border-secondary"
              />
            </td>
            <td>
              <input
                type="checkbox"
                name="timeline10"
                onChange={handleInputTimeline}
                id=""
                className="form-check-input border-secondary"
              />
            </td>
            <td>
              <input
                type="checkbox"
                name="timeline11"
                onChange={handleInputTimeline}
                id=""
                className="form-check-input border-secondary"
              />
            </td>
            <td>
              <input
                type="checkbox"
                name="timeline12"
                onChange={handleInputTimeline}
                id=""
                className="form-check-input border-secondary"
              />
            </td>
          </tr>
          <tr>
            <td>Renovasi</td>
            <td>
              <input
                type="checkbox"
                name="timeline13"
                onChange={handleInputTimeline}
                id=""
                className="form-check-input border-secondary"
              />
            </td>
            <td>
              <input
                type="checkbox"
                name="timeline14"
                onChange={handleInputTimeline}
                id=""
                className="form-check-input border-secondary"
              />
            </td>
            <td>
              <input
                type="checkbox"
                name="timeline15"
                onChange={handleInputTimeline}
                id=""
                className="form-check-input border-secondary"
              />
            </td>
            <td>
              <input
                type="checkbox"
                name="timeline16"
                onChange={handleInputTimeline}
                id=""
                className="form-check-input border-secondary"
              />
            </td>
            <td>
              <input
                type="checkbox"
                name="timeline17"
                onChange={handleInputTimeline}
                id=""
                className="form-check-input border-secondary"
              />
            </td>
            <td>
              <input
                type="checkbox"
                name="timeline18"
                onChange={handleInputTimeline}
                id=""
                className="form-check-input border-secondary"
              />
            </td>
            <td>
              <input
                type="checkbox"
                name="timeline19"
                onChange={handleInputTimeline}
                id=""
                className="form-check-input border-secondary"
              />
            </td>
            <td>
              <input
                type="checkbox"
                name="timeline20"
                onChange={handleInputTimeline}
                id=""
                className="form-check-input border-secondary"
              />
            </td>
            <td>
              <input
                type="checkbox"
                name="timeline21"
                onChange={handleInputTimeline}
                id=""
                className="form-check-input border-secondary"
              />
            </td>
            <td>
              <input
                type="checkbox"
                name="timeline22"
                onChange={handleInputTimeline}
                id=""
                className="form-check-input border-secondary"
              />
            </td>
            <td>
              <input
                type="checkbox"
                name="timeline23"
                onChange={handleInputTimeline}
                id=""
                className="form-check-input border-secondary"
              />
            </td>
            <td>
              <input
                type="checkbox"
                name="timeline24"
                onChange={handleInputTimeline}
                id=""
                className="form-check-input border-secondary"
              />
            </td>
          </tr>
          <tr>
            <td>Kirim Mesin</td>
            <td>
              <input
                type="checkbox"
                name="timeline25"
                onChange={handleInputTimeline}
                id=""
                className="form-check-input border-secondary"
              />
            </td>
            <td>
              <input
                type="checkbox"
                name="timeline26"
                onChange={handleInputTimeline}
                id=""
                className="form-check-input border-secondary"
              />
            </td>
            <td>
              <input
                type="checkbox"
                name="timeline27"
                onChange={handleInputTimeline}
                id=""
                className="form-check-input border-secondary"
              />
            </td>
            <td>
              <input
                type="checkbox"
                name="timeline28"
                onChange={handleInputTimeline}
                id=""
                className="form-check-input border-secondary"
              />
            </td>
            <td>
              <input
                type="checkbox"
                name="timeline29"
                onChange={handleInputTimeline}
                id=""
                className="form-check-input border-secondary"
              />
            </td>
            <td>
              <input
                type="checkbox"
                name="timeline30"
                onChange={handleInputTimeline}
                id=""
                className="form-check-input border-secondary"
              />
            </td>
            <td>
              <input
                type="checkbox"
                name="timeline31"
                onChange={handleInputTimeline}
                id=""
                className="form-check-input border-secondary"
              />
            </td>
            <td>
              <input
                type="checkbox"
                name="timeline32"
                onChange={handleInputTimeline}
                id=""
                className="form-check-input border-secondary"
              />
            </td>
            <td>
              <input
                type="checkbox"
                name="timeline33"
                onChange={handleInputTimeline}
                id=""
                className="form-check-input border-secondary"
              />
            </td>
            <td>
              <input
                type="checkbox"
                name="timeline34"
                onChange={handleInputTimeline}
                id=""
                className="form-check-input border-secondary"
              />
            </td>
            <td>
              <input
                type="checkbox"
                name="timeline35"
                onChange={handleInputTimeline}
                id=""
                className="form-check-input border-secondary"
              />
            </td>
            <td>
              <input
                type="checkbox"
                name="timeline36"
                onChange={handleInputTimeline}
                id=""
                className="form-check-input border-secondary"
              />
            </td>
          </tr>
          <tr>
            <td>Install Mesin</td>
            <td>
              <input
                type="checkbox"
                name="timeline37"
                onChange={handleInputTimeline}
                id=""
                className="form-check-input border-secondary"
              />
            </td>
            <td>
              <input
                type="checkbox"
                name="timeline38"
                onChange={handleInputTimeline}
                id=""
                className="form-check-input border-secondary"
              />
            </td>
            <td>
              <input
                type="checkbox"
                name="timeline39"
                onChange={handleInputTimeline}
                id=""
                className="form-check-input border-secondary"
              />
            </td>
            <td>
              <input
                type="checkbox"
                name="timeline40"
                onChange={handleInputTimeline}
                id=""
                className="form-check-input border-secondary"
              />
            </td>
            <td>
              <input
                type="checkbox"
                name="timeline41"
                onChange={handleInputTimeline}
                id=""
                className="form-check-input border-secondary"
              />
            </td>
            <td>
              <input
                type="checkbox"
                name="timeline42"
                onChange={handleInputTimeline}
                id=""
                className="form-check-input border-secondary"
              />
            </td>
            <td>
              <input
                type="checkbox"
                name="timeline43"
                onChange={handleInputTimeline}
                id=""
                className="form-check-input border-secondary"
              />
            </td>
            <td>
              <input
                type="checkbox"
                name="timeline44"
                onChange={handleInputTimeline}
                id=""
                className="form-check-input border-secondary"
              />
            </td>
            <td>
              <input
                type="checkbox"
                name="timeline45"
                onChange={handleInputTimeline}
                id=""
                className="form-check-input border-secondary"
              />
            </td>
            <td>
              <input
                type="checkbox"
                name="timeline46"
                onChange={handleInputTimeline}
                id=""
                className="form-check-input border-secondary"
              />
            </td>
            <td>
              <input
                type="checkbox"
                name="timeline47"
                onChange={handleInputTimeline}
                id=""
                className="form-check-input border-secondary"
              />
            </td>
            <td>
              <input
                type="checkbox"
                name="timeline48"
                onChange={handleInputTimeline}
                id=""
                className="form-check-input border-secondary"
              />
            </td>
          </tr>
          <tr>
            <td>Izin HD & BPJS</td>
            <td>
              <input
                type="checkbox"
                name="timeline49"
                onChange={handleInputTimeline}
                id=""
                className="form-check-input border-secondary"
              />
            </td>
            <td>
              <input
                type="checkbox"
                name="timeline50"
                onChange={handleInputTimeline}
                id=""
                className="form-check-input border-secondary"
              />
            </td>
            <td>
              <input
                type="checkbox"
                name="timeline51"
                onChange={handleInputTimeline}
                id=""
                className="form-check-input border-secondary"
              />
            </td>
            <td>
              <input
                type="checkbox"
                name="timeline52"
                onChange={handleInputTimeline}
                id=""
                className="form-check-input border-secondary"
              />
            </td>
            <td>
              <input
                type="checkbox"
                name="timeline53"
                onChange={handleInputTimeline}
                id=""
                className="form-check-input border-secondary"
              />
            </td>
            <td>
              <input
                type="checkbox"
                name="timeline54"
                onChange={handleInputTimeline}
                id=""
                className="form-check-input border-secondary"
              />
            </td>
            <td>
              <input
                type="checkbox"
                name="timeline55"
                onChange={handleInputTimeline}
                id=""
                className="form-check-input border-secondary"
              />
            </td>
            <td>
              <input
                type="checkbox"
                name="timeline56"
                onChange={handleInputTimeline}
                id=""
                className="form-check-input border-secondary"
              />
            </td>
            <td>
              <input
                type="checkbox"
                name="timeline57"
                onChange={handleInputTimeline}
                id=""
                className="form-check-input border-secondary"
              />
            </td>
            <td>
              <input
                type="checkbox"
                name="timeline58"
                onChange={handleInputTimeline}
                id=""
                className="form-check-input border-secondary"
              />
            </td>
            <td>
              <input
                type="checkbox"
                name="timeline59"
                onChange={handleInputTimeline}
                id=""
                className="form-check-input border-secondary"
              />
            </td>
            <td>
              <input
                type="checkbox"
                name="timeline60"
                onChange={handleInputTimeline}
                id=""
                className="form-check-input border-secondary"
              />
            </td>
          </tr>
          <tr>
            <td>Training</td>
            <td>
              <input
                type="checkbox"
                name="timeline61"
                onChange={handleInputTimeline}
                id=""
                className="form-check-input border-secondary"
              />
            </td>
            <td>
              <input
                type="checkbox"
                name="timeline62"
                onChange={handleInputTimeline}
                id=""
                className="form-check-input border-secondary"
              />
            </td>
            <td>
              <input
                type="checkbox"
                name="timeline63"
                onChange={handleInputTimeline}
                id=""
                className="form-check-input border-secondary"
              />
            </td>
            <td>
              <input
                type="checkbox"
                name="timeline64"
                onChange={handleInputTimeline}
                id=""
                className="form-check-input border-secondary"
              />
            </td>
            <td>
              <input
                type="checkbox"
                name="timeline65"
                onChange={handleInputTimeline}
                id=""
                className="form-check-input border-secondary"
              />
            </td>
            <td>
              <input
                type="checkbox"
                name="timeline66"
                onChange={handleInputTimeline}
                id=""
                className="form-check-input border-secondary"
              />
            </td>
            <td>
              <input
                type="checkbox"
                name="timeline67"
                onChange={handleInputTimeline}
                id=""
                className="form-check-input border-secondary"
              />
            </td>
            <td>
              <input
                type="checkbox"
                name="timeline68"
                onChange={handleInputTimeline}
                id=""
                className="form-check-input border-secondary"
              />
            </td>
            <td>
              <input
                type="checkbox"
                name="timeline69"
                onChange={handleInputTimeline}
                id=""
                className="form-check-input border-secondary"
              />
            </td>
            <td>
              <input
                type="checkbox"
                name="timeline70"
                onChange={handleInputTimeline}
                id=""
                className="form-check-input border-secondary"
              />
            </td>
            <td>
              <input
                type="checkbox"
                name="timeline71"
                onChange={handleInputTimeline}
                id=""
                className="form-check-input border-secondary"
              />
            </td>
            <td>
              <input
                type="checkbox"
                name="timeline72"
                onChange={handleInputTimeline}
                id=""
                className="form-check-input border-secondary"
              />
            </td>
          </tr>
          <tr>
            <td>1st Running Patient</td>
            <td>
              <input
                type="checkbox"
                name="timeline73"
                onChange={handleInputTimeline}
                id=""
                className="form-check-input border-secondary"
              />
            </td>
            <td>
              <input
                type="checkbox"
                name="timeline74"
                onChange={handleInputTimeline}
                id=""
                className="form-check-input border-secondary"
              />
            </td>
            <td>
              <input
                type="checkbox"
                name="timeline75"
                onChange={handleInputTimeline}
                id=""
                className="form-check-input border-secondary"
              />
            </td>
            <td>
              <input
                type="checkbox"
                name="timeline76"
                onChange={handleInputTimeline}
                id=""
                className="form-check-input border-secondary"
              />
            </td>
            <td>
              <input
                type="checkbox"
                name="timeline77"
                onChange={handleInputTimeline}
                id=""
                className="form-check-input border-secondary"
              />
            </td>
            <td>
              <input
                type="checkbox"
                name="timeline78"
                onChange={handleInputTimeline}
                id=""
                className="form-check-input border-secondary"
              />
            </td>
            <td>
              <input
                type="checkbox"
                name="timeline79"
                onChange={handleInputTimeline}
                id=""
                className="form-check-input border-secondary"
              />
            </td>
            <td>
              <input
                type="checkbox"
                name="timeline80"
                onChange={handleInputTimeline}
                id=""
                className="form-check-input border-secondary"
              />
            </td>
            <td>
              <input
                type="checkbox"
                name="timeline81"
                onChange={handleInputTimeline}
                id=""
                className="form-check-input border-secondary"
              />
            </td>
            <td>
              <input
                type="checkbox"
                name="timeline82"
                onChange={handleInputTimeline}
                id=""
                className="form-check-input border-secondary"
              />
            </td>
            <td>
              <input
                type="checkbox"
                name="timeline83"
                onChange={handleInputTimeline}
                id=""
                className="form-check-input border-secondary"
              />
            </td>
            <td>
              <input
                type="checkbox"
                name="timeline84"
                onChange={handleInputTimeline}
                id=""
                className="form-check-input border-secondary"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Timeline;
