'use client';

import Giscus from '@giscus/react';
import { useTheme } from 'next-themes';

export default function CommentSection({ locale }: { locale: string }) {
  const { theme } = useTheme();

  return (
    <div className="card p-6">
      <h3 className="mb-6 text-lg font-bold text-[var(--text-primary)]">
        {locale === 'fr' ? 'Commentaires' : 'Comments'}
      </h3>
      <Giscus
        repo="zoom-BT/ZoxBT_Blogfolio"
        repoId="R_kgDORSHPag"
        category="General"
        categoryId="DIC_kwDORSHPas4C2oIB"
        mapping="pathname"
        strict="0"
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="top"
        theme={theme === 'dark' ? 'dark' : 'light'}
        lang={locale === 'fr' ? 'fr' : 'en'}
        loading="lazy"
      />
      <p className="mt-4 text-center text-xs text-[var(--text-tertiary)]">
        {locale === 'fr'
          ? 'Les commentaires utilisent GitHub Discussions. Connectez-vous avec votre compte GitHub.'
          : 'Comments use GitHub Discussions. Sign in with your GitHub account.'}
      </p>
    </div>
  );
}
