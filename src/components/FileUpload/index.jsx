import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';

const FileUpload = ({ label, sectionId, onFileChange }) => {
    const [files, setFiles] = useState([{ id: 1, file: null, fileName: "No files selected" }]);


    // Handle file selection
    const handleFileChange = (event, id) => {
        const file = event.target.files[0];

        setFiles(prevFiles =>
            prevFiles.map(f => f.id === id ? { ...f, file, fileName: file ? file.name : "No files selected" } : f)
        );

        if (file) {
            onFileChange(sectionId, file, id); // Kirim sectionId, file, dan fileId ke parent
        }
    };

    // Tambahkan form baru
    const addFileInput = () => {
        setFiles(prevFiles => [
            ...prevFiles,
            { id: prevFiles.length + 1, file: null, fileName: "No files selected" }
        ]);
    };

    // Hapus form tertentu
    const removeFileInput = (id) => {
        setFiles(prevFiles => prevFiles.filter(file => file.id !== id));
        onFileChange(sectionId, null, id); // Kirim ID yang benar untuk dihapus di parent
    };

    return (
        <div className="container border p-3">
            {files.map((file, index) => (
                <div key={file.id} className="input-group mb-3">
                    <input
                        type="file"
                        className="form-control d-none"
                        id={`fileInput-${sectionId}-${file.id}`} // Pastikan ID unik berdasarkan sectionId
                        onChange={(e) => handleFileChange(e, file.id)}
                    />
                    <label htmlFor={`fileInput-${sectionId}-${file.id}`} className="btn btn-outline-secondary">
                        Browse
                    </label>
                    <input type="text" className="form-control" value={file.fileName} readOnly />

                    {/* Hanya tampilkan tombol delete untuk index > 0 */}
                    {index > 0 && (
                        <button className="btn btn-danger" onClick={() => removeFileInput(file.id)}>
                            <FontAwesomeIcon icon={faTrash} style={{ fontSize: '12px', marginRight: '5px' }} /> Delete
                        </button>
                    )}
                </div>
            ))}

            <button className="btn btn-primary mt-2 w-100" type="button" onClick={addFileInput}>
                <FontAwesomeIcon icon={faPlus} style={{ fontSize: '12px', marginRight: '5px' }} /> Add Photo
            </button>
        </div>
    );
};

export default FileUpload;
