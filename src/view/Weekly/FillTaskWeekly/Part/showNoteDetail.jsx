import React, { useEffect, useState } from 'react'
import { Card, Col, Image, Row } from 'react-bootstrap'
import ImageIcon from "../../../../assets/img/man.png"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFile, faFileImage, faFilePdf } from '@fortawesome/free-solid-svg-icons'
const ShowNoteDetail = ({ notes }) => {
   const [data, setData]  = useState({})
    useEffect(() => {
        setData(notes)
    }, [notes])    
    
    const date = notes?.created_at || notes?.update_at
      ? new Date(
          notes?.created_at === notes?.update_at ? notes?.created_at : notes?.updated_at
        ).toLocaleDateString("id-ID", {
          day: "2-digit",
          month: "short",
          year: "numeric",
          hour: "numeric",
          minute: "numeric",
        })
      : '';
      
  return (
    
        <Card.Body>
            <div className="d-flex align-items-start mb-3">
            <Image src={ImageIcon} alt={ImageIcon}  roundedCircle  style={{ width: "50px", height: "50px", objectFit: "cover", marginRight: "15px" }}/>
            <div>
            <div className='text-muted'> {notes?.created_at === notes?.updated_at ? `created` :   `updated`}: {date} </div>
            <Card.Title className='mb-0'>{data?.title || ''}</Card.Title>
            <Card.Text className='text-muted fs-5'>
            <span
                dangerouslySetInnerHTML={{
                  __html: data.description
                }}
              />
               <div className="row  mt-5">
               {notes?.attachments &&  notes?.attachments.map((file, index) => (
               <div className="col-md-5 m-1" key={index}>
               <div className="d-flex align-items-center border rounded p-3">
                 <FontAwesomeIcon
                   icon={file.type === "file" ? faFilePdf : faFileImage}
                   className={`fs-2 me-3 ${file.type === "file" ? "text-danger" : "text-primary"}`}
                 />
                 <div className="filename-text-container">
                   <a href={`${process.env.REACT_APP_BACKEND_IMAGE}/storage/file/tasks/notes/${file?.filename}`} className="text-decoration-none text-dark" download={true}>
                     <p className="mb-0 fw-bold filename-text">{file.filename}</p>
                   </a>
                 </div>
               </div>
             </div>
             
              
                ))}
            </div>
            </Card.Text>
            </div>
            </div>
           
         
        </Card.Body>
  )
}

export default ShowNoteDetail