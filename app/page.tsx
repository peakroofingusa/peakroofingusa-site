'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence, useMotionValue } from 'framer-motion';

export default function Home() {
  const [formData, setFormData] = useState({
    name: '', phone: '', email: '', zip: '', service: 'Free Inspection',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [time, setTime] = useState('');
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start']
  });
  const heroY = useTransform(heroProgress, [0, 1], ['0%', '30%']);
  const heroScale = useTransform(heroProgress, [0, 1], [1, 1.15]);
  const heroOpacity = useTransform(heroProgress, [0, 0.8], [1, 0]);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', {
        timeZone: 'America/New_York',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      }));
    };
    updateTime();
    const t = setInterval(updateTime, 1000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const onMove = (e: MouseEvent) => setMouse({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach(e => e.isIntersecting && e.target.classList.add('in')),
      { threshold: 0.1, rootMargin: '-40px' }
    );
    document.querySelectorAll('.reveal-up').forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'generate_lead', {
        event_category: 'lead', event_label: formData.service, value: 1,
      });
    }
    if (typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('track', 'Lead', {
        content_name: formData.service, value: 1, currency: 'USD',
      });
    }
    try {
      await fetch('https://formspree.io/f/mpqkrqvn', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(formData),
      });
    } catch (err) { console.error(err); }
    setSubmitted(true);
    setLoading(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <main className="relative">
      {/* Scroll progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-[var(--accent)] z-[100] origin-left"
        style={{ scaleX }}
      />

      {/* Custom cursor glow (desktop only) */}
      <div
        className="pointer-events-none fixed w-[600px] h-[600px] rounded-full z-[1] hidden lg:block"
        style={{
          left: mouse.x - 300,
          top: mouse.y - 300,
          background: 'radial-gradient(circle, rgba(255,107,44,0.06) 0%, transparent 60%)',
          transition: 'left 0.3s ease-out, top 0.3s ease-out',
        }}
      />

      {/* Top marquee */}
      <div className="bg-[var(--bg-2)] border-b border-[var(--line)] overflow-hidden relative h-10 flex items-center">
        <div className="flex items-center gap-10 whitespace-nowrap marquee-track text-[11px] tracking-[0.3em] uppercase text-[var(--fg-dim)] font-grotesk">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex items-center gap-10 shrink-0 pr-10">
              <span className="text-[var(--accent-2)]">◆</span>
              <span>GAF Master Elite — Top 3% Nationally</span>
              <span className="text-[var(--accent-2)]">◆</span>
              <span>Family Owned Since 1998</span>
              <span className="text-[var(--accent-2)]">◆</span>
              <span>Lifetime Workmanship Warranty</span>
              <span className="text-[var(--accent-2)]">◆</span>
              <span>48-Hour Inspection Booking</span>
              <span className="text-[var(--accent-2)]">◆</span>
              <span>Now Serving NY · NJ · CT</span>
              <span className="text-[var(--accent-2)]">◆</span>
              <span>4.9 ★ from 2,847 Reviews</span>
            </div>
          ))}
        </div>
      </div>

      {/* NAV */}
      <Nav time={time} />

      {/* HERO */}
      <section ref={heroRef} className="relative min-h-[100vh] flex items-center overflow-hidden">
        {/* Ken Burns image bg */}
        <motion.div
          className="absolute inset-0 z-0"
          style={{ y: heroY, scale: heroScale }}
        >
          <div className="absolute inset-0 ken-burns">
            <img
              src="https://images.unsplash.com/photo-1632993843478-13b3e8faf664?auto=format&fit=crop&w=2400&q=80"
              alt=""
              className="w-full h-full object-cover img-warm"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-[var(--bg)]/70 via-[var(--bg)]/75 to-[var(--bg)]"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--bg)] via-transparent to-[var(--bg)]/40"></div>
        </motion.div>

        <div className="noise absolute inset-0 z-[2] pointer-events-none"></div>

        <motion.div
          className="relative z-10 max-w-[1600px] mx-auto px-6 lg:px-12 py-28 lg:py-32 w-full"
          style={{ opacity: heroOpacity }}
        >
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-end">
            <div className="lg:col-span-7 xl:col-span-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="flex items-center gap-3 text-[11px] tracking-[0.3em] uppercase text-[var(--fg-dim)] font-grotesk mb-12"
              >
                <span className="w-2 h-2 rounded-full bg-[var(--accent)] animate-pulse"></span>
                <span>New York · Est. 1998</span>
                <span className="text-[var(--fg-mute)]">/</span>
                <span className="text-[var(--accent-2)]">Currently booking July 2026</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.2 }}
                className="font-display text-[72px] sm:text-[110px] lg:text-[148px] xl:text-[180px] leading-[0.85] tracking-[-0.04em] mb-12"
              >
                <OverflowReveal delay={0.3}>
                  <span>A roof</span>
                </OverflowReveal>
                <OverflowReveal delay={0.45}>
                  <span className="italic text-gradient-warm">built to</span>
                </OverflowReveal>
                <OverflowReveal delay={0.6}>
                  <span>outlive you.</span>
                </OverflowReveal>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.9 }}
                className="text-xl lg:text-2xl text-[var(--fg-dim)] max-w-2xl leading-[1.5] font-light mb-14"
              >
                Three decades. Twelve thousand roofs. One standard — work the weather forgets to ruin.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.1 }}
                className="flex flex-wrap items-center gap-6 mb-20"
              >
                <MagneticButton href="#inspection" primary>
                  <span>Book free inspection</span>
                  <Arrow />
                </MagneticButton>
                <a href="#portfolio" className="group inline-flex items-center gap-4 text-[var(--fg)] text-sm tracking-[0.15em] uppercase font-grotesk">
                  <span className="w-12 h-12 rounded-full border border-[var(--fg)]/30 flex items-center justify-center group-hover:bg-[var(--fg)] group-hover:text-[var(--bg)] transition-all duration-500">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="transition-transform group-hover:translate-x-0.5">
                      <polygon points="5 3 19 12 5 21 5 3"/>
                    </svg>
                  </span>
                  <span className="link-draw">Watch our craft</span>
                </a>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1.3 }}
                className="grid grid-cols-3 gap-6 lg:gap-16 pt-12 border-t border-[var(--fg)]/10 max-w-3xl"
              >
                <Stat value="12,847" label="Roofs installed" />
                <Stat value="27" suffix="yrs" label="Family owned" />
                <Stat value="4.9" suffix="★" label="2,847 reviews" accent />
              </motion.div>
            </div>

            {/* Lead form card floating */}
            <div className="lg:col-span-5 xl:col-span-4" id="inspection">
              <LeadForm
                formData={formData}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                submitted={submitted}
                loading={loading}
              />
            </div>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3 text-[10px] tracking-[0.3em] uppercase text-[var(--fg-dim)] font-grotesk">
          <span>Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="w-px h-10 bg-gradient-to-b from-[var(--fg)]/40 to-transparent"
          />
        </div>
      </section>

      {/* LOGO WALL */}
      <section className="border-y border-[var(--line)] bg-[var(--bg-2)] py-10 relative overflow-hidden fade-mask-x">
        <div className="flex items-center gap-20 whitespace-nowrap marquee-slow">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex items-center gap-20 shrink-0 pr-20">
              {[
                { name: 'GAF', sub: 'Master Elite' },
                { name: 'Owens Corning', sub: 'Platinum' },
                { name: 'CertainTeed', sub: 'SELECT' },
                { name: 'BBB', sub: 'A+ Accredited' },
                { name: 'EPA', sub: 'Lead-Safe' },
                { name: 'IKO', sub: 'ROOFPRO' },
                { name: 'Malarkey', sub: 'Emerald Pro' },
              ].map((c, j) => (
                <div key={`${i}-${j}`} className="flex items-baseline gap-3">
                  <span className="font-display text-3xl lg:text-4xl tracking-tight text-[var(--fg)]">{c.name}</span>
                  <span className="text-[10px] uppercase tracking-[0.25em] text-[var(--fg-mute)] font-grotesk">{c.sub}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* CRAFT — sticky scroll */}
      <section id="craft" className="py-32 lg:py-48 relative">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-20">
            <div className="lg:col-span-5 lg:sticky lg:top-32 h-fit reveal-up">
              <SectionLabel num="01" label="Our Craft" />
              <h2 className="font-display text-[56px] lg:text-[88px] xl:text-[104px] leading-[0.9] tracking-[-0.035em] mb-10 mt-8">
                Three<br/>generations.<br/>
                <span className="italic text-gradient-warm">One obsession.</span>
              </h2>
              <p className="text-[var(--fg-dim)] text-lg leading-[1.6] max-w-md">
                Peak Roofing was founded by Sal Moretti in a one-truck garage in Queens. Today his son Marco runs a fifty-person crew — and still climbs every roof himself before work begins.
              </p>
            </div>

            <div className="lg:col-span-7 space-y-12">
              {[
                { n: '01', t: 'We never subcontract.', sub: 'Not once.', d: 'Every shingle we lay is placed by a Peak employee. It\'s slower. More expensive. The only way to guarantee the work will outlive the warranty.' },
                { n: '02', t: 'Every job documented by drone.', sub: '', d: 'Before, during, after. A photo report captures every nail, underlayment layer, and flashing detail. For insurance claims, this alone has recovered hundreds of thousands for our clients.' },
                { n: '03', t: 'A warranty that means something.', sub: '', d: 'Lifetime workmanship. No mileage caps. No fine-print exclusions. If a shingle we installed fails because of the installation, we replace it. Full stop. No other contractor in New York offers this.' },
                { n: '04', t: 'Pricing that stays where we set it.', sub: '', d: 'Every quote is itemized down to the underlayment. What we quote on day one is what you pay at signoff. No surprise fees. No change-order games. Not how we built this business.' },
              ].map((item) => (
                <article key={item.n} className="reveal-up group border-t border-[var(--line)] pt-10">
                  <div className="flex flex-col lg:flex-row lg:items-start gap-6 lg:gap-10">
                    <div className="font-grotesk text-xs tracking-[0.3em] uppercase text-[var(--accent-2)] lg:w-16 shrink-0 pt-2">{item.n}</div>
                    <div className="flex-1">
                      <h3 className="font-display text-[36px] lg:text-[52px] leading-[1.02] tracking-[-0.03em] mb-5">
                        {item.t} {item.sub && <span className="italic text-[var(--fg-mute)]">{item.sub}</span>}
                      </h3>
                      <p className="text-[var(--fg-dim)] text-[17px] leading-[1.7] max-w-2xl">{item.d}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES — horizontal scroll cards */}
      <section id="services" className="py-32 lg:py-48 bg-[var(--bg-2)] relative grain-sm">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12 relative z-10">
          <div className="reveal-up mb-20 flex flex-col lg:flex-row lg:items-end justify-between gap-10">
            <div>
              <SectionLabel num="02" label="Disciplines" />
              <h2 className="font-display text-[56px] lg:text-[96px] xl:text-[120px] leading-[0.9] tracking-[-0.035em] mt-8 max-w-5xl">
                Four disciplines.<br />
                <span className="italic text-gradient-warm">Zero compromise.</span>
              </h2>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-5 lg:gap-6">
            {[
              { n: '01', t: 'Residential', sub: 'Full replacements & new installs', img: 'https://images.unsplash.com/photo-1635424710928-0544e8879efb?auto=format&fit=crop&w=1600&q=80', d: 'Asphalt, architectural, metal, slate, and cedar. Most homes completed in 2–3 days with daily magnetic nail sweeps and full yard protection.', spec: '2–3 Day Install' },
              { n: '02', t: 'Commercial', sub: 'TPO, EPDM, PVC, modified bitumen', img: 'https://images.unsplash.com/photo-1590274853856-f22d5ee3d228?auto=format&fit=crop&w=1600&q=80', d: 'Warehouse, retail, multi-family, and municipal buildings. Weekend and overnight scheduling available to protect business operations.', spec: '20-Year Membrane' },
              { n: '03', t: 'Storm & Insurance', sub: 'Hail, wind, water restoration', img: 'https://images.unsplash.com/photo-1603575448878-868a20723f5d?auto=format&fit=crop&w=1600&q=80', d: 'Emergency tarp within 24 hours. We work directly with every major carrier and handle the claim paperwork end-to-end.', spec: '24hr Tarp Response' },
              { n: '04', t: 'Inspection & Care', sub: 'Annual maintenance + 21-point audits', img: 'https://images.unsplash.com/photo-1621905252472-e8de8f60b8c6?auto=format&fit=crop&w=1600&q=80', d: 'Catch small issues before they cost thousands. Pre-sale inspections, scheduled maintenance, and photo-documented 21-point reports.', spec: '21-Point Report' },
            ].map((s, i) => (
              <motion.article
                key={s.n}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.7, delay: i * 0.08 }}
                className="group relative overflow-hidden bg-[var(--bg-3)] border border-[var(--line)] cursor-pointer"
              >
                <div className="aspect-[16/10] relative overflow-hidden">
                  <img
                    src={s.img}
                    alt={s.t}
                    className="w-full h-full object-cover img-warm transition-transform duration-[1400ms] group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-2)] via-[var(--bg-2)]/30 to-transparent"></div>
                  <div className="absolute top-6 left-6 right-6 flex items-start justify-between">
                    <span className="font-grotesk text-xs tracking-[0.3em] uppercase text-[var(--accent-2)]">— {s.n}</span>
                    <span className="font-grotesk text-[10px] uppercase tracking-[0.25em] text-[var(--fg)] bg-[var(--bg)]/60 backdrop-blur-md px-3 py-1.5 border border-[var(--fg)]/10">
                      {s.spec}
                    </span>
                  </div>
                </div>
                <div className="p-8 lg:p-12">
                  <div className="text-xs uppercase tracking-[0.25em] text-[var(--fg-mute)] font-grotesk mb-4">{s.sub}</div>
                  <h3 className="font-display text-[40px] lg:text-[56px] leading-[0.95] tracking-[-0.03em] mb-6">
                    {s.t}<span className="text-[var(--accent)]">.</span>
                  </h3>
                  <p className="text-[var(--fg-dim)] leading-[1.7] mb-8">{s.d}</p>
                  <div className="flex items-center gap-3 text-xs tracking-[0.25em] uppercase font-grotesk text-[var(--fg)] group-hover:text-[var(--accent-2)] transition-colors">
                    <span className="link-draw">Request quote</span>
                    <Arrow small />
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section id="process" className="py-32 lg:py-48 relative">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
          <div className="reveal-up mb-20 max-w-4xl">
            <SectionLabel num="03" label="Process" />
            <h2 className="font-display text-[56px] lg:text-[96px] xl:text-[120px] leading-[0.9] tracking-[-0.035em] mt-8">
              From first call<br/>
              to <span className="italic text-gradient-warm">final walk.</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-0 border-t border-[var(--line)]">
            {[
              { d: 'Day 00', t: 'Inspection', desc: 'Senior estimator visits. Full drone + interior assessment. Photo report same day.' },
              { d: 'Day 01–02', t: 'Proposal', desc: 'Itemized quote with three material options. No pressure. We leave. You decide.' },
              { d: 'Day 03–05', t: 'Install', desc: 'Dedicated crew. One job at a time. Daily cleanup. Foreman on-site every hour.' },
              { d: 'Day 05', t: 'Sign-off', desc: 'Foreman walks the roof with you. You sign. Lifetime warranty activated.' },
            ].map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="relative border-b md:border-b-0 md:border-r last:border-r-0 border-[var(--line)] py-12 md:px-8 lg:px-10 group cursor-default"
              >
                <div className="absolute top-0 left-0 w-0 h-[1px] bg-[var(--accent)] group-hover:w-full transition-all duration-700"></div>
                <div className="font-grotesk text-[10px] tracking-[0.3em] uppercase text-[var(--accent-2)] mb-8">{s.d}</div>
                <div className="font-display text-[52px] lg:text-[64px] leading-[0.95] tracking-[-0.03em] mb-6">{s.t}<span className="text-[var(--accent)]">.</span></div>
                <p className="text-[var(--fg-dim)] text-[15px] leading-[1.7] max-w-xs">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PORTFOLIO */}
      <section id="portfolio" className="py-32 lg:py-48 bg-[var(--bg-2)] relative grain-sm">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
          <div className="reveal-up flex flex-col lg:flex-row lg:items-end justify-between gap-10 mb-20">
            <div>
              <SectionLabel num="04" label="Recent Work" />
              <h2 className="font-display text-[56px] lg:text-[96px] xl:text-[120px] leading-[0.9] tracking-[-0.035em] mt-8">
                Selected<br/>
                <span className="italic text-gradient-warm">projects.</span>
              </h2>
            </div>
            <p className="text-[var(--fg-dim)] text-lg leading-[1.6] max-w-md">
              Every project captured with drone footage and photographic sign-off. Transparency is part of the product we sell.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {[
              { loc: 'Brooklyn Heights', borough: 'NY', type: 'Full Replacement', mat: 'GAF Timberline HDZ', days: '3d', val: '$28,400', img: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1400&q=80' },
              { loc: 'East Hampton', borough: 'NY', type: 'Storm Restoration', mat: 'OC Duration', days: '4d', val: '$41,200', img: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=1400&q=80' },
              { loc: 'Scarsdale', borough: 'NY', type: 'New Construction', mat: 'Grand Manor', days: '5d', val: '$52,800', img: 'https://images.unsplash.com/photo-1572120360610-d971b9d7767c?auto=format&fit=crop&w=1400&q=80' },
              { loc: 'Tribeca', borough: 'NY', type: 'Historic Restoration', mat: 'Standing-seam Copper', days: '8d', val: '$78,600', img: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1400&q=80' },
              { loc: 'Greenwich', borough: 'CT', type: 'Full Replacement', mat: 'Natural Slate', days: '6d', val: '$64,400', img: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=80' },
              { loc: 'Montclair', borough: 'NJ', type: 'Commercial TPO', mat: 'Carlisle 60-mil', days: '4d', val: '$32,900', img: 'https://images.unsplash.com/photo-1542621334-a254cf47733d?auto=format&fit=crop&w=1400&q=80' },
            ].map((p, i) => (
              <motion.article
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.8, delay: (i % 3) * 0.1 }}
                className="group cursor-pointer"
              >
                <div className="aspect-[4/5] overflow-hidden mb-6 relative bg-[var(--bg-3)]">
                  <img
                    src={p.img}
                    alt={p.loc}
                    className="w-full h-full object-cover img-warm transition-all duration-[1500ms] ease-out group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg)]/80 via-transparent to-transparent"></div>
                  <div className="absolute top-5 right-5 text-[10px] uppercase tracking-[0.25em] bg-[var(--bg)]/50 backdrop-blur-md border border-[var(--fg)]/10 px-3 py-1.5 font-grotesk">
                    {p.days}
                  </div>
                  <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between">
                    <div>
                      <div className="font-grotesk text-[10px] tracking-[0.25em] uppercase text-[var(--accent-2)] mb-1">{p.type}</div>
                      <div className="font-display text-2xl lg:text-3xl tracking-[-0.02em]">{p.loc}<span className="text-[var(--fg-mute)] text-lg ml-2">{p.borough}</span></div>
                    </div>
                  </div>
                </div>
                <div className="flex items-start justify-between gap-6 pt-2">
                  <div>
                    <div className="font-grotesk text-[10px] tracking-[0.25em] uppercase text-[var(--fg-mute)] mb-2">Material</div>
                    <div className="font-display text-[18px] leading-tight">{p.mat}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-grotesk text-[10px] tracking-[0.25em] uppercase text-[var(--fg-mute)] mb-2">Value</div>
                    <div className="font-display text-[18px] text-[var(--accent-2)] num-col">{p.val}</div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* MASSIVE QUOTE */}
      <section className="py-32 lg:py-48 relative overflow-hidden">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12 relative z-10">
          <div className="reveal-up">
            <SectionLabel num="05" label="In Their Words" />
            <blockquote className="font-display text-[44px] sm:text-[72px] lg:text-[104px] xl:text-[128px] leading-[0.9] tracking-[-0.04em] mt-12 max-w-6xl">
              <span className="text-[var(--fg-mute)]">"</span>They did in three days<br/>what other contractors<br/>couldn't <span className="italic text-gradient-warm">quote</span> in three weeks.<span className="text-[var(--fg-mute)]">"</span>
            </blockquote>
            <div className="flex items-center gap-5 mt-16">
              <div className="w-16 h-16 rounded-full bg-[var(--surface)] border border-[var(--line)] flex items-center justify-center font-display text-2xl">
                M
              </div>
              <div>
                <div className="font-display text-2xl">Margaret Holloway</div>
                <div className="font-grotesk text-[11px] uppercase tracking-[0.3em] text-[var(--fg-mute)] mt-1">
                  Homeowner · Queens, NY · Installed 2025
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section id="reviews" className="py-32 lg:py-48 border-y border-[var(--line)] bg-[var(--bg-2)] grain-sm">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
          <div className="reveal-up flex flex-col lg:flex-row lg:items-end justify-between gap-10 mb-20">
            <div>
              <SectionLabel num="06" label="Reviews" />
              <h2 className="font-display text-[52px] lg:text-[80px] xl:text-[96px] leading-[0.9] tracking-[-0.035em] mt-8">
                2,847 reviews.<br/>
                <span className="italic text-gradient-warm">4.9 average.</span>
              </h2>
            </div>
            <div className="flex items-end gap-10 font-grotesk">
              {[
                { p: 'Google', v: '4.9' },
                { p: 'Yelp', v: '4.8' },
                { p: 'BBB', v: 'A+' },
                { p: 'Angi', v: '4.9' },
              ].map((r) => (
                <div key={r.p} className="text-center">
                  <div className="font-display text-4xl lg:text-5xl num-col mb-2">{r.v}</div>
                  <div className="text-[10px] uppercase tracking-[0.3em] text-[var(--fg-mute)]">{r.p}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 lg:gap-10">
            {[
              { q: 'Honest pricing from the first call. The foreman walked me through every decision. Three other companies quoted — Peak was the only one that actually climbed on the roof first.', n: 'David Kaplan', l: 'Long Island · 2025' },
              { q: 'After the hailstorm they handled the entire insurance claim. I barely had to do anything. The photo documentation recovered $11,000 more than my adjuster first offered.', n: 'Jennifer Park', l: 'Nassau County · 2024' },
              { q: 'Fourth generation in this house. First roof we\'ve ever been proud to show the neighbors. The craftsmanship is genuinely museum-quality — I\'m not exaggerating.', n: 'Thomas Whitfield', l: 'Scarsdale · 2025' },
            ].map((r, i) => (
              <motion.article
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.7, delay: i * 0.12 }}
                className="border-t border-[var(--line)] pt-10"
              >
                <div className="flex gap-0.5 mb-8">
                  {[...Array(5)].map((_, j) => (
                    <svg key={j} width="14" height="14" viewBox="0 0 24 24" fill="var(--accent-2)">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                    </svg>
                  ))}
                </div>
                <p className="font-display text-[24px] lg:text-[28px] leading-[1.3] tracking-[-0.015em] mb-10">
                  "{r.q}"
                </p>
                <div className="pt-6 border-t border-[var(--line)]">
                  <div className="font-display text-xl">{r.n}</div>
                  <div className="font-grotesk text-[10px] uppercase tracking-[0.3em] text-[var(--fg-mute)] mt-1">{r.l}</div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-32 lg:py-48">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          <div className="reveal-up text-center mb-20">
            <SectionLabel num="07" label="Questions" center />
            <h2 className="font-display text-[56px] lg:text-[96px] xl:text-[112px] leading-[0.9] tracking-[-0.035em] mt-8">
              Before you call,<br/>
              <span className="italic text-gradient-warm">you might ask.</span>
            </h2>
          </div>

          <div className="divide-y divide-[var(--line)] border-y border-[var(--line)]">
            {[
              { q: 'How long does a typical roof replacement take?', a: 'Most single-family homes take 2–3 days. Larger or complex multi-dormer roofs may take 4–5 days. Commercial projects scale with size. We give you an exact schedule before work begins and stick to it.' },
              { q: 'Do you work directly with insurance adjusters?', a: 'Yes. We have in-house claim specialists who coordinate with every major carrier (State Farm, Allstate, Liberty Mutual, USAA, and others). Our drone documentation has recovered on average $8,400 more per claim than the initial carrier offer.' },
              { q: 'Are you truly licensed and insured?', a: 'Licensed in NY, NJ, and CT. $2M general liability, full workers comp, and manufacturer certifications including GAF Master Elite (top 3% of contractors nationally). Certificates available on request.' },
              { q: 'What warranty do you actually offer?', a: 'Lifetime workmanship warranty. No mileage caps, no labor exclusions, fully transferable to the next owner. Material warranties range from 30 years to lifetime depending on selection.' },
              { q: 'What does a new roof typically cost?', a: 'Residential replacements range from $9,000 to $32,000 depending on square footage, pitch, material, and existing layer removal. Commercial quoted individually. Every quote is itemized — no hidden fees, no upsells.' },
              { q: 'Can you match my historic home?', a: 'Yes. We specialize in historic restoration — slate, cedar shake, clay tile, standing-seam copper. We work with preservation boards and our master craftsmen have installed on homes dating back to the 1890s.' },
            ].map((item, i) => (
              <details key={i} className="group py-8">
                <summary className="flex items-start justify-between cursor-pointer list-none gap-8">
                  <span className="font-display text-[26px] lg:text-[36px] leading-[1.15] tracking-[-0.02em] flex-1 group-open:text-[var(--accent-2)] transition-colors">
                    {item.q}
                  </span>
                  <span className="font-display text-4xl text-[var(--accent)] group-open:rotate-45 transition-transform duration-500 mt-1 shrink-0 leading-none">+</span>
                </summary>
                <p className="mt-6 text-[var(--fg-dim)] leading-[1.7] text-[16px] max-w-3xl">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="relative overflow-hidden bg-[var(--bg-2)] border-y border-[var(--line)] noise">
        <div className="absolute inset-0 z-0 opacity-30">
          <img
            src="https://images.unsplash.com/photo-1597047084897-51e81819a499?auto=format&fit=crop&w=2400&q=80"
            alt=""
            className="w-full h-full object-cover img-warm"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--bg-2)] via-[var(--bg-2)]/80 to-[var(--bg-2)]"></div>
        </div>

        <div className="relative z-10 max-w-[1600px] mx-auto px-6 lg:px-12 py-32 lg:py-56">
          <div className="reveal-up max-w-5xl">
            <SectionLabel num="08" label="Ready When You Are" />
            <h2 className="font-display text-[80px] sm:text-[120px] lg:text-[184px] xl:text-[224px] leading-[0.82] tracking-[-0.045em] mb-14 mt-12">
              Stop<br/>patching.<br/>
              <span className="italic text-gradient-warm">Start over.</span>
            </h2>
            <p className="text-xl lg:text-2xl text-[var(--fg-dim)] max-w-2xl mb-16 leading-[1.5] font-light">
              Book your free inspection today. A senior estimator will be on your roof within 48 hours.
            </p>
            <div className="flex flex-wrap items-center gap-6">
              <MagneticButton href="#inspection" primary large onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                <span>Book Inspection</span>
                <Arrow />
              </MagneticButton>
              <a href="tel:+18005551234" className="group inline-flex items-center gap-4 text-[var(--fg)] text-sm tracking-[0.2em] uppercase font-grotesk">
                <span className="w-14 h-14 rounded-full border border-[var(--fg)]/20 flex items-center justify-center group-hover:bg-[var(--accent)] group-hover:border-[var(--accent)] transition-all duration-500">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                </span>
                <span className="link-draw">(800) 555-1234</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="pt-28 pb-12 relative">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 mb-24">
            <div className="lg:col-span-5">
              <a href="#" className="flex items-center gap-3 mb-8">
                <svg width="44" height="44" viewBox="0 0 40 40" fill="none">
                  <path d="M6 22L20 8L34 22" stroke="var(--accent)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M10 20V32H30V20" stroke="var(--fg)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="20" cy="26" r="2" fill="var(--accent)"/>
                </svg>
                <div className="leading-none">
                  <div className="font-display text-[26px] tracking-[-0.02em] leading-none">Peak Roofing</div>
                  <div className="font-grotesk text-[10px] tracking-[0.3em] uppercase text-[var(--fg-mute)] mt-1">Est. New York · 1998</div>
                </div>
              </a>
              <p className="text-[var(--fg-dim)] text-[17px] leading-[1.6] max-w-md mb-10">
                New York's most trusted roofing contractor. Family owned. Master Elite certified. Lifetime guaranteed.
              </p>
              <div className="flex items-center gap-6 font-grotesk text-[10px] tracking-[0.3em] uppercase">
                {['Instagram', 'Facebook', 'YouTube', 'LinkedIn'].map((s) => (
                  <a key={s} href="#" className="link-draw text-[var(--fg-dim)] hover:text-[var(--accent-2)] transition">{s}</a>
                ))}
              </div>
            </div>

            <div className="lg:col-span-2">
              <div className="font-grotesk text-[10px] tracking-[0.3em] uppercase text-[var(--accent-2)] mb-6">Services</div>
              <ul className="space-y-3.5 text-[15px] text-[var(--fg-dim)]">
                {['Residential', 'Commercial', 'Storm Damage', 'Inspections', 'Historic'].map((i) => (
                  <li key={i}><a href="#services" className="link-draw hover:text-[var(--fg)] transition">{i}</a></li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-2">
              <div className="font-grotesk text-[10px] tracking-[0.3em] uppercase text-[var(--accent-2)] mb-6">Company</div>
              <ul className="space-y-3.5 text-[15px] text-[var(--fg-dim)]">
                {['Our Craft', 'Portfolio', 'Reviews', 'Careers', 'Press'].map((i) => (
                  <li key={i}><a href="#craft" className="link-draw hover:text-[var(--fg)] transition">{i}</a></li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-3">
              <div className="font-grotesk text-[10px] tracking-[0.3em] uppercase text-[var(--accent-2)] mb-6">Contact</div>
              <div className="space-y-5 text-[15px] text-[var(--fg-dim)] leading-[1.5]">
                <div>
                  <div className="text-[var(--fg)] font-display text-xl mb-1">(800) 555-1234</div>
                  <div className="font-grotesk text-[10px] uppercase tracking-[0.25em] text-[var(--fg-mute)]">Mon–Sat · 7am–7pm EST</div>
                </div>
                <div>
                  <div className="text-[var(--fg)]">hello@peakroofingusa.com</div>
                  <div className="font-grotesk text-[10px] uppercase tracking-[0.25em] text-[var(--fg-mute)] mt-1">Response within 2 hrs</div>
                </div>
                <div>
                  <div className="text-[var(--fg)]">47-28 21st Street</div>
                  <div>Long Island City, NY 11101</div>
                </div>
              </div>
            </div>
          </div>

          {/* Massive wordmark */}
          <div className="py-16 border-t border-[var(--line)] overflow-hidden">
            <div className="font-display text-[18vw] leading-[0.85] tracking-[-0.05em] text-[var(--fg)]/95 whitespace-nowrap">
              PEAK<span className="italic text-[var(--accent)]">.</span>ROOFING
            </div>
          </div>

          <div className="pt-8 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 font-grotesk text-[11px] tracking-[0.15em] uppercase text-[var(--fg-mute)]">
            <div>© {new Date().getFullYear()} Peak Roofing USA · License #NY-7738291</div>
            <div className="flex gap-8">
              <a href="#" className="link-draw">Privacy</a>
              <a href="#" className="link-draw">Terms</a>
              <a href="#" className="link-draw">Accessibility</a>
            </div>
          </div>

          <div className="mt-10 pt-8 border-t border-[var(--line)]/50 text-[10px] text-[var(--fg-mute)]/70 italic leading-relaxed max-w-4xl font-sans">
            Demo site for portfolio and conversion-tracking demonstration purposes. Not a real roofing company. Phone numbers, testimonials, certifications, and portfolio entries shown are illustrative only. Built by Haseeb Syed as part of a conversion-focused landing-page service for home-service contractors.
          </div>
        </div>
      </footer>
    </main>
  );
}

/* ---------- COMPONENTS ---------- */

function Nav({ time }: { time: string }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-500 ${scrolled ? 'bg-[var(--bg)]/80 backdrop-blur-xl border-b border-[var(--line)]' : 'bg-transparent'}`}>
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12 py-5 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2.5 group">
          <svg width="36" height="36" viewBox="0 0 40 40" fill="none">
            <path d="M6 22L20 8L34 22" stroke="var(--accent)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M10 20V32H30V20" stroke="var(--fg)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <circle cx="20" cy="26" r="2" fill="var(--accent)"/>
          </svg>
          <div className="leading-none">
            <div className="font-display text-[22px] tracking-[-0.02em] leading-none">Peak Roofing</div>
            <div className="font-grotesk text-[9px] tracking-[0.3em] uppercase text-[var(--fg-mute)] mt-1">NY · 1998</div>
          </div>
        </a>

        <div className="hidden lg:flex items-center gap-10 font-grotesk text-[12px] tracking-[0.15em] uppercase">
          {['Craft', 'Services', 'Portfolio', 'Process', 'Reviews'].map((l) => (
            <a key={l} href={`#${l.toLowerCase()}`} className="link-draw text-[var(--fg-dim)] hover:text-[var(--fg)] transition">{l}</a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-5">
          <div className="font-grotesk text-[10px] tracking-[0.25em] uppercase text-[var(--fg-mute)]">
            <span className="text-[var(--accent-2)] mr-2">●</span>NYC {time} EST
          </div>
          <a
            href="tel:+18005551234"
            className="inline-flex items-center gap-2 font-grotesk text-[11px] tracking-[0.2em] uppercase bg-[var(--accent)] text-[var(--bg)] px-5 py-3 hover:bg-[var(--accent-2)] transition-all duration-300"
          >
            Call Now
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="7" y1="17" x2="17" y2="7"/>
              <polyline points="7 7 17 7 17 17"/>
            </svg>
          </a>
        </div>
      </div>
    </nav>
  );
}

function OverflowReveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <span className="inline-block overflow-hidden pb-2 -mb-2">
      <motion.span
        className="inline-block"
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        transition={{ duration: 1, ease: [0.2, 0.8, 0.2, 1], delay }}
      >
        {children}
      </motion.span>
    </span>
  );
}

function Stat({ value, suffix, label, accent }: { value: string; suffix?: string; label: string; accent?: boolean }) {
  return (
    <div>
      <div className={`font-display text-5xl lg:text-6xl num-col leading-none ${accent ? 'text-gradient-warm' : ''}`}>
        {value}{suffix && <span className="text-2xl align-top ml-1 italic font-normal">{suffix}</span>}
      </div>
      <div className="font-grotesk text-[10px] uppercase tracking-[0.3em] text-[var(--fg-mute)] mt-3">{label}</div>
    </div>
  );
}

function SectionLabel({ num, label, center }: { num: string; label: string; center?: boolean }) {
  return (
    <div className={`flex items-center gap-4 font-grotesk text-[11px] tracking-[0.3em] uppercase text-[var(--fg-dim)] ${center ? 'justify-center' : ''}`}>
      <span className="w-8 h-px bg-[var(--accent)]"></span>
      <span className="text-[var(--accent-2)]">{num}</span>
      <span>/</span>
      <span>{label}</span>
    </div>
  );
}

function Arrow({ small }: { small?: boolean }) {
  const size = small ? 14 : 18;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="transition-transform group-hover:translate-x-1">
      <line x1="5" y1="12" x2="19" y2="12"/>
      <polyline points="12 5 19 12 12 19"/>
    </svg>
  );
}

function MagneticButton({ href, children, primary, large, onClick }: {
  href: string;
  children: React.ReactNode;
  primary?: boolean;
  large?: boolean;
  onClick?: (e: React.MouseEvent) => void;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 15 });
  const springY = useSpring(y, { stiffness: 200, damping: 15 });

  const handleMouse = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const mx = e.clientX - rect.left - rect.width / 2;
    const my = e.clientY - rect.top - rect.height / 2;
    x.set(mx * 0.2);
    y.set(my * 0.2);
  };
  const handleLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.a
      ref={ref}
      href={href}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      onClick={onClick}
      style={{ x: springX, y: springY }}
      className={`group relative inline-flex items-center gap-3 font-grotesk tracking-[0.2em] uppercase transition-colors duration-300 ${
        primary
          ? `bg-[var(--accent)] text-[var(--bg)] hover:bg-[var(--accent-2)] ${large ? 'px-10 py-6 text-[13px]' : 'px-8 py-5 text-[12px]'}`
          : 'text-[var(--fg)] px-6 py-4 text-[12px] border border-[var(--fg)]/20 hover:bg-[var(--fg)] hover:text-[var(--bg)]'
      }`}
    >
      {children}
    </motion.a>
  );
}

function LeadForm({ formData, handleChange, handleSubmit, submitted, loading }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, delay: 0.5 }}
      className="relative"
    >
      <div className="absolute -top-3 left-8 bg-[var(--accent)] text-[var(--bg)] text-[10px] tracking-[0.3em] uppercase px-4 py-1.5 font-grotesk z-10">
        No Cost · No Obligation
      </div>
      <div className="bg-[var(--bg-2)] border border-[var(--line)] p-8 lg:p-10 relative grain-sm shadow-[0_60px_100px_-30px_rgba(0,0,0,0.8)]">
        <AnimatePresence mode="wait">
          {!submitted ? (
            <motion.div
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="mb-8">
                <div className="font-grotesk text-[10px] uppercase tracking-[0.3em] text-[var(--accent-2)] mb-3">Begin Here</div>
                <h2 className="font-display text-[40px] lg:text-[48px] leading-[0.95] tracking-[-0.025em]">
                  Free inspection.<br/>
                  <span className="italic text-[var(--fg-dim)]">Within 48 hours.</span>
                </h2>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <Field label="Name" name="name" type="text" value={formData.name} onChange={handleChange} placeholder="Alexander Reid" />
                  <Field label="Zip" name="zip" type="text" value={formData.zip} onChange={handleChange} placeholder="10001" />
                </div>
                <Field label="Phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} placeholder="(555) 123-4567" />
                <Field label="Email" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="alex@example.com" />

                <div>
                  <label className="block font-grotesk text-[10px] uppercase tracking-[0.3em] text-[var(--fg-mute)] mb-3">Service Needed</label>
                  <div className="relative">
                    <select
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      className="w-full bg-transparent border-b border-[var(--line)] focus:border-[var(--accent)] outline-none py-3 text-base transition appearance-none cursor-pointer font-sans text-[var(--fg)]"
                    >
                      <option className="bg-[var(--bg-2)]">Free Inspection</option>
                      <option className="bg-[var(--bg-2)]">Full Replacement</option>
                      <option className="bg-[var(--bg-2)]">Repair</option>
                      <option className="bg-[var(--bg-2)]">Storm Damage</option>
                      <option className="bg-[var(--bg-2)]">New Install</option>
                      <option className="bg-[var(--bg-2)]">Commercial</option>
                    </select>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="absolute right-0 top-4 pointer-events-none text-[var(--fg-mute)]">
                      <polyline points="6 9 12 15 18 9"/>
                    </svg>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[var(--accent)] hover:bg-[var(--accent-2)] text-[var(--bg)] py-4 mt-8 font-grotesk tracking-[0.25em] uppercase text-[11px] transition-all duration-300 disabled:opacity-60 flex items-center justify-center gap-3 group"
                >
                  {loading ? (
                    <>
                      <svg width="14" height="14" viewBox="0 0 24 24" className="animate-spin" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
                      </svg>
                      Sending…
                    </>
                  ) : (
                    <>
                      Request Inspection
                      <Arrow small />
                    </>
                  )}
                </button>

                <p className="text-[10px] text-[var(--fg-mute)] text-center tracking-wide pt-2 leading-relaxed font-sans">
                  A senior estimator will call within 2 hours.<br/>
                  No spam. Privacy respected.
                </p>
              </form>
            </motion.div>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="py-14 text-center"
            >
              <div className="inline-block mb-8">
                <motion.svg
                  width="64" height="64" viewBox="0 0 64 64" fill="none"
                  initial={{ rotate: -90 }}
                  animate={{ rotate: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <circle cx="32" cy="32" r="30" stroke="var(--accent)" strokeWidth="1.5" />
                  <motion.path
                    d="M20 32L29 41L44 26"
                    stroke="var(--accent)"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                  />
                </motion.svg>
              </div>
              <div className="font-grotesk text-[10px] uppercase tracking-[0.3em] text-[var(--accent-2)] mb-5">Request Received</div>
              <h3 className="font-display text-[40px] leading-[0.95] mb-6 tracking-[-0.02em]">
                Thank you,<br/>
                <span className="italic">{formData.name.split(' ')[0]}.</span>
              </h3>
              <p className="text-[var(--fg-dim)] text-base leading-[1.6] max-w-sm mx-auto">
                A senior inspector will call within 2 hours. Expect a text from <span className="text-[var(--fg)] font-medium">(800) 555-1234</span>.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

function Field({ label, name, type, value, onChange, placeholder }: any) {
  return (
    <div>
      <label htmlFor={name} className="block font-grotesk text-[10px] uppercase tracking-[0.3em] text-[var(--fg-mute)] mb-3">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full bg-transparent border-b border-[var(--line)] focus:border-[var(--accent)] outline-none py-3 text-base transition placeholder:text-[var(--fg-mute)]/60 font-sans text-[var(--fg)]"
      />
    </div>
  );
}
