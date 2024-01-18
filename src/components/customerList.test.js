import React from "react";
import { render, screen, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import CustomerList from "./CustomerList";
import CustomerForm from "./CustomerForm";

describe("CustomerList Component", () => {
  const customers = [
    {
      id: 1,
      name: "John Doe",
      email: "email@example.com",
      channel: "Website",
      address: "123 Main St",
      postal: "12345",
      city: "Sample City",
      province: "Sample Province",
      country: "Sample Country",
    },
  ];

  const onEditCustomersMock = jest.fn();
  const onOpenModalMock = jest.fn();

  it("renders CustomerList component with customer data", () => {
    render(
      <CustomerList
        customers={customers}
        onEditCustomers={onEditCustomersMock}
        onOpenModal={onOpenModalMock}
      />
    );
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(
      screen
        .getAllByText("email@example.com")
        .some((element) => element.textContent === "email@example.com")
    ).toBe(true);

    expect(screen.getByText("Website")).toBeInTheDocument();
    expect(screen.getByText("123 Main St")).toBeInTheDocument();
    expect(screen.getByText("12345")).toBeInTheDocument();
    expect(screen.getByText("Sample Province")).toBeInTheDocument();
    expect(screen.getByText("Sample Country")).toBeInTheDocument();
    expect(
      screen
        .getAllByText("Sample City")
        .some((element) => element.textContent === "Sample City")
    ).toBe(true);
    const editButtons = screen.getAllByText("Edit");
    expect(editButtons.length).toBe(customers.length);
  });

  it("calls onEditCustomers and onOpenModal functions when Edit button is clicked", () => {
    render(
      <CustomerList
        customers={customers}
        onEditCustomers={onEditCustomersMock}
        onOpenModal={onOpenModalMock}
      />
    );
    const editButton = screen.getByText("Edit");
    editButton.click();
    expect(onEditCustomersMock).toHaveBeenCalledWith(customers[0].id);
    expect(onOpenModalMock).toHaveBeenCalled();
  });
});
