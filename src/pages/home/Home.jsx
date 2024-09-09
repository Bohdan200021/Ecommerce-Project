import React from 'react';
import bannerImage from '../../assets/bannerImage.jpg';
import Footer from '../../components/footer/Footer'; // Adjust the path as needed

const Home = () => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <div
        className="section flex-grow-1"
        style={{ paddingTop: '80px', paddingBottom: '20px' }}
      >
        <div className="hero">
          <div className="card bg-dark text-white border-0">
            <img
              src={bannerImage}
              alt="Background"
              className="card-img"
              height="550px"
            />
            <div className="card-img-overlay d-flex flex-column justify-content-center">
              <div className="container text-black">
                <h5 className="card-title display-3 fw-bolder mb-0 ">
                  NEW COLLECTION
                </h5>
                <p className="card-text lead fs-2">CHECK OUT ALL THE TRENDS</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
