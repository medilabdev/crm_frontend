import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { Button, Card, Form, Offcanvas } from 'react-bootstrap'
import ReactQuill from 'react-quill';
import Swal from 'sweetalert2';

const Activity = ({ show, HandleButtonActivity, uid , data}) => {
    const token = localStorage.getItem("token");
    const userUid = localStorage.getItem("uid")
    const [activities, setActivities] = useState(data || []);
    const chatContainerRef = useRef(null);

    const [inputData, setInputData] = useState({})
    const handleInput = (e) => {
      setInputData({
        ...inputData,
        [e.target.name]:e.target.value,
      })
    } 
    useEffect(() => {
      setActivities(data || []);
    }, [data]);
    
    const handleSubmit = async (e) => {
      let timerInterval;
      e.preventDefault();
        Swal.fire({
          title: "Loading...",
          html: "Tolong Tunggu <b></b> Beberapa Detik.",
          timer: 3000,
          timerProgressBar: true,
          didOpen: () => {
            Swal.showLoading();
            const timer = Swal.getPopup().querySelector("b");
            timerInterval = setInterval(() => {
              timer.textContent = `${Swal.getTimerLeft()}`;
            }, 100);
          },
          willClose: () => {
            clearInterval(timerInterval);
          },
        })
      try {
        const formData = new FormData();
        formData.append("activity_description", inputData.deskripsi);
        formData.append("deals_uid", uid);
    
        // Menunggu response dari axios.post
        const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/v2/activities`, formData, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
    
        // Menampilkan SweetAlert dan menunggu konfirmasi
        const result = await Swal.fire({
          title: response.data.message,
          text: "Successfully add activity",
          icon: "success"
        });
    
        // Jika konfirmasi diterima, tambahkan aktivitas baru ke state
        if (result.isConfirmed) {
          const newActivity = response.data.data || {}; 
          
          setActivities(prevActivities => {
            const updatedActivities = [...prevActivities, newActivity];
            
            // Scroll ke bawah menggunakan requestAnimationFrame
    
            requestAnimationFrame(() => {
              chatContainerRef.current?.scrollTo({
                top: chatContainerRef.current.scrollHeight,
                behavior: 'smooth',
              });
            });
            
            return updatedActivities;
          });

          setInputData({ deskripsi: '' });
        }
    
      } catch (error) {
        if (error.response) {
          Swal.fire({
            text: error.response.data.message,
            icon: "warning",
          });
        } else {
          Swal.fire({
            text: "Something went wrong!",
            icon: "error",
          });
        }
      }
    };
    
    useEffect(() => {
      if (show) {
        // Memberi waktu sedikit untuk memastikan konten sudah selesai dirender
        setTimeout(() => {
          chatContainerRef.current?.scrollTo({
            top: chatContainerRef.current.scrollHeight,
            behavior: 'smooth',
          });
        }, 100); // Menambahkan delay 100ms, sesuaikan jika diperlukan
      }
    }, [show]);
    return (
      <Offcanvas show={show} onHide={HandleButtonActivity}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Activity Deals</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className='d-flex flex-column'>
          <div className="chat-container" ref={chatContainerRef}>
            {Array.isArray(activities) && activities.map((value) => (
               <div className="message-content" style={{
                backgroundColor:value.user_uid === userUid ?"#93BFCF" : "#C5705D",
               }}>
               <Card >
               <Card.Body>
                <div dangerouslySetInnerHTML={{ __html: value?.activity_description }} />
              </Card.Body>
                 <Card.Footer>
                   <div className="message-date">
                     <p className='fw-semibold' style={{ fontSize:'0.85rem'}}>{value?.user?.name ?? value?.user_created_name}, <br /><span className='fw-medium' style={{ fontSize:'0.70rem'}}>{new Intl.DateTimeFormat('id-ID', {
                      day:'2-digit',
                      month:'long',
                      year:'numeric',
                      hour:'2-digit',
                      minute:'2-digit'
                     }).format(new Date(value?.created_at))}</span></p>
                   </div>
                 </Card.Footer>
               </Card>
             </div>
            ))}
          </div>
          <div className="input-container mt-3 d-flex align-items-end">
            <div className="p-2">
            <ReactQuill 
              theme="snow"
              name='deskripsi'
              value={inputData.deskripsi}
              placeholder="Type Update Activity..."
              className='me-2'
              onChange={(value) =>
                handleInput({ target: { name: "deskripsi", value } })
              }
              onInput={(e) => {
                e.target.style.height = 'auto';
                e.target.style.height = `${e.target.scrollHeight}px`;
              }}
              style={{ backgroundColor:'white'}}
              />
              </div>
            {/* <Form.Control
              as="textarea"
              name='deskripsi'
              value={inputData.deskripsi}
              onChange={handleInput}
              className="input-chat me-2"
              placeholder="Type Update Activity..."
              onInput={(e) => {
                e.target.style.height = 'auto';
                e.target.style.height = `${e.target.scrollHeight}px`;
              }}
            /> */}
            
          <Button className='submit-activity mb-2'  variant='primary' onClick={handleSubmit}>Submit</Button>
          </div>
          
        </Offcanvas.Body>
      </Offcanvas>
    );
  };

  export default Activity;
