import React, { useState } from 'react';
import { Icon } from '@mui/material';
import { BASE_URL } from 'Api';

function ImportStaff(props) {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleImportClose = () => {
    // Code to close the modal
    document.getElementById("import_modal").style.display = "none";
    props.setShowImportStaff(false); // Call setShowImportStaff here
  };

  const handleUploadClick = async () => {
    if (!file) {
      alert("Please select a file first.");
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch(`${BASE_URL}/upload_excel_file/`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      console.log('Success:', result);
      alert('File uploaded successfully');
      handleImportClose(); // Close the modal after successful upload
      props.setReflesh(prevReflesh => !prevReflesh);

    } catch (error) {
      console.error('Error:', error);
      alert('There was a problem with the upload.');
    }
  };

  return (
    <div className="container" id='import_modal' style={{ 
      position: 'absolute', 
      top: 0, 
      right: 0, 
      left: 0, 
      bottom: 0, 
      zIndex: 1000, 
      transform: 'translate(10%, 20%)',
    }}>
      <div className="main-body">
        <div className="row">
          <div className="col-lg-8">
            <div className="card" style={{
              boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.7), 0px 7px 15px rgba(0, 0, 0, 0.3)', // Added shadow to the card
              borderRadius: '8px', // Optional: Added border radius for smoother edges
            }}>
              <div className="card-body">
                <h5>Import Excel File</h5>
                <hr />
                <div className="row justify-content-between mb-1">
                  <div className="col-sm-3"></div>
                  <div className="col-sm-9 text-secondary">
                    <div style={{ textAlign: 'right' }}>
                      <Icon fontSize="small" className="cursor-pointer" onClick={handleImportClose}>close</Icon>
                    </div>
                  </div>
                </div>
                
                {/* File Input */}
                <div className="row mb-3">
                  <div className="col-sm-12">
                    <input
                      type="file"
                      accept=".csv"
                      style={{ marginBottom: '10px' }}
                      className='m-2'
                      onChange={handleFileChange}
                    />
                  </div>
                </div>

                {/* Upload Button */}
                <div className="row">
                  <div className="col-sm-3" />
                  <div className="col-sm-9 text-white" style={{ textAlign: 'right' }}>
                    <input
                      type="button"
                      className="btn px-4"
                      style={{ backgroundColor: '#f27d74' }}
                      value="Upload"
                      onClick={handleUploadClick}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ImportStaff;
