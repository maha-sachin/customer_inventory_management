import React from "react";
import { render, screen, waitFor, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import CustomerData from "./CustomerData";

describe("CustomerData Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("displays CustomerList component only", async () => {
    const mockCustomers = [
      {
        id: 2,
        name: "Jane Doe",
        email: "jane@example.com",
        channel: "Email",
        address: "12 Main St",
        postal: "12345678",
        city: "Sample City1",
        province: "Sample Province1",
        country: "Sample Country1",
      },
    ];

    jest.spyOn(global, "fetch").mockResolvedValue({
      json: jest.fn().mockResolvedValue({ customers: mockCustomers }),
    });
    await act(async () => render(<CustomerData />));

    await waitFor(() => {
      const customerListComponent = screen.getByTestId("CustomerData");
      expect(customerListComponent).toBeInTheDocument();
      const yourComponent = screen.queryByTestId("CustomerForm");
      expect(yourComponent).not.toBeInTheDocument();
    });
  });

  it("renders single customer data using CustomerData component", async () => {
    const mockCustomers = [
      {
        id: 1,
        name: "John Doe",
        email: "john@example.com",
        channel: "Website",
        address: "123 Main St",
        postal: "12345",
        city: "Sample City",
        province: "Sample Province",
        country: "Sample Country",
      },
    ];
    jest.spyOn(global, "fetch").mockResolvedValue({
      json: jest.fn().mockResolvedValue({ customers: mockCustomers }),
    });
    await act(async () => render(<CustomerData />));
    expect(screen.getByText("John Doe")).toBeInTheDocument();
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
    expect(
      screen
        .getAllByText("john@example.com")
        .some((element) => element.textContent === "john@example.com")
    ).toBe(true);
  });
  it("renders multiple customer data using CustomerData component", async () => {
    const mockCustomers = [
      {
        id: 1,
        name: "John Doe",
        email: "john@example.com",
        channel: "Website",
        address: "123 Main St",
        postal: "12345",
        city: "Sample City",
        province: "Sample Province",
        country: "Sample Country",
      },
      {
        id: 2,
        name: "Jane Doe",
        email: "jane@example.com",
        channel: "Email",
        address: "12 Main St",
        postal: "12345678",
        city: "Sample City1",
        province: "Sample Province1",
        country: "Sample Country1",
      },
    ];

    jest.spyOn(global, "fetch").mockResolvedValue({
      json: jest.fn().mockResolvedValue({ customers: mockCustomers }),
    });
    await act(async () => render(<CustomerData />));
    await waitFor(() => {
      expect(screen.getByText("John Doe")).toBeInTheDocument();
      expect(screen.getByText("Website")).toBeInTheDocument();
      expect(screen.getByText("123 Main St")).toBeInTheDocument();
      expect(screen.getByText("12345")).toBeInTheDocument();
      expect(screen.getByText("Sample Province")).toBeInTheDocument();
      expect(screen.getByText("Sample Country")).toBeInTheDocument();
      expect(
        screen
          .getAllByText("john@example.com")
          .some((element) => element.textContent === "john@example.com")
      ).toBe(true);
      expect(
        screen
          .getAllByText("Sample City")
          .some((element) => element.textContent === "Sample City")
      ).toBe(true);

      expect(screen.getByText("Jane Doe")).toBeInTheDocument();
      expect(screen.getByText("Website")).toBeInTheDocument();
      expect(screen.getByText("123 Main St")).toBeInTheDocument();
      expect(screen.getByText("12345678")).toBeInTheDocument();
      expect(screen.getByText("Sample Province1")).toBeInTheDocument();
      expect(screen.getByText("Sample Country1")).toBeInTheDocument();
      expect(
        screen
          .getAllByText("jane@example.com")
          .some((element) => element.textContent === "jane@example.com")
      ).toBe(true);
      expect(
        screen
          .getAllByText("Sample City1")
          .some((element) => element.textContent === "Sample City1")
      ).toBe(true);
    });
  });

  it("opens and close CustomerForm modal", async () => {
    const mockCustomers = [
      {
        id: 2,
        name: "Jane Doe",
        email: "jane@example.com",
        channel: "Email",
        address: "12 Main St",
        postal: "12345678",
        city: "Sample City1",
        province: "Sample Province1",
        country: "Sample Country1",
      },
    ];
    jest.spyOn(global, "fetch").mockResolvedValue({
      json: jest.fn().mockResolvedValue({ customers: mockCustomers }),
    });
    await act(async () => {
      render(<CustomerData />);
    });

    expect(screen.queryByText("Edit")).toBeInTheDocument();
    await act(async () => {
      userEvent.click(screen.getByText("Edit"));
    });

    screen.findByText("Edit Customer");
    screen.findAllByText("Jane Doe");
    screen.findAllByText("jane@example.com");
    screen.findAllByText("Email");
    screen.findAllByText("12 Main St");
    screen.findAllByText("12345678");
    screen.findAllByText("Sample City1");
    screen.findAllByText("Sample Province1");
    screen.findAllByText("Sample Country1");

    const saveButton = screen.getByRole("button", { name: "Save" });
    expect(saveButton).toBeInTheDocument();
    const cancelButton = screen.getByRole("button", { name: "Cancel" });
    expect(cancelButton).toBeInTheDocument();

    await act(async () => {
      userEvent.click(screen.getByText("Save"));
    });
    const yourComponent = screen.queryByTestId("CustomerForm");
    expect(yourComponent).not.toBeInTheDocument();
  });
});
