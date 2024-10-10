import React, { useEffect } from 'react'
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
const AssignDealsSales = () => {
    const { listResultDataSelectDeals } = useSelector((state) => state.DataSelectDealsV2);

    // Function to generate options
    const SelectDealsOption = () => {
        const result = [];
        if (Array.isArray(listResultDataSelectDeals)) {
            listResultDataSelectDeals.map((data) => {
                const dataOption = {
                    value: data?.uid,
                    label: data?.uid
                };
                result.push(dataOption);
            });
        }
    
        return result;
    }
    
    
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(GetDataSelectDeals(token))
    }, [dispatch])
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
                                      <Form.Label className='fw-bold'>Select Deals</Form.Label>
                                      <Select options={SelectDealsOption()} isMulti />
                                </Form.Group>
                                </div>
                                <div className="col-md-6">
                                <Form.Group className="mb-3">
                                    <Form.Label className="fw-bold">Select Sales Ambasador</Form.Label>
                                    <Select />
                                </Form.Group>
                                </div>
                        </div>                      
                            <div className="mt-4">
                                <a href="/deals-second" className="btn btn-secondary me-4 shadow">
                                back
                                </a>
                                <button className="btn btn-primary shadow" type="submit">
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