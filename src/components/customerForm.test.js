// CustomerForm.test.js
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import CustomerForm from "./CustomerForm";

describe("CustomerForm Component", () => {
  const onSaveCustomerMock = jest.fn();
  const onCloseMock = jest.fn();

  const defaultProps = {
    customer: {
      country: "",
      name: "",
      email: "",
      channel: "",
      address: "",
      postal: "",
      province: "",
    },
    onSaveCustomer: onSaveCustomerMock,
    isOpen: true,
    onClose: onCloseMock,
  };

  it("renders CustomerForm component", () => {
    render(<CustomerForm {...defaultProps} />);
    expect(screen.getByText("Edit Customer")).toBeInTheDocument();
  });

  it("calls onSaveCustomer with form data on Save button click", () => {
    render(<CustomerForm {...defaultProps} />);

    // Mock form input data
    const formData = {
      name: "John Doe",
      email: "john@example.com",
      channel: "email",
      address: "123 Main St",
      postal: "12345",
      country: "CA",
      province: "",
    };

    // Fill in the form
    fireEvent.change(screen.getByLabelText("Name:"), {
      target: { value: formData.name },
    });
    fireEvent.change(screen.getByLabelText("Email:"), {
      target: { value: formData.email },
    });
    fireEvent.change(screen.getByLabelText("Channel:"), {
      target: { value: formData.channel },
    });
    fireEvent.change(screen.getByLabelText("Address:"), {
      target: { value: formData.address },
    });
    fireEvent.change(screen.getByLabelText("Postal Code:"), {
      target: { value: formData.postal },
    });
    fireEvent.change(screen.getByLabelText("Country:"), {
      target: { value: formData.country },
    });
    fireEvent.change(screen.getByLabelText("Province:"), {
      target: { value: formData.province },
    });

    // Click the Save button
    fireEvent.click(screen.getByText("Save"));

    // Verify that onSaveCustomerMock is called with the correct form data
    expect(onSaveCustomerMock).toHaveBeenCalledWith(formData);

    // Verify that onCloseMock is called
    expect(onCloseMock).toHaveBeenCalled();
  });

  it("displays error messages for invalid form data", () => {
    render(<CustomerForm {...defaultProps} />);

    // Click the Save button without entering any data
    fireEvent.click(screen.getByText("Save"));

    // Verify that error messages are displayed
    expect(screen.getByText("Customer Name is required")).toBeInTheDocument();
    expect(screen.getByText("Customer Email is required")).toBeInTheDocument();
  });

  it("calls onClose on Cancel button click", () => {
    render(<CustomerForm {...defaultProps} />);

    // Click the Cancel button
    fireEvent.click(screen.getByText("Cancel"));

    // Verify that onCloseMock is called
    expect(onCloseMock).toHaveBeenCalled();
  });
});
