'use client';

import { useState, FormEvent } from 'react';
import { motion } from 'framer-motion';

// Replace with your Web3Forms access key from https://web3forms.com
const WEB3FORMS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY || 'YOUR_ACCESS_KEY_HERE';

export default function ContactForm({ locale }: { locale: string }) {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const t = locale === 'fr'
    ? { name: 'Votre nom', email: 'Votre email', subject: 'Sujet', message: 'Votre message', send: 'Envoyer le message', sending: 'Envoi en cours...', success: 'Message envoye avec succes!', error: 'Erreur. Reessayez.', subjects: ['Collaboration', 'Recherche', 'Question technique', 'Autre'] }
    : { name: 'Your name', email: 'Your email', subject: 'Subject', message: 'Your message', send: 'Send message', sending: 'Sending...', success: 'Message sent successfully!', error: 'Error. Try again.', subjects: ['Collaboration', 'Research', 'Technical question', 'Other'] };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('sending');

    const form = e.currentTarget;
    const formData = new FormData(form);
    formData.append('access_key', WEB3FORMS_KEY);
    formData.append('from_name', 'Portfolio Contact Form');
    formData.append('subject', `[Portfolio] ${formData.get('subject_choice') || 'New message'}`);

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();

      if (data.success) {
        setStatus('success');
        form.reset();
        setTimeout(() => setStatus('idle'), 4000);
      } else {
        setStatus('error');
        setTimeout(() => setStatus('idle'), 3000);
      }
    } catch {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="card space-y-5 p-8">
      <h2 className="mb-2 text-2xl font-bold text-[var(--text-primary)]">
        {locale === 'fr' ? 'Envoyez-moi un message' : 'Send me a message'}
      </h2>

      {/* Honeypot anti-spam */}
      <input type="checkbox" name="botcheck" className="hidden" />

      <div>
        <label className="mb-1 block text-sm font-medium text-[var(--text-secondary)]">{t.name}</label>
        <input type="text" name="name" required
          className="w-full rounded-lg border border-[var(--border-light)] bg-[var(--bg-secondary)] px-4 py-3 text-sm text-[var(--text-primary)] outline-none transition-all focus:border-[var(--accent-blue)] focus:ring-1 focus:ring-[var(--accent-blue)]"
          placeholder={t.name} />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-[var(--text-secondary)]">{t.email}</label>
        <input type="email" name="email" required
          className="w-full rounded-lg border border-[var(--border-light)] bg-[var(--bg-secondary)] px-4 py-3 text-sm text-[var(--text-primary)] outline-none transition-all focus:border-[var(--accent-blue)] focus:ring-1 focus:ring-[var(--accent-blue)]"
          placeholder={t.email} />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-[var(--text-secondary)]">{t.subject}</label>
        <select name="subject_choice" required
          className="w-full rounded-lg border border-[var(--border-light)] bg-[var(--bg-secondary)] px-4 py-3 text-sm text-[var(--text-primary)] outline-none transition-all focus:border-[var(--accent-blue)] focus:ring-1 focus:ring-[var(--accent-blue)]">
          <option value="">{t.subject}</option>
          {t.subjects.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-[var(--text-secondary)]">{t.message}</label>
        <textarea name="message" required rows={5}
          className="w-full resize-none rounded-lg border border-[var(--border-light)] bg-[var(--bg-secondary)] px-4 py-3 text-sm text-[var(--text-primary)] outline-none transition-all focus:border-[var(--accent-blue)] focus:ring-1 focus:ring-[var(--accent-blue)]"
          placeholder={t.message} />
      </div>

      <motion.button
        type="submit"
        disabled={status === 'sending'}
        whileTap={{ scale: 0.98 }}
        className="w-full rounded-lg bg-[var(--text-primary)] py-3 text-sm font-bold text-[var(--text-inverse)] transition-all hover:opacity-90 disabled:opacity-60"
      >
        {status === 'sending' ? t.sending : status === 'success' ? t.success : t.send}
      </motion.button>

      {status === 'error' && (
        <p className="text-center text-sm text-red-500">{t.error}</p>
      )}
    </form>
  );
}
