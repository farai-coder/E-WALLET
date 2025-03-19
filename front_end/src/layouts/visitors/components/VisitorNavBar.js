import React, { useState } from 'react';
import AddVisitor from './AddVisitor'; // Assuming you have an AddVisitor component
import ImportVisitor from './ImportVisitor'; // Assuming you have an ImportVisitor component
import Icon from '@mui/material/Icon';

function VisitorNavBar(props) {
  const [showAddVisitor, setShowAddVisitor] = useState(false);
  const [showImportVisitor, setShowImportVisitor] = useState(false);
  const [refresh, setRefresh] = useState(false);
  
  props.setRefresh(refresh)

  const handleAddClick = () => {
    setShowAddVisitor(prev => !prev);
  };

  const handleImportClick = () => {
    setShowImportVisitor(prev => !prev);
  };

  return (
    <div className='container p-4'>
      <button 
        onClick={handleAddClick} 
        style={{ 
          backgroundColor: '#92ba77', 
          borderColor: '#003300', 
          color: '#FFFFFF', 
          padding: '8px 16px', 
          borderRadius: '10px', 
          boxShadow: '0px 0px 10px rgba(0,0,0,0.2)', 
          marginRight: '10px'
        }} 
        className="btn border border-2"
      >
        <span style={{ color: '#FFFFFF', fontSize: '14px' }}>ADD VISITOR</span>
      </button>
      <button 
        onClick={handleImportClick} 
        style={{ 
          backgroundColor: '#f27d74', 
          borderColor: '#990033', 
          color: '#FFFFFF', 
          padding: '8px 16px', 
          borderRadius: '10px', 
          boxShadow: '0px 0px 10px rgba(0,0,0,0.2)' 
        }} 
        className="btn border border-2"
      >

        <span style={{ color: '#FFFFFF', fontSize: '14px' }}>IMPORT CSV</span>
      </button>
      
      {showAddVisitor && <AddVisitor setShowAddVisitor={setShowAddVisitor} setRefresh={setRefresh}/>}
      {showImportVisitor && <ImportVisitor setShowImportVisitor={setShowImportVisitor} setRefresh={setRefresh}/>}
    </div>
  );
}

export default VisitorNavBar;
