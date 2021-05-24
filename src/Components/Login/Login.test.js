import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Login from './Login';

test('UI - Login test', async () => {
    render(<Login/>)
  
    const passwordInput = document.getElementById('password');
    
    fireEvent.change(passwordInput, { target: { value: 'admin' } });

    const loginButton = screen.getByText(/Sign In/i);

    await waitFor(() => {
      fireEvent.click(loginButton);
    });

    const loginContainer = document.querySelector('.login-container');
    
    expect(loginContainer).toBeNull();
});
