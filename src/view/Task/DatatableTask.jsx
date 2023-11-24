import React, { useState } from "react";
import DataTable from "react-data-table-component";
import Swal from "sweetalert2";
import EditTask from "./Overlay/EditTask";
import IconCompany from "../../assets/img/condo.png";
import IconContact from "../../assets/img/telephone-call.png";
import IconDeals from "../../assets/img/coin.png";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

const DatatableTask = ({ data, selectUidDataTable }) => {
  const token = localStorage.getItem("token");
  const [editTask, setEditTask] = useState(false);
  const handleCloseEdit = () => {
    setEditTask(false);
  };
  const handleDelete = async (e) => {
    e.preventDefault();
    const isResult = await Swal.fire({
      title: "Hapus Task!.. apakah kamu yakin?",
      text: "Anda tidak dapat mengembalikan data ini setelah menghapusnya!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, Hapus!",
      cancelButtonText: "Batal",
    });
    if (isResult.isConfirmed) {
    }
  };

  const paginationComponentOptions = {
    selectAllRowsItem: true,
    selectAllRowsItemText: "ALL",
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
      selector: (row) => row.status?.name,
      sortable: true,
    },
    {
      name: "Associated",
      selector: (row) => (
        console.log(row),
        (
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
                  {row?.contact.phone[0]?.number}
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
                  {row?.deal?.deal_size ? `Rp. ${new Intl.NumberFormat().format(row?.deal?.deal_size)}` : null}
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
        )
      ),
      sortable: true,
    },
    {
      name: "Created Date",
      selector: (row) => {
        const updt = new Date(row.created_at);
        const format = {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
        };
        const formattter = new Intl.DateTimeFormat("en-US", format);
        const created = formattter.format(updt);
        return (
          <div className="mt-1" style={{ whiteSpace: "normal" }}>
            {created}
          </div>
        );
      },
      width: "120px",
    },
    {
      name: "Updated Date",
      selector: (row) => {
        const updt = new Date(row.updated_at);
        const format = {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
        };
        const formattter = new Intl.DateTimeFormat("en-US", format);
        const updated = formattter.format(updt);
        return (
          <div className="mt-1" style={{ whiteSpace: "normal" }}>
            {updated}
          </div>
        );
      },
      sortable: true,
      width: "120px",
    },
    {
      name: "Action",
      selector: (row) => (
        <div className="action-icon">
          <button
            className="ms-2 icon-button"
            onClick={() => setEditTask(row.uid)}
            title="Edit"
          >
            <i className="bi bi-pen edit"></i>
          </button>
          <button
            className="ms-2 icon-button"
            onClick={handleDelete}
            title="Delete"
          >
            <i className="bi bi-trash-fill danger"></i>
          </button>
        </div>
      ),
    },
  ];
  return (
    <div>
      <DataTable
        columns={columns}
        data={data}
        defaultSortFieldId={1}
        pagination
        paginationComponentOptions={paginationComponentOptions}
        selectableRows
        onSelectedRowsChange={selectUidDataTable}
      />
      <EditTask
        onClose={handleCloseEdit}
        visible={editTask !== false}
        uid={editTask}
      />
    </div>
  );
};

export default DatatableTask;
