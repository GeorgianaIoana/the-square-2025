import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import ContactSection from '../Contact';
import { LanguageProvider } from '../../contexts/LanguageContext';

// Mock the ContactMap component
vi.mock('../ContactMap', () => ({
  default: () => <div data-testid="contact-map">Map</div>,
}));

function renderContact() {
  return render(
    <MemoryRouter>
      <LanguageProvider>
        <ContactSection />
      </LanguageProvider>
    </MemoryRouter>
  );
}

describe('Contact Form - Manual Testing Scenarios', () => {
  beforeEach(() => {
    window.sessionStorage.clear();
    vi.restoreAllMocks();
  });

  it('should show validation message when submitting without consent', async () => {
    const user = userEvent.setup();
    renderContact();

    // Fill in all required fields
    await user.type(screen.getByLabelText(/Numele tău/i), 'Ion Popescu');
    await user.type(screen.getByLabelText(/Număr de telefon/i), '0741234567');
    await user.type(screen.getByLabelText(/Email/i), 'ion@example.com');
    await user.type(screen.getByLabelText(/Mesaj/i), 'Test message');

    // Get submit button - it should be disabled
    const submitBtn = screen.getByRole('button', { name: /Trimite/i });
    expect(submitBtn).toBeDisabled();
  });

  it('should enable submit button when consent is checked', async () => {
    const user = userEvent.setup();
    renderContact();

    // Fill in all fields
    await user.type(screen.getByLabelText(/Numele tău/i), 'Ion Popescu');
    await user.type(screen.getByLabelText(/Număr de telefon/i), '0741234567');
    await user.type(screen.getByLabelText(/Email/i), 'ion@example.com');
    await user.type(screen.getByLabelText(/Mesaj/i), 'Test message');

    // Check consent
    const checkbox = screen.getByRole('checkbox', { name: /Politicii de Confidențialitate/i });
    await user.click(checkbox);

    // Submit button should now be enabled
    const submitBtn = screen.getByRole('button', { name: /Trimite/i });
    expect(submitBtn).toBeEnabled();
  });

  it('should successfully submit form with all valid data', async () => {
    const user = userEvent.setup();

    // Mock successful API response
    const fetchSpy = vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce(
      new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      })
    );

    renderContact();

    // Fill in all fields
    await user.type(screen.getByLabelText(/Numele tău/i), 'Ion Popescu');
    await user.type(screen.getByLabelText(/Număr de telefon/i), '0741234567');
    await user.type(screen.getByLabelText(/Email/i), 'ion@example.com');
    await user.type(screen.getByLabelText(/Mesaj/i), 'Salut! Vreau să mă înscriu la cursuri.');

    // Check consent
    const checkbox = screen.getByRole('checkbox', { name: /Politicii de Confidențialitate/i });
    await user.click(checkbox);

    // Submit form
    const submitBtn = screen.getByRole('button', { name: /Trimite/i });
    await user.click(submitBtn);

    // Verify success message appears
    await waitFor(() => {
      expect(screen.getByRole('status')).toHaveTextContent(/Mulțumim/i);
    });

    // Verify API was called with correct data
    expect(fetchSpy).toHaveBeenCalledOnce();
    expect(fetchSpy).toHaveBeenCalledWith(
      'https://api.web3forms.com/submit',
      expect.objectContaining({
        method: 'POST',
        body: expect.any(FormData),
      })
    );

    // Verify FormData contains required fields
    const callArgs = fetchSpy.mock.calls[0];
    const formData = callArgs[1]?.body as FormData;
    expect(formData.get('access_key')).toBe('3a3bc6f4-794b-4588-9dc4-b5ea1eb8be5b');
    expect(formData.get('name')).toBe('Ion Popescu');
    expect(formData.get('phone')).toBe('0741234567');
    expect(formData.get('email')).toBe('ion@example.com');
    expect(formData.get('message')).toBe('Salut! Vreau să mă înscriu la cursuri.');
    expect(formData.get('consent')).toBe('true');
    expect(formData.get('botcheck')).toBe('');
  });

  it('should handle API errors gracefully', async () => {
    const user = userEvent.setup();

    // Mock API error response
    vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce(
      new Response(JSON.stringify({ success: false, message: 'Invalid API key' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      })
    );

    renderContact();

    // Fill and submit form
    await user.type(screen.getByLabelText(/Numele tău/i), 'Ion');
    await user.type(screen.getByLabelText(/Număr de telefon/i), '0741234567');
    await user.type(screen.getByLabelText(/Email/i), 'ion@example.com');
    await user.click(screen.getByRole('checkbox', { name: /Politicii de Confidențialitate/i }));
    await user.click(screen.getByRole('button', { name: /Trimite/i }));

    // Should show error message
    await waitFor(() => {
      const status = screen.getByRole('status');
      expect(status).toHaveTextContent(/problemă|Invalid API key/i);
    });
  });

  it('should persist form data in sessionStorage', async () => {
    const user = userEvent.setup();
    renderContact();

    // Type in name field
    await user.type(screen.getByLabelText(/Numele tău/i), 'Maria Ionescu');

    // Verify data was persisted
    await waitFor(() => {
      const draft = window.sessionStorage.getItem('contactFormDraft');
      expect(draft).toBeTruthy();
      const parsed = JSON.parse(draft!);
      expect(parsed.name).toBe('Maria Ionescu');
    });
  });

  it('should strip non-numeric characters from phone input', async () => {
    const user = userEvent.setup();
    renderContact();

    const phoneInput = screen.getByLabelText(/Număr de telefon/i);
    await user.type(phoneInput, '074-123-4567 abc');

    expect(phoneInput).toHaveValue('0741234567');
  });
});
