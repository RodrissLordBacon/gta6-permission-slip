import type { ContractFields, ContractContent } from './types';

function formatDate(locale: 'es' | 'en'): string {
  return new Date().toLocaleDateString(locale === 'es' ? 'es-ES' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function getContractText(fields: ContractFields, locale: 'es' | 'en'): ContractContent {
  const { yourName, otherName, relation, days } = fields;
  const date = formatDate(locale);

  if (locale === 'en') {
    return {
      title: 'TEMPORARY TRANSFER OF GAMING FREEDOM AGREEMENT',
      subtitle: 'Official Document · Grand Theft Auto VI Edition',
      place: `a ${date}`,
      parties: {
        cedente: {
          label: 'The Transferring Party',
          name: `${otherName}, of legal age, acting in full possession of their mental faculties and in an act of generosity without precedent in the history of human relationships.`,
        },
        beneficiario: {
          label: 'The Beneficiary',
          name: `${yourName}, of legal age, who has awaited this moment with a patience that deserves formal recognition.`,
        },
      },
      exponen: [
        `FIRST. That on November 19, 2026, the official launch of Grand Theft Auto VI (hereinafter, «The Event») takes place, an occurrence of widely documented cultural significance.`,
        `SECOND. That The Beneficiary has expressed their legitimate desire to dedicate sufficient time to the experience of said title, free from interruptions, complaints, disapproving looks, or comments such as «are you still playing?».`,
        `THIRD. That ${otherName}, in their capacity as ${relation} and in exercise of their free will and an exemplary spirit of coexistence, accepts the conditions set forth below.`,
      ],
      acuerdan: [
        {
          title: 'Clause 1 — Purpose of the Agreement.',
          body: `${otherName} grants ${yourName} an irrevocable period of gaming freedom of ${days} calendar days counted from November 19, 2026, during which ${yourName} may dedicate as much time as they see fit to the practice of The Event.`,
        },
        {
          title: 'Clause 2 — Obligations of the Transferring Party.',
          body: `For the duration of this agreement, ${otherName} agrees to: (a) refrain from making comments about gaming time; (b) not invoke household chores, errands, or social plans as grounds for interruption; (c) guarantee an environment free of judgement and audible sighs.`,
        },
        {
          title: 'Clause 3 — Obligations of The Beneficiary.',
          body: `${yourName} agrees to: (a) maintain a basic level of personal hygiene; (b) remember that other people exist in their surroundings; (c) express gratitude proportional to the magnanimity of this agreement.`,
        },
        {
          title: 'Clause 4 — Term.',
          body: `This agreement comes into force on November 19, 2026 and expires after ${days} calendar days. Upon expiry, normality shall be restored without the need for any formal act.`,
        },
        {
          title: 'Clause 5 — Nature of the Document.',
          body: 'This agreement is symbolic and affective in nature. Non-compliance generates no legal consequences, though moral ones may apply.',
        },
      ],
      signatures: {
        cedente: { label: 'The Transferring Party', name: otherName },
        beneficiario: { label: 'The Beneficiary', name: yourName },
        lineLabel: 'Signature:',
      },
      footer: 'Document with no legal validity · For entertainment purposes only',
    };
  }

  // Español (default)
  return {
    title: 'CONTRATO DE CESIÓN TEMPORAL DE LIBERTAD LÚDICA',
    subtitle: 'Documento Oficial · Edición Grand Theft Auto VI',
    place: `a ${date}`,
    parties: {
      cedente: {
        label: 'La Parte Cedente',
        name: `${otherName}, mayor de edad, obrando en pleno uso de sus facultades mentales y en un acto de generosidad sin precedentes en la historia de las relaciones humanas.`,
      },
      beneficiario: {
        label: 'El/La Beneficiario/a',
        name: `${yourName}, mayor de edad, quien ha esperado este momento con una paciencia que merece reconocimiento formal.`,
      },
    },
    exponen: [
      `PRIMERO. Que el día 19 de noviembre de 2026 se produce el lanzamiento oficial de Grand Theft Auto VI (en adelante, «El Acontecimiento»), hecho de relevancia cultural ampliamente documentada.`,
      `SEGUNDO. Que El/La Beneficiario/a ha expresado su legítimo deseo de dedicar tiempo suficiente a la experiencia del citado título, sin interrupciones, quejas, miradas reprobatorias ni comentarios del tipo «¿todavía sigues jugando?».`,
      `TERCERO. Que ${otherName}, en su condición de ${relation} y en ejercicio de su libre voluntad y de un espíritu de convivencia ejemplar, acepta las condiciones que se estipulan a continuación.`,
    ],
    acuerdan: [
      {
        title: 'Cláusula 1ª — Objeto del contrato.',
        body: `${otherName} otorga a ${yourName} un período de libertad lúdica irrevocable de ${days} días naturales contados desde el 19 de noviembre de 2026, durante el cual ${yourName} podrá dedicar el tiempo que estime oportuno a la práctica de El Acontecimiento.`,
      },
      {
        title: 'Cláusula 2ª — Obligaciones de La Parte Cedente.',
        body: `Durante la vigencia del presente contrato, ${otherName} se compromete a: (a) abstenerse de realizar comentarios sobre el tiempo de juego; (b) no invocar tareas domésticas, recados o planes sociales como causa de interrupción; (c) garantizar un entorno libre de juicios y suspiros audibles.`,
      },
      {
        title: 'Cláusula 3ª — Obligaciones del/de la Beneficiario/a.',
        body: `${yourName} se compromete a: (a) mantener un nivel básico de higiene personal; (b) recordar que existen personas en su entorno; (c) expresar gratitud proporcional a la magnanimidad del presente acuerdo.`,
      },
      {
        title: 'Cláusula 4ª — Vigencia.',
        body: `El presente contrato entra en vigor el 19 de noviembre de 2026 y expira transcurridos ${days} días naturales. Pasado dicho plazo, la normalidad se restablecerá sin necesidad de acto formal.`,
      },
      {
        title: 'Cláusula 5ª — Naturaleza del documento.',
        body: 'El presente contrato tiene carácter simbólico y afectivo. Su incumplimiento no genera consecuencias legales, aunque sí morales.',
      },
    ],
    signatures: {
      cedente: { label: 'La Parte Cedente', name: otherName },
      beneficiario: { label: 'El/La Beneficiario/a', name: yourName },
      lineLabel: 'Firma:',
    },
    footer: 'Documento sin validez legal · Solo para uso recreativo',
  };
}
