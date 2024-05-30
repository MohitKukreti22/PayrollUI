import React from 'react';
import './LandingPage.css';
import { Link } from 'react-router-dom';

function LandingPage() {
  return (
    <>
      <section id="title">
        <div className="container-fluid">
          <nav className="navbar navbar-expand-md navbar-dark ">
            <a className="navbar-brand" href="#">
              <strong>EasyPay</strong>
            </a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item"><a className="nav-link" href="#footer">Contact</a></li>
                <li className="nav-item"><a className="nav-link" href="#testimonials">About</a></li>
                <li className="nav-item"><Link to="/login" className="nav-link">Login/Signup</Link></li>
              </ul>
            </div>
          </nav>

          <div className="row">
            <div className="col-lg-6">
              <h1>Your Payroll<br />Our Passion.</h1>
              <button type="button" className="btn btn-dark btn-lg download-button"><i className="fab fa-apple"></i> Download</button>
              <button type="button" className="btn btn-outline-light btn-lg download-button"><i className="fab fa-google-play"></i> Download</button>
            </div>
            <div className="col-lg-6">
              <img src="/images/salary01.jpg" className="title-img" alt="iphone-mockup"/>
            </div>
          </div>
        </div>
      </section>

      <section id="features" style={{ backgroundColor: 'white' }}>
        <div className="container-fluid " >
          <div className="row">
            <div className="col-lg-4 block-element">
              <i className="fas fa-heart-circle-check fa-3x icon"></i>
              <h3>Easy to use.</h3>
              <p>Transform the way your team works, and make it easier to collaborate in shared workspace regardless of distance.</p>
            </div>
            <div className="col-lg-4 block-element">
              <i className="fas fa-bullseye fa-3x icon"></i>
              <h3>Encourage employee self service</h3>
              <p>Enable seamless collaboration between employees and your payroll staff and reduce the burden of employee requests</p>
            </div>
            <div className="col-lg-4 block-element">
              <i className="fas fa-heart fa-3x icon"></i>
              <h3>Multiple Access Level</h3>
              <p>Allow manager to confirm/deny request as well as change setting and add/remove team members..</p>
            </div>
          </div>
        </div>
      </section>

      <section id="testimonials">
        <div id="carouselExampleControls" className="carousel slide" data-bs-ride="false">
          <div className="carousel-inner">
            <div className="carousel-item active">
              <h2>Leave behind your organizational concerns and the hassle of managing payroll data. With our simplified payroll tracking solution, your team is free from worries about incorrect payroll calculations. </h2>
              <img className="testimonials-img" src="/images/pay1.png" alt="dog-profile" />
            </div>
            <div className="carousel-item">
              <h2 className="testimonial-text">Our platforms allow teams to collaborate easily from different locations, and minimize the distance gap even when remote work scenarios</h2>
              <img className="testimonials-img" src="/images/team.jpg" alt="lady-profile" />
            </div>
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
            <span className="carousel-control-prev-icon"></span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
            <span className="carousel-control-next-icon"></span>
          </button>
        </div>
      </section>

      <section id="press">
        <img className="press-logo" src="/images/techcrunch.png" alt="tc-logo" />
        <img className="press-logo" src="/images/tnw.png" alt="tnw-logo" />
        <img className="press-logo" src="/images/bizinsider.png" alt="biz-insider-logo" />
        <img className="press-logo" src="/images/mashable.png" alt="mashable-logo" />
      </section>

      <footer id="footer">
        <div className="footer-block">
          <i className="fab fa-twitter fa-hg"></i>
          <i className="fab fa-facebook fa-hg"></i>
          <i className="fab fa-instagram fa-hg"></i>
          <i className="fab fa-envelope fa-hg"></i>
          <p>© Copyright EasyPay</p>
        </div>
      </footer>
    </>
  );
}

export default LandingPage;
