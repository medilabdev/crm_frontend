import React, { useEffect, useState } from 'react'
import Topbar from '../../../components/Template/Topbar'
import Sidebar from '../../../components/Template/Sidebar'
import Main from '../../../components/Template/Main'
import { Link } from 'react-router-dom'
import { Card, Form } from 'react-bootstrap'
import Select from "react-select";
import { GetDataSelectDeals } from '../../../action/DataDeals'
import { useDispatch } from 'react-redux'
import { token } from '../partials/ColumnsTable'
import { useSelector } from 'react-redux'
import { getListOwner } from '../../../action/FormOwner'
import Swal from 'sweetalert2'
import axios from 'axios'
import { getListAmbasador } from '../../../action/GetAmbasadorUser'
const AssignDealsSales = () => {
    const { listResultDataSelectDeals } = useSelector((state) => state.DataSelectDealsV2);
    const { dataAmbasador } = useSelector((state) => state.SelectAmbasador)
    const [inputDeals, setInputDeals] = useState({})
    const [inputUser, setInputUser] = useState({})
    const handleInputDeals = (e) => {
        setInputDeals(e.map((option) => option.value))
    }
    
    const handleInputUser = (e) => {
        setInputUser(e.map((option) => option.value))
    }
    
    // Function to generate options
    const SelectDealsOption = () => {
        const result = [];
        if (Array.isArray(listResultDataSelectDeals)) {
            listResultDataSelectDeals.map((data) => {
                const dataOption = {
                    value: data?.uid,
                    label: data?.company?.name
                };
                result.push(dataOption);
            });
        }
    
        return result;
    }
    const SelectUserOption = () => {
        const result = [];
        if (Array.isArray(dataAmbasador)) {
            dataAmbasador.map((data) => {
                const dataOption = {
                    value: data?.uid,
                    label: data?.name
                };
                result.push(dataOption);
            });
        }
    
        return result;
    }
    
    
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(GetDataSelectDeals(token))
        dispatch(getListAmbasador(token))
    }, [dispatch])


    const handleSubmit = async(e) => {
        e.preventDefault()
   
            
            const formData = new FormData()


            inputDeals?.forEach((data, index) => {
                formData.append(`assign[${index}][deals_uid]`, data)
            });
            inputUser?.forEach((data, index) => {
                formData.append(`assign[${index}][user_uid]`, data)
            })
             for (const pair of formData.entries()) {
            console.log(pair[0] + ": " + pair[1]);
            }
    try {
        const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/v2/assign/sales-ambassador`, formData, 
            {
                headers:{
                    Authorization: `Bearer ${token}`
                }
            }
        )
        Swal.fire({
            title: response.data.message,
            text: "Successfully Assign Deals",
            icon: "success",
          });
          window.location.reload();
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
    }
  
      
      
      
  return (
    <div id='body'>
        <Topbar />
        <Sidebar />
        <Main>
            <div className="pagetitle">
                <h1>Assign Deals</h1>
                <nav>
                    <ol className="breadcrumb mt-2">
                        <li className="breadcrumb-item">
                        <Link to="/" className="text-decoration-none">
                            Dashboard
                        </Link>
                        </li>
                        <li className="breadcrumb-item">
                            <Link to="/deals-second" className="text-decoration-none">
                            Deals
                            </Link>
                        </li>
                        <li className="breadcrumb-item active">Assign Deals to Sales Ambasador</li>
                    </ol>
                </nav>
            </div>
            <Card className="mt-5 shadow">
                <Card.Body>
                    <form action='' onSubmit="">
                        <div className="row">
                                <div className="col-md-6">
                                <Form.Group className='mb-3 '>
                                      <Form.Label>Select Deals</Form.Label>
                                      <Select options={SelectDealsOption()} isMulti onChange={(e) => handleInputDeals(e)} />
                                </Form.Group>
                                </div>
                                <div className="col-md-6">
                                <Form.Group className="mb-3">
                                    <Form.Label>Select Sales Ambasador</Form.Label>
                                    <Select options={SelectUserOption()} isMulti onChange={(e) => handleInputUser(e)}/>
                                </Form.Group>
                                </div>
                        </div>                      
                            <div className="mt-2">
                                <a href="/deals-second" className="btn btn-secondary me-4 shadow">
                                back
                                </a>
                                <button className="btn btn-primary shadow" onClick={handleSubmit}>
                                Save
                                </button>
                            </div>
                    </form>
                </Card.Body>
            </Card>
        </Main>
    </div>
  )
}

export default AssignDealsSales