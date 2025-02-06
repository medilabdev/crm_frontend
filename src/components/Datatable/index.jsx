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

const Datatables = ({ columns, data }) => {
    return (
        <DataTable columns={columns} data={data} pagination fixedHeader={true} // Pastikan properti ini berupa boolean
            fixedHeaderScrollHeight="500px" customStyles={customStyles} highlightOnHover pointerOnHover />
    )
}

export default Datatables
