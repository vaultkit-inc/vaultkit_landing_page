# vaultkit.io redesign: direction B ("spec sheet")

- LandingSpec.dc.html: THE NEW DESIGN. Visual and content spec for the redesigned landing page.
- Landing.dc.html: the current design, included only for reference (the design partner modal and its form fields live here).

Each file is HTML with inline styles plus a small script at the bottom (`renderVals`) holding sample data. `{{name}}` placeholders, `<sc-if>` and `<sc-for>` are the design tool's templating: read them as values, conditionals and loops. They won't render in a plain browser.

Design tokens used in LandingSpec:
- paper #F4F2EC, raised paper #FBFAF6, ink #1B1A17, secondary text #4A4740, muted #77736A
- rules: #D9D5CA (light), #1B1A17 (strong)
- accent #C2410C (burnt orange): actions and section markers only
- decision colours: allow #15803D, mask #1D4ED8, approval #B45309
- type: IBM Plex Serif (headings), IBM Plex Sans (body), IBM Plex Mono (labels, code, spec table)
- shape: square corners, 1px rules, content framed by vertical borders at max-width 1160px
