import React, { useEffect, useState, useRef } from "react";
import DatePicker from "react-datepicker";
import Topbar from "../../../components/Template/Topbar";
import Sidebar from "../../../components/Template/Sidebar";
import Main from "../../../components/Template/Main";
import { Link, json, useParams } from "react-router-dom";
import { Card, Col, FloatingLabel, Form, Row, Modal, Button } from "react-bootstrap";
import Select from "react-select";
import CreatableSelect from 'react-select/creatable';
import ReactQuill from "react-quill";
import axios from "axios";
import DataTable from "react-data-table-component";
import IconPerson from "../../../assets/img/telephone-call.png";
import IconCompany from "../../../assets/img/condo.png";
import AddProductOverlay from "../../../components/Overlay/addProduct";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSackDollar } from "@fortawesome/free-solid-svg-icons";


const EditDeals = () => {
  const token = localStorage.getItem("token");
  const { uid } = useParams();
  const [pipeline, setPipeline] = useState([]);
  const [valueDeals, setValueDeals] = useState({});
  const [owner, setOwner] = useState([]);
  const [priority, setPriority] = useState([]);
  const [dealCategory, setDealsCategory] = useState([]);
  const [company, setCompany] = useState([]);
  const [contact, setContact] = useState([]);
  const [contactDetail, setContactDetail] = useState({});
  const [products, setProducts] = useState([]);
  const productsRef = useRef(products);
  const [history, setHistory] = useState([]);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [mentionUsers, setMentionUsers] = useState([]);
  const [selectedPipeline, setSelectedPipeline] = useState(null);
  const [stageOld, setStageOld] = useState([]);
  const handleCloseProduct = () => setShowAddProduct(false);
  const handleShowProduct = () => setShowAddProduct(true);
  const [isButtonDisabled, setButtonDisabled] = useState(false);
  const [projectCategories, setProjectCategories] = useState([]);
  const [showHppModal, setShowHppModal] = useState(false);
  const [hppFile, setHppFile] = useState(null);
  const [contactLocalStorage, setContactLocalStorage] = useState([]); 
  const [selectedCompanyData, setSelectedCompanyData] = useState([]);
  const [companyStorage, setCompanyStorage] = useState([]); // Ganti variabel global dengan state
  
  const mantionUsersUid = (e) => {
    setMentionUsers(e.map((opt) => opt.value));
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

  const totalPrice = products.reduce((sum, item) => sum + (item.total_price || 0), 0);


  const getCompany = async (retryCount = 0) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/companies/form/select`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCompany(response.data.data);
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
            getCompany(retryCount + 1);
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

  const getDealsCategory = async (retryCount = 0) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/deal-categories`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setDealsCategory(response.data.data);
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
            getDealsCategory(retryCount + 1);
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

  const getProjectCategories = async () => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/project-categories`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        setProjectCategories(response.data.data);
    } catch (error) {
        console.error("Failed to fetch project categories:", error);
    }
  };

  const getPriority = async (retryCount = 0) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/priorities`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setPriority(response.data.data);
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
            getPriority(retryCount + 1);
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

  const getOwner = async (retryCount = 0) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/users`,
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
            getOwner(retryCount + 1);
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

  useEffect(() => {
    const getDealsValueOld = async () => {
        try {
            const response = await axios.get(
              `${process.env.REACT_APP_BACKEND_URL}/deals/${uid}`,
              { headers: { Authorization: `Bearer ${token}` } }
            );
            const dealData = response.data.data;

            setValueDeals({
                deal_name: dealData.deal_name,
                priority_uid: dealData.priority_uid,
                deal_status: dealData.deal_status,
                deal_category_uid: dealData.deal_category_uid,
                company_uid: dealData.company_uid,
                owner_user_uid: dealData.owner_user_uid,
                deal_size: dealData.deal_size,
                project_category_uid: dealData.project_category_uid,
                planned_implementation_date: dealData.planned_implementation_date ? new Date(dealData.planned_implementation_date) : null,
                next_project_date: dealData.next_project_date ? new Date(dealData.next_project_date) : null,
            });
            setSelectedPipeline(dealData.staging_uid);
            setHistory(dealData.history);

            const standardizedProducts = (dealData.detail_product || []).map(item => {

              // Cari harga satuan dari relasi product/package
              let unitPrice = 0;
              if (item.product) {
                  // Produk Single/MCU: Ambil harga dari tabel 'products'
                  unitPrice = item.product.price;
              } else if (item.package_product) {
                  // Produk Package: Ambil harga total dari tabel 'package_products'
                  unitPrice = item.package_product.total_price;
              }



              return {
                  id: item.id || item.uid,
                  product_uid: item.product_uid || item.package_product_uid,
                  product_name: (item.product && item.product.name) || (item.package_product && item.package_product.name) || item.product_name || 'Product Not Found',
                  
                  // >>> PERBAIKAN: Tambahkan unitPrice <<<
                  price: unitPrice || 0,
                  // >>> END PERBAIKAN <<<
                  
                  qty: item.qty,
                  discount_type: item.discount_type,
                  discount: item.discount,
                  total_price: item.total_price, // Harga total final per item
              }
            });

            const existingContacts = dealData.contact_person || []; // Sesuaikan nama key relasi dari backend
            const standardizedContacts = existingContacts.map(item => ({
                uid: item.uid,
                contact_uid: item.contact_uid, 
                contact: item.contact || null 
            }));


            setProducts(standardizedProducts);
            setContactLocalStorage(standardizedContacts);
            localStorage.setItem("DataProduct", JSON.stringify(standardizedProducts));
            localStorage.setItem("contactPerson", JSON.stringify(standardizedContacts));

            if (dealData.company) {                
                 const companyDataToStore = [dealData.company]; 
                 localStorage.setItem("companyStorage", JSON.stringify(companyDataToStore));
            } else {
                 localStorage.removeItem("companyStorage");
                 setDataCompany([]);
            }

        } catch (error) {
            console.error("Failed to fetch deal data:", error);
            if (error.response?.status === 401) {
                localStorage.clear();
                window.location.href = "/login";
            }
        }
    };
    
    // Panggil semua fungsi get
    getDealsValueOld();
    getPipeline();
    getOwner();
    getPriority();
    getDealsCategory();
    getProjectCategories();
    getCompany();
    getContact();
    const loadInitialCompany = () => {
        // Muat dari localStorage
        const company = JSON.parse(localStorage.getItem("companyStorage") || "[]");
        setCompanyStorage(company);
    };
    loadInitialCompany();

    // Listener untuk update UI jika localStorage diubah oleh overlay
    const handleStorageChange = () => {
      setProducts(JSON.parse(localStorage.getItem("DataProduct") || "[]"));
    };
    window.addEventListener('storage', handleStorageChange);
    
    // HAPUS LISTENER `beforeunload` YANG BERBAHAYA
    return () => {
        window.removeEventListener('storage', handleStorageChange);
    };
  }, [token, uid]);

  useEffect(() => {
  // Setiap kali 'products' berubah, update isi 'kotak' ref
    productsRef.current = products;
  }, [products]);

  const handleProductsUpdate = () => {
    const updatedProducts = JSON.parse(localStorage.getItem("DataProduct") || "[]");
    setProducts(updatedProducts);
    console.log("PARENT STATE UPDATED:", updatedProducts); // Log untuk verifikasi
  };

  const handleContactUpdate = () => {
    setContactLocalStorage(JSON.parse(localStorage.getItem("contactPerson") || "[]"));
  };

  const getPipeline = async (retryCount = 0) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/staging-masters`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setPipeline(response.data.data);
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
            getPipeline(retryCount + 1);
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

  const selectOwner = () => {
    const result = [];
    owner?.map((data) => {
      const reOwn = {
        label: data.name,
        value: data.uid,
      };
      result.push(reOwn);
    });
    return result;
  };

  const selectPriority = () => {
    const result = [];
    priority?.map((data) => {
      const rePre = {
        label: data.name,
        value: data.uid,
      };
      result.push(rePre);
    });
    return result;
  };

  const selectDealCategory = () => {
    const result = [];
    dealCategory?.map((data) => {
      const deCat = {
        label: `${data.name} (${data.scale})`,
        value: data.uid,
      };
      result.push(deCat);
    });
    return result;
  };

  const projectCategorySelectOptions = () => {
    return projectCategories.map(cat => ({
        value: cat.uid,
        label: cat.name,
    }));
  };

  const selectCompany = () => {
    const result = [];
    company?.map((data) => {
      const comp = {
        label: data.name,
        value: data.uid,
      };
      result.push(comp);
    });
    return result;
  };

  const [resContact, setResContact] = useState([]);

  const handleResContact = (e) => {
    setResContact(e.map((opt) => opt.value));
  };

  const allContact = [];
  for (let i = 0; i < localStorage.length; i++) {
    const keys = localStorage.key(i);
    if (keys.startsWith("contactPerson")) {
      const data = JSON.parse(localStorage.getItem(keys));
      allContact.push(data);
    }
  }

  const loadInitialContacts = () => {
    const contacts = JSON.parse(localStorage.getItem("contactPerson") || "[]");
    setContactLocalStorage(contacts);
  };

  const uidRes = contactLocalStorage?.map((data) => data.contact_uid);
  const uniqCont = new Set([...resContact, ...(uidRes || [])]);
  const combineCont = Array.from(uniqCont);
  
  const selectContact = () => {
    const result = [];
    contact?.map((data) => {
      const cont = {
        label: data.name,
        value: data.uid,
      };
      result.push(cont);
    });
    return result;
  };

  const handleChange = (e) => {
    setValueDeals({
      ...valueDeals,
      [e.target.name]: e.target.value,
    });
  };

  const handlePrice = (e) => {
    setValueDeals({
      ...valueDeals,
      [e.target.name]: e.target.value,
    });
  };

  const [selectFile, setSelectFile] = useState(null);
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectFile(file);
  };

  const handleInputProjectCategory = (selectedOption) => {
    setValueDeals(prevDeals => ({
        ...prevDeals,
        project_category_uid: selectedOption ? selectedOption.value : "",
    }));
  };

  const handleDateChange = (date, fieldName) => {
      setValueDeals(prevDeals => ({
          ...prevDeals,
          [fieldName]: date,
      }));
  };

  const handleDeleteProduct = (productId) => {
    const updatedProducts = products.filter(p => p.id !== productId);
    setProducts(updatedProducts); // Update state
    localStorage.setItem("DataProduct", JSON.stringify(updatedProducts)); // Sinkronkan localStorage
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
        formData.append("contact_person_uid[0]", uid);
        axios
          .post(
            `${process.env.REACT_APP_BACKEND_URL}/deals/item/contact/delete`,
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

  const [dataCompany, setDataCompany] = useState([]);

  const handleDeleteCompany = (company) => {
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
        formData.append("deals_uid", uid);
        formData.append("company_uid", company);
        formData.append("_method", "delete");
        // console.log("FormData Content:");
        // for (const pair of formData.entries()) {
        //   console.log(pair[0] + ": " + pair[1]);
        // }
        axios
          .post(
            `${process.env.REACT_APP_BACKEND_URL}/deals/item/company/delete`,
            formData,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          )
          .then(() => {
            localStorage.removeItem("companyStorage");
            setDataCompany([]);
            window.location.reload();
          });
      }
    });
  };

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

  const columns = [
    {
      name: "Name Product",
      selector: (row) =>
        row.product?.name || row.package_product?.name || row.product_name,
      sortable: true,
      width: "180px",
    },
    {
      name: "Quantity",
      selector: (row) => row.qty,
      sortable: true,
    },
    {
      name: "Total Price",
      selector: (row) =>
        `Rp. ${new Intl.NumberFormat().format(row.total_price)}`,
      sortable: true,
      width: "140px",
    },
    {
      name: "Discount(%)",
      selector: (row) => {
        if (row.discount_type === "nominal") {
          return `Rp. ${new Intl.NumberFormat().format(row.discount)}`;
        } else if (row.discount_type === "percent") {
          return `${row.discount} %`;
        } else {
          return "-";
        }
      },
    },
    {
      name: "Action",
      selector: (row) => (
        <a
          onClick={() => handleDeleteProduct(row.id)}
          className="icon-button text-black"
        >
          <i className="bi bi-trash-fill danger"></i>
        </a>
      ),
    },
  ];

  // const companyStorage = [];

  // for (let i = 0; i < localStorage.length; i++) {
  //   const keys = localStorage.key(i);
  //   if (keys.startsWith("companyStorage")) {
  //     const data = JSON.parse(localStorage.getItem(keys));
  //     companyStorage.push(data);
  //   }
  // }

  const dataHistory = [
    {
      name: "Created By",
      selector: (row) => row.created_by?.name,
      width: "120px",
    },
    {
      name: "Mention to",
      selector: (row) =>
        row.mention?.map((data) => data.mention_user?.name).join(", "),
      wrap: true,
      format: (row) =>
        row.mention?.map((data) => data.mention_user?.name).join(", ") || "-",
    },
    {
      name: "Note",
      selector: (row) => (
        <div
          className="mt-2"
          style={{ whiteSpace: "normal", fontSize: "0.85rem" }}
        >
          <p dangerouslySetInnerHTML={{ __html: row?.note }} />
        </div>
      ),
      wrap: true,
      width: "200px",
    },
    {
      name: "File",
      selector: (row) => (
        <div>
          {row.files ? (
            <a
              className="text-decoration-none"
              href={`${process.env.REACT_APP_BACKEND_IMAGE}/storage/file/deals/${row.files?.file}`}
              style={{ whiteSpace: "normal", fontSize: "0.75rem" }}
            >
              {row.files?.file}
            </a>
          ) : (
            "-"
          )}
        </div>
      ),
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

  const paginationComponentOptions = {
    selectAllRowsItem: true,
    selectAllRowsItemText: "ALL",
  };

  const handleCheckboxChange = (stageObject) => {
      setSelectedPipeline(stageObject.uid);
  };

  const HppUploadModal = ({ show, onClose, onFileSelect, onSubmit }) => {
    return (
        <Modal show={show} onHide={onClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Upload HPP File</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>To move this deal to "Closed Won", you must upload the HPP file.</p>
                <Form.Group controlId="hppFile">
                    <Form.Label><span className="text-danger">*</span> HPP File (PDF, XLSX, DOC)</Form.Label>
                    <Form.Control 
                        type="file" 
                        accept=".pdf,.xlsx,.xls,.doc,.docx"
                        onChange={(e) => onFileSelect(e.target.files[0])}
                        required
                    />
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>
                    Cancel
                </Button>
                <Button variant="primary" onClick={onSubmit}>
                    Confirm & Save Deal
                </Button>
            </Modal.Footer>
        </Modal>
    );
  };

  console.log("LIVE STATE of products:", products);

  const handleSubmit = (e) => {
        console.log("STALE STATE in handleSubmit:", products);

    e.preventDefault();
    const userPosition = localStorage.getItem('position_name');
    const isSalesManager = userPosition?.toLowerCase() === 'sales manager';

    const currentSelectedStage = pipeline.find(p => p.uid === selectedPipeline);
    const selectedStageName = currentSelectedStage?.name;

    if (isSalesManager && selectedStageName === 'Closed Won' && !hppFile) {
        setShowHppModal(true); 
        return;
    }

    const formData = new FormData();
    formData.append("_method", "put");

    formData.append("deal_name", valueDeals.deal_name);
    formData.append("deal_size", valueDeals.deal_size);
    if (valueDeals.priority_uid) {
        formData.append("priority_uid", valueDeals.priority_uid);
    }
    formData.append("deal_status", valueDeals.deal_status);
    formData.append("deal_category", valueDeals.deal_category);
    formData.append("project_category_uid", valueDeals.project_category_uid || "");

    formData.append("staging_uid", selectedPipeline ?? "");
    formData.append("company_uid", valueDeals.company_uid || "");
    formData.append("owner_user_uid", valueDeals.owner_user_uid);
    formData.append("file", selectFile || "");

    if (hppFile) {
        formData.append("hpp_file", hppFile);
    }


    if (valueDeals.planned_implementation_date) {
        const date = new Date(valueDeals.planned_implementation_date);
        const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
        formData.append("planned_implementation_date", formattedDate);
    }

    if (valueDeals.next_project_date) {
        const date = new Date(valueDeals.next_project_date);
        const formattedDate = `${date.getFullYear()}-${String(
            date.getMonth() + 1
        ).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
        formData.append("next_project_date", formattedDate);
    }

    mentionUsers.forEach((ment, index) => {
      formData.append(`mention_user[${index}]`, ment);
    });
    combineCont.forEach((com, index) => {
      formData.append(`contact_person[${index}]`, com);
    });

   const productsFromStorage = JSON.parse(localStorage.getItem("DataProduct") || "[]");


   if (productsFromStorage.length > 0) {
     productsFromStorage.forEach((product, index) => {
      formData.append(`products[${index}][product_uid]`, product.product_uid || "");
      formData.append(`products[${index}][product_name]`, product.product_name || "");
      formData.append(`products[${index}][price]`, product.price || 0);

      formData.append(`products[${index}][qty]`, product.qty || 1);
      formData.append(`products[${index}][discount_type]`, product.discount_type || "none");
      formData.append(`products[${index}][discount]`, product.discount || 0);
      formData.append(`products[${index}][total_price]`, product.total_price || 0);
     });
   }



    formData.append("notes", valueDeals.notes ? valueDeals.notes : "");

      console.log("--- FORM DATA SENT TO BACKEND ---");
      for (const pair of formData.entries()) {
        console.log(pair[0] + ": " + pair[1]);
      }

    // for (const pair of formData.entries()) {
    //   console.log(pair[0] + ": " + pair[1]);
    // }
    setButtonDisabled(true);
    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/deals/${uid} `, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        Swal.fire({
          title: res.data.message,
          text: "Successfully updated deals",
          icon: "success",
        }).then((res) => {
          if (res.isConfirmed) {
            localStorage.removeItem("DataProduct");
            window.location.reload();
          }
        });
      })
      .catch((err) => {
        // console.log(err);
        if (err.response) {
          Swal.fire({
            text: err.response.data.message,
            icon: "warning",
          });
        }
      });
  };

  const currentSelectedStage = pipeline.find(p => p.uid === selectedPipeline);
  // console.log("Current HPP File:", hppFile);
  console.log("Company from localStorage:", companyStorage);
  console.log("Company from state:", company);
  console.log("Contact from state:", contact);
  console.log("Contact from localStorage:", contactLocalStorage);

  return (
    <body id="body">
      <Topbar />
      <Sidebar />
      <Main>
        <div className="container">
          <div className="row">
            <div className="col">
              <div className="pagetitle">
                <h1>Edit Deals</h1>
                <nav>
                  <ol className="breadcrumb mt-2">
                    <li className="breadcrumb-item">
                      <Link to="/" className="text-decoration-none">
                        Dashboard
                      </Link>
                    </li>
                    <li className="breadcrumb-item">
                      <a href="/deals" className="text-decoration-none">
                        Deals
                      </a>
                    </li>
                    <li className="breadcrumb-item active">Edit Deals</li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
          <form className="row" onSubmit={handleSubmit}>
            <div className="col-md-12">
              <div className="float-end mt-2 mb-2">
                <a href="/#" className="btn btn-primary me-2">
                  Documents
                </a>
                <a
                  href={`/deals/${uid}/accounting`}
                  className="btn btn-info text-light me-2"
                >
                  Accounting
                </a>
                <button
                  className="btn btn-primary me-2"
                  type="submit"
                  disabled={isButtonDisabled}
                >
                  Save Changes
                </button>
                <a
                  href="/company"
                  className="btn btn-secondary text-decoration-none me-2"
                >
                  Cancel
                </a>
                {/* <a className="btn btn-danger text-decoration-none">Delete</a> */}
              </div>
            </div>
            <div className="col-md-12">
              <Card>
                <Card.Header>
                  <h5 className="mt-2">
                    <i className="bi bi-caret-right-square-fill fs-4"></i>
                    <span className="ms-2 fs-5 fw-semibold mt-5">Pipeline</span>
                  </h5>
                </Card.Header>
                <Card.Body>
                  <div className="mb-3 ms-1">
                    <span>
                      Stage before in :
                      <i className="fw-semibold fs-6 ms-2">{stageOld?.name}</i>
                    </span>
                  </div>
                  {pipeline.map((data) => {
                   
                    return (
                        <div className="form-check form-check-inline ms-3" key={data.uid}>
                            <input
                                type="radio"
                                name="pipeline"
                                className="form-check-input me-2"
                                value={data.uid}
                                checked={data.uid === selectedPipeline} 
                                onChange={() => handleCheckboxChange(data)} 
                                style={{
                                    width: "15px",
                                    height: "15px",
                                    borderColor: "#012970",
                                    boxShadow: "0 2 5px rgba(0, 0, 0, 0.3)",
                                }}
                            />
                            <label
                                className="form-check-label mt-1"
                                style={{ fontWeight: 400, fontSize: "0.75rem" }}
                            >
                                {data.name}
                            </label>
                        </div>
                    );
                  })}
                </Card.Body>
              </Card>
            </div>
            <div className="col-md-4">
              <Card className="shadow mb-4">
                <Card.Header>
                  <h5 className="mt-2">
                    <FontAwesomeIcon
                      icon={faSackDollar}
                      className="fs-5 me-1"
                    />
                    <span className="ms-2 fs-5 fw-semibold mt-5">Deals</span>
                  </h5>
                </Card.Header>
                <Card.Body>
                  <FloatingLabel
                    label={
                      <span>
                        Deal Name
                        <span style={{ color: "red" }} className="fs-6">
                          *
                        </span>
                      </span>
                    }
                    className="mb-3"
                  >
                    <Form.Control
                      type="text"
                      value={valueDeals.deal_name}
                      onChange={handleChange}
                      name="deal_name"
                      placeholder="text"
                      required
                    />
                  </FloatingLabel>
                  <FloatingLabel
                    label={<span>Deal Size</span>}
                    className="mb-3"
                  >
                    <Form.Control
                      type="number"
                      name="deal_size"
                      value={valueDeals.deal_size}
                      onChange={handlePrice}
                      placeholder="text"
                    />
                  </FloatingLabel>
                  <FloatingLabel label="Deal Status" className="mb-3">
                    <Form.Control
                      type="text"
                      value={
                        valueDeals.deal_status === "null"
                          ? ""
                          : valueDeals.deal_status
                      }
                      onChange={handleChange}
                      name="deal_status"
                      placeholder="text"
                    />
                  </FloatingLabel>
                  <Form.Group className="mb-3">
                    <Form.Label>
                      Owner
                      <span style={{ color: "red" }} className="fs-6">
                        *
                      </span>
                    </Form.Label>
                    <Select
                      required
                      options={selectOwner()}
                      value={selectOwner().find(
                        (e) => e.value === valueDeals.owner_user_uid
                      )}
                      onChange={(selected) =>
                        setValueDeals({
                          ...valueDeals,
                          owner_user_uid: selected.value,
                        })
                      }
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Priority</Form.Label>
                    <Select
                      options={selectPriority()}
                      value={selectPriority().find(
                        (e) => e.value === valueDeals.priority_uid
                      )}
                      onChange={(e) =>
                        setValueDeals({
                          ...valueDeals,
                          priority_uid: e.value,
                        })
                      }
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Deal Category</Form.Label>
                    <Select
                      options={selectDealCategory()}
                      value={selectDealCategory().find(
                        (e) => e.value === valueDeals.deal_category_uid
                      )}
                      onChange={(e) =>
                        setValueDeals({
                          ...valueDeals,
                          deal_category_uid: e.value,
                        })
                      }
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                      <Form.Label>Project Category</Form.Label>
                      <CreatableSelect
                          isClearable
                          options={projectCategorySelectOptions()}
                          // Mencari dan menampilkan nilai yang sudah tersimpan di state
                          value={projectCategorySelectOptions().find(c => c.value === valueDeals.project_category_uid)}
                          onChange={handleInputProjectCategory}
                          placeholder="Select or create a project category..."
                      />
                  </Form.Group>
                  {
                    currentSelectedStage?.name === 'Approaching' && (
                      <>
                      <Form.Group>
                          <Form.Label>
                              <span className="text-danger">*</span> Planned Implementation Date
                          </Form.Label>
                          <DatePicker
                              selected={valueDeals.planned_implementation_date}
                              onChange={(date) => setValueDeals({ ...valueDeals, planned_implementation_date: date })}
                              className="form-control"
                              dateFormat="dd/MM/yyyy"
                              placeholderText="Select a date"
                              required
                          />
                      </Form.Group>
                      </>
                    )
                  }

                  <Form.Group as={Col} md={6} className="mb-3">
                      <Form.Label>Next Project Date</Form.Label>
                      <DatePicker
                          selected={valueDeals.next_project_date}
                          onChange={(date) => handleDateChange(date, 'next_project_date')}
                          className="form-control"
                          dateFormat="dd/MM/yyyy"
                          placeholderText="Optional: Set a follow-up date"
                          isClearable
                      />
                  </Form.Group>
                </Card.Body>
              </Card>
              
              <Card className="shadow mb-4">
                <Card.Header>
                  <h5 className="mt-2">
                    <i className="bi bi-building  fs-4"></i>
                    <span className="ms-2 fs-5 fw-semibold mt-5">
                      Companies
                    </span>
                  </h5>
                </Card.Header>
                <Card.Body>
                  <div>
                    {companyStorage &&
                      Array.isArray(companyStorage) &&
                      companyStorage.length > 0 ? (
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
                                    {companyStorage[0]?.name ?? "-"}
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
                                    {companyStorage[0]?.company_type?.name ??
                                      "-"}
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
                                    {companyStorage[0]?.phone?.[0]?.number ??
                                      "-"}
                                  </strong>
                                </p>
                              </Col>
                              <Col md={2} sm={2} style={{ marginTop: "-12px" }}>
                                <a
                                  onClick={() =>
                                    handleDeleteCompany(companyStorage[0].uid)
                                  }
                                  className="ms-1"
                                  style={{
                                    cursor: "pointer",
                                  }}
                                >
                                  <i className="bi bi-x fs-5 text-danger"></i>
                                </a>
                              </Col>
                            </div>
                          </div>
                        </div>
                      </Card>
                    ) : (
                      <Select
                        options={selectCompany()}
                        onChange={(e) =>
                          setValueDeals({
                            ...valueDeals,
                            company_uid: e.value,
                          })
                        }
                        placeholder="Companies Select"
                      />
                    )}
                  </div>
                  <div className="mt-3 text-center">
                    <a
                      className="fw-semibold fs-6"
                      style={{
                        cursor: "pointer",
                      }}
                    >
                      Or Create Company
                    </a>
                  </div>
                </Card.Body>
              </Card>


              <Card className="shadow">
                <Card.Header>
                  <h5 className="mt-2">
                    <i className="bi bi-person-circle fs-4"></i>
                    <span className="ms-2 fs-5 fw-semibold mt-5">Contact</span>
                  </h5>
                </Card.Header>
                <Card.Body>
                  <div>
                    {contactLocalStorage?.map((data, index) => (
                      <Card className="shadow p-2">
                        <div className="row d-flex">
                          <>
                            <Col md={10} sm={10} key={index}>
                              <div className="d-flex">
                                <img
                                  src={IconPerson}
                                  className="ms-1 me-3 mt-3"
                                  alt={IconPerson}
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
                                    Name :
                                    <strong className="ms-2">
                                      {data.contact?.name ?? null}
                                    </strong>
                                  </p>
                                  <p
                                    className="ms-1"
                                    style={{
                                      fontSize: "10px",
                                      marginTop: "-8px",
                                    }}
                                  >
                                    Email :
                                    <strong className="ms-2">
                                      {data.contact?.email ?? "-"}
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
                                    No.Telp :
                                    <strong className="ms-1">
                                      {data.contact?.phone?.[0]?.number || "-"}
                                    </strong>
                                  </p>
                                </Col>
                              </div>
                            </Col>
                            <Col md={2} sm={2} style={{ marginTop: "-8px" }}>
                              <a
                                onClick={() => handleDeleteContact(data.uid)}
                                className="ms-1"
                                style={{
                                  cursor: "pointer",
                                }}
                              >
                                <i className="bi bi-x fs-5 text-danger"></i>
                              </a>
                            </Col>
                          </>
                        </div>
                      </Card>
                    ))}
                    <Select
                      options={selectContact()}
                      onChange={(e) => handleResContact(e)}
                      placeholder="Select Contact"
                      isMulti
                    />
                  </div>
                  <div>
                    <div className="mt-3 text-center">
                      <a
                        className="fw-semibold fs-6"
                        style={{
                          cursor: "pointer",
                        }}
                      >
                        Or Create Contact
                      </a>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </div>
            <div className="col-md-8">
              <Card className="shadow">
                <Card.Header>
                  <h5 className="mt-2">
                    <i className="bi bi-box-seam-fill fs-4"></i>
                    <span className="ms-2 fs-5 fw-semibold mt-5">Product</span>
                  </h5>
                </Card.Header>
                <Card.Body>
                  <div>
                    <DataTable
                      data={products}
                      customStyles={customStyles}
                      columns={columns}
                    />
                  </div>
                  <div className="row">
                    <div className="mt-3 me-3">
                      <span
                        className="float-end"
                        style={{ fontWeight: 400, fontSize: "0.80rem" }}
                      >
                        Total Price Product:
                        <span className="ms-3 me-2" style={{ fontWeight: 600 }}>
                          Rp. {new Intl.NumberFormat().format(totalPrice)}
                        </span>
                      </span>
                    </div>
                  </div>
                  <div>
                    <div className="mt-3 text-center">
                      <a
                        onClick={handleShowProduct}
                        className="fw-semibold fs-6 btn btn-outline-primary"
                        style={{
                          cursor: "pointer",
                        }}
                      >
                        Add Product
                      </a>
                    </div>
                  </div>
                </Card.Body>
              </Card>
              <AddProductOverlay
                visible={showAddProduct}
                onClose={() => setShowAddProduct(false)}
                onProductsUpdated={handleProductsUpdate} // Prop baru yang didedikasikan untuk update
              />
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
                      handleChange({ target: { name: "notes", value } })
                    }
                  />
                  <Form.Group as={Row} xs={2} md={4} lg={6} className="p-2">
                    <Form.Label column lg={4} className="fw-semibold fs-6">
                      File :
                    </Form.Label>
                    <Col lg={8} style={{ marginLeft: "-5rem" }}>
                      <Form.Control
                        type="file"
                        name="file"
                        size="sm"
                        className="p-2"
                        onChange={handleFileChange}
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} xs={2} md={4} lg={6} className="p-2">
                    <Form.Label column lg={4} className="fw-semibold fs-6">
                      Mention Users :
                    </Form.Label>
                    <Col lg={8} style={{ marginLeft: "-5rem" }}>
                      <Select
                        options={selectOwner()}
                        isMulti
                        onChange={(e) => mantionUsersUid(e)}
                      />
                    </Col>
                  </Form.Group>
                </Card.Body>
              </Card>

              

              <Card className="shadow">
                <Card.Header>
                  <h6 className="fw-bold mt-2">History</h6>
                </Card.Header>
                <Card.Body>
                  <DataTable
                    columns={dataHistory}
                    data={history}
                    customStyles={customStyles}
                    defaultSortFieldId={1}
                    pagination
                    paginationComponentOptions={paginationComponentOptions}
                  />
                </Card.Body>
              </Card>
            </div>
          </form>
        </div>

      <HppUploadModal
          show={showHppModal}
          onClose={() => setShowHppModal(false)}
          onFileSelect={(file) => setHppFile(file)}
          onSubmit={() => {
              setShowHppModal(false);
              handleSubmit(new Event('submit'));
          }}
      />


      </Main>
    </body>
  );
};

export default EditDeals;
