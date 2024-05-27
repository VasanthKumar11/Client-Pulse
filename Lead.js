import React, { useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import Dropdown from "react-bootstrap/Dropdown";
import Modal from "react-bootstrap/Modal";
import "./Lead.css";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin5Line } from "react-icons/ri";
import Swal from 'sweetalert2'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { format } from 'date-fns';

function Lead() {

  const [showDescription, setShowDescription] = useState(false);

  const handleCloseDescription = () => setShowDescription(false);
  const handleShowDescription = () => setShowDescription(true);


  const inputValue = sessionStorage.getItem("inputValue");
  const email = sessionStorage.getItem("email");
  const userName =email|| inputValue ;
  // console.log(userName)
 var name =userName.match(/^([^@]*)@/)[1];

  const [showLead, setShowLead] = useState(false);

  const handleCloseLead = () => setShowLead(false);
  const handleShowLead = () => setShowLead(true);

  let editNavigate = useNavigate();

  const [showStatus, setShowStatus] = useState(false);

  const handleCloseStatus = () => setShowStatus(false);
  const handleShowStatus = () => {
    setShowEdit(false);
    setShowStatus(true);
  };

  const [showEdit, setShowEdit] = useState(false);

  const handleCloseEdit = () => setShowEdit(false);
  const handleShowEdit = (id) => {
    setShowEdit(true);
    setId(id);
    // console.log(id)
  };
  const [id, setId] = useState();

  const editDetails = () => {
    editNavigate(`/AddLead/${id}`);
  };

  let navigate = useNavigate();
  const handleNavigation = () => {
    navigate("/AddLead");
  };
  const [show1, setShow1] = useState(false);

  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [sourceInput, setSourceInput] = useState();
  const [sourceData, setSourceData] = useState([]);
  const [serviceData, setServiceData] = useState([]);
  const [serviceInput, setServiceInput] = useState();

  const handleChangeSource = (e) => {
    setSourceInput(e.target.value);
  };
  const handleClickSource = async () => {
    console.log(sourceInput);

    // source post method

    try {
      const res = await axios.post("http://localhost:3001/source/post/api", {
        sourceName: sourceInput,
        createdBy: userName

      });
      console.log("data posted successfully", res.data);
    } catch (error) {
      console.log("Error while posting", error);
    }
    setShow(false);
  };

  // source get method

  useEffect(() => {
    axios
      .post("http://localhost:3001/source/get/api", { createdBy: userName })
      .then((res) => {
        setSourceData(res.data); // Set the data property into sourceData
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [sourceData]);
  // console.log(sourceData)

  // service post

  const handleChangeService = (e) => {
    setServiceInput(e.target.value);
  };
  const handleClickService = async () => {
    console.log(serviceInput);

    try {
      const response = await axios.post(
        "http://localhost:3001/service/post/api",
        {
          serviceName: serviceInput,
          createdBy: userName

        }
      );
      console.log("data posted successfully", response.data);
    } catch (error) {
      console.log("Error while posting", error);
    }
    setShow1(false);
  };

  //service get

  useEffect(() => {
    axios
      .post("http://localhost:3001/service/get/api", {
        createdBy: userName
      })
      .then((res) => {
        setServiceData(res.data); // Set the data property into sourceData
        // console.log(serviceData)
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [serviceData]);

  // data table
  let customStyles = {
    headRow: {
      style: { backgroundColor: "#568863",color:"black",fontSize:"15px" },
    },

    headCell: {
      style: { color: "green", fontSize: "22px" },
    },
    cells: {
      style: { color: "black", fontSize: "13px" },
    },
  };
  const [records, setRecords] = useState([]);

  let coloumn = [
    {
      name: "Name",
      selector: (row) => row.leadName,
      sortable: true,
    },

    {
      name: "Mobile No",
      selector: (row) => row.mobileNo,
      sortable: true,
    },
    {
      name: "Source",
      selector: (row) => row.source,
      sortable: true,
    },
    {
      name: "Service Required",
      selector: (row) => row.service,
      sortable: true,
    },
    {
      name: "Lead Status",
      selector: (row) => row.status,
      sortable: true,
    },
    {
      name: "Remarks",
      selector: (row) => row.remarks,
      sortable: true,
    },

    {
      name: "Created On",
      selector: (row) =>format(new Date(row.createdOn), 'dd-MM-yyyy'),
      sortable: true,
    },
    {
      name: "Actions",
      selector: (row) => (
        <div>
          <Button
            variant="outline-primary"
            onClick={() => handleShowEdit(row._id)}

          >
            <FaEdit />
          </Button>
          <Button variant="outline-danger" style={{ marginLeft: "7px" }} onClick={() => dataDelete(row._id)}>
            <RiDeleteBin5Line />
          </Button>
        </div>
      ),
      sortable: true,
    },
  ];

  const dataDelete = (id) => {
    axios.post(`http://localhost:3001/lead/delete/api/${id}`);

    Swal.fire({
      title: "Good job!",
      text: "Your data was deleted successfully!",
      icon: "success"
    })
  };

  useEffect(() => {
    axios.post("http://localhost:3001/lead/get/api",
      { createdBy: userName, })
      .then((res) => {
        setRecords(res.data);
        console.log(res.data)
      });
  }, [records]);

  const [leadStatus1, setLeadStatus1] = useState();

  const handleChangeLead = (e) => {
    setLeadStatus1(e.target.value);
  };

  const handleClickLead = async () => {
    console.log(leadStatus1);

    try {
      const response = await axios.post(
        "http://localhost:3001/status/post/api",
        {
          statusName: leadStatus1,
          createdBy: userName

        }
      );
      console.log("data posted successfully", response.data);
    } catch (error) {
      console.log("Error while posting", error);
    }
    setShowLead(false);
  };

  const [statusData, setStatusData] = useState([]);
  useEffect(() => {
    axios
      .post("http://localhost:3001/status/get/api", {
        createdBy: userName
      })
      .then((res) => {
        setStatusData(res.data);
        // console.log(res.data); // Log the fetched data
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [statusData]);
  //update

  const [selectStatus, setSelectStatus] = useState({
status:"",
description:"",
  });


  const statusChange=(e)=>{
    setSelectStatus({...selectStatus,[e.target.name]:e.target.value})
  }

 


const [statusHistory,setStatusHistory]=useState([])

const fetchStatusHistory = () => {
  if (id) {
    console.log(id);
    axios.post(`http://localhost:3001/lead/getbyid/api/${id}`, {
      createdBy: userName
    })
    .then((res) => {
      if (res.data && res.data.statusHistory) {
        setStatusHistory(res.data.statusHistory);
        console.log("banu", res.data.statusHistory);
      }
    })
    .catch((error) => {
      console.error('Error fetching status history:', error);
    });
  }
};

useEffect(() => {
  fetchStatusHistory(); // Call fetchStatusHistory when id or userName changes
}, [id, userName]);

useEffect(() => {
  console.log('Updated statusHistory:', statusHistory);
}, [statusHistory]);









  const updateCurrentStatus = () => {
    console.log(selectStatus);
    // console.log(id)

    axios.post(`http://localhost:3001/lead/updateLeadDescription/api/${id}`, {
      status: selectStatus.status,
      description:selectStatus.description,
      updatedBy: userName,
    }).then((res=>console.log(res.data)))
   
     .catch((error) => {
      console.error('Error updating current status:', error);
    })  
    handleCloseStatus();
    Swal.fire({
      title: "Good job!",
      text: "Your data was updated successfully!",
      icon: "success"
    })
  };

 



const[searchResult,setSearchResult]=useState([])

  const[search,setSearch]=useState({
    source:"",
    service:"",
    status:"",
    leadName:"",

  })

 const onSearchChange=(e)=>{
    setSearch({[e.target.name]:e.target.value})
    // console.log(search)
    setDateResult([]);
}
const onSearch=()=>{
 
if(date.fromDate==="" && date.toDate===""){
  //  alert("hi sss")
   
   console.log(search)
  axios.post("http://localhost:3001/lead/searchbyname/api",{
    key:search.source||search.service||search.status||search.leadName,
    createdBy: userName
    })
    .then((res) => {
      console.log(res.data)
const extractedData=res.data.map(item=>{
  const { createdBy, createdOn, leadName, mobileNo, remarks, service, source,status, _id } = item.Data;
  return { createdBy, createdOn, leadName, mobileNo, remarks, service,status, source, _id };
  

})
  setSearchResult(extractedData);
      console.log(extractedData); 
    })
    .catch((error) => {
      console.error("There was an error making the request", error);
    });
    setSearch({
      source:"",
      service:"",
      status:"",
  
    })

}
else{

onDate()
setDate({
  fromDate: "",
  toDate: ""
});
  }

 }
 
 const [date,setDate]=useState({
   fromDate:"",
   toDate:"",
 })
const[dateResult,setDateResult]=useState([])


 const onDateChange=(e)=>{

  setDate({...date,[e.target.name]:e.target.value})
  setSearchResult([])
 
 }
 const onDate=()=>{
  // alert("HI DATE")
  console.log(date)

  axios.post("http://localhost:3001/lead/getLeadsBetweenDates/api",{
    fromDate: date.fromDate,
    toDate: date.toDate,
    createdBy: userName
  })
  .then((res) => {
    setDateResult(res.data);
    console.log(res.data);
  })
  .catch((error) => {
    console.error("There was an error making the request", error);
  });
  
 }



  return (
    <>
   
    <div style={{ overflow: "hidden" }}>
    
      <Row>
        <Col md={1}></Col>
        <Col xs={12} md={10}>
          <Card>
            <Card.Header as="h3">Lead</Card.Header>
            <Card.Body>
              <Card.Text>

                <Row>
                  {/* marginTop:"12" */}
                  <Col xs={12} md={3} style={{ marginTop: "12px" }}>  
                    <Card.Title> From Date</Card.Title>
                    <input className="leadform" type="date" 
                    name="fromDate"
                 onChange={onDateChange}
                    ></input>
                  </Col>
                  <Col xs={12} md={3} style={{ marginTop: "12px" }}>
                    <Card.Title>To Date</Card.Title>
                    <input className="leadform" type="date"
                    name="toDate"
                    onChange={onDateChange}
            
                    ></input>
                  </Col>

                  <Col xs={12} md={3} style={{ marginTop: "12px" }}>
                    <Card.Title> Select Source</Card.Title>

                    <Row>
                      <Col xs={6} md={6}>
                        <Form.Select aria-label="Default select example" style={{ borderColor: "black" }}
                        name="source"
                        onChange={onSearchChange}
                    
                        >
                          
                          {sourceData.map((item, index) => (
                           
                            <option  key={index}>{item.sourceName}</option>
                          ))}
                        </Form.Select>
                      </Col>

                      <Col xs={6} md={6}>
                        <Button
                          variant="outline-success"
                          onClick={handleShow}
                          className="btn1"
                        // style={{ marginLeft: "5px" }}
                        >
                          Add source
                        </Button>
                      </Col>
                    </Row>
                  </Col>

                  <Col xs={12} md={3}  style={{ marginTop: "10px" }}>
                  <Card.Title> Service required</Card.Title>

                  <Row>
                      <Col xs={6} md={6}>

                    <Form.Select
                    aria-label="Default select example"
                    style={{ borderColor: "black" }}
                    name="service"
                    onChange={onSearchChange}
              
                  >
                    {serviceData.map((item, index) => (
                      <option key={index}>{item.serviceName}</option>
                    ))}
                  </Form.Select>
                  </Col>
                  <Col xs={6} md={6}> 
                  <Button
                    variant="outline-success"
                    onClick={handleShow1}
                    className="btn1"
                  // style={{ marginLeft: "5px" }}
                  >
                    Add service
                  </Button>
                  </Col>
                </Row>
           
           </Col>
           </Row>
          </Card.Text>

          <Row>
            <Col xs={12} md={3} style={{ marginTop: "10px" }}>
              <Card.Title>Lead Status</Card.Title>

              <Row>
                <Col xs={6} md={6}>
                  <Form.Select
                    aria-label="Default select example"
                    style={{ borderColor: "black" }}
                    name="status"
                    onChange={onSearchChange}
                
                  >
                    {statusData.map((item, index) => (
                      <option key={index}>{item.statusName}</option>
                    ))}
                  </Form.Select>
                </Col>

                <Col xs={6} md={6}>
                  <Button
                    variant="outline-success"
                    onClick={handleShowLead}
                    className="btn1"
                  >
                    Add status
                  </Button>
                </Col>
              </Row>
            </Col>



            <Col xs={12} md={3} style={{ marginTop: "10px" }}>
            <Card.Title>Lead Name</Card.Title>
            <Form.Control type="email" placeholder="Enter lead name"
               style={{ borderColor: "black" }}
               name="leadName"
               onChange={onSearchChange}
            />
            </Col>
















            <Col xs={12} md={3} style={{ marginTop: "10px" }}>
              <Button variant="outline-primary" className="search"
             onClick={onSearch}

              >

                    Search
              </Button>
            </Col>
            <Col xs={12} md={3} style={{ marginTop: "10px" }}>
              <Button
                variant="outline-success"
                className="add"
                onClick={handleNavigation}
              >
                Add New lead
              </Button>
            </Col>
           
          </Row>

          <Modal show={show} onHide={handleClose} animation={false}>
            <Modal.Header closeButton>
              <Modal.Title>Add source</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <input
                type="text"
                value={sourceInput}
                onChange={handleChangeSource}
                placeholder="Enter your text here..."
                className="form-control"
              />
            </Modal.Body>
            <Modal.Footer>
              <Button variant="outline-success" onClick={handleClickSource}>
                save
              </Button>
              <Button variant="outline-danger" onClick={handleClose}>
                Don't Save
              </Button>
            </Modal.Footer>
          </Modal>

          <Modal show={show1} onHide={handleClose1} animation={false}>
            <Modal.Header closeButton>
              <Modal.Title>Add service</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <input
                type="text"
                value={serviceInput}
                onChange={handleChangeService}
                placeholder="Enter your text here..."
                className="form-control"
              />
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="outline-success"
                onClick={handleClickService}
              >
                save
              </Button>
              <Button variant="outline-danger" onClick={handleClose1}>
                Don't Save
              </Button>
            </Modal.Footer>
          </Modal>
        </Card.Body>
      </Card>
    </Col >

      <Col md={1}></Col>
      </Row >
      <br />

      <Row>
        <Col xs={12} md={12}>
          <Card>
            <Card.Body>
              <DataTable
                columns={coloumn}      
                data={ searchResult.length ? searchResult :dateResult.length ? dateResult : records}
                customStyles={customStyles}
                selectableRows
                highlightOnHoverS
                pagination
                paginationPerPage={5}
                selectableRowsHighlight
                fixedHeader
                paginationRowsPerPageOptions={[5, 10, 15,20]}
              />
            </Card.Body>
          </Card>
        </Col>
      </Row>

  {/* modal box  while click edit*/ }

  <Modal show={showEdit} onHide={handleCloseEdit}>
    <Modal.Header closeButton>
      <Modal.Title> Options</Modal.Title>
    </Modal.Header>
    <Modal.Footer>
 
   
      <Button variant="outline-primary" className="editbtn11" onClick={() => handleShowStatus(id)}>
        Update Status
      </Button>

      <Button variant="outline-dark" className="editbtn12" onClick={() => { setShowDescription(id); fetchStatusHistory(); }}>
  Status History
</Button>

      <Link to={`/AddLead/${id}`}>
        <Button className="editbtn13" variant="outline-success">
          Edit Details
        </Button>
  </Link>
    </Modal.Footer>
  </Modal>

  {/* modal box   for update*/ }

  <Modal show={showStatus} onHide={handleCloseStatus}>
    <Modal.Header closeButton>
      <Modal.Title>Update current status</Modal.Title>
    </Modal.Header>

    <Form.Select
      aria-label="Default select example"
      style={{ borderColor: "black" }}
      name="status"
      onChange={statusChange}
    >
      {statusData.map((item, index) => (
        <option value={item.statusName}>{item.statusName}</option>
      ))}
    </Form.Select>

    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
    <Modal.Title style={{marginLeft:"20px"}}>Add Description</Modal.Title>
        <Form.Control type="text" placeholder="Enter Description"
          style={{ borderColor: "black" }}
          name="description"
          onChange={statusChange}
        />
      </Form.Group>




    <Modal.Footer>
      <Button variant="outline-success" onClick={updateCurrentStatus}>
        update
      </Button>
      <Button variant="outline-danger" onClick={handleCloseStatus}>
        cancel
      </Button>

   
    </Modal.Footer>

  
    
   

    
  </Modal>

  {/* // lead modal */ }

  <Modal show={showLead} onHide={handleCloseLead}>
    <Modal.Header closeButton>
      <Modal.Title>Add Lead Status</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <input
        type="text"
        onChange={handleChangeLead}
        placeholder="Enter your text here..."
        className="form-control"
      />
    </Modal.Body>
    <Modal.Footer>
      <Button variant="outline-success" onClick={handleClickLead}>
        save
      </Button>
      <Button variant="outline-danger" onClick={handleCloseLead}>
        Don't Save
      </Button>
    </Modal.Footer>
  </Modal>


  <Modal show={showDescription} onHide={handleCloseDescription}>
        <Modal.Header closeButton>
        <Modal.Title>Status History</Modal.Title>
        </Modal.Header>
        <Modal.Body>

        {statusHistory.map((item,index)=>(
    
    <div key={index}>
    <p> <span style={{color:"green"}}>Status:</span> {item.status}</p>
    <p> <span style={{color:"green"}}>Description:</span> {item.description}</p>
    <p><span style={{color:"green"}}>Updated On: </span>{format(new Date( item.updatedOn), 'dd-MM-yyyy')}</p>
  <hr></hr>
  </div>
  ))}
          


        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-danger" onClick={handleCloseDescription}>
            Close
          </Button>
       
        </Modal.Footer>
      </Modal>
  </div>
    </>
  );
}

export default Lead;
