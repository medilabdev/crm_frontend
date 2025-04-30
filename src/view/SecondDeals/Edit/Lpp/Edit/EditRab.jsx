import React, { useState } from 'react';
import { Card } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import Swal from 'sweetalert2';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AddModalRab from './AddModalRab';
import EditModalRab from './EditModalRab';
import AddModalSupport from './AddModalSupport';
import EditModalSupport from './EditModalSupport';
import AddModalFee from './AddModalFee';
import EditModalFee from './EditModalFee';

const EditRab = ({ rabData, setRabData, supportData, setSupportData, feeData, setFeeData }) => {
  // State for RAB
  const [showAddRab, setShowAddRab] = useState(false);
  const [editRabModal, setEditRabModal] = useState(false);
  const [editRabData, setEditRabData] = useState(null);

  const handleAddRab = (newItem) => setRabData([...rabData, newItem]);

  const handleDeleteRab = (key) => {
    Swal.fire({ title: 'Yakin ingin hapus?', showCancelButton: true }).then(res => {
      if (res.isConfirmed) {
        setRabData(rabData.filter(item => item.uid !== key && item.id !== key));
        Swal.fire('Berhasil!', 'Item dihapus.', 'success');
      }
    });
  };
  

  const handleEditRab = (item) => {
    setEditRabData(item);
    setEditRabModal(true);
  };

  const Alkes = rabData.filter(item => item.is_alkes === 'yes');
  const NonAlkes = rabData.filter(item => item.is_alkes === 'no');
  const totalPriceRab = NonAlkes.reduce((acc, cur) => acc + (cur.total_estimated_cost || 0), 0);

  // Support
  const [showAddSupport, setShowAddSupport] = useState(false);
  const [editSupportModal, setEditSupportModal] = useState(false);
  const [editSupportData, setEditSupportData] = useState(null);

  const handleAddSupport = (newItem) => setSupportData([...supportData, newItem]);

  const handleDeleteSupport = (key) => {
    Swal.fire({ title: 'Yakin ingin hapus?', showCancelButton: true }).then(res => {
      if (res.isConfirmed) {
        setSupportData(supportData.filter(item => item.uid !== key && item.id !== key));
        Swal.fire('Berhasil!', 'Item dihapus.', 'success');
      }
    });
  };
  
  const handleEditSupport = (item) => {
    setEditSupportData(item);
    setEditSupportModal(true);
  };

  const totalPriceSupport = supportData.reduce((acc, cur) => acc + (cur.total_estimated_cost || 0), 0);

  // Fee
  const [showAddFee, setShowAddFee] = useState(false);
  const [editFeeModal, setEditFeeModal] = useState(false);
  const [editFeeData, setEditFeeData] = useState(null);

  const handleAddFee = (newItem) => setFeeData([...feeData, newItem]);


  const handleDeleteFee = (key) => {
    Swal.fire({ title: 'Yakin ingin hapus?', showCancelButton: true }).then(res => {
      if (res.isConfirmed) {
        setFeeData(feeData.filter(item => item.uid !== key && item.id !== key));
        Swal.fire('Berhasil!', 'Item dihapus.', 'success');
      }
    });
  };
  
  const handleEditFee = (item) => {
    setEditFeeData(item);
    setEditFeeModal(true);
  };

  const totalPriceFee = feeData.reduce((acc, cur) => acc + (cur.total || 0), 0);

  const renderTable = (title, data, columns, onAddClick) => (
    <Card className="mb-3">
      <Card.Header>
        <span className="fw-bold">{title}</span>
        <button className="btn btn-primary float-end" onClick={onAddClick}>Tambah</button>
      </Card.Header>
      <Card.Body>
        <DataTable dense data={data} columns={columns} customStyles={customStyle} />
      </Card.Body>
    </Card>
  );

  const columnTemplate = (editFn, deleteFn) => [
    { name: 'Item', selector: row => row.item_uid || row.recieve_name },
    { name: 'Nilai Estimasi', selector: row => `Rp. ${new Intl.NumberFormat().format(row?.estimated_cost || row?.value)}` },
    { name: 'Qty', selector: row => row?.qty },
    { name: 'Total', selector: row => `Rp. ${new Intl.NumberFormat().format(row?.total_estimated_cost || row.total)}` },
    {
      name: 'Catatan',
      cell: row => <div style={{ maxWidth: 200, whiteSpace: 'normal' }}>{row?.realization_note}</div>,
      grow: 1
    },
    {
      name: 'Action',
      cell: row =>{ 
        const uniqueKey = row.uid || row.id; 
        return(
          <>
            <button className="btn btn-link" onClick={() => editFn(row)}><FontAwesomeIcon icon={faPenToSquare} /></button>
            <button className="btn btn-link text-danger" onClick={() => deleteFn(uniqueKey)}><FontAwesomeIcon icon={faTrash} /></button>
          </>
        )
    }
    }
  ];

  const customStyle = {
    headRow: { style: { backgroundColor: '#496989', color: 'white', fontSize: '12px' } },
    cells: { style: { fontSize: '10px' } }
  };

  const rekapData = [
    { item_uid: 'RAB Bangunan', nilai_estimasi: totalPriceRab },
    { item_uid: 'Support', nilai_estimasi: totalPriceSupport },
    { item_uid: 'Fee', nilai_estimasi: totalPriceFee },
  ];

  return (
    <>
      {renderTable('RAB - Alkes', Alkes, columnTemplate(handleEditRab, handleDeleteRab), () => setShowAddRab(true))}
      {renderTable('RAB - Non Alkes', NonAlkes, columnTemplate(handleEditRab, handleDeleteRab),()=> setShowAddRab(true))}
      {renderTable('Support', supportData, columnTemplate(handleEditSupport, handleDeleteSupport), () => setShowAddSupport(true))}
      {renderTable('Fee', feeData, columnTemplate(handleEditFee, handleDeleteFee), () => setShowAddFee(true))}

      <Card className="mb-3">
        <Card.Header><span className="fw-bold">Rekapitulasi Biaya</span></Card.Header>
        <Card.Body>
          <DataTable dense data={rekapData} columns={[
            { name: 'Item', selector: row => row.item_uid },
            { name: 'Nilai Estimasi', selector: row => `Rp. ${new Intl.NumberFormat().format(row.nilai_estimasi)}` }
          ]} customStyles={customStyle} />
        </Card.Body>
      </Card>

      <AddModalRab 
      show={showAddRab} 
      handleClose={() => setShowAddRab(false)} 
      onSave={handleAddRab} />

      <EditModalRab 
      show={editRabModal}
      handleClose={() => setEditRabModal(false)} 
      data={editRabData} 
      onSave={(updatedItem) => {
        const updatedList = rabData.map(item => item.id === updatedItem.id ? updatedItem : item);
        setRabData(updatedList);
      }} />

      <AddModalSupport 
      show={showAddSupport} 
      handleClose={() => setShowAddSupport(false)} 
      onSave={handleAddSupport} />

      <EditModalSupport 
      show={editSupportModal} 
      handleClose={() => setEditSupportModal(false)} 
      data={editSupportData} 
      onSave={(updatedItem) => {
      const updatedList = supportData.map(item =>
      item.id === updatedItem.id ? updatedItem : item
      );
      setSupportData(updatedList);
  }}
 />

      <AddModalFee show={showAddFee} handleClose={() => setShowAddFee(false)} onSave={handleAddFee} />
      <EditModalFee show={editFeeModal} handleClose={() => setEditFeeModal(false)} data={editFeeData} onSave={(updatedItem) => {
        const updatedList = feeData.map(item => item.id === updatedItem.id ? updatedItem : item);
        setFeeData(updatedList)
      }} />
    </>
  );
};

export default EditRab;
