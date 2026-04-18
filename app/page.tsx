'use client';

import { useState, useEffect } from 'react';

export default function Home() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    zip: '',
    service: 'Free Roof Inspection',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'generate_lead', {
        event_category: 'lead',
        event_label: formData.service,
        value: 1,
      });
    }
    if (typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('track', 'Lead', {
        content_name: formData.service,
        value: 1,
        currency: 'USD',
      });
    }

    try {
      await fetch('https://formspree.io/f/mpqkrqvn', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(formData),
      });
    } catch (err) {
      console.error('Submit error:', err);
    }
    setSubmitted(true);
    setLoading(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <main className="min-h-screen bg-[var(--cream)] text-[var(--ink)] overflow-x-hidden">
      {/* Running announcement bar */}
      <div className="bg-[var(--ink)] text-[var(--cream)] overflow-hidden relative h-9 flex items-center">
        <div className="flex items-center gap-12 whitespace-nowrap marquee text-[11px] tracking-[0.25em] uppercase font-medium">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex items-center gap-12 shrink-0 pr-12">
              <span>GAF Master Elite Certified</span>
              <span className="text-[var(--copper)]">✦</span>
              <span>Family Owned Since 1998</span>
              <span className="text-[var(--copper)]">✦</span>
              <span>Lifetime Workmanship Warranty</span>
              <span className="text-[var(--copper)]">✦</span>
              <span>Serving the Tri-State Area</span>
              <span className="text-[var(--copper)]">✦</span>
              <span>Licensed & Fully Insured</span>
              <span className="text-[var(--copper)]">✦</span>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <nav className={`sticky top-0 z-50 transition-all duration-500 ${scrolled ? 'bg-[var(--cream)]/95 backdrop-blur-md border-b border-[var(--ink)]/10' : 'bg-transparent'}`}>
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 py-5 flex items-center justify-between">
          <a href="#" className="flex items-center gap-2.5 group">
            <svg width="36" height="36" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="transition-transform group-hover:scale-105">
              <path d="M6 22L20 8L34 22" stroke="var(--copper)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M10 20V32H30V20" stroke="var(--ink)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="20" cy="26" r="2" fill="var(--copper)"/>
            </svg>
            <div className="leading-none">
              <div className="font-display text-[22px] tracking-tight leading-none">Peak Roofing</div>
              <div className="text-[9px] tracking-[0.3em] uppercase text-[var(--stone)] mt-1 font-sans">Est. New York · 1998</div>
            </div>
          </a>

          <div className="hidden lg:flex items-center gap-10 text-[13px] tracking-wide">
            <a href="#craft" className="link-underline hover:text-[var(--copper)] transition">Our Craft</a>
            <a href="#services" className="link-underline hover:text-[var(--copper)] transition">Services</a>
            <a href="#portfolio" className="link-underline hover:text-[var(--copper)] transition">Portfolio</a>
            <a href="#process" className="link-underline hover:text-[var(--copper)] transition">Process</a>
            <a href="#reviews" className="link-underline hover:text-[var(--copper)] transition">Reviews</a>
          </div>

          <a
            href="tel:+18005551234"
            className="hidden md:inline-flex items-center gap-2 text-[13px] font-medium bg-[var(--ink)] text-[var(--cream)] px-5 py-3 hover:bg-[var(--copper)] transition-all duration-300 group"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            (800) 555-1234
          </a>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative hero-bg grain min-h-[92vh] flex items-center text-[var(--cream)]">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 py-16 lg:py-24 relative z-10 w-full">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-end">
            <div className="lg:col-span-7">
              <div className="fade-up delay-1 mb-10 flex items-center gap-3 text-[11px] tracking-[0.3em] uppercase font-medium">
                <span className="w-10 h-px bg-[var(--copper)]"></span>
                <span className="text-[var(--copper-glow)]">Vol. 27 · Roofing Excellence</span>
              </div>

              <h1 className="fade-up delay-2 font-display text-[52px] sm:text-[72px] lg:text-[96px] xl:text-[120px] leading-[0.92] tracking-[-0.03em] mb-10">
                A roof<br />
                <span className="italic text-[var(--copper-glow)]">built to last</span><br />
                a generation.
              </h1>

              <p className="fade-up delay-3 text-lg lg:text-xl text-[var(--cream)]/75 max-w-xl leading-relaxed mb-12 font-light">
                Three decades of craftsmanship. Twelve thousand roofs. One standard:
                <span className="italic text-[var(--copper-glow)]"> work that outlives the warranty.</span>
              </p>

              <div className="fade-up delay-4 flex flex-wrap items-center gap-4 mb-16">
                <a
                  href="#inspection"
                  className="group inline-flex items-center gap-3 bg-[var(--copper)] text-[var(--cream)] px-7 py-4 text-[13px] tracking-widest uppercase font-medium hover:bg-[var(--copper-deep)] transition-all duration-300"
                >
                  Book Free Inspection
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="transition-transform group-hover:translate-x-1">
                    <line x1="5" y1="12" x2="19" y2="12"/>
                    <polyline points="12 5 19 12 12 19"/>
                  </svg>
                </a>
                <a
                  href="#portfolio"
                  className="inline-flex items-center gap-3 text-[var(--cream)] border-b border-[var(--cream)]/30 pb-1 text-[13px] tracking-widest uppercase font-medium hover:border-[var(--copper-glow)] hover:text-[var(--copper-glow)] transition"
                >
                  See Our Work
                </a>
              </div>

              <div className="fade-up delay-5 grid grid-cols-3 gap-6 lg:gap-12 pt-10 border-t border-[var(--cream)]/15 max-w-2xl">
                <div>
                  <div className="font-display text-4xl lg:text-5xl num-col text-[var(--copper-glow)]">12K+</div>
                  <div className="text-[10px] uppercase tracking-[0.25em] text-[var(--cream)]/60 mt-2">Roofs Installed</div>
                </div>
                <div>
                  <div className="font-display text-4xl lg:text-5xl num-col">27<span className="text-xl align-top ml-1 italic">yrs</span></div>
                  <div className="text-[10px] uppercase tracking-[0.25em] text-[var(--cream)]/60 mt-2">Family Owned</div>
                </div>
                <div>
                  <div className="font-display text-4xl lg:text-5xl num-col">4.9<span className="text-[var(--copper-glow)] text-3xl align-top ml-1">★</span></div>
                  <div className="text-[10px] uppercase tracking-[0.25em] text-[var(--cream)]/60 mt-2">2,847 Reviews</div>
                </div>
              </div>
            </div>

            {/* Inspection form */}
            <div id="inspection" className="lg:col-span-5 fade-up delay-4">
              <div className="bg-[var(--cream)] text-[var(--ink)] p-8 lg:p-10 paper-grain relative shadow-[0_40px_80px_-20px_rgba(0,0,0,0.6)]">
                <div className="absolute -top-4 left-10 bg-[var(--copper)] text-[var(--cream)] text-[10px] tracking-[0.3em] uppercase px-4 py-1.5 font-medium">
                  No Cost · No Obligation
                </div>

                {!submitted ? (
                  <>
                    <div className="mb-8">
                      <div className="text-[10px] uppercase tracking-[0.3em] text-[var(--copper)] mb-3 font-medium">01 — Begin Here</div>
                      <h2 className="font-display text-[36px] lg:text-[42px] leading-[1] tracking-[-0.02em]">
                        Book your<br />
                        <span className="italic">free</span> roof inspection.
                      </h2>
                      <p className="text-[var(--stone)] text-sm mt-4 leading-relaxed">
                        A senior inspector visits within 48 hours. Photo report delivered the same day.
                      </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div className="grid grid-cols-2 gap-4">
                        <Field label="Full Name" name="name" type="text" value={formData.name} onChange={handleChange} placeholder="Alexander Reid" />
                        <Field label="Zip Code" name="zip" type="text" value={formData.zip} onChange={handleChange} placeholder="10001" />
                      </div>
                      <Field label="Phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} placeholder="(555) 123-4567" />
                      <Field label="Email" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="alex@example.com" />

                      <div>
                        <label htmlFor="service" className="block text-[10px] uppercase tracking-[0.3em] text-[var(--stone)] mb-2 font-medium">What You Need</label>
                        <div className="relative">
                          <select
                            id="service"
                            name="service"
                            value={formData.service}
                            onChange={handleChange}
                            className="w-full bg-transparent border-b border-[var(--ink)]/25 focus:border-[var(--copper)] outline-none py-2.5 text-base transition appearance-none cursor-pointer font-sans"
                          >
                            <option>Free Roof Inspection</option>
                            <option>Full Roof Replacement</option>
                            <option>Roof Repair</option>
                            <option>Storm Damage Assessment</option>
                            <option>New Construction Install</option>
                            <option>Commercial Flat Roof</option>
                          </select>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="absolute right-0 top-4 pointer-events-none text-[var(--stone)]">
                            <polyline points="6 9 12 15 18 9"/>
                          </svg>
                        </div>
                      </div>

                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-[var(--ink)] hover:bg-[var(--copper)] text-[var(--cream)] py-4 mt-8 tracking-[0.2em] uppercase text-[12px] font-medium transition-all duration-300 disabled:opacity-60 flex items-center justify-center gap-3 group"
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
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="transition-transform group-hover:translate-x-1">
                              <line x1="5" y1="12" x2="19" y2="12"/>
                              <polyline points="12 5 19 12 12 19"/>
                            </svg>
                          </>
                        )}
                      </button>

                      <p className="text-[10px] text-[var(--stone-light)] text-center tracking-wide pt-1 leading-relaxed">
                        A member of our senior estimating team will call within 2 hours.<br />
                        We respect your privacy. No spam, ever.
                      </p>
                    </form>
                  </>
                ) : (
                  <div className="py-14 text-center scale-in">
                    <div className="inline-block mb-6">
                      <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
                        <circle cx="28" cy="28" r="26" stroke="var(--copper)" strokeWidth="1.5"/>
                        <path d="M18 28L25 35L38 22" stroke="var(--copper)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <div className="text-[10px] uppercase tracking-[0.3em] text-[var(--copper)] mb-4 font-medium">Request Received</div>
                    <h3 className="font-display text-[36px] leading-[1.05] mb-4">
                      Thank you,<br />
                      <span className="italic">{formData.name.split(' ')[0]}.</span>
                    </h3>
                    <p className="text-[var(--stone)] text-base leading-relaxed max-w-sm mx-auto">
                      A senior inspector will call within 2 hours to confirm your visit. Expect a text from <span className="font-medium text-[var(--ink)]">(800) 555-1234</span>.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications strip */}
      <section className="bg-[var(--cream-2)] border-y border-[var(--ink)]/10 py-12 paper-grain">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-3">
              <div className="text-[10px] uppercase tracking-[0.3em] text-[var(--copper)] mb-2 font-medium">Certified By</div>
              <div className="font-display text-2xl italic leading-tight">The industry's most respected names.</div>
            </div>
            <div className="lg:col-span-9 grid grid-cols-2 md:grid-cols-5 gap-6 lg:gap-10">
              {[
                { name: 'GAF', sub: 'Master Elite' },
                { name: 'Owens Corning', sub: 'Platinum Preferred' },
                { name: 'CertainTeed', sub: 'SELECT ShingleMaster' },
                { name: 'BBB', sub: 'A+ Accredited' },
                { name: 'EPA', sub: 'Lead-Safe Certified' },
              ].map((cert) => (
                <div key={cert.name} className="border-l border-[var(--ink)]/15 pl-4 group cursor-default">
                  <div className="font-display text-xl tracking-tight group-hover:text-[var(--copper)] transition">{cert.name}</div>
                  <div className="text-[10px] uppercase tracking-[0.2em] text-[var(--stone)] mt-1">{cert.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* OUR CRAFT — two column editorial */}
      <section id="craft" className="py-28 lg:py-40 relative">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-20">
            <div className="lg:col-span-5 lg:sticky lg:top-28 h-fit">
              <div className="text-[10px] uppercase tracking-[0.3em] text-[var(--copper)] mb-6 font-medium">02 — Our Craft</div>
              <h2 className="font-display text-[56px] lg:text-[88px] leading-[0.95] tracking-[-0.02em] mb-8">
                Three<br />generations.<br />
                <span className="italic text-[var(--copper)]">One obsession.</span>
              </h2>
              <div className="w-16 h-px bg-[var(--copper)] mb-8"></div>
              <p className="text-[var(--stone)] text-lg leading-[1.7]">
                Peak Roofing was founded by Sal Moretti in a one-truck garage in Queens. Today, his son Marco runs a fifty-person crew — and still climbs every roof himself before work begins.
              </p>
            </div>

            <div className="lg:col-span-7 space-y-16">
              <article className="pb-12 border-b border-[var(--ink)]/10">
                <div className="flex items-start gap-6">
                  <span className="font-display text-5xl text-[var(--copper)] leading-none">01</span>
                  <div className="flex-1">
                    <h3 className="font-display text-[32px] lg:text-[40px] leading-[1.05] mb-5 tracking-[-0.01em]">
                      We never subcontract. <span className="italic text-[var(--stone)]">Not once.</span>
                    </h3>
                    <p className="text-[var(--stone)] leading-[1.7] text-base">
                      Every shingle we lay is placed by a Peak employee — never a subcontracted crew we can't vouch for. It's slower. It's more expensive for us. It's the only way to guarantee the work.
                    </p>
                  </div>
                </div>
              </article>

              <article className="pb-12 border-b border-[var(--ink)]/10">
                <div className="flex items-start gap-6">
                  <span className="font-display text-5xl text-[var(--copper)] leading-none">02</span>
                  <div className="flex-1">
                    <h3 className="font-display text-[32px] lg:text-[40px] leading-[1.05] mb-5 tracking-[-0.01em]">
                      Every job documented <span className="italic">by drone.</span>
                    </h3>
                    <p className="text-[var(--stone)] leading-[1.7] text-base">
                      Before, during, and after. You receive a photo report with every nail, underlayment layer, and flashing detail captured. For insurance claims, this package alone has recovered hundreds of thousands of dollars for our clients.
                    </p>
                  </div>
                </div>
              </article>

              <article>
                <div className="flex items-start gap-6">
                  <span className="font-display text-5xl text-[var(--copper)] leading-none">03</span>
                  <div className="flex-1">
                    <h3 className="font-display text-[32px] lg:text-[40px] leading-[1.05] mb-5 tracking-[-0.01em]">
                      A warranty that <span className="italic">means something.</span>
                    </h3>
                    <p className="text-[var(--stone)] leading-[1.7] text-base">
                      Lifetime workmanship. No mileage caps. No fine-print exclusions on the labor. If a shingle we installed fails because of the installation — we replace it. Full stop. No other contractor in New York offers this.
                    </p>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES — editorial grid with imagery */}
      <section id="services" className="bg-[var(--ink)] text-[var(--cream)] py-28 lg:py-40 relative grain overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 mb-20">
            <div>
              <div className="text-[10px] uppercase tracking-[0.3em] text-[var(--copper-glow)] mb-6 font-medium">03 — Services</div>
              <h2 className="font-display text-[56px] lg:text-[96px] leading-[0.95] tracking-[-0.02em] max-w-4xl">
                Four disciplines.<br />
                <span className="italic text-[var(--copper-glow)]">Zero compromise.</span>
              </h2>
            </div>
            <p className="text-[var(--cream)]/65 text-lg leading-[1.7] max-w-sm">
              Whether we're restoring a Greek Revival in the Hamptons or roofing a 50,000 sq ft warehouse in Queens, the standard is the same.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                num: '01',
                title: 'Residential Roofing',
                desc: 'Full replacements and new installations. Asphalt, architectural shingles, metal, slate, and tile. Most single-family homes completed in 2–3 days with daily magnetic nail sweeps.',
                img: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1200&q=80',
                spec: '2-3 Day Install',
              },
              {
                num: '02',
                title: 'Commercial Roofing',
                desc: 'TPO, EPDM, modified bitumen, and PVC systems for warehouses, retail, multi-family, and municipal buildings. Weekend and overnight scheduling to protect business operations.',
                img: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1200&q=80',
                spec: '20-yr Membrane',
              },
              {
                num: '03',
                title: 'Storm & Insurance Restoration',
                desc: 'Hail, wind, and water damage. 24-hour emergency tarp. We work directly with every major insurance carrier and handle the claim paperwork from first call to final signoff.',
                img: 'https://images.unsplash.com/photo-1509565840754-c7d5e9a90573?auto=format&fit=crop&w=1200&q=80',
                spec: '24hr Response',
              },
              {
                num: '04',
                title: 'Inspection & Maintenance',
                desc: 'Annual 21-point inspections, pre-sale reports, and scheduled maintenance. Small issues caught early have saved clients tens of thousands in future replacement costs.',
                img: 'https://images.unsplash.com/photo-1590856029826-c7a73142bbf1?auto=format&fit=crop&w=1200&q=80',
                spec: '21-Point Report',
              },
            ].map((svc) => (
              <article key={svc.num} className="group relative overflow-hidden bg-[var(--ink-soft)] cursor-pointer">
                <div className="aspect-[16/10] relative overflow-hidden">
                  <img
                    src={svc.img}
                    alt={svc.title}
                    className="w-full h-full object-cover transition-transform duration-[1200ms] group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--ink)] via-[var(--ink)]/40 to-transparent"></div>
                  <div className="absolute top-6 left-6 right-6 flex items-start justify-between">
                    <span className="font-display text-[var(--copper-glow)] text-2xl leading-none">{svc.num}</span>
                    <span className="text-[10px] uppercase tracking-[0.3em] bg-[var(--cream)]/10 backdrop-blur-sm px-3 py-1.5 border border-[var(--cream)]/15">
                      {svc.spec}
                    </span>
                  </div>
                </div>
                <div className="p-8 lg:p-10">
                  <h3 className="font-display text-[32px] lg:text-[38px] leading-[1.05] mb-4 tracking-[-0.01em]">
                    {svc.title}
                  </h3>
                  <p className="text-[var(--cream)]/65 leading-[1.7] text-[15px]">
                    {svc.desc}
                  </p>
                  <a href="#inspection" className="inline-flex items-center gap-2 mt-6 text-[11px] uppercase tracking-[0.25em] text-[var(--copper-glow)] link-underline">
                    Request Quote
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <line x1="7" y1="17" x2="17" y2="7"/>
                      <polyline points="7 7 17 7 17 17"/>
                    </svg>
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section id="process" className="py-28 lg:py-40">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="mb-20 max-w-3xl">
            <div className="text-[10px] uppercase tracking-[0.3em] text-[var(--copper)] mb-6 font-medium">04 — Process</div>
            <h2 className="font-display text-[56px] lg:text-[96px] leading-[0.95] tracking-[-0.02em]">
              From first call<br />to <span className="italic text-[var(--copper)]">final walk.</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-4 gap-0 border-t border-[var(--ink)]/15">
            {[
              { day: 'Day 0', title: 'Free Inspection', desc: 'Senior estimator visits your home. Drone and interior inspection. Photo report sent same day.' },
              { day: 'Day 1–2', title: 'Transparent Quote', desc: 'Itemized pricing. Three material options. No high-pressure sales. We leave. You decide.' },
              { day: 'Day 3–5', title: 'The Install', desc: 'Dedicated crew. One project at a time. Daily site cleanup. Foreman on-site every hour.' },
              { day: 'Day 5', title: 'Final Walk', desc: 'Foreman and owner walk the job with you. You sign. Lifetime warranty activated.' },
            ].map((s, i) => (
              <div key={i} className="border-r border-[var(--ink)]/15 last:border-r-0 pt-12 pb-10 pr-8 first:pl-0 lg:first:pl-0 pl-0 md:pl-8 group">
                <div className="text-[10px] uppercase tracking-[0.3em] text-[var(--copper)] mb-6 font-medium">{s.day}</div>
                <h3 className="font-display text-[32px] leading-[1.05] mb-4 tracking-[-0.01em]">{s.title}</h3>
                <p className="text-[var(--stone)] text-[15px] leading-[1.7]">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PORTFOLIO */}
      <section id="portfolio" className="bg-[var(--cream-2)] py-28 lg:py-40 paper-grain">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 mb-20">
            <div>
              <div className="text-[10px] uppercase tracking-[0.3em] text-[var(--copper)] mb-6 font-medium">05 — Recent Work</div>
              <h2 className="font-display text-[56px] lg:text-[96px] leading-[0.95] tracking-[-0.02em]">
                A selection<br />
                <span className="italic text-[var(--copper)]">of our work.</span>
              </h2>
            </div>
            <p className="text-[var(--stone)] text-lg leading-[1.7] max-w-md">
              Each project documented with drone footage, photo reports, and homeowner sign-off. Transparency is part of the product.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {[
              {
                location: 'Brooklyn Heights, NY',
                type: 'Full Replacement',
                material: 'GAF Timberline HDZ',
                days: '3 Days',
                value: '$28,400',
                img: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1200&q=80',
              },
              {
                location: 'East Hampton, NY',
                type: 'Storm Restoration',
                material: 'Owens Corning Duration',
                days: '4 Days',
                value: '$41,200',
                img: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=1200&q=80',
              },
              {
                location: 'Scarsdale, NY',
                type: 'New Construction',
                material: 'CertainTeed Grand Manor',
                days: '5 Days',
                value: '$52,800',
                img: 'https://images.unsplash.com/photo-1572120360610-d971b9d7767c?auto=format&fit=crop&w=1200&q=80',
              },
            ].map((proj, i) => (
              <article key={i} className="group cursor-pointer">
                <div className="aspect-[4/5] overflow-hidden mb-6 relative">
                  <img
                    src={proj.img}
                    alt={proj.location}
                    className="w-full h-full object-cover transition-transform duration-[1500ms] ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--ink)]/60 via-transparent to-transparent"></div>
                  <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between text-[var(--cream)]">
                    <div>
                      <div className="text-[10px] uppercase tracking-[0.25em] opacity-80 mb-1">{proj.type}</div>
                      <div className="font-display text-xl leading-tight">{proj.location}</div>
                    </div>
                    <div className="text-[10px] uppercase tracking-[0.25em] opacity-90 bg-[var(--ink)]/40 backdrop-blur-sm px-2.5 py-1">
                      {proj.days}
                    </div>
                  </div>
                </div>
                <div className="flex items-start justify-between gap-4 pt-2">
                  <div>
                    <div className="text-[11px] uppercase tracking-[0.2em] text-[var(--stone)] mb-2">Material</div>
                    <div className="font-display text-[19px] leading-tight">{proj.material}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-[11px] uppercase tracking-[0.2em] text-[var(--stone)] mb-2">Project Value</div>
                    <div className="font-display text-[19px] text-[var(--copper)]">{proj.value}</div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* PULL QUOTE */}
      <section className="bg-[var(--copper)] text-[var(--cream)] py-28 lg:py-40 grain relative overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 relative z-10">
          <div className="max-w-5xl">
            <div className="text-[10px] uppercase tracking-[0.3em] mb-10 font-medium opacity-80">06 — In Their Words</div>
            <blockquote className="font-display text-[44px] sm:text-[64px] lg:text-[88px] leading-[0.95] tracking-[-0.02em] mb-16">
              <span className="text-[var(--cream)]/40 font-display">"</span>They did in three days what other contractors couldn't <span className="italic">quote</span> in three weeks. This is how it should be done.<span className="text-[var(--cream)]/40">"</span>
            </blockquote>
            <div className="flex items-center gap-5">
              <div className="w-14 h-14 rounded-full bg-[var(--cream)]/15 border border-[var(--cream)]/20 flex items-center justify-center font-display text-xl">
                M
              </div>
              <div>
                <div className="font-display text-xl">Margaret Holloway</div>
                <div className="text-[10px] uppercase tracking-[0.3em] opacity-70 mt-1">Homeowner · Queens, NY · Installed 2025</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* REVIEWS grid */}
      <section id="reviews" className="py-28 lg:py-40">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
            <div>
              <div className="text-[10px] uppercase tracking-[0.3em] text-[var(--copper)] mb-6 font-medium">07 — Reviews</div>
              <h2 className="font-display text-[48px] lg:text-[72px] leading-[0.95] tracking-[-0.02em]">
                2,847 reviews.<br />
                <span className="italic text-[var(--copper)]">4.9 average.</span>
              </h2>
            </div>
            <div className="flex items-center gap-8 text-[11px] uppercase tracking-[0.25em] text-[var(--stone)]">
              <div className="flex items-center gap-2"><span className="font-display text-2xl text-[var(--ink)] normal-case tracking-normal">Google</span> 4.9</div>
              <div className="flex items-center gap-2"><span className="font-display text-2xl text-[var(--ink)] normal-case tracking-normal">Yelp</span> 4.8</div>
              <div className="flex items-center gap-2"><span className="font-display text-2xl text-[var(--ink)] normal-case tracking-normal">BBB</span> A+</div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 lg:gap-10">
            {[
              {
                quote: 'Honest pricing from the first call. The foreman walked me through every decision. Three other companies quoted — Peak was the only one that actually climbed on the roof first.',
                name: 'David Kaplan',
                location: 'Long Island',
                project: 'Full Replacement · 2025',
              },
              {
                quote: 'After the hailstorm they handled the entire insurance claim. I barely had to do anything. The photo documentation alone recovered $11,000 more than my adjuster first offered.',
                name: 'Jennifer Park',
                location: 'Nassau County',
                project: 'Storm Restoration · 2024',
              },
              {
                quote: 'Fourth generation in this house. First roof we\'ve ever been proud to show the neighbors. The craftsmanship is genuinely museum-quality — I\'m not exaggerating.',
                name: 'Thomas Whitfield',
                location: 'Scarsdale',
                project: 'New Construction · 2025',
              },
            ].map((r, i) => (
              <article key={i} className="border-t border-[var(--ink)]/15 pt-8">
                <div className="flex gap-0.5 mb-6">
                  {[...Array(5)].map((_, j) => (
                    <svg key={j} width="14" height="14" viewBox="0 0 24 24" fill="var(--copper)">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                    </svg>
                  ))}
                </div>
                <p className="font-display text-[22px] leading-[1.4] mb-8 tracking-[-0.005em]">
                  "{r.quote}"
                </p>
                <div className="pt-6 border-t border-[var(--ink)]/10">
                  <div className="font-display text-lg">{r.name}</div>
                  <div className="text-[10px] uppercase tracking-[0.25em] text-[var(--stone)] mt-1">
                    {r.location} · {r.project}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-[var(--cream-2)] py-28 lg:py-40 paper-grain">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <div className="text-[10px] uppercase tracking-[0.3em] text-[var(--copper)] mb-6 font-medium">08 — Questions</div>
            <h2 className="font-display text-[48px] lg:text-[80px] leading-[0.95] tracking-[-0.02em]">
              Before you call,<br />
              <span className="italic">you might ask…</span>
            </h2>
          </div>

          <div className="divide-y divide-[var(--ink)]/15 border-y border-[var(--ink)]/15">
            {[
              { q: 'How long does a typical roof replacement take?', a: 'Most single-family homes take 2–3 days. Larger homes or complex multi-dormer roofs may take 4–5 days. Commercial projects scale with size. We give you an exact schedule before work begins and stick to it.' },
              { q: 'Do you work directly with insurance adjusters?', a: 'Yes. We have in-house claim specialists who coordinate directly with every major carrier (State Farm, Allstate, Liberty Mutual, USAA, and others). Our drone documentation package has recovered on average $8,400 more per claim than the initial offer.' },
              { q: 'Are you truly licensed and insured?', a: 'Licensed in New York, New Jersey, and Connecticut. $2M general liability, full workers compensation, and manufacturer certifications including GAF Master Elite (top 3% of contractors nationally). Certificates available on request.' },
              { q: 'What warranty do you offer?', a: 'Lifetime workmanship warranty — no mileage caps, no exclusions on labor, fully transferable to the next owner. Material warranties range from 30 years to lifetime depending on your selection. We walk you through exactly what\'s covered during your quote.' },
              { q: 'What does a new roof typically cost?', a: 'Residential replacements range from $9,000 to $32,000 depending on square footage, pitch, material grade, and existing layer removal. Commercial and specialty work quoted individually. Every quote is itemized — no hidden fees, no upsells, no surprises on invoice day.' },
              { q: 'Can you match my historic home?', a: 'Yes. We specialize in historic restoration — slate, cedar shake, clay tile, standing-seam copper. We work with preservation boards, source period-correct materials, and our master craftsmen have installed on homes dating back to the 1890s.' },
            ].map((item, i) => (
              <details key={i} className="group py-8">
                <summary className="flex items-start justify-between cursor-pointer list-none gap-6">
                  <span className="font-display text-[22px] lg:text-[28px] leading-[1.2] flex-1">{item.q}</span>
                  <span className="font-display text-3xl text-[var(--copper)] group-open:rotate-45 transition-transform duration-500 mt-1 shrink-0">+</span>
                </summary>
                <p className="mt-5 text-[var(--stone)] leading-[1.7] text-[15px] max-w-3xl">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="bg-[var(--ink)] text-[var(--cream)] py-32 lg:py-40 grain relative overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 relative z-10">
          <div className="max-w-4xl">
            <div className="text-[10px] uppercase tracking-[0.3em] text-[var(--copper-glow)] mb-8 font-medium">09 — Ready When You Are</div>
            <h2 className="font-display text-[64px] sm:text-[96px] lg:text-[144px] leading-[0.9] tracking-[-0.03em] mb-12">
              Stop<br />patching.<br />
              <span className="italic text-[var(--copper-glow)]">Start over.</span>
            </h2>
            <p className="text-xl text-[var(--cream)]/70 max-w-xl mb-14 leading-[1.6] font-light">
              Book your free inspection today. A senior estimator will be on your roof within 48 hours.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 items-start">
              <a
                href="#inspection"
                onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="group inline-flex items-center gap-3 bg-[var(--copper)] hover:bg-[var(--copper-deep)] text-[var(--cream)] px-8 py-5 text-[12px] tracking-[0.25em] uppercase font-medium transition-all duration-300"
              >
                Book Free Inspection
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="transition-transform group-hover:translate-x-1">
                  <line x1="5" y1="12" x2="19" y2="12"/>
                  <polyline points="12 5 19 12 12 19"/>
                </svg>
              </a>
              <a
                href="tel:+18005551234"
                className="inline-flex items-center gap-3 text-[var(--cream)]/80 hover:text-[var(--copper-glow)] border-b border-[var(--cream)]/20 hover:border-[var(--copper-glow)] pb-2 text-[12px] tracking-[0.25em] uppercase font-medium transition"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                (800) 555-1234
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[var(--cream-2)] pt-20 pb-10 paper-grain border-t border-[var(--ink)]/10">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 mb-20">
            <div className="lg:col-span-5">
              <a href="#" className="flex items-center gap-2.5 mb-6">
                <svg width="36" height="36" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 22L20 8L34 22" stroke="var(--copper)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M10 20V32H30V20" stroke="var(--ink)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="20" cy="26" r="2" fill="var(--copper)"/>
                </svg>
                <div className="leading-none">
                  <div className="font-display text-[22px] tracking-tight leading-none">Peak Roofing</div>
                  <div className="text-[9px] tracking-[0.3em] uppercase text-[var(--stone)] mt-1">Est. New York · 1998</div>
                </div>
              </a>
              <p className="text-[var(--stone)] text-[15px] leading-[1.7] max-w-sm mb-8">
                New York's most trusted roofing contractor. Family owned. Master Elite certified. Lifetime guaranteed.
              </p>
              <div className="flex items-center gap-6 text-[11px] uppercase tracking-[0.25em] text-[var(--stone)]">
                <a href="#" className="hover:text-[var(--copper)] transition link-underline">Instagram</a>
                <a href="#" className="hover:text-[var(--copper)] transition link-underline">Facebook</a>
                <a href="#" className="hover:text-[var(--copper)] transition link-underline">YouTube</a>
              </div>
            </div>

            <div className="lg:col-span-2">
              <div className="text-[10px] uppercase tracking-[0.3em] text-[var(--copper)] mb-5 font-medium">Services</div>
              <ul className="space-y-3 text-[14px] text-[var(--stone)]">
                <li><a href="#services" className="link-underline hover:text-[var(--ink)] transition">Residential</a></li>
                <li><a href="#services" className="link-underline hover:text-[var(--ink)] transition">Commercial</a></li>
                <li><a href="#services" className="link-underline hover:text-[var(--ink)] transition">Storm Damage</a></li>
                <li><a href="#services" className="link-underline hover:text-[var(--ink)] transition">Inspections</a></li>
              </ul>
            </div>

            <div className="lg:col-span-2">
              <div className="text-[10px] uppercase tracking-[0.3em] text-[var(--copper)] mb-5 font-medium">Company</div>
              <ul className="space-y-3 text-[14px] text-[var(--stone)]">
                <li><a href="#craft" className="link-underline hover:text-[var(--ink)] transition">Our Craft</a></li>
                <li><a href="#portfolio" className="link-underline hover:text-[var(--ink)] transition">Portfolio</a></li>
                <li><a href="#reviews" className="link-underline hover:text-[var(--ink)] transition">Reviews</a></li>
                <li><a href="#" className="link-underline hover:text-[var(--ink)] transition">Careers</a></li>
              </ul>
            </div>

            <div className="lg:col-span-3">
              <div className="text-[10px] uppercase tracking-[0.3em] text-[var(--copper)] mb-5 font-medium">Contact</div>
              <div className="space-y-4 text-[14px] text-[var(--stone)] leading-[1.6]">
                <div>
                  <div className="text-[var(--ink)] font-medium">(800) 555-1234</div>
                  <div className="text-[11px] uppercase tracking-[0.2em] mt-1">Mon–Sat · 7am–7pm EST</div>
                </div>
                <div>
                  <div className="text-[var(--ink)] font-medium">hello@peakroofingusa.com</div>
                  <div className="text-[11px] uppercase tracking-[0.2em] mt-1">Response within 2 hrs</div>
                </div>
                <div>
                  <div className="text-[var(--ink)] font-medium">47-28 21st Street</div>
                  <div>Long Island City, NY 11101</div>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-10 border-t border-[var(--ink)]/10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-[11px] text-[var(--stone)]">
            <div>© {new Date().getFullYear()} Peak Roofing USA. All rights reserved. License #NY-7738291.</div>
            <div className="flex gap-6 uppercase tracking-[0.2em]">
              <a href="#" className="link-underline">Privacy</a>
              <a href="#" className="link-underline">Terms</a>
              <a href="#" className="link-underline">Accessibility</a>
            </div>
          </div>

          <div className="mt-10 pt-6 border-t border-[var(--ink)]/5 text-[10px] text-[var(--stone-light)]/80 italic leading-relaxed max-w-3xl">
            Demo site for portfolio and conversion-tracking demonstration purposes. Not a real roofing company. Phone numbers, testimonials, certifications, and portfolio entries shown are illustrative only. Built by Haseeb Syed as part of a conversion-focused landing-page service.
          </div>
        </div>
      </footer>
    </main>
  );
}

function Field({ label, name, type, value, onChange, placeholder }: {
  label: string;
  name: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
}) {
  return (
    <div>
      <label htmlFor={name} className="block text-[10px] uppercase tracking-[0.3em] text-[var(--stone)] mb-2 font-medium">
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
        className="w-full bg-transparent border-b border-[var(--ink)]/25 focus:border-[var(--copper)] outline-none py-2.5 text-base transition placeholder:text-[var(--stone-light)]/60"
      />
    </div>
  );
}
