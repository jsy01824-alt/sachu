'use client';

/* eslint-disable @next/next/no-img-element -- static design assets are placed at exact Figma geometry */

import { CSSProperties, ReactNode, useCallback, useEffect, useRef, useState } from 'react';
import styles from './dinehill.module.css';

const ASSET = '/dinehill';

// Design stage size (Figma frame: DINEHILL — Homepage / Desktop 1280, each section 1280×720)
const STAGE_W = 1280;
const STAGE_H = 720;
const FOOTER_H = 370;
const MAX_SCALE = 1.25;

const DURATION_MS = 900;
// After a section move, a continuous wheel stream (trackpad inertia) must pause this long
// before another wheel event can trigger the next move.
const WHEEL_IDLE_MS = 160;
const TOUCH_THRESHOLD = 50;

type SectionId = 'hero' | 'restaurants' | 'promotion' | 'gift' | 'instagram' | 'footer';

const SECTIONS: { id: SectionId; label: string; dark: boolean }[] = [
  { id: 'hero', label: 'Home', dark: true },
  { id: 'restaurants', label: 'Our Restaurants', dark: false },
  { id: 'promotion', label: 'Promotion', dark: false },
  { id: 'gift', label: 'Gift Card', dark: false },
  { id: 'instagram', label: 'Instagram', dark: false },
  { id: 'footer', label: 'Footer', dark: true },
];

const LAST = SECTIONS.length - 1;

const PROMOTIONS = [
  {
    title: 'GEN 점심 개시',
    body: '곱창전골부터 황태해장국, 김치찌개까지. 점심에 가장 생각나는 뜨끈하고 든든한 메뉴들이 GEN에 새롭게 찾아왔습니다.',
    image: `${ASSET}/promo-1.png`,
    variant: 'fill',
  },
  {
    title: '직장인을 위한 갓성비 세트',
    body: '초밥과 후토마끼, 미니우동은 물론 돈까스까지 한 상에. GEN이 준비한 새로운 점심을 만나보세요.',
    image: `${ASSET}/promo-2.png`,
    variant: 'cover',
  },
  {
    title: '불향을 입은 아부리',
    body: '불향을 입힌 아부리초밥에 후토마끼와 미니우동을 더했습니다. 익숙한 스시와는 다른 점심 한 상을 만나보세요.',
    image: `${ASSET}/promo-3.png`,
    variant: 'crop',
  },
  {
    title: '한강라면의 뜻밖의 짝',
    body: '한강라면에 칸스시 또는 아부리를 곁들이면 어떤 맛일까요? 의외로 잘 어울리는 두 가지 점심 조합을 만나보세요.',
    image: `${ASSET}/promo-4.png`,
    variant: 'cover',
  },
] as const;

const INSTAGRAM_URL = 'https://www.instagram.com/genkoreanbbq_korea/';

function cx(...names: (string | false | undefined)[]) {
  return names.filter(Boolean).join(' ');
}

function delay(seconds: number): CSSProperties {
  return { '--d': `${seconds}s` } as CSSProperties;
}

function SectionTitle({ title, top }: { title: string; top: number }) {
  return (
    <div className={cx(styles.sectionTitle, styles.reveal)} style={{ top }}>
      <span className={styles.divider} />
      <h2 className={styles.titleText}>{title}</h2>
    </div>
  );
}

function MoreLink({ d = 0 }: { d?: number }) {
  return (
    <a href="#" className={cx(styles.moreLink, styles.reveal)} style={delay(d)}>
      <span className={styles.navText}>MORE</span>
      <span className={styles.underline} />
    </a>
  );
}

function Section({
  id,
  index,
  active,
  className,
  label,
  children,
}: {
  id: SectionId;
  index: number;
  active: number;
  className?: string;
  label: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      aria-label={label}
      // The footer only covers part of the viewport, so the last section stays revealed above it.
      className={cx(
        styles.section,
        className,
        (active === index || (active === LAST && index === LAST - 1)) && styles.isActive,
      )}
    >
      {children}
    </section>
  );
}

export default function DinehillHome() {
  const [index, setIndex] = useState(0);
  const [viewport, setViewport] = useState({ h: 0, scale: 1 });

  const indexRef = useRef(0);
  const lockedRef = useRef(false);
  const lastWheelRef = useRef(0);
  const needsWheelGapRef = useRef(false);
  const touchStartRef = useRef<number | null>(null);

  const goTo = useCallback((next: number) => {
    const target = Math.max(0, Math.min(LAST, next));
    if (target === indexRef.current || lockedRef.current) return;
    lockedRef.current = true;
    needsWheelGapRef.current = true;
    indexRef.current = target;
    setIndex(target);
    window.setTimeout(() => {
      lockedRef.current = false;
    }, DURATION_MS + 100);
  }, []);

  // Viewport size → section height + stage scale
  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const scale = Math.min(w / STAGE_W, h / STAGE_H, MAX_SCALE);
      setViewport({ h, scale });
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  // Full-page section scrolling: wheel / keyboard / touch move exactly one section.
  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const now = performance.now();
      const gap = now - lastWheelRef.current;
      lastWheelRef.current = now;

      if (lockedRef.current) return;
      if (needsWheelGapRef.current && gap < WHEEL_IDLE_MS) return;
      needsWheelGapRef.current = false;

      if (Math.abs(e.deltaY) < 4) return;
      goTo(indexRef.current + (e.deltaY > 0 ? 1 : -1));
    };

    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (target && /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName)) return;
      switch (e.key) {
        case 'ArrowDown':
        case 'PageDown':
          e.preventDefault();
          goTo(indexRef.current + 1);
          break;
        case ' ':
          e.preventDefault();
          goTo(indexRef.current + (e.shiftKey ? -1 : 1));
          break;
        case 'ArrowUp':
        case 'PageUp':
          e.preventDefault();
          goTo(indexRef.current - 1);
          break;
        case 'Home':
          e.preventDefault();
          goTo(0);
          break;
        case 'End':
          e.preventDefault();
          goTo(LAST);
          break;
      }
    };

    const onTouchStart = (e: TouchEvent) => {
      touchStartRef.current = e.touches[0]?.clientY ?? null;
    };
    const onTouchMove = (e: TouchEvent) => {
      e.preventDefault();
    };
    const onTouchEnd = (e: TouchEvent) => {
      const start = touchStartRef.current;
      touchStartRef.current = null;
      if (start == null) return;
      const diff = start - (e.changedTouches[0]?.clientY ?? start);
      if (Math.abs(diff) < TOUCH_THRESHOLD) return;
      goTo(indexRef.current + (diff > 0 ? 1 : -1));
    };

    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('keydown', onKey);
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: false });
    window.addEventListener('touchend', onTouchEnd);
    return () => {
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
    };
  }, [goTo]);

  const vh = viewport.h;
  const footerH = FOOTER_H * viewport.scale;
  // The footer is shorter than a viewport: its "section" only scrolls far enough to reveal it.
  const offset = index < LAST ? index * vh : (LAST - 1) * vh + footerH;
  // `active` drives the reveal animations; it's only set once measured so the hero animates in.
  const active = vh ? index : -1;
  const darkUi = SECTIONS[index].dark;

  const pageStyle = {
    '--dh-scale': viewport.scale,
    ...(vh ? { '--dh-vh': `${vh}px` } : {}),
  } as CSSProperties;

  return (
    <div className={styles.page} style={pageStyle}>
      {/* DINEHILL / Header — fixed over the hero */}
      <header className={cx(styles.header, index !== 0 && styles.headerHidden)}>
        <a href="#" onClick={(e) => {
            e.preventDefault();
            goTo(0);
          }} aria-label="GEN Korean BBQ 홈">
          <img src={`${ASSET}/logo.svg`} alt="GEN Korean BBQ House" className={styles.logo} />
        </a>
        <nav className={cx(styles.primaryNav, styles.navText)} aria-label="주요 메뉴">
          <a href="#">ABOUT</a>
          <a href="#">MENU</a>
          <button type="button" onClick={() => goTo(1)}>
            LOCATIONS
          </button>
          <a href="#">FAQ</a>
          <button type="button" onClick={() => goTo(2)}>
            PROMOTION
          </button>
          <button type="button" onClick={() => goTo(3)}>
            GIFT
          </button>
        </nav>
        <button type="button" className={styles.menuButton} aria-label="전체 메뉴 열기">
          <img src={`${ASSET}/menu.svg`} alt="" />
        </button>
      </header>

      {/* Side dot navigation */}
      <nav
        className={cx(styles.dots, !darkUi && styles.dotsDark, index === LAST && styles.dotsHidden)}
        aria-label="섹션 이동"
      >
        {SECTIONS.slice(0, LAST).map((s, i) => (
          <button
            key={s.id}
            type="button"
            aria-label={s.label}
            aria-current={i === index}
            className={cx(styles.dot, i === index && styles.dotActive)}
            onClick={() => goTo(i)}
          />
        ))}
      </nav>

      <div className={styles.track} style={{ transform: `translate3d(0, ${-offset}px, 0)` }}>
        {/* 01 / Hero */}
        <Section id="hero" index={0} active={active} label="GEN Korean BBQ" className={styles.hero}>
          <img src={`${ASSET}/hero.png`} alt="" className={styles.heroBg} />
          <div className={styles.heroOverlay} />
          <button type="button" className={cx(styles.heroArrow, styles.heroPrev)} aria-label="이전 슬라이드">
            <img src={`${ASSET}/prev.svg`} alt="" />
          </button>
          <button type="button" className={cx(styles.heroArrow, styles.heroNext)} aria-label="다음 슬라이드">
            <img src={`${ASSET}/next.svg`} alt="" />
          </button>
          <div className={styles.stage}>
            <div className={styles.heroContent}>
              <h1 className={cx(styles.heroTitle, styles.reveal)}>GEN KOREAN BBQ</h1>
              <p className={cx(styles.heroSub, styles.reveal)} style={delay(0.15)}>
                젠코리안바베큐
              </p>
              <a href="#" className={cx(styles.heroMore, styles.reveal)} style={delay(0.3)}>
                <span className={styles.navText}>MORE</span>
                <span className={styles.underline} />
              </a>
            </div>
            <div className={cx(styles.heroPagination, styles.reveal)} style={delay(0.45)}>
              <span>1</span>
              <span className={styles.progress} />
              <span>7</span>
            </div>
          </div>
        </Section>

        {/* 02 / Our Restaurants */}
        <Section
          id="restaurants"
          index={1}
          active={active}
          label="Our Restaurants"
          className={styles.restaurants}
        >
          <div className={styles.stage}>
            <SectionTitle title="Our Restaurants" top={172} />
            <div className={styles.restaurantRow}>
              <a href="#" className={cx(styles.restaurantCard, styles.reveal)} style={delay(0.15)}>
                <div className={styles.cardMedia}>
                  <img src={`${ASSET}/gen-card-bg.png`} alt="" className={styles.cover} />
                  <img src={`${ASSET}/gen-card.png`} alt="" className={styles.genPhoto} />
                </div>
                <div className={styles.cardOverlay} />
                <img src={`${ASSET}/gen-card-logo.svg`} alt="GEN Korean BBQ House" className={styles.genLogo} />
              </a>
              <a href="#" className={cx(styles.restaurantCard, styles.reveal)} style={delay(0.3)}>
                <div className={styles.cardMedia}>
                  <img src={`${ASSET}/kan-card-bg.png`} alt="" className={styles.cover} />
                  <img src={`${ASSET}/kan-card.png`} alt="" className={styles.kanPhoto} />
                </div>
                <div className={styles.cardOverlay} />
                <img src={`${ASSET}/kan-card-logo.svg`} alt="Kan Sushi" className={styles.kanLogo} />
              </a>
            </div>
          </div>
        </Section>

        {/* 03 / Promotion */}
        <Section id="promotion" index={2} active={active} label="Promotion" className={styles.promotion}>
          <div className={styles.stage}>
            <SectionTitle title="Promotion" top={48} />
            {PROMOTIONS.map((promo, i) => (
              <a
                key={promo.title}
                href="#"
                className={cx(styles.promoCard, styles.reveal)}
                style={{ left: 84 + i * 284, ...delay(0.1 + i * 0.12) }}
              >
                <div className={cx(styles.promoImage, promo.variant === 'crop' && styles.promoImageShort)}>
                  {promo.variant === 'fill' && (
                    <img src={promo.image} alt="" width={260} height={194} className={styles.promoImageFill} />
                  )}
                  {promo.variant === 'cover' && <img src={promo.image} alt="" className={styles.cover} />}
                  {promo.variant === 'crop' && <img src={promo.image} alt="" className={styles.promoImageCrop} />}
                </div>
                <h3 className={styles.promoTitle}>{promo.title}</h3>
                <p className={styles.promoBody}>{promo.body}</p>
              </a>
            ))}
            <MoreLink d={0.6} />
          </div>
        </Section>

        {/* 04 / Gift Card */}
        <Section id="gift" index={3} active={active} label="Gift Card" className={styles.gift}>
          <div className={styles.stage}>
            <SectionTitle title="Gift Card" top={82} />
            <div className={cx(styles.giftCopy, styles.reveal)} style={delay(0.15)}>
              <h3 className={styles.giftHeading}>특별한 날, GEN을 선물하세요!</h3>
              <p className={styles.giftBody}>
                푸짐한 한 상과 함께하는 즐거운 시간을 GEN 기프트카드에 담았습니다.
                <br />
                생일과 기념일, 고마운 마음을 전하고 싶은 순간에 특별한 한 끼를 선물해보세요.
              </p>
              <div className={styles.giftActions}>
                <a href="#" className={styles.outlineButton}>
                  모바일 카드 구매하기
                </a>
                <a href="#" className={styles.outlineButton}>
                  기프트카드 구매하기
                </a>
              </div>
            </div>
            <div className={cx(styles.giftCard, styles.reveal)} style={{ top: 243, ...delay(0.3) }}>
              <img src={`${ASSET}/giftcard-1.png`} alt="GEN 기프트카드 PREMIER, GOLD" className={styles.cover} />
            </div>
            <div className={cx(styles.giftCard, styles.reveal)} style={{ top: 382, ...delay(0.42) }}>
              <img src={`${ASSET}/giftcard-2.png`} alt="GEN 기프트카드 PLATINUM, BLACK" className={styles.cover} />
            </div>
            <MoreLink d={0.5} />
          </div>
        </Section>

        {/* 05 / Instagram */}
        <Section id="instagram" index={4} active={active} label="Instagram" className={styles.instagram}>
          <div className={styles.stage}>
            <SectionTitle title="Instagram" top={66} />
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noreferrer"
              className={cx(styles.instaHandle, styles.reveal)}
              style={delay(0.1)}
            >
              <img src={`${ASSET}/instagram.svg`} alt="" />
              <span>genkoreanbbq_korea</span>
            </a>
            <div className={styles.instaPosts}>
              {[1, 2, 3, 4, 5, 6].map((n, i) => (
                <a
                  key={n}
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noreferrer"
                  className={cx(styles.instaPost, styles.reveal)}
                  style={delay(0.15 + i * 0.08)}
                >
                  <img src={`${ASSET}/insta-${n}.png`} alt={`GEN 인스타그램 게시물 ${n}`} className={styles.cover} />
                </a>
              ))}
            </div>
          </div>
        </Section>

        {/* DINEHILL / Footer */}
        <footer className={styles.footer}>
          <div className={styles.footerStage}>
            <div className={styles.brandFamily}>
              <span>GEN KOREAN BBQ</span>
              <span>KAN SUSHI</span>
            </div>
            <img src={`${ASSET}/footer-logo.svg`} alt="GEN Korean BBQ House" className={styles.footerLogo} />
            <p className={styles.companyInfo}>
              {'젠케이 유한회사  |  대표자 David Wook Jin Kim\n경기 성남시 수정구 위례서일로 46 1층 115호, 116호, 117호\n젠코리안바베큐 위례점  |  Tel 0507-1420-3057'}
            </p>
            <p className={styles.familySite}>
              FAMILY SITE
              <br />
              <a href="#">GEN KOREAN BBQ</a>
              {'   |   '}
              <a href="#">KAN SUSHI</a>
            </p>
            <p className={styles.copyright}>Copyright © GEN. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </div>
  );
}
