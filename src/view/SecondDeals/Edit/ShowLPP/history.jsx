import React from "react";
import { Card } from "react-bootstrap";
import DataTable from "react-data-table-component";

const HistoryDeals = ({ data }) => {
  return (
    <>
    <div className="container py-4 ">
      <h4 className="fw-bold mb-3">History</h4>
      <div className="timeline">
        {data ? data.map((event, index) => {
          // Format tanggal untuk setiap item
          const date = new Date(event?.created_at);
          const formatDate = {
            year: "numeric",
            month: "long",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
          };
          const time = new Intl.DateTimeFormat("en-US", formatDate).format(date);

          return (
            
            <div key={index} className="timeline-item d-flex">
              {/* Timeline dot and line */}
              <div className="timeline-marker">
                <div className="dot"></div>
                {index < data.length - 1 && <div className="line"></div>}
              </div>

              {/* Timeline content */}
              <div className="timeline-content">
                <h6 className="mb-1">{event.note}</h6>
                <small className="text-muted">{time}</small>
              </div>
            </div>
          );
        }) : ''}
      </div>
    </div>

    </>
  );
};

export default HistoryDeals;
