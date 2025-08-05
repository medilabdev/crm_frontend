import axios from 'axios';
import React, { useState } from 'react'
import Select from "react-select";
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

const ExportWithModal = ({ onClose, owners }) => {
    const [owner, setOwner] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const token = localStorage.getItem("token");

    const formatDate = {
        year: "numeric",
        month: "long",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
    };

    const formatResult = new Intl.DateTimeFormat("id-ID", formatDate);

    const exportExcel = async () => {
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
                        owner,
                        start_date: startDate,
                        end_date: endDate,
                    },
                }
            );

            const result = response.data;
            if (result.error) throw new Error(result.message);

            const aoaData = [
                ['No', 'Deal Name', 'Stage', 'Company', 'Contact', 'History', 'Created Date', 'Updated Date']
            ];

            let rowIndex = 1;
            const merges = [];

            if (result.rows.length > 0) {
                result.rows.forEach((deal, index) => {
                    const contacts = deal.contact_person?.map(cp => cp.contact?.name || '-') || ['-'];
                    const histories = deal.history?.map(h => h.note?.replace(/<\/?[^>]+(>|$)/g, "") || '-') || ['-'];

                    const rowCount = Math.max(contacts.length, histories.length);
                    const startRow = rowIndex;

                    // 3. Loop baris berdasarkan kombinasi contact x history
                    for (let i = 0; i < rowCount; i++) {
                        aoaData.push([
                            i === 0 ? index + 1 : '',
                            i === 0 ? deal.deal_name : '',
                            i === 0 ? deal.staging?.name ?? '-' : '',
                            i === 0 ? deal.company?.name ?? '-' : '',
                            contacts[i] ?? '',
                            histories[i] ?? '',
                            i === 0 ? (formatResult.format(new Date(deal.created_at)) ?? '-') : '',
                            i === 0 ? (formatResult.format(new Date(deal.updated_at)) ?? '-') : '',
                        ]);
                        rowIndex++;
                    }

                    // 4. Merge kolom tertentu jika baris lebih dari 1
                    if (rowCount > 1) {
                        [0, 1, 2, 3, 6, 7].forEach(colIndex => {
                            merges.push({
                                s: { r: startRow, c: colIndex },
                                e: { r: startRow + rowCount - 1, c: colIndex },
                            });
                        });
                    }
                });

                // 5. Buat worksheet dan merge
                const worksheet = XLSX.utils.aoa_to_sheet(aoaData);
                worksheet['!merges'] = merges;

                // 6. Set lebar kolom
                worksheet['!cols'] = [
                    { wch: 5 },   // No
                    { wch: 30 },  // Deal Name
                    { wch: 15 },  // Stage
                    { wch: 25 },  // Company
                    { wch: 25 },  // Contact
                    { wch: 40 },  // History
                    { wch: 20 },  // Created Date
                    { wch: 20 },  // Updated Date
                ];

                // 7. Tambahkan tinggi header (opsional)
                worksheet['!rows'] = [{ hpt: 25 }]; // Header tinggi 25pt

                // 8. Style header: bold + center + border
                const range = XLSX.utils.decode_range(worksheet['!ref']);
                for (let C = range.s.c; C <= range.e.c; ++C) {
                    const cellAddress = XLSX.utils.encode_cell({ r: 0, c: C });
                    if (worksheet[cellAddress]) {
                        worksheet[cellAddress].s = {
                            font: { bold: true },
                            alignment: { horizontal: 'center', vertical: 'center' },
                            border: {
                                top: { style: "thin", color: { rgb: "000000" } },
                                bottom: { style: "thin", color: { rgb: "000000" } },
                                left: { style: "thin", color: { rgb: "000000" } },
                                right: { style: "thin", color: { rgb: "000000" } }
                            }
                        };
                    }
                }

                // 9. Simpan workbook
                const workbook = XLSX.utils.book_new();
                XLSX.utils.book_append_sheet(workbook, worksheet, 'Deals Export');

                const excelBuffer = XLSX.write(workbook, {
                    bookType: 'xlsx',
                    type: 'array',
                    cellStyles: true, // agar style header berfungsi
                });

                const blobData = new Blob([excelBuffer], {
                    type: 'application/octet-stream',
                });

                saveAs(blobData, 'ExportedDeals.xlsx');
            }

            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Deals exported successfully!',
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
                                    setOwner(e.value);
                                }}
                                placeholder="Select Owner"
                            />
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
