import PermitPageClient from '@/components/PermitPageClient';

export default function Page({ params: { locale } }: { params: { locale: string } }) {
  return <PermitPageClient locale={locale} />;
}
