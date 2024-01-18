import React, { useState, useEffect, useMemo } from "react";
import Modal from "react-modal";
import CustomInput from "./CustomInput";
import CustomDropDown from "./CustomDropDown";

const CustomerForm = ({ customer, onSaveCustomer, isOpen, onClose }) => {
  const emptyProps = {
    country: "",
    name: "",
    email: "",
    channel: "",
    address: "",
    city: "",
    postal: "",
    province: "",
  };

  const [formData, setFormData] = useState({ ...emptyProps });
  const [errors, setErrors] = useState({});
  const [availableProvinces, setAvailableProvinces] = useState([]);

  const countriesData = useMemo(
    () => [
      {
        code: "CA",
        name: "Canada",
        provinces: [
          { name: "Alberta", code: "AB" },
          { name: "British Columbia", code: "BC" },
          { name: "Manitoba", code: "MB" },
          { name: "New Brunswick", code: "NB" },
          { name: "Newfoundland and Labrador", code: "NL" },
          { name: "Northwest Territories", code: "NT" },
          { name: "Nova Scotia", code: "NS" },
          { name: "Nunavut", code: "NU" },
          { name: "Ontario", code: "ON" },
          { name: "Prince Edward Island", code: "PE" },
          { name: "Quebec", code: "QC" },
          { name: "Saskatchewan", code: "SK" },
          { name: "Yukon", code: "YT" },
        ],
      },
      {
        code: "US",
        name: "USA",
        provinces: [
          { name: "New York", code: "NY" },
          { name: "Las Angles", code: "LA" },
        ],
      },
    ],
    []
  );
  const channels = [
    { label: "Website", value: "website" },
    { label: "Email", value: "email" },
    { label: "Phone", value: "phone" },
    { label: "Word Of Mouth", value: "word-of-mouth" },
    { label: "Other", value: "other" },
    { label: "Unknown", value: "unknown" },
  ];
  useEffect(() => {
    setFormData({ ...customer });
  }, [customer]);
  useEffect(() => {
    if (formData.country) {
      const selectedCountry = countriesData.find(
        (country) => country.code === formData.country
      );
      setAvailableProvinces(selectedCountry?.provinces || []);
    }
  }, [customer, countriesData, formData.country]);

  const validateFormHandler = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = "Customer Name is required";
    } else if (formData.name.length < 3) {
      newErrors.name = "Name must be 3 characters minimum";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Customer Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Invalid email address";
    }
    return newErrors;
  };
  const saveHandler = () => {
    const hasErrors = validateFormHandler();
    if (Object.keys(hasErrors).length > 0) {
      setErrors(hasErrors);
      return;
    }
    onSaveCustomer(formData);
    onClose();
  };

  const cancelHandler = () => {
    onClose();
  };

  const inputChangeHandler = (event) => {
    const { name, value } = event.target;
    setFormData((preVal) => ({ ...preVal, [name]: value }));
  };

  return (
    <>
      {isOpen && (
        <Modal
          isOpen={isOpen}
          onRequestClose={onClose}
          ariaHideApp={false}
          contentLabel="Customer Form"
          data-testid="CustomerForm"
        >
          <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md mx-auto">
            <h2 className="text-2xl font-semibold mb-4">Edit Customer</h2>
            <form>
              <CustomInput
                label="Name:"
                type="text"
                name="name"
                value={formData.name}
                onChange={inputChangeHandler}
                error={errors.name}
              />
              <CustomInput
                label="Email:"
                type="email"
                name="email"
                value={formData.email}
                onChange={inputChangeHandler}
                error={errors.email}
              />
              <CustomDropDown
                label="Channel:"
                name="channel"
                value={formData.channel}
                options={channels}
                onChange={inputChangeHandler}
              />
              <CustomInput
                label="Address:"
                type="textarea"
                name="address"
                value={formData.address}
                onChange={inputChangeHandler}
              />
              <CustomInput
                label="Postal Code:"
                type="text"
                name="postal"
                value={formData.postal}
                onChange={inputChangeHandler}
              />
              <CustomInput
                label="City:"
                type="text"
                name="city"
                value={formData.city}
                onChange={inputChangeHandler}
              />
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600">
                  Country:
                  <select
                    name="country"
                    value={formData.country}
                    onChange={inputChangeHandler}
                    className="mt-1 p-2 w-full border rounded-md"
                  >
                    <option value="">Select</option>
                    {countriesData.map((country) => (
                      <option key={country.code} value={country.code}>
                        {country.name}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600">
                  Province:
                  <select
                    name="province"
                    value={formData.province}
                    onChange={inputChangeHandler}
                    className="mt-1 p-2 w-full border rounded-md"
                  >
                    <option value="">Select</option>
                    {availableProvinces.map((province) => (
                      <option key={province.code} value={province.code}>
                        {province.name}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
              <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                <button
                  type="button"
                  onClick={saveHandler}
                  className="text-white bg-blue-500 active:bg-yellow-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={cancelHandler}
                  className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </Modal>
      )}
    </>
  );
};

export default CustomerForm;
