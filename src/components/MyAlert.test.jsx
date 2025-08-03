import { expect, it } from 'vitest'
import { render, screen } from "@testing-library/react";
import MyAlert from './MyAlert';

it('renders MyAlert', () => {
  render(<MyAlert />); 
  expect(screen.getByText(/welcome to epibooks!/i)).toBeInTheDocument(); 
})