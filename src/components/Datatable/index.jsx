import React from 'react'
import DataTable from 'react-data-table-component'

const customStyles = {
    headRow: {
        style: {
            backgroundColor: '#E1F1F4', // Warna biru
            color: 'black', // Warna teks putih
            fontSize: '18px',
        },
    }, rows: {
        highlightOnHoverStyle: {
            backgroundColor: 'rgb(230, 244, 244)',
            borderBottomColor: '#FFFFFF',
            outline: '1px solid #FFFFFF',
        },
    },
};

const Datatables = ({ columns, data, filterText }) => {
    const filteredData = data.filter(item => {
        const companyName = item.company?.name?.toLowerCase() || '';
        const visitPurposeName = item.visit_purpose?.name?.toLowerCase() || '';
        const status = item.status.toLowerCase() || '';
        const keyword = filterText.toLowerCase();

        return companyName.includes(keyword) || visitPurposeName.includes(keyword) || status.includes(keyword);
    });

    return (
        <DataTable
            columns={columns}
            data={filteredData}
            pagination
            fixedHeader
            fixedHeaderScrollHeight="500px"
            customStyles={customStyles}
            highlightOnHover
            pointerOnHover
            noDataComponent="Data tidak ditemukan"
            persistTableHead
        />
    )
}

export default Datatables
