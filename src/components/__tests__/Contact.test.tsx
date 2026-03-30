import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import ContactSection from '../Contact';
import { LanguageProvider } from '../../contexts/LanguageContext';

// Mock the ContactMap component (renders an iframe we don't need in tests)
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

describe('ContactSection', () => {
  beforeEach(() => {
    window.sessionStorage.clear();
    vi.restoreAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  // ── Rendering ──────────────────────────────────────────────

  it('renders the contact form with all fields', () => {
    renderContact();

    expect(screen.getByLabelText(/Numele tău/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Număr de telefon/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Mesaj/i)).toBeInTheDocument();
  });

  it('renders the consent checkbox', () => {
    renderContact();

    const checkbox = screen.getByRole('checkbox', { name: /Politicii de Confidențialitate/i });
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).not.toBeChecked();
  });

  it('renders the privacy policy link in the consent label', () => {
    renderContact();

    const link = screen.getByRole('link', { name: /Politicii de Confidențialitate/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/privacy-policy');
  });

  it('renders the submit button', () => {
    renderContact();

    expect(screen.getByRole('button', { name: /Trimite/i })).toBeInTheDocument();
  });

  // ── Checkbox behaviour ─────────────────────────────────────

  it('submit button is disabled when consent checkbox is unchecked', () => {
    renderContact();

    const submitBtn = screen.getByRole('button', { name: /Trimite/i });
    expect(submitBtn).toBeDisabled();
  });

  it('submit button becomes enabled after checking the consent checkbox', async () => {
    const user = userEvent.setup();
    renderContact();

    const checkbox = screen.getByRole('checkbox', { name: /Politicii de Confidențialitate/i });
    const submitBtn = screen.getByRole('button', { name: /Trimite/i });

    expect(submitBtn).toBeDisabled();

    await user.click(checkbox);

    expect(checkbox).toBeChecked();
    expect(submitBtn).toBeEnabled();
  });

  it('submit button becomes disabled again when unchecking the consent checkbox', async () => {
    const user = userEvent.setup();
    renderContact();

    const checkbox = screen.getByRole('checkbox', { name: /Politicii de Confidențialitate/i });
    const submitBtn = screen.getByRole('button', { name: /Trimite/i });

    await user.click(checkbox);
    expect(submitBtn).toBeEnabled();

    await user.click(checkbox);
    expect(submitBtn).toBeDisabled();
  });

  // ── Form field interactions ────────────────────────────────

  it('allows the user to fill in all form fields', async () => {
    const user = userEvent.setup();
    renderContact();

    const nameInput = screen.getByLabelText(/Numele tău/i);
    const phoneInput = screen.getByLabelText(/Număr de telefon/i);
    const emailInput = screen.getByLabelText(/Email/i);
    const messageInput = screen.getByLabelText(/Mesaj/i);

    await user.type(nameInput, 'Ion Popescu');
    await user.type(phoneInput, '0741234567');
    await user.type(emailInput, 'ion@example.com');
    await user.type(messageInput, 'Bună ziua!');

    expect(nameInput).toHaveValue('Ion Popescu');
    expect(phoneInput).toHaveValue('0741234567');
    expect(emailInput).toHaveValue('ion@example.com');
    expect(messageInput).toHaveValue('Bună ziua!');
  });

  it('strips non-numeric characters from phone input', async () => {
    const user = userEvent.setup();
    renderContact();

    const phoneInput = screen.getByLabelText(/Număr de telefon/i);
    await user.type(phoneInput, '074-123-abc');

    expect(phoneInput).toHaveValue('074123');
  });

  // ── Draft persistence ──────────────────────────────────────

  it('persists form values to sessionStorage as a draft', async () => {
    const user = userEvent.setup();
    renderContact();

    await user.type(screen.getByLabelText(/Numele tău/i), 'Maria');

    const raw = window.sessionStorage.getItem('contactFormDraft');
    expect(raw).toBeTruthy();
    const draft = JSON.parse(raw!);
    expect(draft.name).toBe('Maria');
  });

  // ── Successful submission ──────────────────────────────────

  it('submits the form successfully and shows success message', async () => {
    const user = userEvent.setup();
    const fetchSpy = vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce(
      new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      })
    );

    renderContact();

    await user.type(screen.getByLabelText(/Numele tău/i), 'Ion Popescu');
    await user.type(screen.getByLabelText(/Număr de telefon/i), '0741234567');
    await user.type(screen.getByLabelText(/Email/i), 'ion@example.com');
    await user.type(screen.getByLabelText(/Mesaj/i), 'Salut!');
    await user.click(screen.getByRole('checkbox', { name: /Politicii de Confidențialitate/i }));

    await user.click(screen.getByRole('button', { name: /Trimite/i }));

    await waitFor(() => {
      expect(screen.getByRole('status')).toHaveTextContent(/Mulțumim/i);
    });

    expect(fetchSpy).toHaveBeenCalledOnce();
    expect(fetchSpy).toHaveBeenCalledWith(
      'https://api.web3forms.com/submit',
      expect.objectContaining({ method: 'POST' })
    );
  });

  // ── Failed submission ──────────────────────────────────────

  it('shows error message when API returns failure', async () => {
    const user = userEvent.setup();
    vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce(
      new Response(JSON.stringify({ success: false }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      })
    );

    renderContact();

    await user.type(screen.getByLabelText(/Numele tău/i), 'Ion');
    await user.type(screen.getByLabelText(/Număr de telefon/i), '0741234567');
    await user.type(screen.getByLabelText(/Email/i), 'ion@example.com');
    await user.click(screen.getByRole('checkbox', { name: /Politicii de Confidențialitate/i }));

    await user.click(screen.getByRole('button', { name: /Trimite/i }));

    await waitFor(() => {
      expect(screen.getByRole('status')).toHaveTextContent(/problemă/i);
    });
  });

  it('shows error message on network failure', async () => {
    const user = userEvent.setup();
    vi.spyOn(globalThis, 'fetch').mockRejectedValueOnce(new Error('Network error'));

    renderContact();

    await user.type(screen.getByLabelText(/Numele tău/i), 'Ion');
    await user.type(screen.getByLabelText(/Număr de telefon/i), '0741234567');
    await user.type(screen.getByLabelText(/Email/i), 'ion@example.com');
    await user.click(screen.getByRole('checkbox', { name: /Politicii de Confidențialitate/i }));

    await user.click(screen.getByRole('button', { name: /Trimite/i }));

    await waitFor(() => {
      expect(screen.getByRole('status')).toHaveTextContent(/problemă/i);
    });
  });
});
