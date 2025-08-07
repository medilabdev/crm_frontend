import axios from 'axios';
import React, { useState } from 'react'
import Select from "react-select";
import Swal from 'sweetalert2';
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';

const ExportWithModal = ({ onClose, owners }) => {
    const [owner, setOwner] = useState(null);
    const [ownerError, setOwnerError] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const token = localStorage.getItem("token");

    const exportExcel = async () => {
        if (!owner) {
            setOwnerError('Owner wajib dipilih.');
            return;
        }

        Swal.fire({
            title: 'Exporting...',
            text: 'Please wait while generating Excel',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            },
        });

        try {
            const response = await axios.post(
                `${process.env.REACT_APP_BACKEND_URL}/deals/export/excel`,
                {}, // ini body kosong
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    params: {
                        owner: owner.value,
                        start_date: startDate,
                        end_date: endDate,
                    },
                }
            );

            const result = response.data;
            if (result.error) throw new Error(result.message);

            const workbook = new ExcelJS.Workbook();
            const worksheet = workbook.addWorksheet('Deals');

            worksheet.columns = [
                { header: 'No', key: 'no', width: 5 },
                { header: 'Deal Name', key: 'deal_name', width: 30 },
                { header: 'Stage', key: 'stage', width: 15 },
                { header: 'Company', key: 'company', width: 25 },
                { header: 'Contact', key: 'contact', width: 25 },
                { header: 'History', key: 'history', width: 40 },
                { header: 'Created Date', key: 'created_at', width: 20 },
                { header: 'Updated Date', key: 'updated_at', width: 20 },
            ];

            let rowIndex = 2;

            if (result.rows.length > 0) {
                result.rows.forEach((deal, index) => {
                    const contacts = deal.contact_person?.map(cp => `${cp.contact?.name} (${cp.contact?.phone[0].number})` || '-') || ['-'];
                    const histories = deal.history?.map(h => `${h.note?.replace(/<\/?[^>]+(>|$)/g, "")} (${new Date(h.created_at).toLocaleString('id-ID')})` || '-') || ['-'];
                    const rowCount = Math.max(contacts.length, histories.length);

                    for (let i = 0; i < rowCount; i++) {
                        const newRow = worksheet.addRow({
                            no: i === 0 ? index + 1 : '',
                            deal_name: i === 0 ? deal.deal_name : '',
                            stage: i === 0 ? deal.staging?.name ?? '-' : '',
                            company: i === 0 ? deal.company?.name ?? '-' : '',
                            contact: contacts[i] ?? '',
                            history: histories[i] ?? '',
                            created_at: i === 0 ? new Date(deal.created_at).toLocaleString('id-ID') : '',
                            updated_at: i === 0 ? new Date(deal.updated_at).toLocaleString('id-ID') : '',
                        });

                        newRow.getCell(6).alignment = { wrapText: true };

                        // (Opsional) Set tinggi baris jika history-nya panjang
                        newRow.height = 40; // Atau hitung dinamis kalau perlu
                    }

                    if (rowCount > 1) {
                        [1, 2, 3, 4, 7, 8].forEach(col => {
                            worksheet.mergeCells(rowIndex, col, rowIndex + rowCount - 1, col);
                        });
                    }

                    rowIndex += rowCount;
                });

                // Style header
                worksheet.getRow(1).eachCell(cell => {
                    cell.font = { bold: true };
                    cell.alignment = { vertical: 'middle', horizontal: 'center' };
                    cell.border = {
                        top: { style: 'thin' },
                        left: { style: 'thin' },
                        bottom: { style: 'thin' },
                        right: { style: 'thin' }
                    };
                });

                worksheet.autoFilter = {
                    from: 'A1',
                    to: 'H1' // Kolom terakhir = H (Updated Date)
                };

                const buffer = await workbook.xlsx.writeBuffer();

                saveAs(new Blob([buffer]), `Export Deals ${owner.label}.xlsx`);
            }

            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Deals exported successfully!',
                timer: 5000, // otomatis tutup dalam 5 detik
                timerProgressBar: true,
                didOpen: () => {
                    Swal.showLoading(); // tampilkan loading animasi kecil
                }
            });

            onClose();
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error.response ? error.response.data.message : error.message,
            });
        }

    }

    return (
        <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.3)' }}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5>Export Deals</h5>
                        <button className="btn-close" onClick={onClose}></button>
                    </div>
                    <div className="modal-body">
                        <div className="mb-2">
                            <label>Owner</label>
                            <Select
                                options={owners}
                                onChange={(e) => {
                                    setOwner(e);
                                }}
                                placeholder="Select Owner"
                            />
                            {ownerError && <small className="text-danger">{ownerError}</small>}
                        </div>

                        <div className="mb-2">
                            <label>Start Date</label>
                            <input type="date" className="form-control" value={startDate} onChange={e => setStartDate(e.target.value)} />
                        </div>
                        <div className="mb-2">
                            <label>End Date</label>
                            <input type="date" className="form-control" value={endDate} onChange={e => setEndDate(e.target.value)} />
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
                        <button className="btn btn-success" onClick={exportExcel}>Download</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ExportWithModal
