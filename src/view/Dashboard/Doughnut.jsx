import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

// 1. HAPUS 'export const data = ...' YANG STATIS

// 2. Buat komponen menerima 'data' sebagai prop
export function DoughnutChart({ data }) {
  
  // 3. Tambahkan penjaga jika data belum ada
  if (!data) {
    return <p className="text-center text-muted">Memuat data chart...</p>;
  }

  return <Doughnut data={data} style={{ height: "210px" }} />;
}

// 4. (Opsional) Export default agar lebih mudah di-import
export default DoughnutChart;