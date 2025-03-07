// eslint-disable-next-line

import React, { useState } from 'react'
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

const dataMachines = [
    { name: 'MKHD-001', image: ImageMachine, model: 'MK-HDP-001', sn: '2025010101' },
    { name: 'MKHD-002', image: ImageMachine, model: 'MK-HDP-002', sn: '2025010102' },
    { name: 'MKHD-003', image: ImageMachine, model: 'MK-HDP-003', sn: '2025010103' },
];

const purposeOfVisitData = [
    { label: "Installation & Training", value: "01JNN6RCSBZ7MY1760PCQVXHEK" },
    { label: "Maintenance Machine", value: "01JNN6RCSC32P2D02FK71MFHR2" },
    { label: "Maintenance HD", value: "01JNN6RCSD0R9Y8F5632YZCVQ2" },
    { label: "Troubleshooting", value: "01JNN6RCSF37HK6CT75HFQKP3M" },
    { label: "Others", value: "01JNN6RCSH0Z4GSQE9XXE1C4B4" }
]

const selectDataMachines = () => {
    return dataMachines.map(item => ({
        value: item.sn,
        label: `${item.name} | ${item.sn}`
    }));
}


const DetailActivity = () => {
    const { uid } = useParams();
    const [sections, setSections] = useState([{ id: 1, machine: '', jobdesc: '', notes: '', photos: [] }]);
    const [selectedPurpose, setSelectedPurpose] = useState('');
    const [drafts, setDrafts] = useState({
        detail_uid: uid, // Gunakan id_detail jika ada, jika tidak buat random
        data: []
    });

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

    const addSection = () => {
        setSections(prevSections => [...prevSections, { id: prevSections.length + 1, machine: '', jobdesc: '', notes: '', photos: [] }]);
    };

    const removeSection = (id) => {
        setSections(prevSections => prevSections.filter(section => section.id !== id));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form submitted:", sections, selectedPurpose);
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


    return (
        <div id="body">
            <Topbar />
            <Sidebar />
            <Main>
                <div className="container">
                    <div className="row mt-2 mb-4">
                        <div className="d-flex gap-2 align-items-center mb-2">
                            <FontAwesomeIcon icon={faBuilding} style={{ fontSize: '16px' }} />

                            <h5 className="fw-bolder m-0">PT. Prima Indo Medilab - Maintenance</h5>
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
                                    {purposeOfVisitData.map((item) => (
                                        <div className="d-flex gap-2 align-items-center mb-3" key={item.value}>
                                            <input
                                                type="radio"
                                                name="purpose_of_visit"
                                                value={item.value}
                                                checked={selectedPurpose === item.value}
                                                onChange={handlePurposeChange}
                                            />
                                            <span>{item.label}</span>
                                        </div>
                                    ))}
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
                                        onChange={(e) => handleInputChange(section.id, "machine", e.value)}
                                    />
                                </InputGroup>

                                <InputGroup className="custom-textarea mb-3">
                                    <InputGroup.Text className="input-label">Job Description</InputGroup.Text>
                                    <Form.Control
                                        as="textarea"
                                        rows={4}
                                        placeholder="Type job description..."
                                        value={section.jobdesc}
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
                                        <input type="radio" name="conclusion" value="completed" /> Task Completed
                                    </label>

                                    <label className="d-flex align-items-center gap-1">
                                        <input type="radio" name="conclusion" value="not_completed" /> Task Not Completed
                                    </label>
                                </div>
                            </InputGroup>
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
