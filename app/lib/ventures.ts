export type Venture = {
  slug: string;
  index: string;
  name: string;
  label: string;
  status: string;
  oneLiner: string;
  summary: string;
  sectors: string[];
  problem: string[];
  solution: string;
  flow: { step: string; title: string; detail: string }[];
  businessModel: { title: string; detail: string }[];
  roadmap: { phase: string; title: string; detail: string }[];
};

export const ventures: Venture[] = [
  {
    slug: 'manai-cercle',
    index: '01',
    name: 'MANAI CERCLE',
    label: 'Verified social ecosystem',
    status: 'In development',
    oneLiner: 'A safer, more intentional way for Mongolians to meet, connect and belong.',
    summary:
      'MANAI CERCLE is a verification-led dating and social ecosystem designed around trust, relevant local context and healthier real-world connection.',
    sectors: ['Technology', 'Community', 'Trust & safety'],
    problem: [
      'Low-trust profiles and unclear intent make online connection feel risky.',
      'Global products often miss Mongolia’s social context, expectations and scale.',
      'Safety is usually treated as moderation after harm, rather than product infrastructure.',
    ],
    solution:
      'A locally grounded ecosystem where verification, intention and safety shape discovery from the first interaction—not as an afterthought.',
    flow: [
      { step: '01', title: 'Verify', detail: 'Build a credible identity layer with consent and privacy at the centre.' },
      { step: '02', title: 'Discover', detail: 'Find relevant people and circles through intentional, locally aware signals.' },
      { step: '03', title: 'Connect', detail: 'Move from considered digital interaction toward safer real-world belonging.' },
    ],
    businessModel: [
      { title: 'Freemium membership', detail: 'A useful free core with paid controls, discovery and visibility.' },
      { title: 'Trust services', detail: 'Optional verification and safety products designed around user value.' },
      { title: 'Ecosystem partnerships', detail: 'Relevant experiences and partners, introduced without eroding trust.' },
    ],
    roadmap: [
      { phase: 'Now', title: 'Validate the core', detail: 'Founder interviews, safety design, proposition and prototype.' },
      { phase: 'Next', title: 'Closed pilot', detail: 'Invite-only cohort, feedback loops and behaviour-led iteration.' },
      { phase: 'Then', title: 'Focused launch', detail: 'Measured acquisition, retention learning and trusted partnerships.' },
    ],
  },
];

export function getVenture(slug: string) {
  return ventures.find((venture) => venture.slug === slug);
}
