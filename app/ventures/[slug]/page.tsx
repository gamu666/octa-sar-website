import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { SiteFooter, SiteHeader } from '../../components/SiteChrome';
import { getVenture, ventures } from '../../lib/ventures';

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return ventures.map((venture) => ({ slug: venture.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const venture = getVenture(slug);
  if (!venture) return {};
  return {
    title: venture.name,
    description: venture.oneLiner,
    openGraph: { title: `${venture.name} — OCTA SAR`, description: venture.oneLiner, images: [] },
    twitter: { card: 'summary', title: `${venture.name} — OCTA SAR`, description: venture.oneLiner, images: [] },
  };
}

export default async function VentureDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const venture = getVenture(slug);
  if (!venture) notFound();

  return (
    <main className="project-page">
      <SiteHeader />
      <section className="project-hero shell">
        <div className="project-hero__meta">
          <Link href="/ventures">← Бүх төсөл</Link>
          <span>Төсөл {venture.index}</span>
          <span className="status"><i /> {venture.status}</span>
        </div>
        <p className="venture-kicker">{venture.label}</p>
        <h1>{venture.name}</h1>
        <div className="project-hero__foot">
          <p>{venture.oneLiner}</p>
          <div>{venture.sectors.map((sector) => <span key={sector}>{sector}</span>)}</div>
        </div>
      </section>

      <section className="project-intro shell">
        <p className="section-label">Үндсэн санаа</p>
        <h2>{venture.summary}</h2>
      </section>

      <section className="project-section shell">
        <div className="project-section__title">
          <span>01</span><p className="section-label">Шийдэх асуудал</p>
        </div>
        <div className="problem-list">
          {venture.problem.map((problem, index) => (
            <article key={problem}><span>0{index + 1}</span><p>{problem}</p></article>
          ))}
        </div>
      </section>

      <section className="solution-panel">
        <div className="shell">
          <div className="project-section__title"><span>02</span><p className="section-label">Бидний шийдэл</p></div>
          <h2>{venture.solution}</h2>
        </div>
      </section>

      <section className="project-section shell">
        <div className="project-section__title"><span>03</span><p className="section-label">Бүтээгдэхүүний явц</p></div>
        <div className="flow-grid">
          {venture.flow.map((item) => (
            <article key={item.step}><span>{item.step}</span><h3>{item.title}</h3><p>{item.detail}</p></article>
          ))}
        </div>
      </section>

      <section className="evidence-section shell">
        <div className="evidence-copy">
          <p className="section-label">Зах зээл ба нотолгоо</p>
          <h2>Таамгаас өмнө нотолгоо.</h2>
          <p>Энэ хаалттай хуудсанд төслийн үндсэн чиглэлийг л харуулна. Зах зээлийн баталгаажсан тооцоо, судалгаа, туршилтын үр дүн, хэрэглэгчийн бүлгийн өгөгдлийг хөрөнгө оруулагчидтай зохих түвшинд хуваалцана.</p>
        </div>
        <div className="evidence-grid">
          <article><span>Зах зээл</span><strong>Судалж, баталгаажуулж байна</strong><p>Нийт, зорилтот, бодитоор хүрэх зах зээлийн тооцоог хаалттай танилцуулгад багтаана.</p></article>
          <article><span>Хэрэглээний нотолгоо</span><strong>Нээлтийн өмнөх шат</strong><p>Утга бүхий туршилтын бүлэг бүрдсэний дараа гол үзүүлэлтүүдийг тайлагнана.</p></article>
          <article><span>Нарийвчилсан материал</span><strong>Хүсэлтээр</strong><p>Таамаглал, нотолгоо, санхүүгийн загварыг нууцлалын гэрээний дараа хуваалцана.</p></article>
        </div>
      </section>

      <section className="project-section shell">
        <div className="project-section__title"><span>04</span><p className="section-label">Орлогын загвар</p></div>
        <div className="model-grid">
          {venture.businessModel.map((item) => (
            <article key={item.title}><h3>{item.title}</h3><p>{item.detail}</p></article>
          ))}
        </div>
      </section>

      <section className="project-section shell">
        <div className="project-section__title"><span>05</span><p className="section-label">Хөгжлийн зураглал</p></div>
        <div className="roadmap">
          {venture.roadmap.map((item) => (
            <article key={item.phase}><span>{item.phase}</span><h3>{item.title}</h3><p>{item.detail}</p></article>
          ))}
        </div>
      </section>

      <section className="people-section shell">
        <div>
          <p className="section-label">Баг ба хамтрагчид</p>
          <h2>Төвлөрсөн үүсгэн байгуулагчдын баг төслийг удирдаж, хөгжлийн шат бүрд мэргэшсэн хамтрагчдыг нэгтгэнэ.</h2>
        </div>
        <p>Үүсгэн байгуулагчдын товч намтар, холбогдох туршлага, зөвлөхүүдийн мэдээллийг зөвшөөрөл авсны дараа энд байршуулна. Баталгаажаагүй нэр, хамтын ажиллагааг нийтлэхгүй.</p>
      </section>

      <section className="investment-cta shell">
        <div>
          <p className="section-label">Хөрөнгө оруулагчтай хийх хаалттай яриа</p>
          <h2>Монголын итгэлцэлд суурилсан харилцааны дэд бүтцийг хамтдаа бүтээе.</h2>
        </div>
        <div>
          <p>Хөрөнгө оруулалтын бүтэц, хөрөнгийн зарцуулалт, хүрэх гол үр дүнг зорилго нийлэх хөрөнгө оруулагчидтай шууд хуваалцана. Нууц нөхцөлийг энэ хуудсанд нийтлэхгүй.</p>
          <Link className="button button--light" href="/contact?venture=manai-cercle" data-analytics-event="request_deck_project">
            Танилцуулга хүсэх <span>↗</span>
          </Link>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
