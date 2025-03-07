import React, { useCallback, useEffect, useState } from 'react'
import Topbar from '../../../components/Template/Topbar'
import Sidebar from '../../../components/Template/Sidebar'
import Main from '../../../components/Template/Main'
import { Breadcrumb, Button, Card, InputGroup } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane, faPlus, faPlusSquare, faSave } from '@fortawesome/free-solid-svg-icons'
import Select from "react-select"
import axios from 'axios'
import ImageMachine from '../../../assets/img/MK-HDF 1.png'
import Swal from 'sweetalert2'

const CreateTechnicianTicket = () => {
    const [fullData, setFullData] = useState([{ visit_purpose_ulid: '', company_uid: '', date: '', machine_ulid: [] }]);
    const [selectedPurpose, setSelectedPurpose] = useState('');
    const [companyData, setCompanyData] = useState([]);
    const [purposeOfVisitData, setPurposeOfVisitData] = useState([]);
    const [machineOptions, setMachineOptions] = useState([]);
    const [selectedMachines, setSelectedMachines] = useState([{ id: 1, value: null }]);
    const [loading, setLoading] = useState(false);
    const [loadingMachines, setLoadingMachines] = useState(false);
    const [selectedMachine, setSelectedMachine] = useState('');

    // url api
    const urlCompany = `${process.env.REACT_APP_BACKEND_URL}/companies`;
    const urlVisitPurpose = `${process.env.REACT_APP_BACKEND_URL}/visit-purposes`;
    const urlGetAllMachine = `${process.env.REACT_APP_BACKEND_URL}/machines/${fullData[0].company_uid}`;
    const token = localStorage.getItem("token");

    // handle purpose change
    const handlePurposeChange = (event) => {
        const newData = [...fullData];
        newData[0].visit_purpose_ulid = event.target.value; // Update visit_purpose_ulid
        setFullData(newData);
        setSelectedPurpose(event.target.value); // Tetap update state untuk visual radio button
    };

    // handle select input 
    const handleSelectInputChanges = (name, value) => {
        const values = [...fullData];
        values[0] = { ...values[0], [name]: value, machine_ulid: [] };

        setSelectedMachine(value);
        setFullData(values);
        setSelectedMachines([{ id: 1, value: null }]); // Reset pilihan mesin
    };


    // handle input change
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        const values = [...fullData];
        values[0] = { ...values[0], [name]: value };

        setFullData(values);
    };

    // handle machine change
    const handleMachineChange = (index, selectedOption) => {
        const updatedMachines = [...selectedMachines];
        updatedMachines[index].value = selectedOption.value;
        setSelectedMachines(updatedMachines);

        // Update ke fullData
        const updatedFullData = [...fullData];
        updatedFullData[0].machine_ulid = updatedMachines.map(machine => machine.value).filter(Boolean);
        setFullData(updatedFullData);
    };

    // handle Submit Form
    const handleSubmitForm = (e) => {
        e.preventDefault();

        setLoading(true); // Set loading jadi true sebelum mulai request

        const formData = new FormData();

        formData.append('visit_purpose_ulid', fullData[0].visit_purpose_ulid);
        formData.append('company_uid', fullData[0].company_uid);
        formData.append('date', fullData[0].date);

        if (fullData[0].machine_ulid.length > 0) {
            fullData[0].machine_ulid.forEach((machine, index) => {
                formData.append("machine_ulid[]", machine);
            });
        }

        Swal.fire({
            title: "Process...",
            text: "Please wait while we process your request.",
            allowEscapeKey: false,
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });

        axios.post(`${process.env.REACT_APP_BACKEND_URL}/technician-tickets`, formData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then((response) => {
            console.log(response);
            setLoading(false); // Hentikan loading

            Swal.fire({
                title: "Success!",
                text: "Data has been submitted successfully.",
                icon: "success",
                confirmButtonText: "OK",
            });
        }).catch((error) => {
            setLoading(false); // Hentikan loading meskipun gagal
            console.error(error);

            Swal.fire({
                title: "Error!",
                text: "Failed to submit data. Please try again.",
                icon: "error",
                confirmButtonText: "OK",
            });
        });
    }


    // call data
    useEffect(() => {
        const fetchCompanyData = async () => {
            const response = await fetchDataApi(urlCompany, token);
            if (response) setCompanyData(response.data.data);
        };

        const fetchPurposeData = async () => {
            const response = await fetchDataApi(urlVisitPurpose, token);
            if (response) setPurposeOfVisitData(response.data.data);
        };



        fetchCompanyData();
        fetchPurposeData();

    }, []);

    useEffect(() => {
        if (!fullData[0].company_uid) {
            setMachineOptions([]); // Kosongkan jika company belum dipilih
            return;
        }

        setLoadingMachines(true); // Mulai loading

        const fetchMachineData = async () => {
            const response = await fetchDataApi(urlGetAllMachine, token);
            if (response) setMachineOptions(selectDataMachines(response.data.data));
        };

        fetchMachineData();
    }, [fullData[0].company_uid, token]);


    const fetchDataApi = useCallback(async (url, token) => {
        try {
            const response = await axios.get(url, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response;
        } catch (error) {
            if (error.response?.status === 401) {
                localStorage.clear();
                window.location.href = "/login";
            }

            setLoadingMachines(false)
            console.error(error);
        }
    }, []);

    const selectDataMachines = (data) => {
        return data.map(item => ({
            value: item.sn,
            label: `${item.name} | ${item.sn}`
        }));
    }

    const addMachineSelect = () => {
        setSelectedMachines([...selectedMachines, { id: Date.now(), value: null }]);
    };

    // Menghapus select machine (hanya select kedua dan seterusnya bisa dihapus)
    const removeMachineSelect = (index) => {
        if (index === 0) return; // Tidak bisa menghapus select pertama
        const updatedMachines = selectedMachines.filter((_, i) => i !== index);
        setSelectedMachines(updatedMachines);

        // Update ke fullData setelah penghapusan
        const updatedFullData = [...fullData];
        updatedFullData[0].machine_ulid = updatedMachines.map((machine) => machine.value).filter(Boolean);
        setFullData(updatedFullData);
    };


    return (
        <div id="body">
            <Topbar />
            <Sidebar />
            <Main>
                <div className="container">
                    <div className="row mt-2">
                        <div className="d-flex gap-2 mb-2 align-items-center">
                            <FontAwesomeIcon icon={faPlusSquare} style={{ fontSize: '1.3rem' }} />

                            <h5 className="mb-1 fw-bolder">Create Activity Transaction</h5>
                        </div>
                        <Breadcrumb>
                            <Breadcrumb.Item href="/activity-technician">Activity Transaction</Breadcrumb.Item>

                            <Breadcrumb.Item active>Create Activity Transaction</Breadcrumb.Item>
                        </Breadcrumb>
                    </div>

                    <form onSubmit={handleSubmitForm}>
                        <Card className="shadow-sm p-4">
                            <div className="row">
                                <InputGroup className="custom-textarea">
                                    <InputGroup.Text className="input-label mb-3">Purpose of Visit</InputGroup.Text>

                                    <div className="px-3 py-1">
                                        {purposeOfVisitData.map((item) => (
                                            <div className="d-flex gap-2 align-items-center mb-3" key={item.ulid}>
                                                <input
                                                    type="radio"
                                                    name="visit_purpose_ulid"
                                                    value={item.ulid}
                                                    checked={fullData[0].visit_purpose_ulid === item.ulid} // Perubahan di sini
                                                    onChange={handlePurposeChange}
                                                />
                                                <span>{item.name}</span>
                                            </div>
                                        ))}

                                    </div>
                                </InputGroup>
                            </div>

                            <div className="row mt-3">
                                <label htmlFor="" className='mb-2'>Customer Name <span style={{ color: 'red' }}>*</span></label>
                                <Select
                                    className="w-100"
                                    placeholder="Select Customer"
                                    name='company_uid'
                                    options={companyData.map(item => ({ value: item.uid, label: item.name }))}
                                    onChange={(selectedOption) => handleSelectInputChanges("company_uid", selectedOption.value)}
                                />
                            </div>

                            <div className="row mt-3">
                                <div className="container">
                                    <label htmlFor="" className='mb-2'>Date <span style={{ color: 'red' }}>*</span></label>
                                    <input type="date" className='form-control' name='date' onChange={(e) => handleInputChange(e)} />

                                </div>
                            </div>

                            <div className="row mt-3">
                                <label htmlFor="" className='mb-2'>Machine</label>
                                {selectedMachines.map((machine, index) => (
                                    <div key={machine.id} className="d-flex align-items-center gap-2 mb-2">
                                        <Select
                                            className="w-100"
                                            name={`machine_ulid_${index}`}
                                            placeholder={loadingMachines ? "Loading..." : "Select Machine"}
                                            options={machineOptions}
                                            value={machineOptions.find(opt => opt.value === machine.value) || null}
                                            onChange={(selectedOption) => handleMachineChange(index, selectedOption)}
                                            isDisabled={!fullData[0].company_uid || loadingMachines} // Disabled jika company belum dipilih
                                        />
                                        {index > 0 && (
                                            <button type="button" className="btn btn-danger" onClick={() => removeMachineSelect(index)}>
                                                Remove
                                            </button>
                                        )}
                                    </div>
                                ))}

                                <div className="container">
                                    <button type="button" className="btn btn-primary mt-2 w-100" onClick={addMachineSelect} disabled={!fullData[0].company_uid}>
                                        <FontAwesomeIcon icon={faPlus} /> Add Machine
                                    </button>
                                </div>
                            </div>
                        </Card>

                        <div className="floating-buttons">
                            <Button variant="success" type="submit"><FontAwesomeIcon icon={faPaperPlane} className='me-2' /> Submit</Button>
                            {/* <Button variant="primary" type="button" onClick={(e) => handleSaveDraft()}><FontAwesomeIcon icon={faSave} className='me-2' />Draft</Button> */}
                        </div>
                    </form>
                </div>
            </Main>
        </div>
    )
}

export default CreateTechnicianTicket
