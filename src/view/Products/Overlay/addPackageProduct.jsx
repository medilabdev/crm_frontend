// src/components/Overlay/addPackageProduct.jsx (Versi Refactor)

import React, { useEffect, useState } from "react";
import { Offcanvas, Form, Button, Table, Spinner, Card } from "react-bootstrap";
import Select from "react-select";
import axios from "axios";
import Swal from "sweetalert2";

// Impor fungsi API & hook debounce yang sudah ada
import { searchMasterProducts } from "../../../services/productService.js"; 
import { useDebounce } from "../../../hooks/useDebounce.js"; // Pastikan path ini benar

const AddPackageProduct = ({ visible, onClose }) => {
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

  // === DATA FETCHING (HANYA PRODUK SINGLE DARI CRM) ===
  useEffect(() => {
    if (visible) {
      axios.get(`${process.env.REACT_APP_BACKEND_URL}/products/form/select`, { headers: { Authorization: `Bearer ${token}` }})
        .then((res) => setCrmProducts(res.data.data))
        .catch((err) => console.error("Failed to fetch CRM products", err));
    }
  }, [visible, token]);

  // === API CALL (MASTER PRODUCTS MCU) ===
// useEffect untuk API Call (MASTER PRODUCTS MCU) - VERSI BARU

  useEffect(() => {
    // --- INI PERBAIKANNYA ---
    // Panggil API jika kategori SUDAH DIPILIH, tidak peduli ada search term atau tidak.
    if (masterCategory) {
      setIsMasterLoading(true);
      // debouncedSearchTerm bisa berisi string (untuk filter) atau string kosong (untuk list awal)
      searchMasterProducts(masterCategory, debouncedSearchTerm)
        .then(results => {
          setMasterSearchResults(results || []);
        })
        .catch(err => {
          console.error("API call failed:", err);
        })
        .finally(() => {
          setIsMasterLoading(false);
        });
    } else {
      // Jika kategori belum dipilih, pastikan hasilnya kosong.
      setMasterSearchResults([]);
    }
    // Effect ini akan berjalan setiap kali kategori ATAU search term berubah.
  }, [masterCategory, debouncedSearchTerm]);

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
  
  const handleSavePackage = async (e) => {
      e.preventDefault();

      const formData = new FormData();
      formData.append('name', packageName);
      formData.append('discount_type', packageDiscountType);
      formData.append('discount', packageDiscount);

      // --- INI PERBAIKANNYA ---
      // Kirim seluruh detail item, bukan hanya UID
      packageItems.forEach((item, index) => {
          formData.append(`products[${index}][uid]`, item.uid);
          formData.append(`products[${index}][name]`, item.name);
          formData.append(`products[${index}][price]`, item.price);
      });

      try {
        const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/packages-product`, formData, { 
          headers: { Authorization: `Bearer ${token}` } 
        });
        Swal.fire({ title: 'Success!', text: response.data.message, icon: 'success' })
          .then(() => window.location.reload());
      } catch (error) {
        Swal.fire({ title: 'Error!', text: error.response?.data?.message || 'Failed to save package.', icon: 'error' });
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

  return (
    <Offcanvas show={visible} onHide={onClose} placement="end" style={{ width: '600px' }}>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Add Package Product</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Form onSubmit={handleSavePackage}>
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

          {/* === BAGIAN 2: DAFTAR ITEM YANG DIPILIH === */}
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
            <Card.Header><h5 className="mb-0">Add an Item</h5></Card.Header>
            <Card.Body>
              <Form.Group className="mb-3">
                <Form.Label>Product Source</Form.Label>
                <Form.Select value={sourceType} onChange={e => setSourceType(e.target.value)}>
                  <option value="master">Product Master (MCU)</option>
                  <option value="crm_single">Single Product (CRM)</option>
                </Form.Select>
              </Form.Group>

              {sourceType === 'master' && (
                <>
                  <Form.Group className="mb-3">
                    <Form.Label>Category</Form.Label>
                    <Form.Select value={masterCategory} onChange={e => setMasterCategory(e.target.value)}>
                      <option value="">-- Select Category --</option>
                      {masterCategories.map(cat => <option key={cat.value} value={cat.value}>{cat.label}</option>)}
                    </Form.Select>
                  </Form.Group>
                  {masterCategory && (
                    <div className="search-container">
                      <Form.Label>Search Product</Form.Label>
                      <Form.Control type="text" placeholder="Type to search..." value={masterSearchTerm} onChange={e => setMasterSearchTerm(e.target.value)} />
                      {isMasterLoading && <Spinner animation="border" size="sm" className="search-spinner" />}
                      {!isMasterLoading && masterSearchResults.length > 0 && (
                        <ul className="list-group search-results mt-1">
                          {masterSearchResults.map(product => (
                            <li key={product.uid} className="list-group-item list-group-item-action" onClick={() => handleAddItemToList(product)}>
                              {product.name}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  )}
                </>
              )}

              {sourceType === 'crm_single' && (
                <Form.Group>
                  <Form.Label>Select Product from CRM</Form.Label>
                  <Select options={crmProductOptions} onChange={handleCrmItemToList} />
                </Form.Group>
              )}
            </Card.Body>
          </Card>
          
          {/* === TOMBOL SAVE UTAMA === */}
          <div className="mt-4">
            <Button type="submit" variant="primary" disabled={!packageName || packageItems.length === 0}>
              Save Package
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

export default AddPackageProduct;