// eslint-disable-next-line

import React, { useCallback, useEffect, useRef, useState } from 'react'
import Topbar from '../../../components/Template/Topbar'
import Sidebar from '../../../components/Template/Sidebar'
import Main from '../../../components/Template/Main'
import './detail.css'
import { Breadcrumb, Button, Card, Form, InputGroup } from 'react-bootstrap'
import Select from "react-select"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBuilding, faPaperPlane, faPlus, faSave, faTrash } from '@fortawesome/free-solid-svg-icons'
import ImageMachine from '../../../assets/img/MK-HDF 1.png'
import FileUpload from '../../../components/FileUpload'
import { useParams } from 'react-router-dom'
import Swal from "sweetalert2";
import SignatureCanvas from "react-signature-canvas";
import axios from 'axios'

const DetailActivity = () => {
    const { uid } = useParams();
    const [sections, setSections] = useState([{ id: 1, machine: '', jobdesc: '', notes: '', photos: [] }]);
    const [purposeOfVisitData, setPurposeOfVisitData] = useState([]);
    const [selectedPurpose, setSelectedPurpose] = useState('');
    const [technicianDetailData, setTechnicianDetailData] = useState([]);
    const [loading, setLoading] = useState(false);

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
    const urlTechnicianDetail = `${process.env.REACT_APP_BACKEND_URL}/technician-tickets/${ulidParams}?rel=details,machines,company,visit-purpose`;
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
                        // Cek apakah file sudah ada berdasarkan fileId
                        const existingPhotos = section.photos.map(p => p.id);
                        if (!existingPhotos.includes(fileId)) {
                            return { ...section, photos: [...section.photos, { id: fileId, file }] };
                        }
                    } else {
                        // Jika file dihapus, filter array `photos`
                        return { ...section, photos: section.photos.filter(p => p.id !== fileId) };
                    }
                }
                return section;
            })
        );
    };

    // handle purpose change
    const handlePurposeChange = (event) => {
        setSelectedPurpose(event.target.value);
    };


    // handle Submit
    const handleSubmit = (e) => {
        e.preventDefault();

        setLoading(true); // Set loading jadi true sebelum mulai request

        const formData = new FormData();

        formData.append("visit_purpose_ulid", selectedPurpose);
        console.log("Form submitted:", sections, selectedPurpose);
    };

    const selectDataMachines = () => {
        return technicianDetailData?.machines?.map(item => ({
            value: item.ulid,
            label: `${item.name} | ${item.sn}`
        }));
    }


    const addSection = () => {
        setSections(prevSections => [...prevSections, { id: prevSections.length + 1, machine: '', jobdesc: '', notes: '', photos: [] }]);
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

    useEffect(() => {
        const fetchPurposeData = async () => {
            const response = await fetchDataApi(urlVisitPurpose, token);
            if (response) setPurposeOfVisitData(response.data.data);
        };

        const fetchTechnicianDetailData = async () => {
            const response = await fetchDataApi(urlTechnicianDetail, token);
            if (response) {
                setTechnicianDetailData(response.data.data); // Set detail teknisi setelah fetch selesai
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

        if (technicianDetailData?.machines && technicianDetailData?.machines.length > 0) {
            const initialSections = technicianDetailData.machines.map((machine, index) => ({
                id: index + 1,
                machine: machine.ulid || "",
                jobdesc: "",
                notes: "",
                photos: [],
            }));
            setSections(initialSections);
        }
    }, [technicianDetailData]); // Dipanggil ulang setiap `technicianDetailData` berubah


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
                                <InputGroup className="custom-textarea mb-3">
                                    <InputGroup.Text className="input-label">Machine</InputGroup.Text>
                                    <Select
                                        className="w-100 border p-3"
                                        placeholder="Select Machine"
                                        options={selectDataMachines()}
                                        value={selectDataMachines()?.find(option => option.value === section.machine)}
                                        onChange={(e) => handleInputChange(section.id, "machine", e.value)}
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
                                    />
                                </InputGroup>

                                <InputGroup className="custom-textarea mb-3">
                                    <InputGroup.Text className="input-label">Upload Photo</InputGroup.Text>
                                    <FileUpload label="Upload Photo" sectionId={section.id} onFileChange={handleFileChange} />
                                </InputGroup>

                                {index !== 0 && (
                                    <div className="d-flex justify-content-end">
                                        <Button variant="danger" onClick={() => removeSection(section.id)}>
                                            <FontAwesomeIcon icon={faTrash} className="me-2" /> Remove Section
                                        </Button>
                                    </div>
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
                                            value="completed"
                                            checked={selectedConclusion === "completed"}
                                            onChange={() => setSelectedConclusion("completed")}
                                        /> Task Completed
                                    </label>

                                    <label className="d-flex align-items-center gap-1">
                                        <input
                                            type="radio"
                                            name="conclusion"
                                            value="not_completed"
                                            checked={selectedConclusion === "not_completed"}
                                            onChange={() => setSelectedConclusion("not_completed")}
                                        /> Task Not Completed
                                    </label>
                                </div>
                            </InputGroup>

                            {selectedConclusion === "completed" && (
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
                            )}

                            {signatureClient === "yes" && (
                                <div className="flex flex-col items-center gap-4 p-4 border mt-3">
                                    <SignatureCanvas
                                        ref={sigCanvas}
                                        penColor="black"
                                        canvasProps={{ width: 400, height: 200, className: "border-2" }}
                                    />

                                    <div className="d-flex gap-3">
                                        <Button onClick={saveSignature}>Simpan</Button>
                                        <Button variant="destructive" onClick={clearSignature}>Hapus</Button>
                                    </div>

                                    {imageURL && (
                                        <div className="mt-4">
                                            <h5 className="fw-bolder">Hasil Tanda Tangan:</h5>
                                            <img src={imageURL} alt="Signature" className="border-2" />
                                        </div>
                                    )}
                                </div>
                            )}
                        </Card>

                        <div className="floating-buttons">
                            <Button variant="success" type="submit"><FontAwesomeIcon icon={faPaperPlane} className='me-2' /> Submit</Button>
                            <Button variant="primary" type="button" onClick={(e) => handleSaveDraft()}><FontAwesomeIcon icon={faSave} className='me-2' />Draft</Button>

                            <Button variant="warning" onClick={addSection}>
                                <FontAwesomeIcon icon={faPlus} className="me-2" /> Add Section
                            </Button>
                        </div>
                    </Form>
                </div>
            </Main>
        </div>
    )
}

export default DetailActivity
