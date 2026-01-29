// src/App.jsx
import React, { useMemo, useState } from "react";

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

function Container({ className, children }) {
  return (
    <div className={cn("mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8", className)}>
      {children}
    </div>
  );
}

function Badge({ children }) {
  return (
    <span className="inline-flex items-center rounded-full border border-slate-200 bg-white/70 px-3 py-1 text-xs font-medium text-slate-700 backdrop-blur">
      {children}
    </span>
  );
}

function SectionTitle({ kicker, title, desc, align = "left" }) {
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center")}>
      {kicker ? (
        <div className={cn(align === "center" ? "flex justify-center" : "")}>
          <Badge>{kicker}</Badge>
        </div>
      ) : null}
      <h2 className={cn("mt-4 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl")}>
        {title}
      </h2>
      {desc ? <p className="mt-3 text-base leading-7 text-slate-600">{desc}</p> : null}
    </div>
  );
}

function Card({ className, children }) {
  return (
    <div className={cn("rounded-2xl border border-slate-200 bg-white shadow-soft", className)}>
      {children}
    </div>
  );
}

function Divider() {
  return <div className="h-px w-full bg-slate-200/70" />;
}

function AnchorLink({ href, children, className }) {
  return (
    <a
      href={href}
      className={cn(
        "text-sm font-medium text-slate-700 hover:text-slate-900 transition-colors",
        className
      )}
    >
      {children}
    </a>
  );
}

function Button({ as = "button", href, onClick, variant = "primary", className, children, type }) {
  const base =
    "inline-flex items-center justify-center rounded-xl px-4 py-2.5 text-sm font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:ring-offset-2";
  const styles =
    variant === "primary"
      ? "bg-slate-900 text-white hover:bg-slate-800"
      : variant === "secondary"
      ? "bg-white text-slate-900 border border-slate-200 hover:bg-slate-50"
      : "bg-blue-600 text-white hover:bg-blue-500";

  if (as === "a") {
    return (
      <a href={href} className={cn(base, styles, className)}>
        {children}
      </a>
    );
  }
  return (
    <button type={type} onClick={onClick} className={cn(base, styles, className)}>
      {children}
    </button>
  );
}

function Stat({ label, value }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white/70 p-4 backdrop-blur">
      <div className="text-xs font-medium text-slate-600">{label}</div>
      <div className="mt-1 text-lg font-semibold text-slate-900">{value}</div>
    </div>
  );
}

function CheckItem({ children }) {
  return (
    <li className="flex gap-3">
      <span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100">
        ✓
      </span>
      <span className="text-slate-700">{children}</span>
    </li>
  );
}

function XItem({ children }) {
  return (
    <li className="flex gap-3">
      <span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-rose-50 text-rose-700 ring-1 ring-rose-100">
        ✕
      </span>
      <span className="text-slate-700">{children}</span>
    </li>
  );
}

function Input({ label, required, value, onChange, placeholder, type = "text", name }) {
  return (
    <label className="block">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-slate-800">{label}</span>
        {required ? <span className="text-xs font-medium text-slate-500">Kohustuslik</span> : null}
      </div>
      <input
        name={name}
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-500/10"
      />
    </label>
  );
}

function Select({ label, required, value, onChange, options, name }) {
  return (
    <label className="block">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-slate-800">{label}</span>
        {required ? <span className="text-xs font-medium text-slate-500">Kohustuslik</span> : null}
      </div>
      <select
        name={name}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-500/10"
      >
        <option value="" disabled>
          Vali…
        </option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </label>
  );
}

function Textarea({ label, required, value, onChange, placeholder, name }) {
  return (
    <label className="block">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-slate-800">{label}</span>
        {required ? <span className="text-xs font-medium text-slate-500">Kohustuslik</span> : null}
      </div>
      <textarea
        name={name}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={4}
        className="mt-2 w-full resize-y rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-500/10"
      />
    </label>
  );
}

function CheckboxGroup({ label, options, values, setValues }) {
  const toggle = (opt) => {
    setValues((prev) => (prev.includes(opt) ? prev.filter((x) => x !== opt) : [...prev, opt]));
  };

  return (
    <fieldset className="block">
      <legend className="text-sm font-medium text-slate-800">{label}</legend>
      <div className="mt-3 grid gap-2 sm:grid-cols-2">
        {options.map((opt) => (
          <label
            key={opt}
            className="flex cursor-pointer items-start gap-3 rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-800 hover:bg-slate-50"
          >
            <input
              type="checkbox"
              checked={values.includes(opt)}
              onChange={() => toggle(opt)}
              className="mt-0.5 h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
            />
            <span>{opt}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

export default function App() {
  const nav = useMemo(
    () => [
      { label: "Kuidas töötab", href: "#kuidas" },
      { label: "Miks personal kasutab", href: "#personal" },
      { label: "Kellele sobib", href: "#sobivus" },
      { label: "Kliiniku info", href: "#kontakt" },
    ],
    []
  );

  const bullets = useMemo(
    () => [
      {
        title: "Kõik juhtumid ja järeltegevused ühes kohas",
        desc: "Mitte e-kirjades, Excelites või mälus.",
      },
      {
        title: "Selge vastutus ja nähtav staatus igal sammul",
        desc: "On alati teada, kes teeb mida ja millal.",
      },
      {
        title: "Valmis auditiks ja järelepäringuteks",
        desc: "Kogu protsess on dokumenteeritud ja leitav.",
      },
    ],
    []
  );

  const problems = useMemo(
    () => [
      "Juhtumid jõuavad juhini eri kanalitest",
      "Osa infot jääb kirja panemata või kaob",
      "Järeltegevused venivad või ununevad",
      "Vastutus ei ole alati selge",
      "Auditi või kaebuse korral on raske näidata, mis tegelikult tehti",
      "Personal ei näe alati raporteerimise mõtet",
    ],
    []
  );

  const steps = useMemo(
    () => [
      {
        n: "1",
        title: "Juhtum raporteeritakse kliinikus",
        points: [
          "Ohutusjuhtum sisestatakse turvaliselt EelPohakusse sisse logides",
          "või otse patsiendi vaatest eKliinikus või Perearst 3 programmis",
          "Raporteerimine on kiire ja küsib ainult olulist.",
        ],
        result: "Tulemus: juhtum ei jää rääkimata ega lükku edasi.",
      },
      {
        n: "2",
        title: "Juhtum menetletakse asutuse siseselt",
        points: [
          "Kliinik analüüsib juhtumit ja hindab riski ning korduvust",
          "Koostab tegevusplaani ning dokumenteerib otsused ja järeltegevused",
          "Kõik toimub asutuse sees, ilma automaatse edastamiseta riiklikku andmebaasi.",
        ],
        result: "Tulemus: kliinikul säilib kontroll ja ülevaade.",
      },
      {
        n: "3",
        title: "Süsteem aitab otsustada, mis on päriselt oluline",
        points: ["Iga juhtum saab automaatse riskihinnangu ja prioriteedi."],
        result:
          "Tulemus: juht ei pea kõiki juhtumeid võrdselt käsitlema ega otsustama „tunnetuse pealt“.",
      },
      {
        n: "4",
        title: "Töö ja vastutus on delegeeritav",
        points: [
          "Detailne analüüs ja tegevusplaanide koostamine saab toimuda spetsialistide või halduri toel",
          "Juhini jõuab kokkuvõte ja otsust vajavad punktid.",
        ],
        result: "Tulemus: juhi aeg kulub otsustamisele, mitte info tagaajamisele.",
      },
      {
        n: "5",
        title: "Vajadusel edastamine riiklikku süsteemi",
        points: [
          "Kui juhtum vastab riikliku raporteerimise kriteeriumidele, teeb kliinik teadliku otsuse selle edastamiseks",
          "Vajalik info edastatakse POHAKi andmebaasi X-tee turvalise liidestuse kaudu",
          "Ainult nõutud ja anonümiseeritud kujul.",
        ],
        result: "Tulemus: vastavus nõuetele ilma lisariski ja käsitööta.",
      },
    ],
    []
  );

  const staffReasons = useMemo(
    () => [
      {
        title: "Raporteerimine on kiire ja loogiline",
        desc: "Juhtumi sisestamine võtab paar minutit ja ei nõua pikki selgitusi.",
      },
      {
        title: "Raporteerija ei jää teadmatusse",
        desc: "On näha, et juhtumiga tegeletakse ja midagi päriselt juhtub.",
      },
      {
        title: "Ei ole süüdistamist ega näpuga näitamist",
        desc: "Fookus on lahendusel ja õppimisel, mitte inimesel.",
      },
      {
        title: "Igapäevatöö ei katke",
        desc: "Raporteerimine ei vii fookust patsienditöölt ära.",
      },
    ],
    []
  );

  const bureaucracy = useMemo(
    () => [
      {
        q: "“Meil on juba liiga palju vorme.”",
        a: "EelPohak asendab killustunud töö ühe selge protsessiga.",
      },
      {
        q: "“Juht peab nagunii kõik ise läbi töötama.”",
        a: "Analüüsi ja tegevusplaanide töö on delegeeritav.",
      },
      {
        q: "“Raporteerimine võtab personalilt liiga palju aega.”",
        a: "Raporteerija teeb ainult esmase sisestuse.",
      },
      {
        q: "“Kõik jääb lõpuks Excelisse.”",
        a: "Kõik juhtumid ja otsused on ühes süsteemis, koos ajalooga.",
      },
    ],
    []
  );

  const whyChoose = useMemo(
    () => [
      "Loodud esmatasandi kliinikutele, mitte haiglatele",
      "Keskendub järeltegevustele, mitte ainult raporteerimisele",
      "Säilitab kliiniku kontrolli info üle",
      "Toetab psühholoogilist turvalisust",
      "Kiire kasutuselevõtt, minimaalne koolitus",
    ],
    []
  );

  // Form state
  const [clinicName, setClinicName] = useState("");
  const [contactPerson, setContactPerson] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [clinicSize, setClinicSize] = useState("");
  const [hardCases, setHardCases] = useState([]);
  const [biggestWorry, setBiggestWorry] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const hardCaseOptions = useMemo(
    () => [
      "Ravimitega seotud juhtumid",
      "Dokumenteerimise probleemid",
      "Aja- või teavituse viivitused",
      "Kaebused või patsiendi rahulolematus",
      "Töökorralduse vead",
      "Muu (avatud väli)",
    ],
    []
  );

  const roleOptions = useMemo(
    () => ["Kliiniku juht", "Kvaliteedi- või ohutusjuht", "Perearst", "Õendusjuht", "Administraator", "Muu"],
    []
  );

  const sizeOptions = useMemo(
    () => ["1–3 töötajat", "4–10 töötajat", "11–30 töötajat", "Üle 30 töötaja", "Osa kliinikute võrgust"],
    []
  );

  const canSubmit = clinicName.trim() && contactPerson.trim() && role && email.trim() && clinicSize;

  const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyAu4l7mw07YMP9eaIQvPKiRYJdymhyrxsyHlULZAJkwYFzjZh5x7WAPV5x5rOb77eA/exec";

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!canSubmit) return;

    try {
      const payload = {
        clinicName,
        contactPerson,
        role,
        email,
        clinicSize,
        hardCases,
        biggestWorry,
        userAgent: navigator.userAgent,
        referrer: document.referrer || "",
      };

      // Apps Script ei toeta alati preflighti hästi.
      // Kasutame "no-cors" – see tähendab, et me ei saa response'i lugeda,
      // aga andmed salvestuvad Sheet'i.
      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      setSubmitted(true);
    } catch (err) {
      alert("Saatmine ebaõnnestus. Palun proovi uuesti.");
    }
  };


  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 text-slate-900">
      {/* Top bar */}
      <div className="sticky top-0 z-40 border-b border-slate-200/70 bg-white/70 backdrop-blur">
        <Container className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-900 text-white font-bold">
              EP
            </div>
            <div className="leading-tight">
              <div className="text-sm font-semibold">EelPohak</div>
              <div className="text-xs text-slate-500">Ohutusjuhtumid · järeltegevused · auditivalmidus</div>
            </div>
          </div>

          <nav className="hidden items-center gap-6 md:flex">
            {nav.map((i) => (
              <AnchorLink key={i.href} href={i.href}>
                {i.label}
              </AnchorLink>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Button as="a" href="#kontakt" variant="primary" className="hidden sm:inline-flex">
              👉 Jäta kliiniku info
            </Button>
            <Button as="a" href="#kontakt" variant="secondary" className="sm:hidden">
              CTA
            </Button>
          </div>
        </Container>
      </div>

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-blue-500/10 blur-3xl" />
          <div className="absolute -bottom-24 right-8 h-72 w-72 rounded-full bg-emerald-500/10 blur-3xl" />
        </div>

        <Container className="relative py-14 sm:py-20">
          <div className="grid items-start gap-10 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <Badge>Above the fold</Badge>
              <h1 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
                Ära lase juhtumitel hajuda.
              </h1>
              <p className="mt-5 text-base leading-7 text-slate-600 sm:text-lg">
                <span className="font-medium text-slate-900">
                  EelPohak viib kliiniku ohutusjuhtumite käsitluse killustatusest selge ja toimiva protsessini.
                </span>
                <br />
                Kõik juhtumid, järeltegevused ja vastutus ühes kohas – loodud esmatasandi kliinikutele.
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                {bullets.map((b) => (
                  <Card key={b.title} className="p-5">
                    <div className="text-sm font-semibold text-slate-900">{b.title}</div>
                    <div className="mt-2 text-sm leading-6 text-slate-600">{b.desc}</div>
                  </Card>
                ))}
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Button as="a" href="#kontakt" variant="primary" className="px-5 py-3">
                  👉 Jäta oma kliiniku info
                </Button>
                <div className="text-sm text-slate-600">
                  Et saaksime hinnata, kas ja kuidas EelPohak teile sobib
                  <div className="text-xs text-slate-500">Ei ole müügikohustus · Vastame personaalselt</div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5">
              <Card className="p-6">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <div className="text-sm font-semibold">Kiire ülevaade juhile</div>
                    <div className="mt-1 text-sm text-slate-600">
                      Üks koht, kus näed seisu, vastutajaid ja prioriteete.
                    </div>
                  </div>
                  <Badge>Protsess + nähtavus</Badge>
                </div>

                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  <Stat label="Fookus" value="Järeltegevused" />
                  <Stat label="Prioriteet" value="Riskihinnang" />
                  <Stat label="Tõendatavus" value="Auditivalmidus" />
                  <Stat label="Tööjaotus" value="Delegeeritav" />
                </div>

                <Divider />

                <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <div className="text-xs font-semibold text-slate-700">Ankurlause</div>
                  <div className="mt-2 text-sm leading-6 text-slate-700">
                    EelPohak toetab õppimist ja kvaliteedi parandamist kliinikus — enne, kui tekib vajadus riiklikuks
                    raporteerimiseks.
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </Container>
      </section>

      {/* PROBLEM */}
      <section id="probleem" className="py-14 sm:py-18">
        <Container>
          <SectionTitle
            kicker="PROBLEEMI TÄPSUSTAMINE"
            title="Tuttav olukord?"
            desc={
              <>
                Probleem ei ole see, et juhtumeid juhtub.
                <br />
                Probleem on see, kui puudub selge ja kaitsev protsess.
              </>
            }
          />

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <Card className="p-6">
              <div className="text-sm font-semibold text-slate-900">Mis läheb valesti (päriselus)</div>
              <ul className="mt-4 space-y-3">
                {problems.map((p) => (
                  <li key={p} className="flex gap-3 text-sm text-slate-700">
                    <span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-slate-900/5 text-slate-900 ring-1 ring-slate-900/10">
                      •
                    </span>
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </Card>

            <Card className="p-6">
              <div className="text-sm font-semibold text-slate-900">Mida EelPohak parandab</div>
              <ul className="mt-4 space-y-3 text-sm">
                <CheckItem>Kanalid asenduvad ühe menetluskeskkonnaga</CheckItem>
                <CheckItem>Igal juhtumil on staatus, ajalugu ja vastutus</CheckItem>
                <CheckItem>Riskihinnang aitab prioritiseerida</CheckItem>
                <CheckItem>Tegevusplaanid ja tegevused ei “haju” laiali</CheckItem>
                <CheckItem>Audit ja järelepäringud on lihtsamini tõendatavad</CheckItem>
                <CheckItem>Tagasiside jõuab raporteerijani (ja vajadusel patsiendini)</CheckItem>
              </ul>

              <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-4">
                <div className="text-xs font-semibold text-slate-700">Mõtteviis</div>
                <div className="mt-2 text-sm text-slate-700">
                  Fookus on lahendusel ja õppimisel, mitte süüdlase otsimisel.
                </div>
              </div>
            </Card>
          </div>
        </Container>
      </section>

      {/* HOW IT WORKS */}
      <section id="kuidas" className="py-14 sm:py-18">
        <Container>
          <SectionTitle
            kicker="KUIDAS SEE PÄRISELT KLIINIKUS VÄLJA NÄEB"
            title="Lihtne protsess, mis töötab ka kiirel tööpäeval"
            desc="Üks selge töövoog: raporteerimine → analüüs → riskihindamine → tegevusplaan → tagasiside."
          />

          <div className="mt-10 grid gap-4">
            {steps.map((s) => (
              <Card key={s.n} className="p-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-slate-900 text-white font-semibold">
                      {s.n}
                    </div>
                    <div>
                      <div className="text-base font-semibold text-slate-900">{s.title}</div>
                      <ul className="mt-3 space-y-2 text-sm text-slate-700">
                        {s.points.map((p) => (
                          <li key={p} className="flex gap-3">
                            <span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-blue-50 text-blue-700 ring-1 ring-blue-100">
                              →
                            </span>
                            <span>{p}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="mt-4 rounded-xl bg-slate-50 px-4 py-3 text-sm text-slate-700">
                        <span className="font-semibold">Tulemus:</span> {s.result.replace("Tulemus: ", "")}
                      </div>
                    </div>
                  </div>

                  <div className="sm:pt-1">
                    <Badge>Selge vastutus</Badge>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-soft">
            <div className="text-sm font-semibold text-slate-900">Kokkuvõte juhile</div>
            <div className="mt-2 text-sm leading-6 text-slate-700">
              Sina ei pea “Exceli maagiat” tegema ega kõike ise läbi töötama — süsteem aitab prioriseerida ning analüüs ja
              tegevusplaanid saavad olla delegeeritud.
            </div>
          </div>
        </Container>
      </section>

      {/* STAFF */}
      <section id="personal" className="py-14 sm:py-18">
        <Container>
          <SectionTitle
            kicker="MIKS PERSONAL SEDA KASUTAB"
            title="Sest see ei tee tööd raskemaks"
            desc="Personal kasutab EelPohaki, sest see toetab tööd – mitte ei lisa survet."
          />

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {staffReasons.map((r) => (
              <Card key={r.title} className="p-6">
                <div className="text-base font-semibold text-slate-900">{r.title}</div>
                <div className="mt-2 text-sm leading-6 text-slate-600">{r.desc}</div>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* BUREAUCRACY */}
      <section id="burokraatia" className="py-14 sm:py-18">
        <Container>
          <SectionTitle
            kicker="KAS SEE LISAB BÜROKRAATIAT?"
            title="Ei. Vastupidi – see võtab seda vähemaks."
            desc="EelPohak ei loo uut bürokraatiat. See eemaldab käsitsi tehtud kaose."
          />

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {bureaucracy.map((i) => (
              <Card key={i.q} className="p-6">
                <div className="text-sm font-semibold text-slate-900">{i.q}</div>
                <div className="mt-2 text-sm leading-6 text-slate-600">→ {i.a}</div>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* FIT */}
      <section id="sobivus" className="py-14 sm:py-18">
        <Container>
          <SectionTitle kicker="KELLELE SEE SOBIB" title="Kas see on teie kliinikule?" desc={null} />

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <Card className="p-6">
              <div className="text-base font-semibold text-slate-900">Sobib, kui:</div>
              <ul className="mt-4 space-y-3 text-sm">
                <CheckItem>vastutad kliiniku kvaliteedi ja ohutuse eest</CheckItem>
                <CheckItem>tahad, et midagi ei jää „õhku“</CheckItem>
                <CheckItem>vajad selget ülevaadet ja rahulikku kindlust</CheckItem>
              </ul>
            </Card>

            <Card className="p-6">
              <div className="text-base font-semibold text-slate-900">Ei sobi, kui:</div>
              <ul className="mt-4 space-y-3 text-sm">
                <XItem>otsid suurt haigla- või kontsernilahendust</XItem>
                <XItem>tahad ainult statistikat, mitte järeltegevusi</XItem>
                <XItem>otsid ajutist või tasuta lahendust</XItem>
              </ul>
            </Card>
          </div>
        </Container>
      </section>

      {/* WHY */}
      <section id="miks" className="py-14 sm:py-18">
        <Container>
          <SectionTitle kicker="MIKS VALITAKSE EELPOHAK" title="Praktiline, kliinikupõhine lähenemine" desc={null} />

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {whyChoose.map((w) => (
              <Card key={w} className="p-6">
                <div className="flex items-start gap-3">
                  <span className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-xl bg-slate-900 text-white">
                    ✓
                  </span>
                  <div className="text-sm font-semibold text-slate-900">{w}</div>
                </div>
              </Card>
            ))}
          </div>

          <div className="mt-10 grid gap-4 lg:grid-cols-12">
            <Card className="p-6 lg:col-span-7">
              <div className="text-sm font-semibold text-slate-900">Sotsiaalne tõestus (algfaas)</div>
              <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <div className="text-sm text-slate-800">
                  “Lõpuks on tunne, et kui midagi juhtub, on meil kontroll.”
                </div>
                <div className="mt-2 text-xs font-medium text-slate-500">— kliiniku juht</div>
              </div>
              <div className="mt-4 text-xs text-slate-500">
                Lisame siia rohkem tagasisidet pilootkliinikutelt, kui esimesed kasutuselevõtud on tehtud.
              </div>
            </Card>

            <Card className="p-6 lg:col-span-5">
              <div className="text-sm font-semibold text-slate-900">Mida juht saab lõpuks</div>
              <div className="mt-2 text-sm leading-6 text-slate-600">
                Vähem manuaalset tööd, parem kontroll protsessi üle, selge prioriteet, läbipaistvus ja tõendatav ajalugu.
              </div>

              <div className="mt-5 grid gap-3">
                <div className="rounded-2xl border border-slate-200 bg-white p-4">
                  <div className="text-xs font-semibold text-slate-700">Mõõdetavus</div>
                  <div className="mt-1 text-sm text-slate-700">
                    Tegevuste staatus ja tähtaegade jälgimine, korduvuse vaade, analüütika.
                  </div>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-white p-4">
                  <div className="text-xs font-semibold text-slate-700">Rahulikum kindlustunne</div>
                  <div className="mt-1 text-sm text-slate-700">
                    Kui tuleb audit, kaebus või järelepäring: “siin on protsess ja tõendid”.
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </Container>
      </section>

      {/* CONTACT / FORM */}
      <section id="kontakt" className="py-14 sm:py-18">
        <Container>
          <div className="grid gap-8 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-5">
              <SectionTitle
                kicker="👉 Jäta oma kliiniku info"
                title="Hindame, kas ja kuidas EelPohak teile sobib"
                desc="Ei ole müügikohustus · Vastame personaalselt"
              />

              <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-soft">
                <div className="text-sm font-semibold text-slate-900">Mida sa saad pärast saatmist</div>
                <ul className="mt-4 space-y-3 text-sm">
                  <CheckItem>Selge soovitus: kas EelPohak sobib teie protsessiga</CheckItem>
                  <CheckItem>Lühike ülevaade kasutuselevõtust ja rollidest</CheckItem>
                  <CheckItem>Kui sobib: järgmised sammud (integreerimine, ligipääsud, koolitus)</CheckItem>
                </ul>
              </div>
            </div>

            <div className="lg:col-span-7">
              <Card className="p-6">
                {!submitted ? (
                  <form onSubmit={onSubmit} className="grid gap-5">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <Input
                        name="clinicName"
                        label="1. Kliiniku nimi"
                        required
                        value={clinicName}
                        onChange={setClinicName}
                        placeholder="Nt. Tervisekeskus OÜ"
                      />
                      <Input
                        name="contactPerson"
                        label="2. Kontaktisik"
                        required
                        value={contactPerson}
                        onChange={setContactPerson}
                        placeholder="Ees- ja perekonnanimi"
                      />
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <Select
                        name="role"
                        label="3. Kontaktisiku roll"
                        required
                        value={role}
                        onChange={setRole}
                        options={roleOptions}
                      />
                      <Input
                        name="email"
                        label="4. E-post"
                        required
                        type="email"
                        value={email}
                        onChange={setEmail}
                        placeholder="nimi@kliinik.ee"
                      />
                    </div>

                    <Select
                      name="clinicSize"
                      label="5. Kliiniku suurus"
                      required
                      value={clinicSize}
                      onChange={setClinicSize}
                      options={sizeOptions}
                    />

                    <CheckboxGroup
                      label="6. Millised ohutusjuhtumid on teie jaoks täna kõige keerulisemad?"
                      options={hardCaseOptions}
                      values={hardCases}
                      setValues={setHardCases}
                    />

                    <Textarea
                      name="biggestWorry"
                      label="7. Mis on teie suurim mure ohutusjuhtumite käsitlemisel täna?"
                      required={false}
                      value={biggestWorry}
                      onChange={setBiggestWorry}
                      placeholder="Valikuline – 1–2 lauset aitab meil paremini vastata."
                    />

                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <div className="text-xs text-slate-500">
                        Saadame vastuse personaalselt. Andmeid kasutame vaid kontaktiks ja sobivuse hindamiseks.
                      </div>
                      <Button type="submit" variant="primary" className={cn("px-5 py-3", !canSubmit && "opacity-60")}>
                        👉 Saada kliiniku info
                      </Button>
                    </div>

                    {!canSubmit ? (
                      <div className="text-xs text-amber-700">
                        Palun täida kohustuslikud väljad (kliiniku nimi, kontaktisik, roll, e-post, kliiniku suurus).
                      </div>
                    ) : null}
                  </form>
                ) : (
                  <div className="space-y-4">
                    <div className="inline-flex items-center gap-2 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-emerald-800">
                      <span className="font-semibold">Aitäh!</span>
                      <span className="text-sm">Sinu kliiniku info on salvestatud (demo).</span>
                    </div>

                    <div className="text-sm text-slate-700">
                      Järgmine samm: võtame ühendust ja täpsustame vajadusel 2–3 detaili, et anda konkreetne soovitus.
                    </div>

                    <div className="rounded-2xl border border-slate-200 bg-white p-5">
                      <div className="text-xs font-semibold text-slate-700">Saadetud kokkuvõte (demo)</div>
                      <div className="mt-2 text-sm text-slate-700">
                        <div>
                          <span className="font-semibold">Kliinik:</span> {clinicName}
                        </div>
                        <div>
                          <span className="font-semibold">Kontakt:</span> {contactPerson} ({role})
                        </div>
                        <div>
                          <span className="font-semibold">E-post:</span> {email}
                        </div>
                        <div>
                          <span className="font-semibold">Suurus:</span> {clinicSize}
                        </div>
                        <div className="mt-2">
                          <span className="font-semibold">Keerulised juhtumid:</span>{" "}
                          {hardCases.length ? hardCases.join(", ") : "—"}
                        </div>
                        <div className="mt-2">
                          <span className="font-semibold">Suurim mure:</span>{" "}
                          {biggestWorry.trim() ? biggestWorry : "—"}
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        variant="secondary"
                        onClick={() => {
                          setSubmitted(false);
                          setClinicName("");
                          setContactPerson("");
                          setRole("");
                          setEmail("");
                          setClinicSize("");
                          setHardCases([]);
                          setBiggestWorry("");
                        }}
                      >
                        Täida uuesti
                      </Button>
                      <Button as="a" href="#kuidas" variant="primary">
                        Vaata protsessi uuesti
                      </Button>
                    </div>
                  </div>
                )}
              </Card>
            </div>
          </div>
        </Container>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-slate-200/70 bg-white">
        <Container className="py-10">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="text-sm text-slate-600">
              <span className="font-semibold text-slate-900">EelPohak</span> — ühtne ohutusjuhtumite käsitlus esmatasandi
              kliinikutele.
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <AnchorLink href="#probleem">Probleem</AnchorLink>
              <AnchorLink href="#kuidas">Kuidas töötab</AnchorLink>
              <AnchorLink href="#kontakt">Kliiniku info</AnchorLink>
            </div>
          </div>
          <div className="mt-4 text-xs text-slate-500">
            © {new Date().getFullYear()} EelPohak. Kõik õigused kaitstud.
          </div>
        </Container>
      </footer>
    </div>
  );
}
