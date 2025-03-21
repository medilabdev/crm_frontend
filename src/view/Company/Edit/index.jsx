import React, { useEffect, useState } from "react";
import Topbar from "../../../components/Template/Topbar";
import Sidebar from "../../../components/Template/Sidebar";
import Main from "../../../components/Template/Main";
import Footer from "../../../components/Template/Footer";
import {
    Button,
    Card,
    CardHeader,
    Col,
    FloatingLabel,
    Form,
} from "react-bootstrap";
import ReactQuill from "react-quill";
import { useParams } from "react-router-dom";
import axios from "axios";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import Swal from "sweetalert2";
import { Chrono } from "react-chrono";
import OverlayAddDeals from "../../../components/Overlay/addDeals";
import OverlayAddCompany from "../../../components/Overlay/addCompany";
import DataTable from "react-data-table-component";
import IconContact from "../../../assets/img/telephone-call.png";
import IconDeals from "../../../assets/img/coin.png";
import IconCompany from "../../../assets/img/condo.png";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { GetDataTypeHospital } from "../../../action/TypeHospital";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp, faPlus } from "@fortawesome/free-solid-svg-icons";
const EditCompany = () => {
    const { uid } = useParams();
    const token = localStorage.getItem("token");
    const [telephone, setTelephone] = useState([""]);
    const [editCompany, setEditCompany] = useState({});
    const [owner, setOwner] = useState([]);
    const [typeCompany, setTypeCompany] = useState([]);
    const [sourceCompany, setSourceCompany] = useState([]);
    const [parentCompany, setParentCompany] = useState([]);
    const [contact, setContact] = useState([]);
    const [deals, setDeals] = useState([]);
    const animatedComponents = makeAnimated();
    const [showCanvasDeals, setShowCanvasDeals] = useState(false);
    const handleCloseCanvasDeals = () => setShowCanvasDeals(false);
    const handleOpenCanvasDeals = () => setShowCanvasDeals(true);
    const [showCanvasCompany, setShowCanvasCompany] = useState(false);
    const handleCloseCanvasCompany = () => setShowCanvasCompany(false);
    const handleOpenCanvasCompany = () => setShowCanvasCompany(true);
    const [history, setHistory] = useState([]);
    const [oldAssociate, setOldAssociate] = useState([]);
    const [oldParentCompany, setOldParentCompany] = useState([]);
    const [valueDeals, setValueDeals] = useState([]);
    const [valueComp, setValueComp] = useState([]);
    const [formParentComp, setFormParentComp] = useState(false);
    const [isButtonDisable, setButtonDisable] = useState(false);
    const [machines, setMachines] = useState([
        { id: 1, name: "", model: "", sn: "", type: "" },
    ]);
    const [isButtonCreateMachine, setIsButtonCreateMachine] = useState(false);
    const [machineData, setMachineData] = useState([]);

    const dispatch = useDispatch()
    const { DataTypeHospital } = useSelector((state) => state.GetTypeHospital)

    const getDeals = async (retryCount = 0) => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_BACKEND_URL}/deals/form/select`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setDeals(response.data.data);
        } catch (error) {
            if (
                error.response.status === 401 &&
                error.response.data.message === "Unauthenticated."
            ) {
                localStorage.clear();
                window.location.href = "/login";
            } else if (error.response && error.response.status === 429) {
                const maxRetries = 3;
                if (retryCount < maxRetries) {
                    setTimeout(() => {
                        getDeals(retryCount + 1);
                    }, 2000);
                } else {
                    console.error(
                        "Max retry attempts reached. Unable to complete the request."
                    );
                }
            } else {
                console.error("Unhandled error:", error);
            }
        }
    };

    const getContact = async (retryCount = 0) => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_BACKEND_URL}/contacts/form/select`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setContact(response.data.data);
        } catch (error) {
            if (
                error.response.status === 401 &&
                error.response.data.message === "Unauthenticated."
            ) {
                localStorage.clear();
                window.location.href = "/login";
            } else if (error.response && error.response.status === 429) {
                const maxRetries = 3;
                if (retryCount < maxRetries) {
                    setTimeout(() => {
                        getContact(retryCount + 1);
                    }, 2000);
                } else {
                    console.error(
                        "Max retry attempts reached. Unable to complete the request."
                    );
                }
            } else {
                console.error("Unhandled error:", error);
            }
        }
    };

    const getCompanyParent = async (retryCount = 0) => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_BACKEND_URL}/companies/form/select`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setParentCompany(response.data.data);
        } catch (error) {
            if (
                error.response.status === 401 &&
                error.response.data.message === "Unauthenticated."
            ) {
                localStorage.clear();
                window.location.href = "/login";
            } else if (error.response && error.response.status === 429) {
                const maxRetries = 3;
                if (retryCount < maxRetries) {
                    setTimeout(() => {
                        getCompanyParent(retryCount + 1);
                    }, 2000);
                } else {
                    console.error(
                        "Max retry attempts reached. Unable to complete the request."
                    );
                }
            } else {
                console.error("Unhandled error:", error);
            }
        }
    };

    const getSourceCompany = async (retryCount = 0) => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_BACKEND_URL}/companies-source`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setSourceCompany(response.data.data);
        } catch (error) {
            if (
                error.response.status === 401 &&
                error.response.data.message === "Unauthenticated."
            ) {
                localStorage.clear();
                window.location.href = "/login";
            } else if (error.response && error.response.status === 429) {
                const maxRetries = 3;
                if (retryCount < maxRetries) {
                    setTimeout(() => {
                        getSourceCompany(retryCount + 1);
                    }, 2000);
                } else {
                    console.error(
                        "Max retry attempts reached. Unable to complete the request."
                    );
                }
            } else {
                console.error("Unhandled error:", error);
            }
        }
    };

    const getTypeCompany = async (retryCount = 0) => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_BACKEND_URL}/companies-type`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setTypeCompany(response.data.data);
        } catch (error) {
            if (
                error.response.status === 401 &&
                error.response.data.message === "Unauthenticated."
            ) {
                localStorage.clear();
                window.location.href = "/login";
            } else if (error.response && error.response.status === 429) {
                const maxRetries = 3;
                if (retryCount < maxRetries) {
                    setTimeout(() => {
                        getTypeCompany(retryCount + 1);
                    }, 2000);
                } else {
                    console.error(
                        "Max retry attempts reached. Unable to complete the request."
                    );
                }
            } else {
                console.error("Unhandled error:", error);
            }
        }
    };

    const getCompanyDetail = async (uid, token, retryCount = 0) => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_BACKEND_URL}/companies/${uid}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            const companyDetail = response.data.data;
            const telp_number = companyDetail?.phone?.map((phoneObj) => phoneObj);
            const oldAssociate = companyDetail?.associate?.map((data) => data);
            setOldAssociate(oldAssociate);

            setEditCompany({
                name: companyDetail.name,
                website_url: companyDetail.website_url,
                address: companyDetail.address,
                map_address: companyDetail.map_address,
                city: companyDetail.city,
                postal_code: companyDetail.postal_code,
                number_of_employee: companyDetail.number_of_employee,
                number_of_patient: companyDetail.number_of_patient,
                owner_user_uid: companyDetail?.owner?.uid,
                company_source_uid: companyDetail?.company_source?.uid,
                company_type_uid: companyDetail?.company_type?.uid,
                hospital_type_uid: companyDetail?.hospital_type_uid
            });
            setTelephone(telp_number ? telp_number : []);
            setHistory(companyDetail.history);
            setOldParentCompany(companyDetail);
            if (companyDetail?.parent) {
                localStorage.setItem(
                    "parentComp",
                    JSON.stringify(companyDetail?.parent)
                );
            }
        } catch (error) {
            if (
                error.response.status === 401 &&
                error.response.data.message === "Unauthenticated."
            ) {
                localStorage.clear();
                window.location.href = "/login";
            } else if (error.response && error.response.status === 429) {
                const maxRetries = 3;
                if (retryCount < maxRetries) {
                    setTimeout(() => {
                        getCompanyDetail(retryCount + 1);
                    }, 2000);
                } else {
                    console.error(
                        "Max retry attempts reached. Unable to complete the request."
                    );
                }
            } else {
                console.error("Unhandled error:", error);
            }
        }
    };

    const getMachineByCompany = async () => {
        const response = await axios.get(
            `${process.env.REACT_APP_BACKEND_URL}/machines?company=${uid}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        if (response) {
            return setMachineData(response.data.data)
        }
    }

    const parentCompanyLocalStorage = [];
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith("parentComp")) {
            const data = JSON.parse(localStorage.getItem(key));
            parentCompanyLocalStorage.push(data);
        }
    }
    const getOwnerUser = async (retryCount = 0) => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_BACKEND_URL}/users?limit=100`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setOwner(response.data.data);
        } catch (error) {
            if (
                error.response.status === 401 &&
                error.response.data.message === "Unauthenticated."
            ) {
                localStorage.clear();
                window.location.href = "/login";
            } else if (error.response && error.response.status === 429) {
                const maxRetries = 3;
                if (retryCount < maxRetries) {
                    setTimeout(() => {
                        getOwnerUser(retryCount + 1);
                    }, 2000);
                } else {
                    console.error(
                        "Max retry attempts reached. Unable to complete the request."
                    );
                }
            } else {
                console.error("Unhandled error:", error);
            }
        }
    };

    const addTelephone = () => {
        setTelephone([...telephone, ""]);
    };

    const removeTelephone = (uid) => {
        if (uid) {
            Swal.fire({
                title: "Konfirmasi",
                text: "Apa anda yakin ingin menghapus item ini?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Ya, Hapus!",
                cancelButtonText: "Batal",
            }).then((res) => {
                if (res.isConfirmed) {
                    const formData = new FormData();
                    formData.append("_method", "delete");
                    axios
                        .post(
                            `${process.env.REACT_APP_BACKEND_URL}/companies/delete/item/telp/${uid}`,
                            formData,
                            {
                                headers: {
                                    Authorization: `Bearer ${token}`,
                                },
                            }
                        )
                        .then(() => {
                            window.location.reload();
                        });
                }
            });
        } else {
            setTelephone((prevState) => {
                const telp = [...prevState];
                telp.pop();
                return telp;
            });
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditCompany({
            ...editCompany,
            [name]: value,
        });
    };

    const machineOptions = [
        { value: "Active", label: "Active" },
        { value: "Backup", label: "Backup" }
    ]

    const contactSelect = () => {
        const result = [];
        contact?.map((data) => {
            const contact = {
                value: data.uid,
                label: data.name,
            };
            result.push(contact);
        });
        const filterCont = result.filter(
            (cont) => !oldAssociate.some((old) => old?.contact?.uid === cont.value)
        );
        return filterCont;
    };

    const TypeHospital = () => {
        const result = [];
        if (Array?.isArray(DataTypeHospital)) {
            DataTypeHospital?.map((data) => {
                const contact = {
                    value: data.uid,
                    label: data.name,
                };
                result.push(contact);
            });
        }

        return result;
    };

    const selectOwner = () => {
        const res = [];
        owner?.map((data) => {
            const theme = {
                value: data.uid,
                label: data.name,
            };
            res.push(theme);
        });
        return res;
    };

    const selectComp = () => {
        return parentCompany
            .map((data) => ({
                value: data?.uid,
                label: data?.name,
            }))
            .filter((parent) => uid !== parent.value);
    };

    const selectDeals = () => {
        const rest = [];
        deals?.map((data) => {
            const theme = {
                value: data.uid,
                label: data.deal_name,
            };
            rest.push(theme);
        });
        const filterDeals = rest.filter(
            (deals) => !oldAssociate.some((old) => old?.deals?.uid === deals.value)
        );
        return filterDeals;
    };

    // add machine
    const handleInputMachineChange = (index, event) => {
        const { name, value } = event.target;
        const newMachines = [...machines];
        newMachines[index][name] = value;
        setMachines(newMachines);
    };

    const handleButtonCreateMachine = () => {
        setIsButtonCreateMachine(!isButtonCreateMachine);
    }

    const handleSelectTypeChange = (index, selectedOption) => {
        const newMachines = [...machines];
        newMachines[index].type = selectedOption.value;
        setMachines(newMachines);
    };

    const addMachine = () => {
        setMachines([...machines, { id: Date.now(), name: "", model: "", sn: "", type: "" }]);
    };

    const removeMachine = (id) => {
        const newMachines = machines.filter((machine) => machine.id !== id);
        setMachines(newMachines);
    };

    const handleChangeTelp = (index, value) => {
        const newTelp = [...telephone];
        if (newTelp[index]) {
            newTelp[index] = { ...newTelp[index], number: value };
        } else {
            newTelp[index] = { uid: "", number: value };
        }
        setTelephone(newTelp);
    };

    const handleDeals = (e) => {
        setValueDeals(e.map((opt) => opt.value));
    };

    const handleComp = (e) => {
        setValueComp(e.map((opt) => opt.value));
    };

    useEffect(() => {
        getCompanyDetail(uid, token);
        getOwnerUser();
        getTypeCompany();
        getSourceCompany();
        getCompanyParent();
        getContact();
        getDeals();
        getMachineByCompany();
        dispatch(GetDataTypeHospital(token))
        const clearLocalStorage = () => {
            localStorage.removeItem("parentComp");
        };
        window.addEventListener("beforeunload", clearLocalStorage);
        return () => {
            window.removeEventListener("beforeunload", clearLocalStorage);
        };
    }, [uid, token]);


    const updateCompany = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        const formDataForMachine = new FormData();

        telephone?.forEach((number, index) => {
            formData.append(`telp_number[${index}][uid]`, number.uid);
            formData.append(`telp_number[${index}][number]`, number.number);
        });
        formData.append("name", editCompany.name || "");
        formData.append("website_url", editCompany.website_url || "");
        formData.append("address", editCompany.address || "");
        formData.append("map_address", editCompany.map_address || "");
        formData.append("city", editCompany.city || "");
        formData.append("postal_code", editCompany.postal_code || "");
        formData.append("number_of_employee", editCompany.number_of_employee || "");
        formData.append("number_of_patient", editCompany.number_of_patient || "");
        formData.append("parent_company_uid", editCompany.parent_company_uid || "");
        formData.append("owner_user_uid", editCompany.owner_user_uid || "");
        formData.append("company_source_uid", editCompany.company_source_uid || "");
        formData.append("company_type_uid", editCompany.company_type_uid || "");
        formData.append("hospital_type_uid", editCompany.hospital_type_uid || "");
        formData.append("notes", editCompany.notes || "");
        if (valueDeals) {
            valueDeals.forEach((deals, index) => {
                formData.append(`deals_uid[${index}]`, deals);
            });
        }
        if (valueComp) {
            valueComp.forEach((comp, index) => {
                formData.append(`contact_uid[${index}]`, comp);
            });
        }
        formData.append("_method", "put");
        // console.log("FormData Content:");
        for (const pair of formData.entries()) {
            // console.log(pair[0] + ": " + pair[1]);
        }

        setButtonDisable(true);

        Swal.fire({
            title: "Process...",
            text: "Please wait while we process your request.",
            allowEscapeKey: false,
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });

        try {
            const update = await axios
                .post(
                    `${process.env.REACT_APP_BACKEND_URL}/companies/${uid}`,
                    formData,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                )
                .then(async (res) => {
                    if (machines && machines.filter(machine => machine.name.trim() !== "").length > 0) {
                        machines.forEach((item, index) => {
                            formDataForMachine.append(`data[${index}][company_uid]`, uid)
                            formDataForMachine.append(`data[${index}][name]`, item.name)
                            formDataForMachine.append(`data[${index}][model]`, item.model)
                            formDataForMachine.append(`data[${index}][sn]`, item.sn)
                            formDataForMachine.append(`data[${index}][type]`, item.type)
                        })

                        const response = await createMachine(formDataForMachine, token)

                        if (response.data.success) {
                            Swal.fire({
                                title: 'Sucessfully',
                                text: `${res.data.message} & ${response.data.message}`,
                                icon: "success",
                            }).then((res) => {
                                if (res.isConfirmed) {
                                    window.location.reload();
                                }
                            });
                        };
                    } else {
                        Swal.fire({
                            title: "Succesfully",
                            text: res.data.message,
                            icon: "success",
                        }).then((res) => {
                            if (res.isConfirmed) {
                                window.location.reload();
                            }
                        });
                    }

                    setButtonDisable(true);
                });
        } catch (err) {
            console.log(err);

            if (err.response) {
                Swal.fire({
                    text: err.response.data.message,
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

    const paginationComponentOptions = {
        selectAllRowsItem: true,
        selectAllRowsItemText: "ALL",
    };

    const columnHistory = [
        {
            name: "Created By",
            selector: (row) => row.created_by?.name,
            sortable: true,
            width: "150px",
        },
        {
            name: "Note",
            selector: (row) => (
                <div
                    className="mt-2"
                    style={{ whiteSpace: "normal", fontSize: "12px" }}
                >
                    <p dangerouslySetInnerHTML={{ __html: row?.note }} />
                </div>
            ),
            wrap: true,
            width: "200px",
        },
        {
            name: "Created at",
            selector: (row) => {
                const date = new Date(row?.created_at);
                const formatDate = {
                    year: "numeric",
                    month: "long",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                };
                const formatResult = new Intl.DateTimeFormat("en-US", formatDate);
                const time = formatResult.format(date);
                return (
                    <div className="mt-2">
                        <p style={{ whiteSpace: "normal", fontSize: "10px" }}>{time}</p>
                    </div>
                );
            },
            width: "140px",
        },
    ];

    const columnMachine = [
        {
            name: "Name",
            selector: (row) => row.name,
            sortable: true,
            // width: "150px",
        },
        {
            name: "Model",
            selector: (row) => (
                <div className="mt-2" style={{ whiteSpace: "normal", fontSize: "10px" }}>
                    <p dangerouslySetInnerHTML={{ __html: row.model }} />
                </div>
            ),
            wrap: true,
            // width: "200px",
        },
        {
            name: "Serial Number",
            selector: (row) => {
                return (
                    <div className="mt-2">
                        <p style={{ whiteSpace: "normal", fontSize: "12px" }}>{row.sn}</p>
                    </div>
                );
            },
            // width: "140px",
        },
        {
            name: "Type",
            selector: (row) => {
                let badgeBg = "";

                if (row.type === "Active") {
                    badgeBg = "bg-success"
                } else {
                    badgeBg = "bg-secondary"
                }

                return (
                    <div className="" style={{ fontSize: '1rem' }}>
                        <span className={`badge ${badgeBg}`}>{row.type}</span>
                    </div>
                );
            },
            // width: "140px",
        },
    ];

    const customStyles = {
        headRow: {
            style: {
                backgroundColor: "#427D9D",
                color: "white",
                marginTop: "12px",
                borderRadius: "5px",
            },
        },
        cells: {
            style: {
                fontSize: "4px",
                fontWeight: "500",
                marginTop: "4px",
            },
        },
    };

    const handleDeleteDeals = (uid) => {
        Swal.fire({
            title: "Konfirmasi",
            text: "Apa anda yakin ingin menghapus item ini?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Ya, Hapus!",
            cancelButtonText: "Batal",
        }).then((res) => {
            if (res.isConfirmed) {
                const formData = new FormData();
                formData.append("associate_uid", uid);
                axios
                    .post(
                        `${process.env.REACT_APP_BACKEND_URL}/companies/delete/item/deals`,
                        formData,
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        }
                    )
                    .then(() => {
                        window.location.reload();
                    });
            }
        });
    };

    const handleDeleteContact = (uid) => {
        Swal.fire({
            title: "Konfirmasi",
            text: "Apa anda yakin ingin menghapus item ini?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Ya, Hapus!",
            cancelButtonText: "Batal",
        }).then((res) => {
            if (res.isConfirmed) {
                const formData = new FormData();
                formData.append("associate_uid", uid);
                axios
                    .post(
                        `${process.env.REACT_APP_BACKEND_URL}/companies/delete/item/contact`,
                        formData,
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        }
                    )
                    .then(() => {
                        window.location.reload();
                    });
            }
        });
    };

    const deleteLocalStorageParent = () => {
        localStorage.removeItem("parentComp");
        setFormParentComp([]);
    };

    const createMachine = async (data, token) => {
        const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/machines`, data, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })

        return response
    }

    return (
        <body id="body">
            <Topbar />
            <Sidebar />
            <Main>
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <div className="pagetitle">
                                <h1>Edit Company</h1>
                                <nav>
                                    <ol className="breadcrumb mt-2">
                                        <li className="breadcrumb-item">
                                            <a href="/" className="text-decoration-none">
                                                Dashboard
                                            </a>
                                        </li>
                                        <li className="breadcrumb-item">
                                            <a href="/company" className="text-decoration-none">
                                                Company
                                            </a>
                                        </li>
                                        <li className="breadcrumb-item active">Edit Company</li>
                                    </ol>
                                </nav>
                            </div>
                        </div>
                    </div>
                    <form onSubmit={updateCompany}>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="float-end mb-3">
                                    <button
                                        className="btn btn-primary me-2"
                                        type="submit"
                                        disabled={isButtonDisable}
                                    >
                                        Save Changes
                                    </button>
                                    <a
                                        href="/company"
                                        className="btn btn-secondary text-decoration-none"
                                    >
                                        Cancel
                                    </a>
                                </div>
                            </div>
                            <div className="col-md-4">
                                {/* company */}
                                <Card className="shadow">
                                    <Card.Header>
                                        <h5 className="mt-2">
                                            <i class="bi bi-building-fill fs-4"></i>
                                            <span className="ms-2 fs-5 fw-semibold mt-2">
                                                Companies
                                            </span>
                                        </h5>
                                    </Card.Header>
                                    <Card.Body>
                                        <FloatingLabel
                                            label={
                                                <span>
                                                    Company Name
                                                    <span style={{ color: "red" }} className="fs-6">
                                                        *
                                                    </span>
                                                </span>
                                            }
                                            className="mb-3"
                                        >
                                            <Form.Control
                                                type="text"
                                                placeholder="name@example.com"
                                                name="name"
                                                value={editCompany.name}
                                                onChange={handleInputChange}
                                            />
                                        </FloatingLabel>
                                        <FloatingLabel label="Website" className="mb-3">
                                            <Form.Control
                                                type="text"
                                                name="website_url"
                                                value={editCompany.website_url}
                                                onChange={handleInputChange}
                                                placeholder="name@example.com"
                                            />
                                        </FloatingLabel>
                                        <Form.Group className="mb-3">
                                            <Select
                                                options={selectOwner()}
                                                value={selectOwner().find(
                                                    (e) => e.value === editCompany.owner_user_uid
                                                )}
                                                onChange={(e) =>
                                                    setEditCompany({
                                                        ...editCompany,
                                                        owner_user_uid: e.value,
                                                    })
                                                }
                                                placeholder="Select Owner"
                                            />
                                        </Form.Group>
                                        <Form.Group className="mb-3">
                                            <Select
                                                options={TypeHospital()}
                                                value={TypeHospital().find(
                                                    (e) => e.value === editCompany.hospital_type_uid
                                                )}
                                                onChange={(e) =>
                                                    setEditCompany({
                                                        ...editCompany,
                                                        hospital_type_uid: e.value,
                                                    })
                                                }
                                                placeholder="Select Type Hospital"
                                            />
                                        </Form.Group>
                                        {telephone?.map((tel, index) => (
                                            <div key={index}>
                                                <Form.Group className="mb-3">
                                                    <Form.Label>
                                                        Telephone #{index + 1}{" "}
                                                        <span style={{ color: "red" }} className="fs-6">
                                                            *
                                                        </span>
                                                    </Form.Label>
                                                    <Form.Control
                                                        type="number"
                                                        value={tel.number}
                                                        onChange={(e) =>
                                                            handleChangeTelp(index, e.target.value)
                                                        }
                                                    />
                                                </Form.Group>
                                                <Button
                                                    variant="danger"
                                                    onClick={() => removeTelephone(tel.uid)}
                                                    style={{ fontSize: "0.65rem" }}
                                                    className="mb-1"
                                                >
                                                    Remove
                                                </Button>
                                            </div>
                                        ))}
                                        <Button
                                            variant="primary"
                                            onClick={addTelephone}
                                            style={{ fontSize: "0.65rem" }}
                                            className="mb-2"
                                        >
                                            Add Telephone
                                        </Button>
                                        <FloatingLabel
                                            label="Address (Google Map)"
                                            className="mb-3"
                                        >
                                            <Form.Control
                                                type="text"
                                                name="map_address"
                                                value={editCompany.map_address}
                                                onChange={handleInputChange}
                                                placeholder="name@example.com"
                                            />
                                        </FloatingLabel>
                                        <FloatingLabel
                                            label={
                                                <span>
                                                    Address
                                                    <span style={{ color: "red" }} className="fs-6">
                                                        *
                                                    </span>
                                                </span>
                                            }
                                            className="mb-3"
                                        >
                                            <Form.Control
                                                type="text"
                                                value={editCompany.address}
                                                onChange={handleInputChange}
                                                placeholder="name@example.com"
                                            />
                                        </FloatingLabel>
                                        <FloatingLabel label="City" className="mb-3">
                                            <Form.Control
                                                type="text"
                                                name="city"
                                                value={editCompany.city}
                                                onChange={handleInputChange}
                                                placeholder="name@example.com"
                                            />
                                        </FloatingLabel>
                                        <FloatingLabel label="Zip Code" className="mb-3">
                                            <Form.Control
                                                type="text"
                                                name="postal_code"
                                                value={editCompany.postal_code}
                                                onChange={handleInputChange}
                                                placeholder="name@example.com"
                                            />
                                        </FloatingLabel>
                                        <FloatingLabel
                                            label={
                                                <span>
                                                    Type Company
                                                    <span style={{ color: "red" }} className="fs-6">
                                                        *
                                                    </span>
                                                </span>
                                            }
                                        >
                                            <Form.Select
                                                className="mb-3"
                                                size="lg"
                                                style={{ fontSize: "0.85rem" }}
                                                name="company_type_uid"
                                                value={editCompany.company_type_uid}
                                                onChange={(e) => {
                                                    const typeUid = e.target.value;
                                                    setEditCompany({
                                                        ...editCompany,
                                                        company_type_uid: typeUid,
                                                    });
                                                }}
                                            >
                                                <option value="">Select Choose</option>
                                                {typeCompany.map((type) => (
                                                    <option key={type.uid} value={type.uid}>
                                                        {type.name}
                                                    </option>
                                                ))}
                                            </Form.Select>
                                        </FloatingLabel>
                                        <FloatingLabel label="Number of Employees" className="mb-3">
                                            <Form.Control
                                                type="number"
                                                placeholder="name@example.com"
                                                name="number_of_employee"
                                                value={editCompany.number_of_employee}
                                                onChange={handleInputChange}
                                            />
                                        </FloatingLabel>
                                        <FloatingLabel label="Source">
                                            <Form.Select
                                                className="mb-3"
                                                size="lg"
                                                style={{ fontSize: "0.85rem" }}
                                                name="company_source_uid"
                                                value={editCompany.company_source_uid}
                                                onChange={(e) => {
                                                    const sourceUid = e.target.value;
                                                    setEditCompany({
                                                        ...editCompany,
                                                        company_source_uid: sourceUid,
                                                    });
                                                }}
                                            >
                                                <option>Select Choose</option>
                                                {sourceCompany.map((source) => (
                                                    <option key={source.uid} value={source.uid}>
                                                        {source.name}
                                                    </option>
                                                ))}
                                            </Form.Select>
                                        </FloatingLabel>
                                        <FloatingLabel label="Number of Patiens" className="mb-3">
                                            <Form.Control
                                                type="text"
                                                placeholder="name@example.com"
                                                name="number_of_patient"
                                                value={editCompany.number_of_patient}
                                                onChange={handleInputChange}
                                            />
                                        </FloatingLabel>
                                    </Card.Body>
                                </Card>
                                {/* deals */}
                                <Card className="shadow mt-3">
                                    <Card.Header>
                                        <h5 className="mt-2">
                                            <i class="bi bi-currency-dollar  fs-4"></i>
                                            <span className="ms-2 fs-5 fw-semibold mt-5">Deals</span>
                                        </h5>
                                    </Card.Header>
                                    <Card.Body>
                                        {oldAssociate?.map((data, index) =>
                                            data?.deals ? (
                                                <Card className="shadow p-2">
                                                    <div className="row d-flex">
                                                        <>
                                                            <Col md={10} sm={10} key={index}>
                                                                <div className="d-flex">
                                                                    <img
                                                                        src={IconDeals}
                                                                        alt={IconDeals}
                                                                        className="ms-1 me-3 mt-3"
                                                                        style={{ width: "30px", height: "30px" }}
                                                                    />
                                                                    <Col md={12} sm={12}>
                                                                        <p
                                                                            className="ms-1 mt-2 me-3"
                                                                            style={{
                                                                                fontSize: "10px",
                                                                                whiteSpace: "normal",
                                                                            }}
                                                                        >
                                                                            {" "}
                                                                            Name Deals :{" "}
                                                                            <strong className="ms-2">
                                                                                {data?.deals?.deal_name ?? null}
                                                                            </strong>{" "}
                                                                        </p>
                                                                        <p
                                                                            className="ms-1"
                                                                            style={{
                                                                                fontSize: "10px",
                                                                                marginTop: "-8px",
                                                                            }}
                                                                        >
                                                                            Stage :{" "}
                                                                            <strong className="ms-2">
                                                                                {data?.deals?.staging?.name}
                                                                            </strong>
                                                                        </p>
                                                                        <p
                                                                            className="ms-1"
                                                                            style={{
                                                                                fontSize: "10PX",
                                                                                marginTop: "-8px",
                                                                            }}
                                                                        >
                                                                            Deal Size :{" "}
                                                                            <strong className="ms-2">
                                                                                Rp.
                                                                                {new Intl.NumberFormat().format(
                                                                                    data?.deals?.deal_size
                                                                                )}
                                                                            </strong>
                                                                        </p>
                                                                    </Col>
                                                                </div>
                                                            </Col>
                                                            <Col md={2} sm={2} style={{ marginTop: "-8px" }}>
                                                                <a
                                                                    onClick={() => handleDeleteDeals(data.uid)}
                                                                    className="ms-1"
                                                                    style={{ cursor: "pointer" }}
                                                                >
                                                                    <i className="bi bi-x fs-5 text-danger"></i>
                                                                </a>
                                                            </Col>
                                                        </>
                                                    </div>
                                                </Card>
                                            ) : null
                                        )}
                                        <Form.Group className="mb-3">
                                            <Select
                                                placeholder="Select Deals"
                                                isMulti
                                                options={selectDeals()}
                                                onChange={(e) => handleDeals(e)}
                                                closeMenuOnSelect={false}
                                            />
                                        </Form.Group>
                                        <div className="text-center">
                                            <a
                                                //   onClick={handleShowCanvasDeals}
                                                className="text-primary text-decoration-none fw-semibold"
                                                style={{ cursor: "pointer" }}
                                                onClick={handleOpenCanvasDeals}
                                            >
                                                <i
                                                    class="bi bi-plus-lg"
                                                    style={{ fontSize: "15px" }}
                                                ></i>
                                                <span className="fs-6"> Create Another Deal</span>
                                            </a>
                                        </div>
                                    </Card.Body>
                                </Card>
                                <OverlayAddDeals
                                    visible={showCanvasDeals}
                                    onClose={handleCloseCanvasDeals}
                                />
                                {/* contact */}
                                <Card className="shadow mt-3">
                                    <Card.Header>
                                        <h5 className="mt-2">
                                            <i class="bi bi-person-circle fs-4"></i>
                                            <span className="ms-2 fs-5 fw-semibold mt-5">
                                                Contact
                                            </span>
                                        </h5>
                                    </Card.Header>
                                    <Card.Body>
                                        {oldAssociate?.map((data, index) =>
                                            data.contact ? (
                                                <Card className="shadow p-2">
                                                    <div className="row d-flex">
                                                        <>
                                                            <Col md={10} sm={10} key={index}>
                                                                <div className="d-flex">
                                                                    <img
                                                                        src={IconContact}
                                                                        alt={IconContact}
                                                                        className="m-2"
                                                                        style={{ width: "30px", height: "30px" }}
                                                                    />
                                                                    <Col md={12} sm={12}>
                                                                        <p
                                                                            className="ms-1"
                                                                            style={{
                                                                                fontSize: "10px",
                                                                                whiteSpace: "normal",
                                                                            }}
                                                                        >
                                                                            Name :{" "}
                                                                            <strong className="ms-2">
                                                                                {data?.contact?.name ?? "-"}
                                                                            </strong>
                                                                        </p>
                                                                        <p
                                                                            className="ms-1"
                                                                            style={{
                                                                                fontSize: "10px",
                                                                                whiteSpace: "normal",
                                                                            }}
                                                                        >
                                                                            No.Telp :{" "}
                                                                            <strong
                                                                                className="ms-2"
                                                                                style={{
                                                                                    fontSize: "10px",
                                                                                    marginTop: "-8px",
                                                                                }}
                                                                            >
                                                                                {data?.contact?.phone?.[0]?.number ??
                                                                                    "-"}
                                                                            </strong>
                                                                        </p>
                                                                        <p
                                                                            className="ms-1"
                                                                            style={{
                                                                                fontSize: "10px",
                                                                                marginTop: "-8px",
                                                                            }}
                                                                        >
                                                                            Email :{" "}
                                                                            <strong className="ms-2">
                                                                                {data?.contact?.email ?? "-"}
                                                                            </strong>
                                                                        </p>
                                                                    </Col>
                                                                </div>
                                                            </Col>
                                                            <Col md={2} sm={2} style={{ marginTop: "-8px" }}>
                                                                <a
                                                                    onClick={() => handleDeleteContact(data.uid)}
                                                                    style={{ cursor: "pointer" }}
                                                                    className="ms-1"
                                                                >
                                                                    <i className="bi bi-x fs-5 text-danger"></i>
                                                                </a>
                                                            </Col>
                                                        </>
                                                    </div>
                                                </Card>
                                            ) : null
                                        )}
                                        <FloatingLabel controlId="floatingInput" className="mb-3">
                                            <Select
                                                closeMenuOnSelect={false}
                                                components={animatedComponents}
                                                isMulti
                                                options={contactSelect()}
                                                onChange={(e) => handleComp(e)}
                                                placeholder="Select Contact"
                                            />
                                        </FloatingLabel>
                                        <div className="text-center">
                                            <a
                                                //   onClick={handleShowCanvasDeals}
                                                className="text-primary text-decoration-none fw-semibold"
                                                style={{ cursor: "pointer" }}
                                            // onClick={handleOpenCanvasContact}
                                            >
                                                <i
                                                    class="bi bi-plus-lg"
                                                    style={{ fontSize: "15px" }}
                                                ></i>
                                                <span className="fs-6"> Create Another Contact</span>
                                            </a>
                                        </div>
                                    </Card.Body>
                                </Card>
                                {/* parent company */}
                                <Card className="shadow">
                                    <Card.Header>
                                        <h5 className="mt-2">
                                            <i class="bi bi-buildings-fill fs-4"></i>
                                            <span className="ms-2 fs-5 fw-semibold mt-5">
                                                Parent Company
                                            </span>
                                        </h5>
                                    </Card.Header>
                                    <Card.Body>
                                        {parentCompanyLocalStorage &&
                                            Array.isArray(parentCompanyLocalStorage) &&
                                            parentCompanyLocalStorage.length > 0 ? (
                                            <Card className="shadow p-2">
                                                <div className="row d-flex">
                                                    <div className="col-md-10">
                                                        <div className="d-flex">
                                                            <img
                                                                src={IconCompany}
                                                                className="ms-1 me-3 mt-3"
                                                                alt={IconCompany}
                                                                style={{ width: "30px", height: "30px" }}
                                                            />
                                                            <Col md={10} sm={10}>
                                                                <p
                                                                    className="ms-1"
                                                                    style={{
                                                                        fontSize: "10px",
                                                                        whiteSpace: "normal",
                                                                    }}
                                                                >
                                                                    Name Company : <br />
                                                                    <strong className="mt-1">
                                                                        {oldParentCompany.parent?.name}
                                                                    </strong>
                                                                </p>
                                                                <p
                                                                    className="ms-1"
                                                                    style={{
                                                                        fontSize: "10px",
                                                                        marginTop: "-8px",
                                                                    }}
                                                                >
                                                                    Type : <br />
                                                                    <strong className="mt-1">
                                                                        {
                                                                            oldParentCompany.parent?.company_type
                                                                                ?.name
                                                                        }
                                                                    </strong>
                                                                </p>
                                                                <p
                                                                    className="ms-1"
                                                                    style={{
                                                                        fontSize: "10px",
                                                                        marginTop: "-8px",
                                                                        whiteSpace: "normal",
                                                                    }}
                                                                >
                                                                    No.Telp : <br />
                                                                    <strong className="mt-1">
                                                                        {oldParentCompany?.phone?.[0]?.number ||
                                                                            "-"}
                                                                    </strong>
                                                                </p>
                                                            </Col>
                                                            <Col md={2} sm={2}>
                                                                <a
                                                                    onClick={deleteLocalStorageParent}
                                                                    className="ms-1"
                                                                    style={{ cursor: "pointer" }}
                                                                >
                                                                    <i className="bi bi-x fs-5 text-danger"></i>
                                                                </a>
                                                            </Col>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Card>
                                        ) : (
                                            <Form.Group className="mb-3">
                                                <Select
                                                    options={selectComp()}
                                                    onChange={(e) => {
                                                        const parentUid = e.value;
                                                        setEditCompany({
                                                            ...editCompany,
                                                            parent_company_uid: parentUid,
                                                        });
                                                    }}
                                                />
                                            </Form.Group>
                                        )}

                                        <div className="text-center">
                                            <a
                                                //   onClick={handleShowCanvasDeals}
                                                className="text-primary text-decoration-none fw-semibold"
                                                style={{ cursor: "pointer" }}
                                                onClick={handleOpenCanvasCompany}
                                            >
                                                <i
                                                    class="bi bi-plus-lg"
                                                    style={{ fontSize: "15px" }}
                                                ></i>
                                                <span className="fs-6"> Create Another Company</span>
                                            </a>
                                        </div>
                                    </Card.Body>
                                </Card>
                                <OverlayAddCompany
                                    visible={showCanvasCompany}
                                    onClose={handleCloseCanvasCompany}
                                />
                            </div>
                            <div className="col-md-8">
                                <Card className="shadow">
                                    <Card.Header>
                                        <h6 className="fw-bold mt-2">Notes</h6>
                                    </Card.Header>
                                    <Card.Body>
                                        <ReactQuill
                                            className="p-2"
                                            theme="snow"
                                            name="notes"
                                            onChange={(value) =>
                                                handleInputChange({ target: { name: "notes", value } })
                                            }
                                        />
                                    </Card.Body>
                                </Card>

                                <Card className="shadow">
                                    <Card.Header>
                                        <h6 className="fw-bold mt-2">Machines</h6>
                                    </Card.Header>

                                    <Card.Body>
                                        <div className="w-100 mb-3">
                                            <Button variant="primary" size="sm" className="w-100" onClick={() => handleButtonCreateMachine()}>
                                                <FontAwesomeIcon icon={!isButtonCreateMachine ? faPlus : faChevronUp} className="me-2" /> {!isButtonCreateMachine ? "Add Machine" : "Hide Add Machine"}
                                            </Button>
                                        </div>

                                        {isButtonCreateMachine && (
                                            <>
                                                {machines.map((machine, index) => (
                                                    <div className="mb-5" key={index}>
                                                        <h6 className="fw-bolder">Machine {index + 1}</h6>
                                                        {index > 0 && (
                                                            <Button
                                                                variant="danger"
                                                                size="sm"
                                                                onClick={() => removeMachine(machine.id)}
                                                            >
                                                                Delete
                                                            </Button>
                                                        )}

                                                        <hr />
                                                        <Form.Group className="mb-3">
                                                            <Form.Label>Name</Form.Label>
                                                            <Form.Control
                                                                type="text"
                                                                name="name"
                                                                value={machine.name}
                                                                onChange={(e) => handleInputMachineChange(index, e)}
                                                                placeholder="Input Machine Name"
                                                            />
                                                        </Form.Group>

                                                        <Form.Group className="mb-3">
                                                            <Form.Label>Model</Form.Label>
                                                            <Form.Control
                                                                type="text"
                                                                name="model"
                                                                value={machine.model}
                                                                onChange={(e) => handleInputMachineChange(index, e)}
                                                                placeholder="Input Model Machine"
                                                            />
                                                        </Form.Group>

                                                        <Form.Group className="mb-3">
                                                            <Form.Label>Serial Number</Form.Label>
                                                            <Form.Control
                                                                type="text"
                                                                name="sn"
                                                                value={machine.sn}
                                                                onChange={(e) => handleInputMachineChange(index, e)}
                                                                placeholder="Input Serial Number"
                                                            />
                                                        </Form.Group>

                                                        <Form.Group className="mb-3">
                                                            <Form.Label>Type</Form.Label>
                                                            <Select
                                                                options={machineOptions}
                                                                value={machineOptions.find((e) => e.value === machine.type)}
                                                                onChange={(selectedOption) => handleSelectTypeChange(index, selectedOption)}
                                                                placeholder="Select Type Machine"
                                                            />
                                                        </Form.Group>
                                                    </div>
                                                ))}

                                                <Button variant="success" size="sm" onClick={addMachine}>
                                                    <FontAwesomeIcon icon={faPlus} className="me-2" /> Add Others Machine
                                                </Button>
                                            </>
                                        )}

                                        <DataTable
                                            columns={columnMachine}
                                            data={machineData}
                                            customStyles={customStyles}
                                            pagination
                                            defaultSortFieldId={1}
                                            paginationComponentOptions={paginationComponentOptions}
                                        />

                                    </Card.Body>
                                </Card>

                                <Card className="shadow">
                                    <Card.Header>
                                        <h6 className="fw-bold mt-2">History</h6>
                                    </Card.Header>
                                    <Card.Body>
                                        <DataTable
                                            columns={columnHistory}
                                            data={history}
                                            customStyles={customStyles}
                                            pagination
                                            defaultSortFieldId={1}
                                            paginationComponentOptions={paginationComponentOptions}
                                        />
                                    </Card.Body>
                                </Card>
                            </div>
                        </div>
                    </form>
                </div>
                <Footer />
            </Main>
        </body>
    );
};

export default EditCompany;
