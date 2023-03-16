import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import App from './App';
import Tasks from './components/Tasks';

test('renders task name in the table', async () => {
  render(<BrowserRouter><App /></BrowserRouter>)
  const linkElement = await screen.findByText(/Wake Up/i)
  expect(linkElement).toBeInTheDocument()
})


test('renders creation time in the table', async () => {
  render(<BrowserRouter><App /></BrowserRouter>)
  const linkElement = await screen.findByText(/Explore World/i)
  expect(linkElement).toBeInTheDocument()
})




