import React, { Fragment } from "react";

const About = () => {
  return (
    <Fragment>
      <section id='about' className='about mt-header'>
        <div className='container'>
          <div className='row'>
            <div className='col-lg-6'>
              <img src='assets/img/about.png' className='img-fluid' alt='' />
            </div>
            <div className='col-lg-6 pt-4 pt-lg-0 content'>
              <h3>
                Voluptatem dignissimos provident quasi corporis voluptates
              </h3>
              <p className='font-italic'>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
              <ul>
                <li>
                  <i className='icofont-check-circled'></i> Ullamco laboris nisi
                  ut aliquip ex ea commodo consequat
                </li>
                <li>
                  <i className='icofont-check-circled'></i> Duis aute irure
                  dolor in reprehenderit in voluptate velit
                </li>
                <li>
                  <i className='icofont-check-circled'></i> Ullamco laboris nisi
                  ut aliquip ex ea commodo consequat. Duis aute irure dolor in
                  reprehenderit in voluptate trideta storacalaperda
                </li>
              </ul>
              <p>
                Ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis
                aute irure dolor in reprehenderit in voluptate velit esse cillum
                dolore eu fugiat nulla pariatur.
              </p>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default About;
