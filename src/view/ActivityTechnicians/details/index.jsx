// eslint-disable-next-line

import React, { useCallback, useEffect, useRef, useState } from 'react'
import Topbar from '../../../components/Template/Topbar'
import Sidebar from '../../../components/Template/Sidebar'
import Main from '../../../components/Template/Main'
import './detail.css'
import { Breadcrumb, Button, Card, Form, InputGroup } from 'react-bootstrap'
import Select from "react-select"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBuilding, faClock, faEye, faPaperPlane, faPencilSquare, faPlay, faPlus, faSave, faStop, faTrash } from '@fortawesome/free-solid-svg-icons'
import FileUpload from '../../../components/FileUpload'
import { useParams } from 'react-router-dom'
import Swal from "sweetalert2";
import SignatureCanvas from "react-signature-canvas";
import axios from 'axios'
import Modals from '../../../components/Modals/index'
import moment from 'moment/moment'

const DetailActivity = () => {
    const { uid } = useParams();
    const [sections, setSections] = useState([{ id: 1, ulid: '', machine: '', jobdesc: '', notes: '', photos: [], progress: [] }]);
    const [purposeOfVisitData, setPurposeOfVisitData] = useState([]);
    const [selectedPurpose, setSelectedPurpose] = useState('');
    const [technicianDetailData, setTechnicianDetailData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [machines, setMachines] = useState([]);
    const [company, setCompany] = useState('');
    const [isCompleted, setIsCompleted] = useState(null);
    const [isEdit, setIsEdit] = useState(false)
    const technicianAuth = localStorage.getItem('uid');
    const [workingStarted, setWorkingStarted] = useState(null);
    const [customerName, setCustomerName] = useState("");
    const [customerFeedback, setCustomerFeedback] = useState("")

    const [drafts, setDrafts] = useState({
        detail_uid: uid, // Gunakan id_detail jika ada, jika tidak buat random
        data: []
    });
    const [selectedConclusion, setSelectedConclusion] = useState("");
    const [jobDescData, setJobDescData] = useState("");
    const ulidParams = useParams().uid;

    // signature
    const [signatureClient, setSignatureClient] = useState("");
    const [signatureImage, setSignatureImage] = useState(null);
    const sigCanvas = useRef(null);
    const [imageURL, setImageURL] = useState(null);

    // url  
    const urlVisitPurpose = `${process.env.REACT_APP_BACKEND_URL}/visit-purposes`;
    const urlTechnicianDetail = `${process.env.REACT_APP_BACKEND_URL}/technician-tickets/${ulidParams}?rel=details,machines,company,visit-purpose,details.photos,details.progress`;
    const urlMachinesByCompany = `${process.env.REACT_APP_BACKEND_URL}/machines?company=${company}`
    const token = localStorage.getItem("token");

    const LOCAL_STORAGE_KEY = `activityDraft_${uid}`;

    // handle input change
    const handleInputChange = (id, field, value) => {
        setSections(prevSections => prevSections.map(section =>
            section.id === id ? { ...section, [field]: value } : section
        ));
    };

    // handle file
    const handleFileChange = (sectionId, file, fileId) => {
        setSections(prevSections =>
            prevSections.map(section => {
                if (section.id === sectionId) {
                    if (file) {
                        const existingPhotos = section.photos.map(p => p.id);
                        if (!existingPhotos.includes(fileId)) {
                            return { ...section, photos: [...section.photos, { id: fileId, file }] };
                        }
                    } else {
                        return { ...section, photos: section.photos.filter(p => p.id !== fileId) };
                    }
                }
                return section;
            })
        );
    };

    const handleInput = (e) => {
        setCustomerName(e.target.value)

    }

    const handleInputFeedback = (e) => {
        setCustomerFeedback(e.target.value)
    }

    // handle purpose change
    const handlePurposeChange = (event) => {
        setSelectedPurpose(event.target.value);
    };

    // handle Submit
    const handleSubmit = (e) => {
        e.preventDefault();

        setLoading(true); // Set loading jadi true sebelum mulai request

        const formData = new FormData();
        const conclusion = selectedConclusion === "Completed" ? "Completed" : "Not Completed"

        formData.append("_method", "PATCH");
        formData.append("status", conclusion);


        if (signatureImage) {
            formData.append("signature[file]", signatureImage)
            formData.append("signature[name]", customerName)
        };

        if (customerFeedback) {
            formData.append("feedback", customerFeedback);
        }

        if (sections.length > 0) {
            sections.forEach((item, index) => {
                if (item.machine) {
                    formData.append(`details[${index}][machine_ulid]`, item.machine);
                }

                if (item.ulid) {
                    formData.append(`details[${index}][ulid]`, item.ulid || " ");
                }

                if (item.jobdesc) {
                    formData.append(`details[${index}][jobdesc]`, item.jobdesc === null || item.jobdesc === undefined ? " " : String(item.jobdesc));
                }

                if (item.notes) {
                    formData.append(`details[${index}][notes]`, item.notes === null || item.notes === undefined ? " " : String(item.notes));
                }

                formData.append(`details[${index}][technician_user_uid]`, technicianAuth);

                if (item.photos.length > 0) {
                    item.photos.forEach((secItem, i) => {
                        formData.append(`details[${index}][photos][${i}]`, secItem.file);
                    })
                }
            })
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

        axios.post(`${process.env.REACT_APP_BACKEND_URL}/technician-tickets/${ulidParams}`, formData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then((response) => {
            setLoading(false); // Hentikan loading

            if (response.data.data) {
                Swal.fire({
                    title: "Success!",
                    text: response.data.data.alerts.success.message,
                    icon: "success",
                    confirmButtonText: "OK",
                }).then(() => {
                    window.location.reload();
                });
            }
        }).catch((error) => {
            setLoading(false); // Hentikan loading meskipun gagal
            console.error(error.response.data);

            Swal.fire({
                title: "Error!",
                text: `${error.response.data.message}`,
                icon: "error",
                confirmButtonText: "OK",
            });
        });
    };

    const selectDataMachines = () => {
        // Jika `technicianDetailData.machines` ada dan tidak kosong, gunakan itu
        if (technicianDetailData.machines && technicianDetailData.machines.length > 0) {
            return technicianDetailData.machines.map(item => ({
                value: item.ulid,
                label: `${item.name} | ${item.sn}`
            }));
        }

        // Jika `machines` sudah ada, gunakan itu
        if (machines.length > 0) {
            return machines.map(item => ({
                value: item.value,
                label: item.label
            }));
        }

        // Jika masih kosong, return array kosong
        return [];
    }

    const selectDataMachineConvert = (data) => {
        return data.map(item => ({
            value: item.ulid,
            label: `${item.name} | ${item.sn}`
        }));
    }

    const addSection = () => {
        setSections(prevSections => [...prevSections, { id: prevSections.length + 1, machine: '', jobdesc: '', notes: '', photos: [], progress: [] }]);
    };

    const removeSection = (id) => {
        setSections(prevSections => prevSections.filter(section => section.id !== id));
    };

    const handleSaveDraft = () => {
        let newDraftsData = sections
            .map((section, index) => {
                let validData = {};

                if (section.machine) {
                    validData.machine = section.machine;
                }
                if (section.jobdesc) {
                    validData.jobdesc = section.jobdesc;
                }
                if (section.notes) {
                    validData.notes = section.notes;
                }
                if (section.photos.length > 0) {
                    validData.photos = section.photos;
                }

                // Hanya tambahkan ke draft jika ada data yang valid
                return Object.keys(validData).length > 0 ? { id: section.id, ...validData } : null;
            })
            .filter(section => section !== null); // Hilangkan section yang kosong

        // Jika tidak ada data valid, jangan simpan ke Local Storage
        if (newDraftsData.length === 0) {
            Swal.fire({
                title: 'Warning',
                text: "No data to save. Draft not updated.",
                icon: "warning",
            });

            return;
        }

        // Buat data untuk disimpan
        const draftData = {
            detail_uid: uid,
            sections: newDraftsData
        };

        // Cek apakah draft sudah ada
        const existingDraft = localStorage.getItem(LOCAL_STORAGE_KEY);

        if (existingDraft) {
            // Hapus draft lama jika ada
            localStorage.removeItem(LOCAL_STORAGE_KEY);
        }

        // Simpan draft baru
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(draftData));

        // Update state drafts
        setDrafts({
            detail_uid: uid,
            data: newDraftsData
        });

        Swal.fire({
            title: 'Success!',
            text: "Draft saved successfully!",
            icon: "success",
        });
    };

    // Simpan tanda tangan sebagai gambar
    const saveSignature = () => {
        if (sigCanvas.current) {
            const dataURL = sigCanvas.current.getCanvas().toDataURL("image/png"); // Simpan dulu nilai DataURL
            setImageURL(dataURL); // Update state dengan DataURL

            const file = dataURLtoFile(dataURL, "signature.png"); // Konversi DataURL ke File
            setSignatureImage(file); // Simpan File ke State
        }
    };


    // Hapus tanda tangan
    const clearSignature = () => {
        sigCanvas.current.clear();
        setImageURL(null);
    };

    const dataURLtoFile = (dataurl, filename) => {
        let arr = dataurl.split(","),
            mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]),
            n = bstr.length,
            u8arr = new Uint8Array(n);

        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }

        return new File([u8arr], filename, { type: mime });
    };

    // working start
    const handleWorkingStart = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'Do you want to start this work?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, start it!',
            cancelButtonText: 'No, cancel',
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: "Process...",
                    text: "Please wait while we process your request.",
                    allowEscapeKey: false,
                    allowOutsideClick: false,
                    didOpen: () => {
                        Swal.showLoading();
                    }
                });

                const formData = new FormData();

                formData.append('_method', 'PATCH')
                formData.append('status', 'Queued')
                formData.append('started_at', moment.utc(Date.now()).format('YYYY-MM-DD HH:mm'))

                axios.post(`${process.env.REACT_APP_BACKEND_URL}/technician-tickets/${ulidParams}`, formData, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }).then(response => {
                    if (response.data.data) {
                        Swal.fire({
                            title: "Success!",
                            text: response.data.data.alerts.success.message,
                            icon: "success",
                            confirmButtonText: "OK",
                        }).then(() => {
                            window.location.reload();
                        });
                    }
                }).catch(err => {
                    console.error(err.response.data);

                    Swal.fire({
                        title: "Error!",
                        text: "Failed to submit data. Please try again.",
                        icon: "error",
                        confirmButtonText: "OK",
                    });
                })
            } else if (result.isDismissed) {
                // Aksi jika user menekan 'Cancel'
                Swal.fire('Cancelled', 'The work has not started.', 'info');
            }
        });
    }

    // handle start task
    const handleStartTask = (ulid, index, sections) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'Do you want to start this task?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, start it!',
            cancelButtonText: 'No, cancel',
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: "Process...",
                    text: "Please wait while we process your request.",
                    allowEscapeKey: false,
                    allowOutsideClick: false,
                    didOpen: () => {
                        Swal.showLoading();
                    }
                });

                const formData = new FormData();

                formData.append('_method', 'PATCH')
                sections.forEach((item, i) => {
                    if (item.ulid === ulid) {
                        formData.append(`details[${index}][ulid]`, ulid);
                        formData.append(`details[${index}][progress][0][start]`, true);
                    } else {
                        formData.append(`details[${i}][ulid]`, item.ulid || "");
                    }
                })

                axios.post(`${process.env.REACT_APP_BACKEND_URL}/technician-tickets/${ulidParams}`, formData, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }).then(response => {
                    if (response.data.data) {
                        Swal.fire({
                            title: "Success!",
                            text: response.data.data.alerts.success.message,
                            icon: "success",
                            confirmButtonText: "OK",
                        }).then(() => {
                            window.location.reload();
                        });
                    }
                }).catch(err => {
                    console.error(err.response.data);

                    Swal.fire({
                        title: "Error!",
                        text: "Failed to submit data. Please try again.",
                        icon: "error",
                        confirmButtonText: "OK",
                    });
                })
            } else if (result.isDismissed) {
                // Aksi jika user menekan 'Cancel'
                Swal.fire('Cancelled', 'The work has not started.', 'info');
            }
        });
    }

    // handle end task
    const handleEndTask = (ulid, index, sections) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'Do you want to Finish this task?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, start it!',
            cancelButtonText: 'No, cancel',
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: "Process...",
                    text: "Please wait while we process your request.",
                    allowEscapeKey: false,
                    allowOutsideClick: false,
                    didOpen: () => {
                        Swal.showLoading();
                    }
                });

                const formData = new FormData();

                formData.append('_method', 'PATCH')
                formData.append(`details[${index}][ulid]`, ulid);
                console.log(sections);

                sections.forEach((item, i) => {
                    if (item.ulid === ulid) {
                        formData.append(`details[${index}][progress][0][finish]`, true);
                    } else {
                        formData.append(`details[${i}][ulid]`, item.ulid || "");
                    }
                });

                axios.post(`${process.env.REACT_APP_BACKEND_URL}/technician-tickets/${ulidParams}`, formData, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }).then(response => {
                    if (response.data.data) {
                        Swal.fire({
                            title: "Success!",
                            text: response.data.data.alerts.success.message,
                            icon: "success",
                            confirmButtonText: "OK",
                        }).then(() => {
                            window.location.reload();
                        });
                    }
                }).catch(err => {
                    console.error(err.response.data);

                    Swal.fire({
                        title: "Error!",
                        text: "Failed to submit data. Please try again.",
                        icon: "error",
                        confirmButtonText: "OK",
                    });
                })
            } else if (result.isDismissed) {
                // Aksi jika user menekan 'Cancel'
                Swal.fire('Cancelled', 'The work has not started.', 'info');
            }
        });
    }

    const handleEditData = () => {
        setIsEdit(!isEdit);
    }

    useEffect(() => {
        const fetchPurposeData = async () => {
            const response = await fetchDataApi(urlVisitPurpose, token);
            if (response) setPurposeOfVisitData(response.data.data);
        };

        const fetchTechnicianDetailData = async () => {
            const response = await fetchDataApi(urlTechnicianDetail, token);
            if (response) {
                setTechnicianDetailData(response.data.data);
                setCompany(response.data.data.company_uid) // Set detail teknisi setelah fetch selesai
            }
        };

        fetchPurposeData();
        fetchTechnicianDetailData();

    }, []); // Dipanggil sekali saat component pertama kali render

    // Ini akan berjalan SETELAH `technicianDetailData` diperbarui
    useEffect(() => {
        if (technicianDetailData?.visit_purpose_ulid) {
            setSelectedPurpose(technicianDetailData.visit_purpose_ulid);
        }

        if (technicianDetailData?.jobdesc) {
            setJobDescData(technicianDetailData.jobdesc);
        }


        if (technicianDetailData?.machines && technicianDetailData?.machines.length > 0 || technicianDetailData.technician_ticket_details && technicianDetailData.technician_ticket_details.length > 0) {
            setSections(prevSections => {
                // Buat mapping dari ID mesin lama ke foto yang sudah diupload
                const existingPhotosMap = prevSections.reduce((acc, section) => {
                    acc[section.machine] = section.photos || [];
                    return acc;
                }, {});

                // Buat array section baru dan tetap menyimpan foto lama
                return technicianDetailData.technician_ticket_details.map((item, index) => ({
                    id: index + 1,
                    ulid: item.ulid,
                    machine: item.machine_ulid || "",
                    jobdesc: item.jobdesc,
                    notes: item.notes,
                    photos: existingPhotosMap[item.machine] || [], // Ambil foto lama jika ada
                    progress: item.technician_ticket_progress || [],
                }));
            });
        }

        if (technicianDetailData.status) {
            setIsCompleted(technicianDetailData.status)
            setSelectedConclusion(technicianDetailData.status)
        };

        if (technicianDetailData.signature_name) {
            setCustomerName(technicianDetailData.signature_name)
        }

        if (technicianDetailData.feedback) {
            setCustomerFeedback(technicianDetailData.feedback)
        }

        if (technicianDetailData.started_at) {
            setWorkingStarted(technicianDetailData.started_at)
        }

        const getDataMachineByCompany = async () => {
            const response = await fetchDataApi(urlMachinesByCompany, token);
            if (response) setMachines(selectDataMachineConvert(response.data.data))
        }

        if (company) {
            getDataMachineByCompany();
        }
    }, [technicianDetailData]); // Dipanggil ulang setiap `technicianDetailData` berubah

    const handleRedirect = (ulid) => {
        window.open(`${process.env.REACT_APP_BACKEND_URL}/assets/technician-ticket/photos/${ulid}`, '_blank');
    };


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

            // setLoadingMachines(false)
            console.error(error);
        }
    }, []);

    return (
        <div id="body">
            <Topbar />
            <Sidebar />
            <Main>
                <div className="container">
                    <div className="row mt-2 mb-4">
                        <div className="d-flex gap-2 align-items-center mb-2">
                            <FontAwesomeIcon icon={faBuilding} style={{ fontSize: '16px' }} />

                            <h5 className="fw-bolder m-0">{technicianDetailData?.company?.name} - {technicianDetailData?.visit_purpose?.name}</h5>
                        </div>
                        <Breadcrumb>
                            <Breadcrumb.Item href="/activity-technician">Activity Transaction</Breadcrumb.Item>

                            <Breadcrumb.Item active>Create Activity Transaction</Breadcrumb.Item>
                        </Breadcrumb>
                    </div>
                    <div className="d-flex gap-3 align-items-center mb-3">
                        <Button variant="primary" type="submit" className='rounded-1' disabled={workingStarted ? true : false} onClick={(e) => handleWorkingStart()}><FontAwesomeIcon icon={faClock} className='me-2' /> Start Work</Button>

                        {workingStarted && isCompleted === "Completed" && (
                            <Button variant="warning" className="px-5 rounded-1" type="button" onClick={handleEditData}>
                                <FontAwesomeIcon icon={faPencilSquare} className='me-2' /> Edit
                            </Button>
                        )}
                    </div>
                    <div className="mb-3">
                        <h5 className='fw-bolder'>Status : <span className='badge bg-success'>{technicianDetailData.status}</span></h5>
                    </div>

                    <Card className="shadow-sm p-4">
                        <div className="row">
                            <InputGroup className="custom-textarea">
                                <InputGroup.Text className="input-label mb-3">Purpose of Visit</InputGroup.Text>

                                <div className="px-3 py-1">
                                    {purposeOfVisitData.map((item) => {
                                        return <div className="d-flex gap-2 align-items-center mb-3" key={item.ulid}>
                                            <input
                                                type="radio"
                                                name="purpose_of_visit"
                                                value={item.ulid}
                                                checked={selectedPurpose === item.ulid}
                                                onChange={handlePurposeChange}
                                                disabled={
                                                    (isCompleted === "Completed" && !isEdit) ||
                                                    (workingStarted && isCompleted === "Completed" && !isEdit) || !workingStarted
                                                }
                                            />
                                            <span>{item.name}</span>
                                        </div>
                                    })}
                                </div>
                            </InputGroup>
                        </div>
                    </Card>


                    <Form onSubmit={handleSubmit}>
                        {sections.map((section, index) => (
                            <Card className="shadow-sm p-4 mb-4" key={section.id}>
                                <div className="mb-3 d-flex gap-3">
                                    <Button type="button" variant="primary" onClick={() => handleStartTask(section.ulid, index, sections)} disabled={section.progress.length > 0 && section.progress[0].started_at ? true : false}><FontAwesomeIcon icon={faPlay} className='me-2' /> Start Task</Button>

                                    <Button type="button" variant="danger" onClick={() => handleEndTask(section.ulid, index, sections)} disabled={section.progress.length > 0 && section.progress[0].finished_at ? true : false}><FontAwesomeIcon icon={faStop} className='me-2' /> Finish Task</Button>
                                </div>

                                <InputGroup className="custom-textarea mb-3">
                                    <InputGroup.Text className="input-label">Machine</InputGroup.Text>
                                    <Select
                                        className="w-100 border p-3"
                                        placeholder="Select Machine"
                                        options={selectDataMachines()}
                                        value={selectDataMachines()?.find(option => option.value === section.machine)}
                                        onChange={(e) => handleInputChange(section.id, "machine", e.value)}
                                        isDisabled={(isCompleted === "Completed" && !isEdit) ||
                                            (workingStarted && isCompleted === "Completed" && !isEdit) || !workingStarted
                                        }
                                    />
                                </InputGroup>

                                <InputGroup className="custom-textarea mb-3">
                                    <InputGroup.Text className="input-label">Job Description</InputGroup.Text>
                                    <Form.Control
                                        as="textarea"
                                        rows={4}
                                        placeholder="Type job description..."
                                        value={jobDescData ? jobDescData : section.jobdesc}
                                        onChange={(e) => handleInputChange(section.id, "jobdesc", e.target.value)}
                                        disabled={(isCompleted === "Completed" && !isEdit) ||
                                            (workingStarted && isCompleted === "Completed" && !isEdit) || !workingStarted}
                                    />
                                </InputGroup>

                                <InputGroup className="custom-textarea mb-3">
                                    <InputGroup.Text className="input-label">Notes</InputGroup.Text>
                                    <Form.Control
                                        as="textarea"
                                        rows={4}
                                        placeholder="Type notes..."
                                        value={section.notes}
                                        onChange={(e) => handleInputChange(section.id, "notes", e.target.value)}
                                        disabled={(isCompleted === "Completed" && !isEdit) ||
                                            (workingStarted && isCompleted === "Completed" && !isEdit) || !workingStarted}
                                    />
                                </InputGroup>

                                {technicianDetailData?.technician_ticket_details && technicianDetailData?.technician_ticket_details?.length > 0 ? (technicianDetailData?.technician_ticket_details[index]?.technician_ticket_photos && technicianDetailData?.technician_ticket_details[index]?.technician_ticket_photos?.length > 0 ? (
                                    <div className="row my-3">
                                        <label htmlFor="" className='fw-bolder mb-2' style={{ fontSize: '1rem' }}>Photos</label>
                                        {technicianDetailData?.technician_ticket_details[index]?.technician_ticket_photos?.map((item, i) => {
                                            const fileName = item.photo_path;
                                            const parts = fileName.split('.')
                                            const nameWithoutExt = parts.slice(0, -1).join('.'); // Gabungkan kembali tanpa ekstensi
                                            const extension = parts.slice(-1)[0];

                                            return (
                                                <div className="col-lg-3 col-sm-6 mb-3" key={i}>
                                                    <div className="d-flex align-items-center p-3 border rounded shadow-sm bg-light w-100" style={{ maxWidth: "400px" }}>
                                                        {/* Icon File */}
                                                        <div className="me-3">
                                                            <i className="bi bi-paperclip fs-4 text-danger"></i>
                                                        </div>

                                                        {/* File Info */}
                                                        <div className="flex-grow-1 me-2" style={{ maxWidth: '60%' }}>
                                                            <p className="mb-0 fw-semibold">{nameWithoutExt}</p>
                                                            <small className="text-muted">.{extension}</small>
                                                        </div>

                                                        {/* Action Buttons */}
                                                        <div className="d-flex gap-2">
                                                            <button type='button' className="btn btn-light btn-sm">
                                                                <FontAwesomeIcon icon={faEye} onClick={(e) => handleRedirect(item.ulid)} />
                                                            </button>
                                                            {/* <button type='button' className="btn btn-light btn-sm text-danger">
                                                                <i className="bi bi-trash"></i>
                                                            </button> */}
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                ) : "") : ""}

                                {isCompleted === "Completed" && !isEdit ? "" : (
                                    <>
                                        <InputGroup className="custom-textarea mb-3">
                                            <InputGroup.Text className="input-label">Upload Photo</InputGroup.Text>


                                            <FileUpload label="Upload Photo" sectionId={section.id} disable={(isCompleted === "Completed" && !isEdit) ||
                                                (workingStarted && isCompleted === "Completed" && !isEdit) || !workingStarted} onFileChange={handleFileChange} />
                                        </InputGroup>

                                        {index !== 0 && (
                                            <div className="d-flex justify-content-end">
                                                <Button variant="danger" onClick={() => removeSection(section.id)}>
                                                    <FontAwesomeIcon icon={faTrash} className="me-2" /> Remove Section
                                                </Button>
                                            </div>
                                        )}
                                    </>
                                )}
                            </Card>
                        ))}


                        <Card className="shadow-sm p-4">
                            <InputGroup className="custom-textarea mb-3 d-flex justify-content-between align-items-center">
                                <InputGroup.Text className="input-label">Conclusion</InputGroup.Text>

                                <div className="d-flex gap-5 align-items-center mt-3">
                                    <label className="d-flex align-items-center gap-1">
                                        <input
                                            type="radio"
                                            name="conclusion"
                                            value="Completed"
                                            checked={selectedConclusion === "Completed"}
                                            onChange={() => setSelectedConclusion("Completed")}
                                            disabled={(isCompleted === "Completed" && !isEdit) ||
                                                (workingStarted && isCompleted === "Completed" && !isEdit) || !workingStarted}
                                        /> Task Completed
                                    </label>

                                    <label className="d-flex align-items-center gap-1">
                                        <input
                                            type="radio"
                                            name="conclusion"
                                            value="Not Completed"
                                            checked={selectedConclusion === "Not Completed"}
                                            onChange={() => setSelectedConclusion("Not Completed")}
                                            disabled={(isCompleted === "Completed" && !isEdit) ||
                                                (workingStarted && isCompleted === "Completed" && !isEdit) || !workingStarted}
                                        /> Task Not Completed
                                    </label>
                                </div>
                            </InputGroup>

                            {(selectedConclusion === "Completed" && isEdit) || (selectedConclusion === "Completed" && isCompleted !== "Completed") ? (
                                <div className="mt-3">
                                    <p>Apakah mau tanda tangan client disini?</p>
                                    <div className="d-flex gap-4">
                                        <label className="d-flex align-items-center gap-1">
                                            <input type="radio" name="sign_client" value="yes" onChange={() => setSignatureClient('yes')} /> Yes
                                        </label>
                                        <label className="d-flex align-items-center gap-1">
                                            <input type="radio" name="sign_client" value="no" onChange={() => setSignatureClient('no')} /> No
                                        </label>
                                    </div>
                                </div>
                            ) : ""}


                            {signatureClient === "yes" && (
                                <>
                                    <div className="mt-4 mb-3">
                                        <label htmlFor="" className='fw-bolder mb-2' style={{ fontSize: "1rem" }}>Customer Name</label>
                                        <input type="text" className='form-control' name="customer_name" value={customerName} onChange={(e) => handleInput(e)} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="" className='fw-bolder mb-2' style={{ fontSize: "1rem" }}>Customer Feedback</label>
                                        <textarea className='form-control' name="customer_feedback" value={customerFeedback} onChange={(e) => handleInputFeedback(e)} />
                                    </div>

                                    <div className="d-flex flex-column align-items-center gap-4 p-4 border mt-3 w-100">
                                        <div className="signature-container">
                                            <SignatureCanvas
                                                ref={sigCanvas}
                                                penColor="black"
                                                canvasProps={{ className: "signature-canvas" }}
                                                className="w-100"
                                            />
                                        </div>

                                        <div className="d-flex gap-3">
                                            <Button onClick={saveSignature}>Simpan</Button>
                                            <Button variant="destructive" onClick={clearSignature}>Hapus</Button>
                                        </div>

                                        {imageURL && (
                                            <div className="mt-4">
                                                <h5 className="fw-bolder">Hasil Tanda Tangan:</h5>
                                                <img src={imageURL} alt="Signature" className="border-2 img-fluid" />
                                            </div>
                                        )}
                                    </div>
                                </>
                            )}

                        </Card>

                        <div className={`${isCompleted === "Completed" && !isEdit ? 'd-none' : ''} floating-buttons`}>
                            <Button variant="success" type="submit"><FontAwesomeIcon icon={faPaperPlane} className='me-2' /> Submit</Button>
                            {/* <Button variant="primary" type="button" onClick={(e) => handleSaveDraft()}><FontAwesomeIcon icon={faSave} className='me-2' />Draft</Button> */}

                            <Button variant="warning" onClick={addSection}>
                                <FontAwesomeIcon icon={faPlus} className="me-2" /> Add Section
                            </Button>
                        </div>
                    </Form>
                </div>
                <Modals></Modals>
            </Main>
        </div>
    )
}

export default DetailActivity
