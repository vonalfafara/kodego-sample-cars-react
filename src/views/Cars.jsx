import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";
import Carousel from "react-bootstrap/Carousel";
import http from "../http";
import { useEffect, useState } from "react";
import "./Cars.css";

const Cars = () => {
  const storage = import.meta.env.VITE_API;
  const api = http();
  const [show, setShow] = useState(false);
  const [cars, setCars] = useState([]);
  const [car, setCar] = useState({});
  const [brands, setBrands] = useState([]);
  const [brand, setBrand] = useState("0");
  const [models, setModels] = useState([]);
  const [model, setModel] = useState("0");
  const [transmission, setTransmission] = useState("0");
  const [filteredModels, setFilteredModel] = useState([]);

  useEffect(() => {
    getBrands();
    getModels();
    return () => {};
  }, []);

  useEffect(() => {
    const newModels = models.filter((model) => {
      return model.brand === brand;
    });
    setFilteredModel(newModels);
    return () => {};
  }, [brand]);

  useEffect(() => {
    getCars();
    return () => {};
  }, [model, transmission]);

  async function getBrands() {
    const { data } = await api.get("/brands");
    setBrands(data);
  }

  async function getModels() {
    const { data } = await api.get("/models");
    setModels(data);
  }

  async function getCars() {
    let config = {
      url: "/cars",
      params: {},
    };
    if (brand !== "0") config.params.brand = brand;
    if (model !== "0") config.params.model = model;
    if (transmission !== "0") config.params.transmission = transmission;

    const { data } = await api.request(config);
    setCars(data);
  }

  function handleShowCar(selectedCar) {
    setCar(selectedCar);
    setShow(true);
  }

  return (
    <>
      <Container className="mt-4">
        <Row>
          <Col sm="12" md="3" className="mb-4">
            <Form>
              <Form.Select
                defaultValue="0"
                className="mb-4"
                onChange={(e) => setBrand(e.target.value)}
              >
                <option value="0" disabled>
                  Select Brand
                </option>
                {brands.map((brand, index) => {
                  return (
                    <option key={index} value={brand}>
                      {brand}
                    </option>
                  );
                })}
              </Form.Select>
              <Form.Select
                defaultValue="0"
                className="mb-4"
                disabled={brand === "0"}
                onChange={(e) => setModel(e.target.value)}
              >
                <option value="0" disabled>
                  Select Model
                </option>
                {filteredModels.map((model, index) => {
                  return (
                    <option key={index} value={model.model}>
                      {model.model}
                    </option>
                  );
                })}
              </Form.Select>
              <Row>
                <Form.Check
                  inline
                  name="transmission"
                  type="radio"
                  label="Manual"
                  value="Manual"
                  onChange={(e) => setTransmission(e.target.value)}
                />
                <Form.Check
                  inline
                  name="transmission"
                  type="radio"
                  label="Automatic"
                  value="Automatic"
                  onChange={(e) => setTransmission(e.target.value)}
                />
              </Row>
            </Form>
          </Col>
          <Col sm="12" md="9">
            <Row>
              {cars.map((car, index) => {
                return (
                  <Col key={index} sm="6" lg="4" className="mb-4">
                    <Card className="car-card">
                      <Card.Img
                        variant="top"
                        src={`${storage}${car.thumbnail}`}
                      />
                      <Card.Body className="car-card-body">
                        <Card.Title>
                          {car.brand} {car.model}
                        </Card.Title>
                        <Card.Text>{car.description}</Card.Text>
                        <Card.Text>Transmission: {car.transmission}</Card.Text>
                        <Card.Text>Price: {car.price}</Card.Text>
                        <Button
                          variant="primary"
                          onClick={() => handleShowCar(car)}
                        >
                          Go somewhere
                        </Button>
                      </Card.Body>
                    </Card>
                  </Col>
                );
              })}
            </Row>
          </Col>
        </Row>
      </Container>
      {car ? (
        <Modal show={show} onHide={() => setShow(false)} size="lg" centered>
          <Modal.Header closeButton>
            <Modal.Title>
              {car.brand} {car.model}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Carousel className="mb-4">
              {car?.images?.map((image, index) => {
                return (
                  <Carousel.Item key={index} className="car-carousel-item">
                    <img src={`${storage}${image}`} />
                  </Carousel.Item>
                );
              })}
            </Carousel>
            <p>{car.description}</p>
            <p>Transmission: {car.transmission}</p>
            <p>Mileage: {car.mileage}</p>
            <p>Price: {car.price}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShow(false)}>
              Close
            </Button>
            <Button variant="primary" onClick={() => setShow(false)}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      ) : null}
    </>
  );
};

export default Cars;
