'use client';

import { useState, useEffect } from 'react';

export default function Home() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    zip: '',
    service: 'Free Inspection',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // GA4 event
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'generate_lead', {
        event_category: 'lead',
        event_label: formData.service,
        value: 1,
      });
    }

    // Meta Pixel event
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
      console.error('Form submit error:', err);
    }
    setSubmitted(true);
    setLoading(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <main className="min-h-screen bg-paper text-ink overflow-hidden grain">
      {/* Top bar */}
      <div className="bg-ink text-paper text-xs tracking-widest uppercase py-2 px-4 text-center font-medium">
        Licensed & Insured · Serving Homeowners Nationwide · Free Inspections
      </div>

      {/* Nav */}
      <nav className="max-w-7xl mx-auto px-6 lg:px-10 py-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 18L16 6L28 18" stroke="#c8372d" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M7 16V26H25V16" stroke="#0a0a0a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="font-display text-2xl font-bold tracking-tight">Peak<span className="text-accent">.</span></span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          <a href="#services" className="hover:text-accent transition">Services</a>
          <a href="#work" className="hover:text-accent transition">Our Work</a>
          <a href="#reviews" className="hover:text-accent transition">Reviews</a>
          <a href="#contact" className="hover:text-accent transition">Contact</a>
        </div>
        <a href="tel:+18005551234" className="hidden md:inline-flex items-center gap-2 bg-ink text-paper px-5 py-2.5 text-sm font-semibold rounded-full hover:bg-accent transition">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
          (800) 555-1234
        </a>
      </nav>

      {/* HERO */}
      <section className="relative max-w-7xl mx-auto px-6 lg:px-10 pt-8 lg:pt-16 pb-20 lg:pb-32">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          <div className="lg:col-span-7 fade-up">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-semibold text-accent mb-8">
              <span className="w-8 h-px bg-accent"></span>
              Est. 1998 · Rated 4.9 from 2,847 reviews
            </div>
            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold leading-[0.95] tracking-tight mb-8">
              Your roof,<br />
              <span className="italic text-accent">done right</span><br />
              the first time.
            </h1>
            <p className="text-lg lg:text-xl text-muted max-w-xl leading-relaxed mb-10">
              Free inspection. Transparent pricing. Work backed by a lifetime workmanship warranty. Over 12,000 roofs completed since 1998.
            </p>

            {/* Trust row */}
            <div className="flex flex-wrap items-center gap-6 lg:gap-10 pt-6 border-t border-ink/10">
              <div>
                <div className="font-display text-3xl font-bold">12,000+</div>
                <div className="text-xs uppercase tracking-widest text-muted">Roofs Installed</div>
              </div>
              <div>
                <div className="font-display text-3xl font-bold">4.9<span className="text-accent">★</span></div>
                <div className="text-xs uppercase tracking-widest text-muted">Google Rating</div>
              </div>
              <div>
                <div className="font-display text-3xl font-bold">Lifetime</div>
                <div className="text-xs uppercase tracking-widest text-muted">Warranty</div>
              </div>
            </div>
          </div>

          {/* Form card */}
          <div className="lg:col-span-5 lg:sticky lg:top-8">
            <div className="bg-ink text-paper p-8 lg:p-10 rounded-none relative shadow-2xl">
              <div className="absolute -top-3 -right-3 bg-accent text-paper text-xs font-bold uppercase tracking-widest px-4 py-2 rotate-3">
                Free
              </div>
              {!submitted ? (
                <>
                  <h2 className="font-display text-3xl lg:text-4xl font-bold leading-tight mb-2">
                    Get your free<br />roof inspection.
                  </h2>
                  <p className="text-paper/70 text-sm mb-8">Same-day response. No obligation. No pushy sales.</p>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-xs uppercase tracking-widest text-paper/60 mb-2">Name</label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full bg-transparent border-b-2 border-paper/20 focus:border-accent outline-none py-2 text-lg transition"
                        placeholder="John Smith"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-xs uppercase tracking-widest text-paper/60 mb-2">Phone</label>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full bg-transparent border-b-2 border-paper/20 focus:border-accent outline-none py-2 text-lg transition"
                        placeholder="(555) 123-4567"
                      />
                    </div>
                    <div>
                      <label htmlFor="zip" className="block text-xs uppercase tracking-widest text-paper/60 mb-2">Zip Code</label>
                      <input
                        id="zip"
                        name="zip"
                        type="text"
                        required
                        value={formData.zip}
                        onChange={handleChange}
                        className="w-full bg-transparent border-b-2 border-paper/20 focus:border-accent outline-none py-2 text-lg transition"
                        placeholder="10001"
                      />
                    </div>
                    <div>
                      <label htmlFor="service" className="block text-xs uppercase tracking-widest text-paper/60 mb-2">What do you need?</label>
                      <select
                        id="service"
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                        className="w-full bg-transparent border-b-2 border-paper/20 focus:border-accent outline-none py-2 text-lg transition appearance-none cursor-pointer"
                      >
                        <option className="text-ink">Free Inspection</option>
                        <option className="text-ink">Roof Replacement</option>
                        <option className="text-ink">Roof Repair</option>
                        <option className="text-ink">Storm Damage</option>
                        <option className="text-ink">New Installation</option>
                      </select>
                    </div>
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-accent hover:bg-accentDark text-paper font-semibold py-4 mt-6 tracking-wider uppercase text-sm transition disabled:opacity-60"
                    >
                      {loading ? 'Sending...' : 'Schedule My Free Inspection →'}
                    </button>
                    <p className="text-xs text-paper/50 text-center pt-2">
                      By submitting, you agree to our terms. No spam. We respect your privacy.
                    </p>
                  </form>
                </>
              ) : (
                <div className="py-10 text-center">
                  <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#c8372d" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
                  </div>
                  <h3 className="font-display text-3xl font-bold mb-3">You&apos;re all set, {formData.name.split(' ')[0]}.</h3>
                  <p className="text-paper/70">We&apos;ll call you within 15 minutes to confirm your inspection window.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Logo marquee */}
      <section className="py-8 border-y border-ink/10 bg-paper overflow-hidden">
        <div className="flex items-center gap-16 marquee whitespace-nowrap">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex items-center gap-16 shrink-0">
              <span className="font-display text-2xl italic text-muted">GAF Certified</span>
              <span className="text-muted">·</span>
              <span className="font-display text-2xl italic text-muted">Owens Corning Preferred</span>
              <span className="text-muted">·</span>
              <span className="font-display text-2xl italic text-muted">CertainTeed Select</span>
              <span className="text-muted">·</span>
              <span className="font-display text-2xl italic text-muted">BBB Accredited A+</span>
              <span className="text-muted">·</span>
              <span className="font-display text-2xl italic text-muted">HomeAdvisor Elite</span>
              <span className="text-muted">·</span>
            </div>
          ))}
        </div>
      </section>

      {/* Services */}
      <section id="services" className="max-w-7xl mx-auto px-6 lg:px-10 py-24 lg:py-32">
        <div className="grid lg:grid-cols-12 gap-10 mb-16">
          <div className="lg:col-span-5">
            <div className="text-xs uppercase tracking-[0.2em] font-semibold text-accent mb-6">
              ── What we do
            </div>
            <h2 className="font-display text-4xl lg:text-6xl font-bold leading-[1] tracking-tight">
              Four services.<br />
              One standard: <span className="italic">precision.</span>
            </h2>
          </div>
          <div className="lg:col-span-7 lg:pt-8">
            <p className="text-lg text-muted leading-relaxed">
              We don&apos;t subcontract. We don&apos;t upsell. Every roof we touch is installed by our own crews, inspected by a foreman, and signed off by the owner before we invoice you.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-px bg-ink/10 border border-ink/10">
          {[
            {
              title: 'Residential Roofing',
              num: '01',
              desc: 'Full replacements and new installations. Asphalt, metal, tile, slate. Most homes completed in 1–3 days.',
            },
            {
              title: 'Commercial Roofing',
              num: '02',
              desc: 'Flat roof systems, TPO, EPDM, modified bitumen. Minimal business disruption with night and weekend scheduling.',
            },
            {
              title: 'Storm & Emergency Repair',
              num: '03',
              desc: 'Hail, wind, leaks. 24-hour tarp service. We work directly with your insurance adjuster to maximize your claim.',
            },
            {
              title: 'Inspections & Maintenance',
              num: '04',
              desc: 'Annual check-ups, pre-sale inspections, and 21-point reports. Catch small issues before they cost thousands.',
            },
          ].map((service) => (
            <div key={service.num} className="bg-paper p-10 lg:p-12 group hover:bg-ink hover:text-paper transition-all duration-500 cursor-pointer">
              <div className="flex items-start justify-between mb-8">
                <span className="font-display text-sm font-semibold text-accent">{service.num}</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">
                  <line x1="7" y1="17" x2="17" y2="7"/>
                  <polyline points="7 7 17 7 17 17"/>
                </svg>
              </div>
              <h3 className="font-display text-3xl lg:text-4xl font-bold mb-4 tracking-tight">{service.title}</h3>
              <p className="text-muted group-hover:text-paper/70 leading-relaxed max-w-md transition">{service.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Process */}
      <section className="bg-ink text-paper py-24 lg:py-32 grain">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-12 gap-10 mb-16">
            <div className="lg:col-span-5">
              <div className="text-xs uppercase tracking-[0.2em] font-semibold text-accent mb-6">
                ── How it works
              </div>
              <h2 className="font-display text-4xl lg:text-6xl font-bold leading-[1] tracking-tight">
                From call to<br />completion<br />in <span className="italic text-accent">4 steps.</span>
              </h2>
            </div>
          </div>

          <div className="grid md:grid-cols-4 gap-10 lg:gap-6">
            {[
              { step: '01', title: 'Free Inspection', desc: 'We come out, climb the roof, and send you a detailed photo report.' },
              { step: '02', title: 'Transparent Quote', desc: 'Itemized pricing. No hidden fees. No high-pressure tactics.' },
              { step: '03', title: 'Install', desc: 'Our crews install in 1–3 days for most homes. Daily site cleanup included.' },
              { step: '04', title: 'Final Walkthrough', desc: 'Foreman walks the job with you. You sign off. Lifetime warranty activated.' },
            ].map((item, i) => (
              <div key={item.step} className="relative">
                <div className="font-display text-7xl font-bold text-paper/10 mb-4">{item.step}</div>
                <h3 className="font-display text-2xl font-bold mb-3">{item.title}</h3>
                <p className="text-paper/60 leading-relaxed text-sm">{item.desc}</p>
                {i < 3 && (
                  <div className="hidden md:block absolute top-8 right-0 w-full h-px bg-paper/10 -z-10" style={{ transform: 'translateX(50%)' }}></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Work / Before-After */}
      <section id="work" className="max-w-7xl mx-auto px-6 lg:px-10 py-24 lg:py-32">
        <div className="grid lg:grid-cols-12 gap-10 mb-16">
          <div className="lg:col-span-5">
            <div className="text-xs uppercase tracking-[0.2em] font-semibold text-accent mb-6">
              ── The work
            </div>
            <h2 className="font-display text-4xl lg:text-6xl font-bold leading-[1] tracking-tight">
              Recent<br />
              <span className="italic">projects.</span>
            </h2>
          </div>
          <div className="lg:col-span-7 lg:pt-8">
            <p className="text-lg text-muted leading-relaxed">
              Every job is documented with drone footage and photo reports. Transparency is part of the product.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            { location: 'Queens, NY', type: 'Full Replacement', days: '2 days', color: 'from-slate-700 to-slate-900' },
            { location: 'Nassau County', type: 'Storm Damage', days: '3 days', color: 'from-red-900 to-ink' },
            { location: 'Long Island', type: 'New Install', days: '1 day', color: 'from-stone-700 to-stone-900' },
          ].map((proj, i) => (
            <div key={i} className="group cursor-pointer">
              <div className={`aspect-[4/5] bg-gradient-to-br ${proj.color} mb-5 relative overflow-hidden`}>
                {/* Roof illustration SVG */}
                <svg viewBox="0 0 400 500" className="absolute inset-0 w-full h-full opacity-30" xmlns="http://www.w3.org/2000/svg">
                  <polygon points="200,50 380,220 380,450 20,450 20,220" fill="none" stroke="white" strokeWidth="1.5"/>
                  <polygon points="200,50 380,220 200,220 20,220" fill="white" fillOpacity="0.1"/>
                  <line x1="50" y1="260" x2="350" y2="260" stroke="white" strokeWidth="0.5" opacity="0.5"/>
                  <line x1="50" y1="300" x2="350" y2="300" stroke="white" strokeWidth="0.5" opacity="0.5"/>
                  <line x1="50" y1="340" x2="350" y2="340" stroke="white" strokeWidth="0.5" opacity="0.5"/>
                  <line x1="50" y1="380" x2="350" y2="380" stroke="white" strokeWidth="0.5" opacity="0.5"/>
                  <line x1="50" y1="420" x2="350" y2="420" stroke="white" strokeWidth="0.5" opacity="0.5"/>
                  <rect x="150" y="350" width="50" height="80" fill="white" fillOpacity="0.15"/>
                  <rect x="240" y="340" width="40" height="60" fill="white" fillOpacity="0.15"/>
                </svg>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-paper">
                  <div className="text-xs uppercase tracking-widest opacity-70 mb-1">{proj.type}</div>
                  <div className="font-display text-2xl font-bold">{proj.location}</div>
                </div>
                <div className="absolute top-6 right-6 bg-paper text-ink text-xs font-bold px-3 py-1 uppercase tracking-widest">
                  {proj.days}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section id="reviews" className="bg-accent text-paper py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="text-xs uppercase tracking-[0.2em] font-semibold mb-6 opacity-80">
            ── What homeowners say
          </div>
          <h2 className="font-display text-4xl lg:text-6xl font-bold leading-[1] tracking-tight mb-16 max-w-3xl">
            &ldquo;They did in two days what three other companies couldn&apos;t quote in two weeks.&rdquo;
          </h2>

          <div className="grid md:grid-cols-3 gap-10 lg:gap-16">
            {[
              {
                quote: 'Honest pricing. No bait and switch. The foreman walked me through everything. Worth every dollar.',
                name: 'Margaret H.',
                location: 'Queens, NY',
              },
              {
                quote: 'After the hailstorm, they handled the whole insurance claim. I barely had to do anything. Roof looks incredible.',
                name: 'David K.',
                location: 'Long Island, NY',
              },
              {
                quote: 'Got three quotes. Peak was the most detailed and only slightly more expensive. The quality justified it immediately.',
                name: 'Jennifer P.',
                location: 'Nassau County, NY',
              },
            ].map((t, i) => (
              <div key={i} className="border-t border-paper/30 pt-6">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, j) => (
                    <svg key={j} width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-paper">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                    </svg>
                  ))}
                </div>
                <p className="font-display text-xl italic leading-relaxed mb-6">&ldquo;{t.quote}&rdquo;</p>
                <div className="text-sm">
                  <div className="font-semibold">{t.name}</div>
                  <div className="opacity-70">{t.location}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-4xl mx-auto px-6 lg:px-10 py-24 lg:py-32">
        <div className="text-center mb-16">
          <div className="text-xs uppercase tracking-[0.2em] font-semibold text-accent mb-6">
            ── Questions
          </div>
          <h2 className="font-display text-4xl lg:text-6xl font-bold leading-[1] tracking-tight">
            Before you call,<br />
            <span className="italic">you might ask...</span>
          </h2>
        </div>
        <div className="divide-y divide-ink/10 border-y border-ink/10">
          {[
            {
              q: 'How long does a typical roof replacement take?',
              a: 'Most single-family homes take 1–3 days depending on size and complexity. Commercial jobs vary. We give you an exact timeline before work begins.',
            },
            {
              q: 'Do you work with insurance claims?',
              a: 'Yes. We work directly with your adjuster, document damage with drone footage, and handle the claim paperwork. Most customers pay only their deductible.',
            },
            {
              q: 'Are you licensed and insured?',
              a: 'Fully licensed in every state we operate. $2M general liability, workers comp, and manufacturer certifications (GAF, Owens Corning, CertainTeed).',
            },
            {
              q: 'What warranty do you offer?',
              a: 'Lifetime workmanship warranty on all installations. Material warranties depend on the product you choose — we walk you through options during the quote.',
            },
            {
              q: 'How much does a new roof cost?',
              a: 'Range is typically $8,000–$25,000 for residential, depending on size, material, and complexity. We give you transparent itemized pricing with no upsells.',
            },
          ].map((item, i) => (
            <details key={i} className="group py-6">
              <summary className="flex items-center justify-between cursor-pointer list-none">
                <span className="font-display text-xl lg:text-2xl font-semibold pr-6">{item.q}</span>
                <span className="text-2xl text-accent group-open:rotate-45 transition-transform shrink-0">+</span>
              </summary>
              <p className="mt-4 text-muted leading-relaxed max-w-2xl">{item.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section id="contact" className="bg-ink text-paper py-24 lg:py-32 grain">
        <div className="max-w-4xl mx-auto px-6 lg:px-10 text-center">
          <div className="text-xs uppercase tracking-[0.2em] font-semibold text-accent mb-6">
            ── Ready when you are
          </div>
          <h2 className="font-display text-5xl lg:text-7xl font-bold leading-[0.95] tracking-tight mb-8">
            Stop patching.<br />
            <span className="italic text-accent">Start over.</span>
          </h2>
          <p className="text-lg text-paper/70 max-w-xl mx-auto mb-12">
            Book a free inspection today. No pushy sales. No obligation. Just a clear picture of what your roof needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="#top"
              onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="inline-flex items-center gap-3 bg-accent hover:bg-accentDark text-paper px-8 py-4 text-sm font-semibold uppercase tracking-widest transition"
            >
              Schedule Inspection →
            </a>
            <a
              href="tel:+18005551234"
              className="inline-flex items-center gap-2 text-paper hover:text-accent px-6 py-4 text-sm font-semibold uppercase tracking-widest transition"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              (800) 555-1234
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-paper border-t border-ink/10 py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="flex items-center gap-2">
              <svg width="24" height="24" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 18L16 6L28 18" stroke="#c8372d" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M7 16V26H25V16" stroke="#0a0a0a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="font-display text-xl font-bold">Peak Roofing USA</span>
            </div>
            <div className="text-sm text-muted">
              Licensed & Insured · (800) 555-1234 · hello@peakroofingusa.com
            </div>
          </div>
          <div className="mt-10 pt-6 border-t border-ink/5 text-xs text-muted/70 leading-relaxed">
            <p>© {new Date().getFullYear()} Peak Roofing USA. All rights reserved.</p>
            <p className="mt-2 italic">Demo site for portfolio and tracking demonstration purposes. Not a real roofing company. Phone numbers and testimonials shown are illustrative only.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
