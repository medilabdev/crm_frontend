// src/components/Overlay/addProduct.jsx

import axios from "axios";
import React, { useEffect, useState } from "react";
import { Form, Offcanvas, Spinner } from "react-bootstrap";
import Select from "react-select";
import { searchMasterProducts } from "../../services/productService";
import "./style.css";

// Custom hook untuk debouncing (mencegah API call di setiap ketikan)
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debouncedValue;
}

const AddProductOverlay = ({ visible, onClose, onProductsUpdated }) => {
  const token = localStorage.getItem("token");

  // === DATA LISTS (DARI API) ===
  const [crmProducts, setCrmProducts] = useState([]);
  const [crmPackages, setCrmPackages] = useState([]);

  // === UI CONTROL STATE ===
  const [sourceType, setSourceType] = useState("master"); // 'master', 'crm_single', 'crm_package'

  // === MASTER PRODUCT (MCU) SEARCH STATE ===
  const [masterCategory, setMasterCategory] = useState("");
  const [masterSearchTerm, setMasterSearchTerm] = useState("");
  const [masterSearchResults, setMasterSearchResults] = useState([]);
  const [isMasterLoading, setIsMasterLoading] = useState(false);
  const debouncedSearchTerm = useDebounce(masterSearchTerm, 400);

  // === UNIFIED STATE FOR THE CURRENTLY EDITED ITEM ===
  const initialItemState = {
    uid: null,
    name: "",
    price: 0,
    qty: 1,
    discount_type: "percent",
    discount: 0,
    total_price: 0,
  };
  const [currentItem, setCurrentItem] = useState(initialItemState);

  // === DATA FETCHING (CRM PRODUCTS) ===
  useEffect(() => {
    if (visible) {
      axios.get(`${process.env.REACT_APP_BACKEND_URL}/products/form/select`, { headers: { Authorization: `Bearer ${token}` }})
        .then((res) => setCrmProducts(res.data.data))
        .catch((err) => console.error("Failed to fetch CRM products", err));

      axios.get(`${process.env.REACT_APP_BACKEND_URL}/packages-product/form/select`, { headers: { Authorization: `Bearer ${token}` }})
        .then((res) => setCrmPackages(res.data.data))
        .catch((err) => console.error("Failed to fetch CRM packages", err));
    }
  }, [visible, token]);

  // === API CALL (MASTER PRODUCTS MCU) ===
    useEffect(() => {
    if (masterCategory) {
      setIsMasterLoading(true);
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
      setMasterSearchResults([]);
    }
  }, [masterCategory, debouncedSearchTerm]);


  // === TOTAL PRICE CALCULATION ===
  useEffect(() => {
    const { price, qty, discount_type, discount } = currentItem;
    let finalPrice = parseFloat(price || 0) * parseInt(qty || 1, 10);
    if (discount_type === 'percent') {
      finalPrice -= (finalPrice * parseFloat(discount || 0)) / 100;
    } else if (discount_type === 'nominal') {
      finalPrice -= parseFloat(discount || 0);
    }
    setCurrentItem(prev => ({ ...prev, total_price: finalPrice }));
  }, [currentItem.price, currentItem.qty, currentItem.discount_type, currentItem.discount]);

  // === EVENT HANDLERS ===
  const handleSourceTypeChange = (e) => {
    setSourceType(e.target.value);
    setCurrentItem(initialItemState); // Reset item saat ganti sumber
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentItem(prev => ({ ...prev, [name]: value }));
  };
  
  const handleCrmSelect = (selectedOption, type) => {
    const sourceData = type === 'crm_single' ? crmProducts : crmPackages;
    const item = sourceData.find(p => p.uid === selectedOption.value);
    if (item) {
      const price = type === 'crm_single' ? item.price : item.total_price;
      setCurrentItem({ ...initialItemState, uid: item.uid, name: item.name, price: price });
    }
  };
  
  const handleMasterSelect = (product) => {
    setCurrentItem({ ...initialItemState, uid: product.uid, name: product.name, price: product.price });
    setMasterSearchResults([]);
    setMasterSearchTerm(product.name);
  };

  const handleSaveProduct = (e) => {
    e.preventDefault();
    const existingProducts = JSON.parse(localStorage.getItem("DataProduct") || "[]");
    const newProduct = {
      id: `${sourceType}-${currentItem.uid}-${Date.now()}`,
      product_uid: currentItem.uid,
      product_name: currentItem.name,
      qty: currentItem.qty,
      discount_type: currentItem.discount_type,
      discount: currentItem.discount,
      total_price: currentItem.total_price,
    };
    localStorage.setItem("DataProduct", JSON.stringify([...existingProducts, newProduct]));
    if (onProductsUpdated) {
      onProductsUpdated(); // Beri tahu Parent untuk update state-nya
    }
    
    // Reset state & tutup
    setCurrentItem(initialItemState);
    setSourceType('master');
    setMasterCategory('');
    setMasterSearchTerm('');
    onClose();
  };
  
  // === OPTIONS FOR SELECTS ===
  const crmProductOptions = crmProducts.map(p => ({ value: p.uid, label: p.name }));
  const crmPackageOptions = crmPackages.map(p => ({ value: p.uid, label: p.name }));
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

  // ==========================
  // === RENDER JSX SECTION ===
  // ==========================
  return (
    <Offcanvas show={visible} onHide={onClose} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Add Product</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Form onSubmit={handleSaveProduct}>
          {/* 1. SELECT PRODUCT SOURCE */}
          <Form.Group className="mb-3">
            <Form.Label className="fw-bold">Product Source</Form.Label>
            <Form.Select value={sourceType} onChange={handleSourceTypeChange}>
              <option value="master">Product Master (MCU)</option>
              <option value="crm_single">Single Product (CRM)</option>
              <option value="crm_package">Package Product (CRM)</option>
            </Form.Select>
          </Form.Group>

          <hr />

          {/* 2. DYNAMIC FORM BASED ON SOURCE */}
          {sourceType === 'master' && (
            <>
              <Form.Group className="mb-3">
                <Form.Label>Category</Form.Label>
                <Form.Select value={masterCategory} onChange={e => setMasterCategory(e.target.value)}>
                  <option value="">-- Select Category --</option>
                  {masterCategories.map(cat => (
                    <option key={cat.value} value={cat.value}>{cat.label}</option>
                  ))}
                </Form.Select>
              </Form.Group>
              
              {masterCategory && (
                <div className="search-container mb-3">
                  <Form.Label>Search Product</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Type to search..."
                    value={masterSearchTerm}
                    onChange={e => setMasterSearchTerm(e.target.value)}
                  />
                  {isMasterLoading && <Spinner animation="border" size="sm" className="search-spinner" />}
                  {!isMasterLoading && masterSearchResults.length > 0 && (
                    <ul className="list-group search-results">
                      {masterSearchResults.map(product => (
                        <li key={product.uid} className="list-group-item list-group-item-action" onClick={() => handleMasterSelect(product)}>
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
            <Form.Group className="mb-3">
              <Form.Label>Select Product</Form.Label>
              <Select options={crmProductOptions} onChange={(opt) => handleCrmSelect(opt, 'crm_single')} />
            </Form.Group>
          )}

          {sourceType === 'crm_package' && (
            <Form.Group className="mb-3">
              <Form.Label>Select Package</Form.Label>
              <Select options={crmPackageOptions} onChange={(opt) => handleCrmSelect(opt, 'crm_package')} />
            </Form.Group>
          )}

          {/* 3. COMMON FIELDS FOR PRICE & DISCOUNT (MUNCUL JIKA PRODUK SUDAH TERPILIH) */}
          {currentItem.uid && (
            <>
              <hr />
              <Form.Group className="mb-3">
                <Form.Label>Product Name</Form.Label>
                <Form.Control type="text" value={currentItem.name} readOnly disabled />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Price</Form.Label>
                <div className="input-group">
                  <span className="input-group-text">Rp.</span>
                  <Form.Control type="number" name="price" value={currentItem.price} onChange={handleInputChange} />
                </div>
              </Form.Group>
              <div className="d-flex mb-3">
                <Form.Group className="me-3" style={{flex: 1}}>
                  <Form.Label>Quantity</Form.Label>
                  <Form.Control type="number" name="qty" value={currentItem.qty} onChange={handleInputChange} />
                </Form.Group>
                <Form.Group style={{flex: 2}}>
                  <Form.Label>Discount Type</Form.Label>
                  <Form.Select name="discount_type" value={currentItem.discount_type} onChange={handleInputChange}>
                    <option value="percent">Percent (%)</option>
                    <option value="nominal">Nominal (Rp)</option>
                  </Form.Select>
                </Form.Group>
              </div>
              <Form.Group className="mb-3">
                <Form.Label>Discount Value</Form.Label>
                <div className="input-group">
                  <span className="input-group-text">{currentItem.discount_type === 'percent' ? '%' : 'Rp.'}</span>
                  <Form.Control type="number" name="discount" value={currentItem.discount} onChange={handleInputChange} />
                </div>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label className="fw-bold">Total Price</Form.Label>
                <div className="input-group">
                  <span className="input-group-text">Rp.</span>
                  <Form.Control type="text" value={new Intl.NumberFormat().format(currentItem.total_price)} readOnly disabled />
                </div>
              </Form.Group>
            </>
          )}

          {/* 4. SAVE BUTTON */}
          <div className="mt-4">
            <button type="submit" className="btn btn-primary" disabled={!currentItem.uid}>Save</button>
            <button type="button" className="btn btn-secondary ms-2" onClick={onClose}>Cancel</button>
          </div>
        </Form>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default AddProductOverlay;