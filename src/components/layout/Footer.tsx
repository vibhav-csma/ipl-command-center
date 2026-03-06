import { ExternalLink } from 'lucide-react';

const CONSUMA_PURPLE = '#7C3AED';

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white py-4 px-6">
      <p className="text-sm text-slate-600 text-center">
        Insights powered by{' '}
        <a
          href="https://consuma.ai"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-0.5 font-semibold hover:underline"
          style={{ color: CONSUMA_PURPLE }}
        >
          Consuma
          <ExternalLink className="w-3.5 h-3.5 ml-0.5" style={{ color: CONSUMA_PURPLE }} />
        </a>
      </p>
    </footer>
  );
}
