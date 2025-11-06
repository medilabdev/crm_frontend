import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Spinner, ListGroup } from "react-bootstrap";
import Swal from "sweetalert2";
import axios from "axios";

const FollowUpModal = ({ show, onHide, deal }) => {
  const [loading, setLoading] = useState(false);
  const [followUps, setFollowUps] = useState([]);
  const [form, setForm] = useState({
    follow_up_date: "",
    activity_notes: "",
  });

  useEffect(() => {
    if (show && deal?.uid) {
      fetchFollowUps();
    }
  }, [show]);

  const fetchFollowUps = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const res = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/deals/${deal.uid}/follow-ups`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setFollowUps(res.data.data || []);
    } catch (err) {
      console.error("Failed to load follow-ups:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!form.follow_up_date) {
      Swal.fire("Warning", "Tanggal follow up wajib diisi", "warning");
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/deals/${deal.uid}/follow-ups`,
        form,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      Swal.fire("Success", "Follow-up berhasil disimpan!", "success");
      setForm({ follow_up_date: "", activity_notes: "" });
      fetchFollowUps();
    } catch (err) {
      Swal.fire("Error", "Gagal menyimpan follow-up", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered size="md">
      <Modal.Header closeButton>
        <Modal.Title>
          Follow-Up — <strong>{deal?.deal_name}</strong>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Tanggal Follow-Up</Form.Label>
            <Form.Control
              type="date"
              value={form.follow_up_date}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, follow_up_date: e.target.value }))
              }
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Aktivitas</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={form.activity_notes}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, activity_notes: e.target.value }))
              }
            />
          </Form.Group>
          <div className="text-end">
            <Button variant="primary" onClick={handleSave} disabled={loading}>
              {loading ? <Spinner animation="border" size="sm" /> : "Simpan"}
            </Button>
          </div>
        </Form>

        <hr />
        <h6 className="fw-bold">Riwayat Follow-Up</h6>
        {loading ? (
          <div className="text-center py-3">
            <Spinner animation="border" size="sm" />
          </div>
        ) : followUps.length > 0 ? (
          <ListGroup variant="flush">
            {followUps.map((f) => (
              <ListGroup.Item key={f.uid}>
                <div className="d-flex justify-content-between">
                  <div>
                    <strong>{f.follow_up_date}</strong>
                    <div className="text-muted small">{f.activity_notes}</div>
                  </div>
                  <div className="text-muted small">
                    {f.creator?.name || "-"}
                  </div>
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        ) : (
          <p className="text-muted">Belum ada follow-up.</p>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default FollowUpModal;
