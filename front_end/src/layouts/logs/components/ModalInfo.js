import React,{useState,useEffect} from "react";
import "./Modal.css"
import { useLocation } from "react-router";
import api from "../api";
import { Link } from "react-router-dom";

function ModalInfo(){
    const [log ,setLog] = useState([]);
    let location = useLocation();
  
  const fetchLog = async () => {
      const response =  await api.get('/search_by_id/' + location.state );
      setLog(response.data)
    
  };

  useEffect(() => {
      fetchLog();
  }, []);

    return(
            <div className="modalBackground">
                <div className="modalContainer">
                    <div className="titleClosebtn">
                    <button><Link className="nav-link active" aria-current="page" to="/Home">x</Link></button>
                    </div>
                    <div className="title">
                        <h1>Vehicle info</h1>
                    </div>
                    <div className="body">
                        <p>id :  {log.v_id}</p>
                        <p>number plate :  {log.number_plate}</p>
                        <p>date in :  {log.date_in}</p>
                        <p>date out :  {log.date_out}</p>
                        <p>time in :  {log.time_in}</p>
                        <p>time out :  {log.time_out}</p>
                        <img width='260' height='150' src={`data:image/jpeg;base64,${log.picture_in}`} />
                        <img width='260' height='150' src={`data:image/jpeg;base64,${log.picture_out}`} />
                        
                    </div>
                  
                </div>
            </div>
    )
}

export default ModalInfo;