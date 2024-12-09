import axios from "axios";
import Swal from "sweetalert2";

export const handleSubmit = async (inputData, inputNps, inputValue, uid, token, e)  => {
    console.log(e );
    
    e.preventDefault();
    try {
      let timerInterval;
      const { isConfirmed } = await Swal.fire({
        title: "Apakah kamu yakin untuk menyimpan?",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Ya",
        cancelButtonText: "Tidak",
      });
      if (isConfirmed) {
        Swal.fire({
          title: "Loading...",
          html: "Tolong Tunggu <b></b> Beberapa Detik.",
          timer: 3000,
          timerProgressBar: true,
          didOpen: () => {
            Swal.showLoading();
            const timer = Swal.getPopup().querySelector("b");
            if (timer) {
              timerInterval = setInterval(() => {
                if (timer.textContent) {
                  timer.textContent = `${Swal.getTimerLeft()}`;
                }
              }, 100);
            }
          },
          willClose: () => {
            clearInterval(timerInterval);
          },
        });
        const formData = new FormData();
        formData.append("owner_user_uid", uid);
        formData.append("hospital_uid", inputData.company_uid || "");
        formData.append(
          "head_name_hd_room",
          inputData.name_kepala_ruangan_hd || ""
        );
        formData.append(
          "name_of_general_practitioner",
          inputData.name_dokter_umum_or_hd || ""
        );
        formData.append(
          "name_of_consular_doctor",
          inputData.name_dokter_konsulen_or_sppd || ""
        );
        formData.append(
          "contact_person_nurse_or_doctor",
          inputData.no_telp_perawat_or_dokter || ""
        );
        formData.append(
          "procurement_or_management_contact_person",
          inputData.no_telp_pengadaan_manajemen || ""
        );
        ["promoters", "neutrals", "detcractors"].forEach((key) => {
          if (inputNps[key]) {
            inputNps[key].forEach((value, idx) => {
              if (value) {
                formData.append(`${key}[${idx}]`, value || "");
              }
            });
          }
        });
        formData.append("existing_vendor", inputData.existing_vendor || "");
        formData.append(
          "number_of_machine_unit",
          inputData.jumlah_unit_mesin || ""
        );
        formData.append(
          "average_total_actions_last_six_months",
          inputData.tindakan_enam_bulan || ""
        );
        formData.append(
          "number_of_existing_patients",
          inputData.jumlah_pasien_existing || ""
        );
        formData.append(
          "expired_contract_period",
          inputData.masa_kontrak_berakhir || ""
        );
        formData.append("status_contract_unit", inputData.is_replace || "");
        if (inputValue) {
          const inputValueWithoutDot = inputValue.replace(/\./g, "");
          formData.append("existing_bhp_price", inputValueWithoutDot || "");
        }
        formData.append(
          "expired_hd_permit_period",
          inputData.masa_berlaku_izin || ""
        );
        formData.append(
          "collaborating_with_bpjs",
          inputData.is_berkerja_bpjs || ""
        );
        formData.append(
          "number_of_unit_facilities",
          inputData.jumlah_sarana_unit || ""
        );
        formData.append("total_of_machine_unit", inputData.jumlah_unit || "");
        formData.append("cooperation_system", inputData.sistem_kerjasama || "");
        formData.append("human_resources", inputData.sdm || "");
        formData.append(
          "hd_health_facilities_arround",
          inputData.faskes_hd_lima_km || ""
        );
        formData.append(
          "hd_health_facilities_capacity_approximately",
          inputData.kapasistas_faskes_hd_sekitar_unit || ""
        );
     
        formData.append("cataclysm", inputData.is_banjir || "");
        formData.append("near_the_sea", inputData.dekat_laut || "");
        formData.append(
          "availability_of_human_resource",
          inputData.ketersedian_sdm || ""
        );
        formData.append(
          "access_to_transportation",
          inputData.akses_transportasi || ""
        );
        formData.append(
          "hd_unit_count_distance_from_faskes",
          inputData.jumlah_unit_hd_kurang_dua_pulu_km || ""
        );
        formData.append(
          "hd_machine_unit_count",
          inputData.jumlah_mesin_unit_hd || ""
        );
        formData.append("another_notes", inputData.another_notes || "");
        for (const pair of formData.entries()) {
          console.log(pair[0] + ": " + pair[1]);
        }
        const response = await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/v2/deals`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        Swal.close();
        await Swal.fire({
          title: response.data.message,
          text: "Successfully Created Data",
          icon: "success",
        }).then((res) => {
          if (res.isConfirmed) {
            window.location.href = "/deals-second";
          }
        });
      }
    } catch (error) {
      if (error.response) {
        Swal.fire({
          text: error.response.data.message,
          icon: "warning",
        });
      } else {
        Swal.fire({
          text: "Something went wrong !",
          icon: "error",
        });
      }
    }
  };
