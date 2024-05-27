import React, { useState, useEffect } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import axios from "axios";
import "./AddLead.css";
import Swal from 'sweetalert2'
import { useNavigate, useParams } from "react-router-dom";

function AddLead() {


  const userName = sessionStorage.getItem("inputValue")||sessionStorage.getItem("email")
  var name =userName.match(/^([^@]*)@/)[1];

  let navigate = useNavigate()

  const { id } = useParams();
  // console.log(id)



  const [data, setData] = useState({
    name: "",
    mobileNo: "",
    remarks: "",
    source: "select-source",
    service: "select service",
    status: "select status",

  })

  const [sourceData, setSourceData] = useState([])
  const [serviceData, setServiceData] = useState([])
  //service get
  useEffect(() => {
    axios
      .post("http://localhost:3001/source/get/api", {
        createdBy: userName
      })
      .then((res) => {
        setSourceData(res.data); // Set the data property into sourceData
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [sourceData]);


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



    const dataChange = (e) => {
      setData({...data ,[e.target.name]:e.target.value })
    }

  const dataSubmit = async () => {
    const postData = {
      leadName: data.name,
      mobileNo: data.mobileNo,
      remarks: data.remarks,
      source: data.source,
      service: data.service,
      status: data.status,
      createdBy: userName
    };
    // console.log(postData);

    try {
      const res = await axios.post("http://localhost:3001/lead/post/api", postData)
      console.log("data posted successfully", res);
    } catch (error) {
      console.log("Error while posting", error);
    }

    Swal.fire({
      title: "Good job!",
      text: "Your data was submitted successfully!",
      icon: "success"
    })


    navigate("/Lead")

  }

  const [singleData, setSingleData] = useState([])
  const [buttonChange, setButtonChange] = useState("save")

  const [edit, setEdit] = useState(false)

  const leadEditById = () => {


    axios.post("http://localhost:3001/lead/get/api", { createdBy: userName })
      .then(res => {
        setSingleData(res.data)
        // console.log(res.data)
        let result = (res.data).filter((item) => item._id === id)
        // console.log(singleData)
        console.log(result)

        result.map(item => {
          setData({
            ...data,
            name: item.leadName,
            mobileNo: item.mobileNo,
            remarks: item.remarks,
            source: item.source,
            service: item.service,
            status: item.status,
          })
        })
      })
    setButtonChange("update")
    setEdit(true)
  }


  useEffect(() => {

    if (id === undefined) {
      setButtonChange("save")
    }

    else {
      setButtonChange("update")
      leadEditById()

    }


  }, [])



  const handleUpdate = async () => {
    const postData = {
      leadName: data.name,
      mobileNo: data.mobileNo,
      remarks: data.remarks,
      source: data.source, // Corrected syntax for nested object
      service: data.service, // Corrected syntax for nested object
      // status: data.status,
      updatedBy: userName

    };
    // console.log(postData);

    try {
      const res = await axios.post(`http://localhost:3001/lead/update/api/${id}`, postData)
      console.log("data posted successfully", res);
    } catch (error) {
      console.log("Error while posting", error);
    }

    Swal.fire({
      title: "Good job!",
      text: "Your data was updated successfully!",
      icon: "success"
    })


    navigate("/Lead")

  }

  const handleSubmit = () => {

    if (edit) {
      handleUpdate()
    }
    else { dataSubmit() }
  }

  const [statusData, setStatusData] = useState([]);
  useEffect(() => {
    axios
      .post("http://localhost:3001/status/get/api",
        { createdBy: userName })
      .then((res) => {
        setStatusData(res.data);
        // console.log(res.data); // Log the fetched data
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [statusData]);


  return (
    <>
     <div style={{ overflow: "hidden" }}>
      <Row>
        <Col xs={12} md={1} ></Col>
        <Col xs={12} md={10} >


          <Card>

            {!edit?(  <Card.Header><h3>Add Lead</h3></Card.Header>):(  <Card.Header><h3>Edit Lead</h3></Card.Header>)}
            <Card.Body>

              <Row>
                <Col xs={12} md={3} style={{ marginTop: "10px" }} >
                  <Card.Title>Name</Card.Title>
                  <Card.Text>
                    <Form >
                      <Form.Group className="mb-3" controlId="formGroupEmail">
                        <Form.Control type="text" placeholder="Enter name" style={{ borderColor: "black" }}
                          className="remarks1"
                          value={data.name}
                          name="name"
                          onChange={dataChange}


                        />
                      </Form.Group>
                    </Form>
                  </Card.Text>

                </Col>
                <Col xs={12} md={3} style={{ marginTop: "10px" }} >
                  <Card.Title>Mobile No</Card.Title>
                  <Card.Text>
                    <Form >
                      <Form.Group className="mb-3" controlId="formGroupEmail">
                        <Form.Control type="number" placeholder="Enter mobile number" style={{ borderColor: "black" }}
                          value={data.mobileNo}
                          name="mobileNo"
                          onChange={dataChange}
                          className="remarks1"
                        />
                      </Form.Group>
                    </Form>
                  </Card.Text>
                </Col>
                <Col xs={12} md={3} style={{ marginTop: "10px" }} >
                  <Card.Title>Select source</Card.Title>
                  <Card.Text>
                    <Form.Select aria-label="Default select example" style={{ borderColor: "black" }}
                      value={data.source}
                      name="source"
                      onChange={dataChange}

                    >
                      <option value={data.source}>{data.source}</option>
                      {sourceData.map((item, index) => (

                        <option value={item.sourceName}>{item.sourceName}</option>

                      ))}
                    </Form.Select>
                  </Card.Text>

                </Col>
                <Col xs={12} md={3} style={{ marginTop: "10px" }} >
                  <Card.Title>Select Service</Card.Title>
                  <Card.Text>
                    <Form.Select aria-label="Default select example" style={{ borderColor: "black" }}
                      value={data.service}
                      name="service"
                      onChange={dataChange}

                    >
                      <option value={data.service}>{data.service}</option>

                      {serviceData.map((item, index) => (
                        <option value={item.serviceName}  >{item.serviceName}</option>
                      ))}
                    </Form.Select>
                  </Card.Text>
                </Col>
              </Row>

              <Row>
              {!edit ? (

                <Col xs={12} md={3} style={{ marginTop: "10px" }}>
                  <Card.Title>Lead Status</Card.Title>
                  <Card.Text>
                    <Form.Select aria-label="Default select example" style={{ borderColor: "black" }}
                      value={data.status}
                      name="status"
                      onChange={dataChange}
                  
                    >
                      <option value={data.status}>{data.status}</option>

                      {statusData.map((item, index) => (
                        <option value={item.statusName} >{item.statusName}</option>

                      ))}
                    </Form.Select>
                  </Card.Text>
                </Col>
              ):null}

                <Col xs={12} md={6} style={{ marginTop: "10px" }}>
                  <Card.Title>Remarks</Card.Title>
                  <Card.Text>
                    <Form >
                      <Form.Group className="mb-3" controlId="formGroupEmail">
                        <Form.Control type="text" placeholder="Enter your remarks" style={{ borderColor: "black" }}
                          value={data.remarks}
                          name="remarks"
                          onChange={dataChange}
                          className="remarks12"

                        />
                      </Form.Group>
                    </Form>
                  </Card.Text>
                </Col>


                <Col xs={12} md={3} className="text-center" style={{ marginTop: "10px" }}>
                  <Button variant="outline-success" className="search"
                    onClick={handleSubmit}
                  >{buttonChange}</Button>
                </Col>
              </Row>

            </Card.Body>
          </Card>

        </Col>
        <Col xs={12} md={1} ></Col>
      </Row>
      </div>

    </>
  )
}
export default AddLead