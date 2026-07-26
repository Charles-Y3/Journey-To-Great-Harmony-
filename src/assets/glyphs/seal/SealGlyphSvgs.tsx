import xiaoUrl from './xiao.svg?url';
import tiUrl from './ti.svg?url';
import zhongUrl from './zhong.svg?url';
import xinUrl from './xin.svg?url';
import liUrl from './li.svg?url';
import yiUrl from './yi.svg?url';
import lianUrl from './lian.svg?url';
import chiUrl from './chi.svg?url';

/** Shuowen 小篆 faces for 八德 (hosted locally from 汉语国学). */
const SEAL_URLS: Record<string, string> = {
  孝: xiaoUrl,
  悌: tiUrl,
  忠: zhongUrl,
  信: xinUrl,
  禮: liUrl,
  義: yiUrl,
  廉: lianUrl,
  恥: chiUrl,
};

export function SealGlyphSvg({ character }: { character: string }) {
  const url = SEAL_URLS[character];
  if (!url) {
    return <span className="seal-inline-fallback">{character}</span>;
  }
  return (
    <span
      className="seal-inline-mask"
      style={{
        maskImage: `url(${url})`,
        WebkitMaskImage: `url(${url})`,
      }}
      aria-hidden="true"
    />
  );
}
