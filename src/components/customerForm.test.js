import { render, screen, fireEvent, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import CustomerForm from "./CustomerForm";

describe("CustomerForm Component", () => {
  const onSaveCustomerMock = jest.fn();
  const onCloseMock = jest.fn();

  const defaultProps = {
    customer: {
      country: "CA", // to ensure the province data gets populated
      name: "",
      email: "",
      channel: "",
      address: "",
      city: "",
      postal: "",
      province: "",
    },
    onSaveCustomer: onSaveCustomerMock,
    isOpen: true,
    onClose: onCloseMock,
  };

  it("renders CustomerForm component with given data", () => {
    const formData = {
      ...defaultProps,
      customer: {
        name: "John Doe",
        email: "john@example.com",
        channel: "website",
        address: "123 Main St",
        city: "Toronto",
        postal: "12345",
        country: "CA",
        province: "ON",
      },
    };
    render(<CustomerForm {...formData} />);
    // asserting labels
    expect(screen.getByText("Edit Customer")).toBeInTheDocument();
    expect(screen.getByText("Name:")).toBeInTheDocument();
    expect(screen.getByText("Email:")).toBeInTheDocument();
    expect(screen.getByText("Channel:")).toBeInTheDocument();
    expect(screen.getByText("Address:")).toBeInTheDocument();
    expect(screen.getByText("City:")).toBeInTheDocument();
    expect(screen.getByText("Postal Code:")).toBeInTheDocument();
    expect(screen.getByText("Country:")).toBeInTheDocument();
    expect(screen.getByText("Province:")).toBeInTheDocument();
    expect(screen.getByText("Save")).toBeInTheDocument();
    expect(screen.getByText("Cancel")).toBeInTheDocument();

    // asserting test fields
    expect(screen.getByLabelText("Name:")).toHaveValue("John Doe");
    expect(screen.getByLabelText("Email:")).toHaveValue("john@example.com");
    expect(screen.getByLabelText("Channel:")).toHaveValue("website");
    expect(screen.getByLabelText("Address:")).toHaveValue("123 Main St");
    expect(screen.getByLabelText("City:")).toHaveValue("Toronto");
    expect(screen.getByLabelText("Postal Code:")).toHaveValue("12345");
    expect(screen.getByLabelText("Country:")).toHaveValue("CA");
    expect(screen.getByLabelText("Province:")).toHaveValue("ON");
  });

  it("Calls the onSaveCustomer function and onClose function when clicking on Save button", () => {
    render(<CustomerForm {...defaultProps} />);
    const formData = {
      name: "John Doe",
      email: "john@example.com",
      channel: "website",
      address: "123 Main St",
      city: "Toronto",
      postal: "12345",
      country: "CA",
      province: "ON",
    };

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
    fireEvent.change(screen.getByLabelText("City:"), {
      target: { value: formData.city },
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

    fireEvent.click(screen.getByText("Save"));
    expect(onSaveCustomerMock).toHaveBeenCalledWith(formData);

    expect(onCloseMock).toHaveBeenCalled();
  });

  it("Verify validation errors for email and name", () => {
    render(<CustomerForm {...defaultProps} />);
    fireEvent.click(screen.getByText("Save"));
    expect(screen.getByText("Customer Name is required")).toBeInTheDocument();
    expect(screen.getByText("Customer Email is required")).toBeInTheDocument();
  });

  it("calls onClose function when clicking Cancel button", () => {
    render(<CustomerForm {...defaultProps} />);
    fireEvent.click(screen.getByText("Cancel"));
    expect(onCloseMock).toHaveBeenCalled();
  });
});
