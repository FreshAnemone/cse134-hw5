# SSG Exercise (Eleventy)

A small Eleventy project with two pages (Home and About) that share one footer.

## Commands 

While inside /ssg-exercise

Install dependencies:

    npm install

Build the site (output goes to `_site/`):

    npx @11ty/eleventy

Preview both pages locally (rebuilds when files change):

    npx @11ty/eleventy --serve

Then open:

- http://localhost:8080/ (Home)
- http://localhost:8080/about.html (About)

## Shared section

The footer lives in `_includes/footer.njk`. Both `index.html` and
`about.html` include it, so a change to that one file shows up on both
pages after a rebuild.