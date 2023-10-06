import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import QRCodeGenerator from './App';

describe('QRCodeGenerator', () => {
  test('renders QRCodeGenerator component', () => {
    render(<QRCodeGenerator />);
    
    // Check if the component renders without crashing
    const headingElement = screen.getByText(/QR Presence Generator/i);
    expect(headingElement).toBeInTheDocument();
  });

  test('disallows slash in input fields', () => {
    render(<QRCodeGenerator />);

    fireEvent.change(screen.getByLabelText(/Student ID/i), { target: { value: '123/45' } });
    fireEvent.change(screen.getByLabelText(/Full Name/i), { target: { value: 'John/Doe' } });
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'john@example.com' } });

    const submitButton = screen.getByText(/Generate QR Code/i);
    fireEvent.click(submitButton);

    const errorElement = screen.getByText(/Input cannot contain/i);
    expect(errorElement).toBeInTheDocument();
  });

  test('disallows semicolon in input fields', () => {
    render(<QRCodeGenerator />);

    fireEvent.change(screen.getByLabelText(/Student ID/i), { target: { value: '12345' } });
    fireEvent.change(screen.getByLabelText(/Full Name/i), { target: { value: 'John;Doe' } });
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'john@example.com' } });

    const submitButton = screen.getByText(/Generate QR Code/i);
    fireEvent.click(submitButton);

    const errorElement = screen.getByText(/Input cannot contain/i);
    expect(errorElement).toBeInTheDocument();
  });
});
