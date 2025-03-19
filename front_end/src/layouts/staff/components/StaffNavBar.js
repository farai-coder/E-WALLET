import React, { useState } from 'react';
import AddStaff from './AddStaff';
import ImportStaff from './ImportStaff';
import TemplateDemo from './ImportStaff';

function StaffNavBar(props) {
  const [showAddStaff, setShowAddStaff] = useState(false);
  const [showImportStaff, setShowImportStaff] = useState(false);
  const [showAddMessage, setShowAddMessage] = useState(false);
  const[reflesh, setReflesh] = useState(false)

  props.setReflesh(reflesh)


  const handleClick = () => {
    setShowAddStaff(prev => !prev);
  };

  const handleImportClick = () => {
    setShowImportStaff(prev => !prev);
  };

  const handleMessageClick = () => {
    setShowAddMessage(prev => !prev);
  };

  return (
    <div className='container p-4'>
      <button 
        onClick={handleClick} 
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
        <span style={{ color: '#FFFFFF', fontSize: '14px' }}>ADD STAFF</span>
      </button>
      <button 
        onClick={handleImportClick} 
        style={{
          backgroundColor: '#f27d74',
          borderColor: '#990033',
          color: '#FFFFFF',
          padding: '8px 16px',
          borderRadius: '10px',
          boxShadow: '0px 0px 10px rgba(0,0,0,0.2)',
          marginRight: '10px'
        }} 
        className="btn border border-2"
      >
        <span style={{ color: '#FFFFFF', fontSize: '14px' }}>IMPORT CSV</span>
      </button>
      
     
      {showAddStaff && <AddStaff setShowAddStaff={setShowAddStaff} setShowAddMessage={setShowAddMessage} setReflesh={setReflesh}/>}
      {showImportStaff && <TemplateDemo setShowImportStaff={setShowImportStaff} setReflesh={setReflesh} />}
  
    </div>
  );
}

export default StaffNavBar;
