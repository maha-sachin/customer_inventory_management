import React from "react";
import { useState, useEffect } from "react";
import CustomerForm from "./CustomerForm";
import CustomerList from "./CustomerList";

function CustomerData() {
  const [customers, setCustomers] = useState([]);
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);

  const customerUrl =
    "https://waveaccounting.github.io/se-challenge-fe-customers/settings.json";
  const fetchCustomers = async () => {
    try {
      const response = await fetch(customerUrl);
      const data = await response.json();
      setCustomers(data.customers);
    } catch (error) {
      console.error("error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const openModalHandler = () => {
    if (!isModalOpen) {
      setIsModalOpen(true);
    }
  };

  const closeModalHandler = () => {
    setIsModalOpen(false);
  };

  const editCustomerHandler = (customerId) => {
    setEditingCustomer(
      customers.find((customer) => customer.id === customerId)
    );
    openModalHandler();
  };

  const saveCustomerHandler = (formData) => {
    setSuccessMessage("Customer saved successfully!");
    console.log("Success Message (before closing modal):", successMessage);
    setTimeout(() => {
      setSuccessMessage(null);
      console.log("Success Message (after closing modal):", successMessage);
    }, 1500);
    setEditingCustomer(null);
    closeModalHandler();
    console.log("Success Message (after closing modal):", successMessage);
  };

  return (
    <div className="mx-auto" data-testid="CustomerData">
      <CustomerList
        customers={customers}
        onEditCustomers={editCustomerHandler}
        onOpenModal={openModalHandler}
        successMessage={successMessage}
      />
      {editingCustomer && (
        <CustomerForm
          customer={editingCustomer}
          onSaveCustomer={saveCustomerHandler}
          isOpen={isModalOpen}
          onClose={closeModalHandler}
          successMessage={successMessage}
          setSuccessMessage={setSuccessMessage}
        />
      )}
    </div>
  );
}

export default CustomerData;
