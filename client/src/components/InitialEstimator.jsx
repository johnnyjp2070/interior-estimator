import React, { useState, useEffect } from "react";
import Spinner from "./Spinner";
import http from "../services/httpService";
import { Redirect } from "react-router-dom";
const InitialEstimator = ({ user, history }) => {
  // States

  const [clientDetail, setClientDetail] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
  });
  const [packageType, setPackageType] = useState("essential");
  const [kitchenAndUtilities, setKitchenAndUtilities] = useState({
    kitchen: "",
    accessories: "",
    kitchenloft: "",
    utility: "",
  });

  const [errors, setErrors] = useState({});
  const [alert, setAlert] = useState("");
  const [loading, setLoading] = useState(false);

  const [allRates, setAllRates] = useState({
    essential: {
      kitchenRate: 1,
      accessoriesRate: 2,
      kitchenloftRate: 3,
      utilityRate: 4,
    },
    comfort: {
      kitchenRate: 10,
      accessoriesRate: 20,
      kitchenloftRate: 30,
      utilityRate: 40,
    },
    premium: {
      kitchenRate: 100,
      accessoriesRate: 200,
      kitchenloftRate: 300,
      utilityRate: 400,
    },
    luxury: {
      kitchenRate: 1000,
      accessoriesRate: 2000,
      kitchenloftRate: 3000,
      utilityRate: 4000,
    },
  });

  const [rate, setRate] = useState({
    kitchenRate: 5,
    accessoriesRate: 10,
    kitchenloftRate: 2,
    utilityRate: 3,
  });

  useEffect(() => {
    setRate(allRates[packageType]);
    console.log(allRates[packageType]);
  }, [packageType]);

  const { name, email, phone, address } = clientDetail;
  const { kitchen, accessories, kitchenloft, utility } = kitchenAndUtilities;
  const { kitchenRate, accessoriesRate, kitchenloftRate, utilityRate } = rate;

  const handleClient = (e) => {
    e.persist();
    setClientDetail((clientDetail) => ({
      ...clientDetail,
      [e.target.name]: e.target.value,
    }));
  };

  const calculateUom = (sqft, ratePerSqft) => {
    return sqft * ratePerSqft;
  };

  const handleKitchenAndUtilities = (e) => {
    e.persist();
    setKitchenAndUtilities((kitchenAndUtilities) => ({
      ...kitchenAndUtilities,
      [e.target.name]: e.target.value,
    }));
  };

  const handlePackage = (e) => {
    e.persist();
    setPackageType(e.target.value);
  };

  const doSubmit = async (e) => {
    e.preventDefault();
    const estimate = {
      clientDetail,
      packageType,
      uom: {
        kitchenandutilities: kitchenAndUtilities,
      },
    };

    setLoading(true);

    try {
      http.setJwt(localStorage.getItem("token"));
      const response = await http.post(
        "http://localhost:5000/users/estimations",
        estimate
      );
      console.log(response);
      setLoading(false);
      setAlert("Estimation Saved");
      setTimeout(() => {
        setAlert("");
      }, 4000);
    } catch (ex) {
      setLoading(false);
      if (ex.response && ex.response.status === 400) {
        console.log(ex.response.data.errors);
        setErrors({ ...errors, clientError: ex.response.data.errors });
        setTimeout(() => {
          const newError = [{ ...errors }];
          delete newError.loginError;
          setErrors(newError);
        }, 3000);
      }
    }

    // console.log(estimate);
  };

  return (
    <div className='contact mt-header'>
      <div className='row p-0 m-0 align-items-center justify-content-center'>
        <div className='col-md-9 mt-5 d-flex align-items-center justify-content-center flex-column'>
          <form className='php-email-form' onSubmit={doSubmit}>
            <h3>Customer Details</h3>
            <div className='form-group'>
              <label htmlFor='username'>Full Name</label>
              <input
                type='text'
                className='form-control'
                name='name'
                id='name'
                onChange={(e) => handleClient(e)}
                value={name}
              />
            </div>

            <div className='form-group'>
              <label htmlFor='phone'>Phone</label>
              <input
                type='text'
                className='form-control'
                name='phone'
                id='phone'
                onChange={(e) => handleClient(e)}
                value={phone}
              />
            </div>

            <div className='form-group'>
              <label htmlFor='email'>Email</label>
              <input
                type='text'
                className='form-control'
                name='email'
                id='email'
                onChange={(e) => handleClient(e)}
                value={email}
              />
            </div>

            <div className='form-group'>
              <label htmlFor='address'>Address</label>
              <input
                type='text'
                className='form-control'
                name='address'
                id='address'
                onChange={(e) => handleClient(e)}
                value={address}
              />
            </div>

            <h3 className='mb-4'>Select Package</h3>

            <div className='form-group'>
              <select
                name='packageType'
                id='packageType'
                value={packageType}
                onChange={(e) => handlePackage(e)}
                className='col'
              >
                <option value='essential'>Essential</option>
                <option value='comfort'>Comfort</option>
                <option value='premium'>Premium</option>
                <option value='luxury'>Luxury</option>
              </select>
            </div>

            <h3 className='mb-4'>Initial Estimator</h3>

            <table className='table text-center'>
              <thead>
                <tr>
                  <th>Sl.No</th>
                  <th>Location</th>
                  <th>UOM(SFT/Lot)</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>Kitchen</td>
                  <td>
                    <input
                      type='number'
                      name='kitchen'
                      id='kitchen'
                      value={kitchen}
                      onChange={(e) => handleKitchenAndUtilities(e)}
                    />
                  </td>
                  <td>
                    <p className='alert alert-warning'>
                      {calculateUom(kitchen, kitchenRate)}
                    </p>
                  </td>
                </tr>
                <tr>
                  <td>1</td>
                  <td>Accessories</td>
                  <td>
                    <input
                      type='number'
                      name='accessories'
                      id='accessories'
                      value={accessories}
                      onChange={(e) => handleKitchenAndUtilities(e)}
                    />
                  </td>
                  <td>
                    <p className='alert alert-warning'>
                      {calculateUom(accessories, accessoriesRate)}
                    </p>
                  </td>
                </tr>
                <tr>
                  <td>1</td>
                  <td>Kitchen Loft</td>
                  <td>
                    <input
                      type='number'
                      name='kitchenloft'
                      id='kitchenloft'
                      value={kitchenloft}
                      onChange={(e) => handleKitchenAndUtilities(e)}
                    />
                  </td>
                  <td>
                    <p className='alert alert-warning'>
                      {calculateUom(kitchenloft, kitchenloftRate)}
                    </p>
                  </td>
                </tr>
                <tr>
                  <td>1</td>
                  <td>Utility</td>
                  <td>
                    <input
                      type='number'
                      name='utility'
                      id='utility'
                      value={utility}
                      onChange={(e) => handleKitchenAndUtilities(e)}
                    />
                  </td>
                  <td>
                    <p className='alert alert-warning'>
                      {calculateUom(utility, utilityRate)}
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>

            <div className='text-center'>
              <button type='submit' className='btn btn-primary'>
                Save Estimate
              </button>
            </div>
          </form>

          {loading ? (
            <Spinner></Spinner>
          ) : (
            <ul className='list-style-none mt-3'>
              {errors.clientError &&
                errors.clientError.map((error, i) => (
                  <li key={i} className='alert alert-danger'>
                    {error.msg}
                  </li>
                ))}
            </ul>
          )}
          {alert && <p className='alert alert-success'>{alert}</p>}
        </div>
      </div>
    </div>
  );
};

export default InitialEstimator;
