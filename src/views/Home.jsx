import Carousel from "react-bootstrap/Carousel";
import HeroImg1 from "../assets/carousel-img-1.jpg";
import HeroImg2 from "../assets/carousel-img-2.jpg";
import HeroImg3 from "../assets/carousel-img-3.jpg";
import "./Home.css";

const Home = () => {
  return (
    <Carousel>
      <Carousel.Item className="hero">
        <img src={HeroImg1} />
        <div className="overlay"></div>
        <Carousel.Caption>
          <h3>Engineered to Last</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa quia
            harum porro dolore ratione quidem aliquam quisquam eaque
            reprehenderit! Fugit?
          </p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item className="hero">
        <img src={HeroImg2} />
        <div className="overlay"></div>
        <Carousel.Caption>
          <h3>Driving Dreams, Every Mile, Every Moment</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita
            aliquid officia quisquam placeat tenetur minima laudantium,
            assumenda ipsa dicta officiis incidunt molestias quod. Corporis, ab!
          </p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item className="hero">
        <img src={HeroImg3} />
        <div className="overlay"></div>
        <Carousel.Caption>
          <h3>Precision Meets Power</h3>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Esse
            molestiae quasi inventore nam ipsa iusto laudantium rem tenetur
            deleniti animi!
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
};

export default Home;
