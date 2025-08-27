'use client';
import CommunityCard from '@/components/elements/CommunityCard';
import TitleWithSubtitle from '@/components/elements/TitleWithSubtitle';
import { v4 as uuidv4 } from 'uuid';
import { useTranslations } from 'next-intl';

const Communities = () => {
  const t = useTranslations('communities');

  const communitiesWithUUIDs =
    t.raw('communities') &&
    t.raw('communities').map((community) => ({
      ...community,
      uuid: uuidv4(),
    }));

  return (
    <div className="flex flex-col gap-6 text-center items-center justify-center my-10">
      <TitleWithSubtitle
        title={t('title')}
        subTitle={t('description')}
        titleClassName="max-w-xl"
        subTitleClassName="max-w-lg" />
      <CommunityCard communities={communitiesWithUUIDs} />
    </div>
  );
};

export default Communities;
