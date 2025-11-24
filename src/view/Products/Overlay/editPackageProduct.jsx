// src/components/Overlay/editPackageProduct.jsx (Versi Refactor)

import React, { useEffect, useState } from "react";
import { Offcanvas, Form, Button, Table, Spinner, Card } from "react-bootstrap";
import Select from "react-select";
import axios from "axios";
import Swal from "sweetalert2";

// Impor fungsi API & hook debounce yang sudah ada
import { searchMasterProducts } from "../../services/productService"; 
import { useDebounce } from "../../hooks/useDebounce"; // Pastikan path ini benar

const EditPackageProduct = ({ visible, uid, onClose }) => {
  const token = localStorage.getItem("token");

  // === STATE UTAMA PAKET ===
  const [packageName, setPackageName] = useState('');
  const [packageDiscountType, setPackageDiscountType] = useState('');
  const [packageDiscount, setPackageDiscount] = useState(0);
  const [packageItems, setPackageItems] = useState([]); // Daftar produk dalam paket ini

  // === STATE UNTUK UI PENCARIAN PRODUK (LOGIKA YANG DIGUNAKAN KEMBALI) ===
  const [sourceType, setSourceType] = useState('master');
  const [crmProducts, setCrmProducts] = useState([]);
  
  const [masterCategory, setMasterCategory] = useState('');
  const [masterSearchTerm, setMasterSearchTerm] = useState('');
  const [masterSearchResults, setMasterSearchResults] = useState([]);
  const [isMasterLoading, setIsMasterLoading] = useState(false);
  const debouncedSearchTerm = useDebounce(masterSearchTerm, 400);

  // === DATA FETCHING (DETAIL PAKET & PRODUK CRM) ===
  useEffect(() => {
    if (visible && uid) {
      // 1. Ambil detail paket yang akan diedit
      axios.get(`${process.env.REACT_APP_BACKEND_URL}/packages-product/${uid}`, { headers: { Authorization: `Bearer ${token}` } })
        .then(res => {
          const packageData = res.data.data;
          setPackageName(packageData.name);
          setPackageDiscountType(packageData.discount_type);
          setPackageDiscount(packageData.discount);
          
          // Standarisasi item produk yang ada di dalam paket
          const initialItems = (packageData.package_detail_with_product || []).map(detail => ({
            uid: detail.product.uid,
            name: detail.product.name,
            price: detail.product.price,
          }));
          console.log("LANGKAH 2: Data awal 'packageItems' dari API:", initialItems); // <-- LOG 2
          setPackageItems(initialItems);
        })
        .catch(err => console.error("Failed to fetch package details", err));

      // 2. Ambil daftar produk single dari CRM untuk opsi penambahan
      axios.get(`${process.env.REACT_APP_BACKEND_URL}/products/form/select`, { headers: { Authorization: `Bearer ${token}` }})
        .then((res) => setCrmProducts(res.data.data))
        .catch((err) => console.error("Failed to fetch CRM products", err));
    }
  }, [visible, uid, token]);

  // === API CALL (MASTER PRODUCTS MCU) ===
  useEffect(() => {
    if (debouncedSearchTerm && masterCategory) {
      setIsMasterLoading(true);
      searchMasterProducts(masterCategory, debouncedSearchTerm)
        .then(results => setMasterSearchResults(results || []))
        .catch(err => setMasterSearchResults([]))
        .finally(() => setIsMasterLoading(false));
    } else {
      setMasterSearchResults([]);
    }
  }, [debouncedSearchTerm, masterCategory]);


  // === EVENT HANDLERS ===
  const handleAddItemToList = (product) => {
    if (packageItems.some(item => item.uid === product.uid)) {
      Swal.fire({ text: 'Product is already in the package.', icon: 'warning', timer: 1500, showConfirmButton: false });
      return;
    }
    const newItem = { uid: product.uid, name: product.name, price: product.price };
    setPackageItems(prevItems => [...prevItems, newItem]);
    setMasterSearchTerm('');
    setMasterSearchResults([]);
  };

  const handleCrmItemToList = (selectedOption) => {
     const product = crmProducts.find(p => p.uid === selectedOption.value);
     if(product) handleAddItemToList(product);
  };

  const handleRemoveItem = (uidToRemove) => {
    setPackageItems(prevItems => prevItems.filter(item => item.uid !== uidToRemove));
  };
  
  const handleUpdatePackage = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append('_method', 'PUT'); 
    formData.append('name', packageName);
    formData.append('discount_type', packageDiscountType);
    formData.append('discount', packageDiscount);
    
    packageItems.forEach((item, index) => {
        formData.append(`products[${index}][uid]`, item.uid);
        formData.append(`products[${index}][name]`, item.name);
        formData.append(`products[${index}][price]`, item.price);
    });

    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/packages-product/${uid}`, formData, { 
        headers: { Authorization: `Bearer ${token}` } 
      });
      Swal.fire({ title: 'Success!', text: response.data.message, icon: 'success' })
        .then(() => window.location.reload());
    } catch (error) {
      Swal.fire({ title: 'Error!', text: error.response?.data?.message || 'Failed to update package.', icon: 'error' });
    }
  };
  
  const crmProductOptions = crmProducts.map(p => ({ value: p.uid, label: p.name }));
  const masterCategories = [
    { value: 'checkups', label: 'Checkups' },
    { value: 'radiology_checkups', label: 'Radiology' },
    { value: 'pharmacy_checkups', label: 'Pharmacy' },
    { value: 'hemodialysis_checkups', label: 'Hemodialysis' },
    { value: 'medical_clinic_checkups', label: 'Medical Clinic' },
    { value: 'package_checkups', label: 'Package Checkups' },
    { value: 'general_practitioner_checkups', label: 'General Practitioner' },
    { value: 'vaccine_checkups', label: 'Vaccine' },
    { value: 'electromedicine_checkups', label: 'Electromedicine' },
  ];

  console.log("LANGKAH 3: State 'packageItems' saat ini:", packageItems); // <-- LOG 3

  return (
    <Offcanvas show={visible} onHide={onClose} placement="end" style={{ width: '600px' }}>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Edit Package Product</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Form onSubmit={handleUpdatePackage}>
          {/* === BAGIAN 1: INFO PAKET === */}
          <Card className="mb-4">
            <Card.Body>
              <Form.Group className="mb-3">
                <Form.Label className="fw-bold">Package Name <span className="text-danger">*</span></Form.Label>
                <Form.Control type="text" value={packageName} onChange={(e) => setPackageName(e.target.value)} required />
              </Form.Group>
              <div className="d-flex">
                <Form.Group className="me-2 flex-fill">
                  <Form.Label>Discount Type</Form.Label>
                  <Form.Select value={packageDiscountType} onChange={e => setPackageDiscountType(e.target.value)}>
                    <option value="">No Discount</option>
                    <option value="percent">Percent</option>
                    <option value="nominal">Nominal</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group className="flex-fill">
                  <Form.Label>Discount Value</Form.Label>
                  <Form.Control type="number" value={packageDiscount} onChange={e => setPackageDiscount(e.target.value)} disabled={!packageDiscountType} />
                </Form.Group>
              </div>
            </Card.Body>
          </Card>

          {/* === BAGIAN 2: DAFTAR ITEM YANG ADA DI PAKET === */}
          <Card className="mb-4">
            <Card.Header><h5 className="mb-0">Items in this Package</h5></Card.Header>
            <Card.Body>
              <Table striped size="sm">
                <tbody>
                  {packageItems.length > 0 ? (
                    packageItems.map(item => (
                      <tr key={item.uid}>
                        <td>{item.name}</td>
                        <td className="text-end" style={{ width: '120px' }}>
                          <Button variant="outline-danger" size="sm" onClick={() => handleRemoveItem(item.uid)}>Remove</Button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr><td className="text-center text-muted">No items added yet.</td></tr>
                  )}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
          
          {/* === BAGIAN 3: AREA PENAMBAH PRODUK (ADDER) === */}
          <Card>
            <Card.Header><h5 className="mb-0">Add a New Item</h5></Card.Header>
            <Card.Body>
              {/* ... UI pencarian yang sama persis seperti di AddPackageProduct ... */}
            </Card.Body>
          </Card>
          
          {/* === TOMBOL SAVE UTAMA === */}
          <div className="mt-4">
            <Button type="submit" variant="primary" disabled={!packageName || packageItems.length === 0}>
              Save Changes
            </Button>
            <Button variant="secondary" className="ms-2" onClick={onClose}>
              Cancel
            </Button>
          </div>
        </Form>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default EditPackageProduct;