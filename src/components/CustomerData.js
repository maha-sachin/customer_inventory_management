import React from "react";
import { useState, useEffect } from "react";
import CustomerForm from "./CustomerForm";
import CustomerList from "./CustomerList";

function CustomerData() {
  const [customers, setCustomers] = useState([]);
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
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
    console.log("Saving customer:", formData);
    setEditingCustomer(null);
    closeModalHandler();
  };

  return (
    <div className="mx-auto ">
      <CustomerList
        customers={customers}
        onEditCustomers={editCustomerHandler}
        onOpenModal={openModalHandler}
      />
      {editingCustomer && (
        <CustomerForm
          customer={editingCustomer}
          onSaveCustomer={saveCustomerHandler}
          isOpen={isModalOpen}
          onClose={closeModalHandler}
        />
      )}
    </div>
  );
}

export default CustomerData;
