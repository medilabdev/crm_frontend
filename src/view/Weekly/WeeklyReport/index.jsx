import React from 'react'
import Topbar from '../../../components/Template/Topbar'
import Sidebar from '../../../components/Template/Sidebar'
import Main from '../../../components/Template/Main'
import Breadcrumb from './Part/Breadcrumb'

const index = () => {
  return (
    <div id='body'>
        <Topbar />
        <Sidebar />
        <Main>
            <div className="container">
                <Breadcrumb />
            </div>
        </Main>
    </div>
  )
}

export default index