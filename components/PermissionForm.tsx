'use client';

import { useRouter } from 'next/navigation';
import type { ContractFields } from '@/lib/types';

interface Props {
  fields: ContractFields;
  onChange: (fields: ContractFields) => void;
  locale: 'es' | 'en';
}

const RELATION_OPTIONS = {
  es: [
    { value: 'pareja',       label: 'Pareja' },
    { value: 'madre',        label: 'Madre' },
    { value: 'padre',        label: 'Padre' },
    { value: 'tutor legal',  label: 'Tutor legal' },
  ],
  en: [
    { value: 'partner',         label: 'Partner' },
    { value: 'mother',          label: 'Mother' },
    { value: 'father',          label: 'Father' },
    { value: 'legal guardian',  label: 'Legal guardian' },
  ],
};

const DYNAMIC_LABEL: Record<string, Record<string, string>> = {
  es: {
    pareja:        'NOMBRE DE TU PAREJA',
    madre:         'NOMBRE DE TU MADRE',
    padre:         'NOMBRE DE TU PADRE',
    'tutor legal': 'NOMBRE DE TU TUTOR LEGAL',
  },
  en: {
    partner:          "PARTNER'S NAME",
    mother:           "MOTHER'S NAME",
    father:           "FATHER'S NAME",
    'legal guardian': "LEGAL GUARDIAN'S NAME",
  },
};

const INPUT =
  'w-full bg-[#1a1a1a] border border-[#333] text-white rounded-[6px] px-4 py-3 text-[14px] ' +
  'focus:outline-none focus:border-[#F3C531] transition-colors placeholder-[#555]';

const LABEL =
  'block text-[#888] text-[11px] font-bold uppercase tracking-[0.12em] mb-2';

export default function PermissionForm({ fields, onChange, locale }: Props) {
  const router = useRouter();
  const options = RELATION_OPTIONS[locale];
  const isComplete = fields.yourName.trim() !== '' && fields.otherName.trim() !== '';

  function set<K extends keyof ContractFields>(key: K, value: ContractFields[K]) {
    onChange({ ...fields, [key]: value });
  }

  const otherLabel =
    DYNAMIC_LABEL[locale][fields.relation] ??
    (locale === 'es' ? 'NOMBRE DE LA OTRA PARTE' : "OTHER PARTY'S NAME");

  return (
    <div className="relative flex flex-col min-h-screen md:min-h-full px-12 py-12">

      {/* Language toggle */}
      <div className="absolute top-6 right-6 flex gap-1">
        {(['es', 'en'] as const).map((l) => (
          <button
            key={l}
            onClick={() => router.push(`/${l}`)}
            className={`px-3 py-1 rounded text-xs font-bold uppercase tracking-wider transition-colors ${
              locale === l ? 'bg-[#F3C531] text-black' : 'text-[#666] hover:text-white'
            }`}
          >
            {l.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Header */}
      <div className="mb-10 mt-6">
        <div className="text-[48px] leading-none mb-4">🎮</div>
        <h1 className="text-white text-2xl font-bold mb-1">
          {locale === 'es' ? 'Permiso Oficial' : 'Official Permit'}
        </h1>
        <p className="text-[#F3C531] text-[13px]">GTA VI · 19 Nov 2026</p>
      </div>

      {/* Form fields */}
      <div className="flex-1 space-y-6">

        {/* 1 — Your name */}
        <div>
          <label className={LABEL}>{locale === 'es' ? 'TU NOMBRE' : 'YOUR NAME'}</label>
          <input
            type="text"
            value={fields.yourName}
            onChange={(e) => set('yourName', e.target.value)}
            placeholder={locale === 'es' ? 'Juan García' : 'John Smith'}
            className={INPUT}
          />
        </div>

        {/* 3 — Relation (before dynamic label field so user sets it first) */}
        <div>
          <label className={LABEL}>{locale === 'es' ? 'RELACIÓN' : 'RELATION'}</label>
          <select
            value={fields.relation}
            onChange={(e) => set('relation', e.target.value)}
            className={INPUT + ' appearance-none cursor-pointer'}
          >
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>

        {/* 2 — Other party name (label is dynamic based on relation) */}
        <div>
          <label className={LABEL}>{otherLabel}</label>
          <input
            type="text"
            value={fields.otherName}
            onChange={(e) => set('otherName', e.target.value)}
            placeholder={locale === 'es' ? 'María García' : 'Mary Smith'}
            className={INPUT}
          />
        </div>

        {/* 4 — Days: custom stepper */}
        <div>
          <label className={LABEL}>
            {locale === 'es' ? 'DÍAS DE PERMISO' : 'DAYS OF PERMIT'}
          </label>
          <div className="flex items-center gap-4 mt-1">
            <button
              type="button"
              onClick={() => set('days', Math.max(1, fields.days - 1))}
              disabled={fields.days <= 1}
              className="w-8 h-8 rounded-full border border-[#F3C531] text-[#F3C531] flex items-center justify-center text-xl font-bold transition-all disabled:opacity-30 hover:bg-[#F3C531] hover:text-black"
              aria-label="Decrease"
            >
              −
            </button>
            <span className="text-white text-[32px] font-bold w-12 text-center leading-none select-none">
              {fields.days}
            </span>
            <button
              type="button"
              onClick={() => set('days', Math.min(30, fields.days + 1))}
              disabled={fields.days >= 30}
              className="w-8 h-8 rounded-full border border-[#F3C531] text-[#F3C531] flex items-center justify-center text-xl font-bold transition-all disabled:opacity-30 hover:bg-[#F3C531] hover:text-black"
              aria-label="Increase"
            >
              +
            </button>
          </div>
        </div>
      </div>

      {/* Download button — only visible when both names are filled */}
      {isComplete && (
        <div className="mt-8 animate-fade-slide-in">
          <button
            type="button"
            onClick={() => window.print()}
            className="w-full bg-[#F3C531] text-black font-bold text-[14px] uppercase tracking-[0.1em] py-[14px] rounded-[6px] hover:bg-yellow-300 active:scale-[0.98] transition-all"
          >
            ⬇ {locale === 'es' ? 'DESCARGAR CONTRATO' : 'DOWNLOAD CONTRACT'}
          </button>
          <p className="text-[#555] text-[10px] text-center mt-2">
            {locale === 'es'
              ? 'El PDF se abrirá en tu impresora o guardará directamente'
              : 'The PDF will open in your printer or save directly'}
          </p>
        </div>
      )}
    </div>
  );
}
