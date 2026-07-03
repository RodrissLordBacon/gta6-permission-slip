'use client';

import { Fragment, useEffect, useState } from 'react';
import { getContractText } from '@/lib/contractText';
import type { ContractFields } from '@/lib/types';

interface Props {
  fields: ContractFields;
  locale: 'es' | 'en';
}

// Unicode private-use area — safe markers that can't appear in user input
const YOUR_MARK  = '';
const OTHER_MARK = '';
const MARKER_RE  = new RegExp(`(${YOUR_MARK}|${OTHER_MARK})`, 'g');

function PlaceholderSpan({ children }: { children: string }) {
  return (
    <span className="contract-placeholder bg-[#ffe066] text-[#999] rounded-[2px] px-1 italic">
      {children}
    </span>
  );
}

/** Replace marker characters with styled placeholder spans; return plain string otherwise. */
function renderMarked(text: string, yourLabel: string, otherLabel: string) {
  if (!text.includes(YOUR_MARK) && !text.includes(OTHER_MARK)) return <>{text}</>;
  const parts = text.split(MARKER_RE);
  return (
    <>
      {parts.map((part, i) => {
        if (part === YOUR_MARK)  return <PlaceholderSpan key={i}>{yourLabel}</PlaceholderSpan>;
        if (part === OTHER_MARK) return <PlaceholderSpan key={i}>{otherLabel}</PlaceholderSpan>;
        return <Fragment key={i}>{part}</Fragment>;
      })}
    </>
  );
}

function SectionTitle({ children }: { children: string }) {
  return (
    <p className="text-[10px] font-bold uppercase tracking-[1px] border-b border-[#ddd] pb-2 mb-4">
      {children}
    </p>
  );
}

export default function ContractPreview({ fields, locale }: Props) {
  // Generated client-side only to avoid SSR/client hydration mismatch
  const [docRef, setDocRef] = useState('');
  useEffect(() => {
    setDocRef(String(Math.floor(Math.random() * 9000) + 1000));
  }, []);

  // Subtle opacity flash whenever a field changes
  const [opacity, setOpacity] = useState(1);
  useEffect(() => {
    setOpacity(0.85);
    const t = setTimeout(() => setOpacity(1), 200);
    return () => clearTimeout(t);
  }, [fields]);

  // Localised placeholder labels
  const yourLabel  = locale === 'es' ? '[Tu nombre]'    : '[Your name]';
  const otherLabel = locale === 'es' ? '[Nombre]'       : '[Name]';

  // Build preview fields: substitute empty names with private-area markers
  const previewFields: ContractFields = {
    ...fields,
    yourName:  fields.yourName.trim()  || YOUR_MARK,
    otherName: fields.otherName.trim() || OTHER_MARK,
  };

  const c = getContractText(previewFields, locale);

  // Shorthand renderer
  const R = (text: string) => renderMarked(text, yourLabel, otherLabel);

  return (
    <div
      id="contract-preview-print"
      style={{
        fontFamily: 'Georgia, "Times New Roman", serif',
        opacity,
        transition: 'opacity 200ms ease',
      }}
      className="px-12 py-4 max-w-[680px] mx-auto"
    >
      {/* ── Contract header block ────────────────────────────────────────── */}
      <div className="bg-[#111] text-white px-8 py-6 rounded-[4px] mb-3">
        <p className="text-[15px] font-bold text-center uppercase tracking-[1px]">
          {c.title}
        </p>
        <p className="text-[11px] text-center text-[#F3C531] mt-4">{c.subtitle}</p>
        <p className="text-[9px] text-center text-[#555] mt-2">Ref: GTA6-2026-{docRef}</p>
      </div>

      {/* ── Place / date ─────────────────────────────────────────────────── */}
      <p className="text-right italic text-[11px] text-[#555] mb-3">{c.place}</p>

      {/* ── PARTIES ──────────────────────────────────────────────────────── */}
      <SectionTitle>{locale === 'es' ? 'Reunidas las partes' : 'The parties'}</SectionTitle>

      <div className="mb-4">
        <p className="text-[10px] font-bold text-[#333] mb-1">{c.parties.cedente.label}:</p>
        <p className="text-[10px] text-[#444] leading-relaxed pl-3">
          {R(c.parties.cedente.name)}
        </p>
      </div>

      <div className="mb-4">
        <p className="text-[10px] font-bold text-[#333] mb-1">{c.parties.beneficiario.label}:</p>
        <p className="text-[10px] text-[#444] leading-relaxed pl-3">
          {R(c.parties.beneficiario.name)}
        </p>
      </div>

      {/* ── EXPONEN ──────────────────────────────────────────────────────── */}
      <SectionTitle>{locale === 'es' ? 'Exponen' : 'Whereas'}</SectionTitle>
      {c.exponen.map((para, i) => (
        <p key={i} className="text-[10px] text-[#333] leading-relaxed pl-3 mb-3">
          {R(para)}
        </p>
      ))}

      {/* ── ACUERDAN ─────────────────────────────────────────────────────── */}
      <SectionTitle>{locale === 'es' ? 'Acuerdan' : 'Agree'}</SectionTitle>
      {c.acuerdan.map((clause, i) => (
        <div key={i} className="contract-clause mb-4">
          <p className="text-[10px] font-bold text-[#111] mb-1">{clause.title}</p>
          <p className="text-[10px] text-[#444] leading-relaxed pl-3">{R(clause.body)}</p>
        </div>
      ))}

      {/* ── SIGNATURES ───────────────────────────────────────────────────── */}
      <div className="mt-6 pt-4 border-t border-[#333] flex gap-8">
        <div className="flex-1">
          <p className="text-[10px] font-bold mb-1">{c.signatures.cedente.label}</p>
          <div className="border-b border-[#333] h-8 mb-1 w-full" />
          <p className="text-[10px] text-[#555]">
            {c.signatures.lineLabel} {R(c.signatures.cedente.name)}
          </p>
        </div>
        <div className="flex-1">
          <p className="text-[10px] font-bold mb-1">{c.signatures.beneficiario.label}</p>
          <div className="border-b border-[#333] h-8 mb-1 w-full" />
          <p className="text-[10px] text-[#555]">
            {c.signatures.lineLabel} {R(c.signatures.beneficiario.name)}
          </p>
        </div>
      </div>

      {/* ── FOOTER ───────────────────────────────────────────────────────── */}
      <div className="contract-footer mt-4 pt-2 border-t border-[#eee] text-center">
        <p className="text-[9px] text-[#999]">{c.footer}</p>
      </div>
    </div>
  );
}
