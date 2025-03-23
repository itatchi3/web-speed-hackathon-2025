import { ElementScrollRestoration } from '@epic-web/restore-scroll';
import { StandardSchemaV1 } from '@standard-schema/spec';
import { ArrayValues } from 'type-fest';

import { EpisodeItem } from '@wsh-2025/client/src/features/recommended/components/EpisodeItem';
import { SeriesItem } from '@wsh-2025/client/src/features/recommended/components/SeriesItem';
import { useScrollSnap } from '@wsh-2025/client/src/features/recommended/hooks/useScrollSnap';
import { getRecommendedModulesResponse } from '@wsh-2025/schema/src/openapi/schema';

interface Props {
  module: ArrayValues<StandardSchemaV1.InferOutput<typeof getRecommendedModulesResponse>>;
}

export const CarouselSection = ({ module }: Props) => {
  const containerRef = useScrollSnap({ scrollPadding: 24 });

  return (
    <>
      <div className="w-full">
        <h2 className="mb-[16px] w-full text-[22px] font-bold">{module.title}</h2>
        <div
          key={module.id}
          ref={containerRef}
          className={`relative mx-[-24px] grid h-[154px] auto-cols-[276px] grid-flow-col gap-x-[12px] overflow-x-auto overflow-y-hidden pr-[56px] pl-[24px]`}
          data-scroll-restore={`carousel-${module.id}`}
        >
          {module.items.map((item) => (
            <div key={item.id}>
              {item.series != null ? <SeriesItem series={item.series} /> : null}
              {item.episode != null ? <EpisodeItem episode={item.episode} /> : null}
            </div>
          ))}
        </div>
      </div>

      <ElementScrollRestoration direction="horizontal" elementQuery={`[data-scroll-restore="carousel-${module.id}"]`} />
    </>
  );
};
