# cse134-hw5

## Part 4: SSG Exercise

The static site generator exercise (Eleventy) is in the `ssg-exercise/` folder.

Pages to preview:

- `ssg-exercise/index.html` (Home), built to `_site/index.html`
- `ssg-exercise/about.html` (About), built to `_site/about.html`

Both pages share one footer, which is in `ssg-exercise/_includes/footer.njk`.

Install, build and preview commands are in `ssg-exercise/README.md`.



## Design Note: Random Dog Generator

**What the visitor wants:** to see a random dog photo on demand, to go back to
dogs they've already seen, and to start over. The widget gives them a
Generate button, a Dog History list, and a Reset button.

**Tracing one action: pressing Generate**

1. The visitor clicks the **Generate** button (a `<button>` the
   `<random-dog-generator>` element builds in `build()`).
2. The click calls `generate()`. It sets the status line to "Fetching a
   dog..." and disables the button.
3. `generate()` sends `fetch("https://dog.ceo/api/breeds/image/random")`.
   The response is checked for an OK HTTP status, then parsed as JSON, then
   validated: `message` must be a string and an HTTPS URL.
4. The breed name is read from the image URL and capitalized. The name and
   image are saved to `localStorage` so history survives a reload.
5. `showDog()` updates the DOM: the `<h4>` gets the dog's name, the `<img>`
   gets the new `src` and descriptive `alt`, and the status line changes.
   `addToHistory()` adds a button for that dog to the history list (once per
   breed).

**What the visitor sees**

- **While waiting:** the status line (a `role="status"` live region, so
  screen readers announce it) shows "Fetching a dog..." in italics, and the
  Generate button is disabled so requests can't pile up. The previous dog stays
  on screen.
- **On success:** the name, photo and "<Name> loaded" status replace the old
  ones, the new dog appears in the history, and the button is enabled again.
- **On failure:** a network error, bad HTTP status, invalid JSON or an
  unexpected response all end up in the same `catch`. The status line shows
  "Couldn't load a dog. Press Generate to try again." in red italics, the
  previous dog stays visible, and the button is re-enabled (in `finally`) so
  the visitor can retry. If the image URL itself fails to load, the `<img>`
  error handler shows the same message.