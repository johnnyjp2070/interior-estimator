import React from "react";

const Landing = () => {
  return (
    <section id='hero' className='d-flex align-items-center mt-header'>
      <div className='container'>
        <div className='row'>
          <div className='col-lg-6 pt-5 pt-lg-0 order-2 order-lg-1 d-flex flex-column justify-content-center'>
            <h1>Elegant and creative solutions</h1>
            <h2>
              We are team of talanted designers making websites with Bootstrap
            </h2>
            <div className='d-flex'>
              <a href='#about' className='btn-get-started scrollto'>
                Get Started
              </a>
              <a
                href='https://www.youtube.com/watch?v=jDDaplaOz7Q'
                className='venobox btn-watch-video'
                data-vbtype='video'
                data-autoplay='true'
              >
                {" "}
                Watch Video <i className='icofont-play-alt-2'></i>
              </a>
            </div>
          </div>
          <div className='col-lg-6 order-1 order-lg-2 hero-img'>
            <img
              src='assets/img/hero-img.png'
              className='img-fluid animated'
              alt=''
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Landing;
