import React from 'react'
import Topbar from '../../../components/Template/Topbar'
import Sidebar from '../../../components/Template/Sidebar'
import Main from '../../../components/Template/Main'
import Breadcrumb from './Part/Breadcrumb'
import TopButton from './Part/TopButton'
import { Card } from 'react-bootstrap'
import Datatable from './Part/Datatable'

const index = () => {
  return (
<div id='body'>
        <Topbar />
        <Sidebar />
        <Main>
            <div className="container">
                <Breadcrumb />
                <TopButton />
                <Card className='shadow'>
                    <div className="row">
                        <div className="col-md mt-2">
                            <Datatable />
            
                        </div>
                    </div>
                </Card>
            </div>
            
        </Main>
    </div>
  )
}

export default index