'use client';

import { useState } from 'react';
import type { ContractFields } from '@/lib/types';
import PermissionForm from './PermissionForm';
import ContractPreview from './ContractPreview';

const INITIAL: Record<string, ContractFields> = {
  es: { yourName: '', otherName: '', relation: 'pareja', days: 7 },
  en: { yourName: '', otherName: '', relation: 'partner', days: 7 },
};

export default function PermitPageClient({ locale }: { locale: string }) {
  const loc = locale === 'en' ? 'en' : 'es';
  const [fields, setFields] = useState<ContractFields>(INITIAL[loc]);

  return (
    <div className="flex flex-col md:flex-row md:h-screen">
      <div className="w-full md:w-2/5 bg-[#0a0a0a] md:overflow-y-auto flex-shrink-0">
        <PermissionForm fields={fields} onChange={setFields} locale={loc} />
      </div>
      <div className="w-full md:w-3/5 bg-[#f5f5f0] md:overflow-y-auto">
        <ContractPreview fields={fields} locale={loc} />
      </div>
    </div>
  );
}
