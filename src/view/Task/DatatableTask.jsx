import React, { useState } from "react";
import DataTable from "react-data-table-component";
import Swal from "sweetalert2";
import EditTask from "./Overlay/EditTask";
import IconCompany from "../../assets/img/condo.png";
import IconContact from "../../assets/img/telephone-call.png";
import IconDeals from "../../assets/img/coin.png";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import axios from "axios";
import EditStatus from "./Overlay/EditStatus";

const DatatableTask = ({ data, selectUidDataTable, pending, handleChangePage, handlePagePerChange, PaginationLimit, totalRows }) => {
  const token = localStorage.getItem("token");
  const [editTask, setEditTask] = useState(false);
  const handleCloseEdit = () => {
    setEditTask(false);
  };

  const [editStatus, setEditStatus] = useState(false);
  const handleCloseEditStatus = () => {
    setEditStatus(false);
  };
  const handleDelete = async (uid) => {
    const isResult = await Swal.fire({
      title: "Hapus Task!.. apakah kamu yakin?",
      text: "Anda tidak dapat mengembalikan data ini setelah menghapusnya!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, Hapus!",
      cancelButtonText: "Batal",
    });
    if (isResult.isConfirmed) {
      const formData = new FormData();
      formData.append("task[0][uid]", uid);
      formData.append("_method", "delete");
      axios
        .post(
          `${process.env.REACT_APP_BACKEND_URL}/tasks/item/delete`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          Swal.fire({
            title: res.data.message,
            text: "Delete Successfully",
            icon: "success",
          }).then((res) => {
            if (res.isConfirmed) {
              window.location.reload();
            }
          });
        });
    }
  };

 
  const columns = [
    {
      name: "Task Name",
      selector: (row) => row?.task_name,
      cell: (row) => (
        <div style={{ whiteSpace: "normal" }}>{row?.task_name}</div>
      ),
      sortable: true,
      width: "150px",
    },
    {
      name: "Status",
      selector: (row) => (
        <div>
          <button
            className={`btn ${
              row?.status?.name === "Completed"
                ? "btn-success"
                : row?.status?.name === "Waiting"
                  ? "btn-primary"
                  : row?.status?.name === "In Progress"
                    ? "btn-info"
                    : "btn-secondary"
            }`}
            style={{ fontSize: "0.65rem" }}
            onClick={() => setEditStatus(row.uid)}
          >
            {row?.status?.name}
            <i
              className="bi bi-pen edit ms-3"
              style={{ fontSize: "0.75rem", border: "5px" }}
            ></i>
          </button>
        </div>
      ),
      sortable: true,
      width:"150px"
    },
    {
      name: "Owner",
      selector: (row) => (
        <p
          style={{
            whiteSpace: "normal",
            fontSize: "0.75rem",
            marginTop: "5px",
          }}
        >
          {row.owner?.name}
        </p>
      ),
      sortable: true,
    },
    {
      name: "Associated",
      selector: (row) => (
        <div className="d-flex">
          <OverlayTrigger
            placement="top"
            overlay={<Tooltip>{row?.company?.name ?? null}</Tooltip>}
          >
            <div>
              {row?.company ? (
                <img
                  src={IconCompany}
                  style={{ width: "18px" }}
                  data-tip={row?.company?.name}
                  data-entity="company"
                />
              ) : null}
            </div>
          </OverlayTrigger>
          <OverlayTrigger
            placement="top"
            overlay={
              <Tooltip>
                {row?.contact?.name ?? null}
                <br />
                {row?.contact?.phone?.[0]?.number}
              </Tooltip>
            }
          >
            <div>
              {row?.company ? (
                <img
                  className="ms-2"
                  src={IconContact}
                  style={{ width: "18px" }}
                  data-tip={row?.contact?.name}
                />
              ) : null}
            </div>
          </OverlayTrigger>
          <OverlayTrigger
            placement="top"
            overlay={
              <Tooltip>
                {row?.deal?.deal_name ?? null}
                <br />
                {row?.deal?.deal_size
                  ? `Rp. ${new Intl.NumberFormat().format(
                      row?.deal?.deal_size
                    )}`
                  : null}
              </Tooltip>
            }
          >
            <div>
              {row?.company ? (
                <img
                  className="ms-2"
                  src={IconDeals}
                  style={{ width: "18px" }}
                />
              ) : null}
            </div>
          </OverlayTrigger>
        </div>
      ),
      sortable: true,
    },
    {
      name: "Created/Updated",
      selector: (row) => {
        const create = new Date(row.created_at);
        const updt = new Date(row.updated_at);
        const format = {
          year: "numeric",
          month: "long",
          day: "2-digit",
        };
        const formattter = new Intl.DateTimeFormat("en-US", format);
        const created = formattter.format(create);
        const updated = formattter.format(updt);
        return (
          <div
            className="mt-1"
            style={{ whiteSpace: "normal", fontSize: "10px" }}
          >
            {created} <br /> {updated}
          </div>
        );
      },
      width: "130px",
    },
    {
      name: "Action",
      selector: (row) => (
        <div className="action-icon">
          <a
            className="ms-2 icon-button text-black"
            href={`/task/${row.uid}/edit`}
            // onClick={() => setEditTask(row.uid)}
            title="Edit"
          >
            <i className="bi bi-pen edit"></i>
          </a>
          <button
            className="ms-2 icon-button"
            onClick={() => handleDelete(row.uid)}
            title="Delete"
          >
            <i className="bi bi-trash-fill danger"></i>
          </button>
        </div>
      ),
      width: "150px",
    },
  ];
  return (
    <div>
      <DataTable
        columns={columns}
        data={data}
        defaultSortFieldId={1}
        pagination
        paginationServer
        selectableRows
        onSelectedRowsChange={selectUidDataTable}
        onChangePage={handleChangePage}
        paginationPerPage={PaginationLimit}
        onChangeRowsPerPage={handlePagePerChange}
        paginationTotalRows={totalRows}
        progressPending={pending}
        paginationComponentOptions={{
          noRowsPerPage: true
        }}
      />
      <EditTask
        onClose={handleCloseEdit}
        visible={editTask !== false}
        uid={editTask}
      />
      <EditStatus
        onClose={handleCloseEditStatus}
        visible={editStatus !== false}
        uid={editStatus}
      />
    </div>
  );
};

export default DatatableTask;
