# OCTA SAR website

Small investor-oriented corporate site for OCTA SAR, built with the official OpenAI Sites starter.

## Routes

- `/` — company positioning and current venture
- `/about` — philosophy and operating principles
- `/ventures` — portfolio index
- `/ventures/manai-cercle` — reusable venture detail template
- `/contact` — investor enquiry flow

Venture content is kept in `app/lib/ventures.ts`. Add a record there to extend the portfolio; the shared detail route renders the standard investor narrative.

## Before public launch

Confirm the investor email used by `app/components/InvestorForm.tsx`, replace the CSS-built mark with the approved production logo asset if available, connect the analytics event hook, and review all venture claims against founder-approved evidence.
