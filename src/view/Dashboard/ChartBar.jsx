import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
// 1. HAPUS 'faker' (kita tidak butuh data palsu lagi)

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// 2. HAPUS 'export const options = ...'
// 3. HAPUS 'export const data = ...'
// 4. HAPUS 'const labels = ...'

// 5. Buat komponen menerima 'data' dan 'options' sebagai props
export function ChartBar({ data, options }) {
  
  // 6. Tambahkan penjaga
  if (!data) {
    return <p className="text-center text-muted">Memuat data chart...</p>;
  }

  return <Bar options={options} data={data} />;
}

// 7. (Opsional) Export default
export default ChartBar;