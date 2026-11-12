# Ferrow

A free landing page template for a made-up product called Ferrow, a field runbook for service, support and logistics crews that updates its pages as jobs close. It comes with nine animated Isometric illustrations by [Illos](https://illos.dev).

The page reads like a short book: a wide hero, then six numbered chapters with a sticky heading on the left and the content on the right. It has a light and dark switch, a table of runbook pages whose ages tick live, a crew question with clickable sources, a dark access band, team tabs and a closing call to action.

Ferrow is not a real company. Change the name, the copy and the numbers to your own.

## Run it

You need Node 18 or later.

```
npm install
npm run dev
```

Then open the address Vite prints, usually http://localhost:5173.

## Build it

```
npm run build
```

The finished site goes to `dist/`. It is plain HTML, CSS and JavaScript, so any static host can serve it. `npm run preview` serves `dist/` locally so you can check the build.

## What's inside

- `index.html` holds the page and all its copy.
- `src/style.css` holds the styles. Colours, the type scale and the spacing steps are CSS variables at the top, with a light set and a dark set.
- `src/main.js` runs the theme switch, the mobile menu, the ticking file ages, the source chips and the team tabs (click, or the arrow keys).
- `illos/` holds the illustrations as SVG files.
- `public/fonts/` holds Geist and Geist Mono.

Each illustration sits in the page as a comment such as `<!-- illos:hero -->`. The build swaps the comment for the SVG inline, so the illustration can read the page's colours and follow the light and dark switch. To move one, move its comment. To use another, drop the SVG into `illos/` and add a comment with its file name. Use each file once per page.

The illustrations take their colours from the `--illos-*` variables in `src/style.css`. Change `--illos-accent` and the highlight in every illustration follows.

## How the motion behaves

- Each illustration loops while it is on screen and pauses when it scrolls away or sits in a hidden tab.
- With reduced motion turned on in the system settings, every illustration shows one still frame and the file ages stop ticking.
- Nothing else on the page moves on its own.

## Fonts

Geist and Geist Mono are self-hosted in `public/fonts` under the SIL Open Font License (`OFL.txt` sits next to them). To change them, swap the files and the `@font-face` rules at the top of `src/style.css`.

## Licence

The code is MIT. The illustrations are free to use in sites you build from this template, but not to redistribute on their own. See `LICENSE.md`.

## Credit

Animated illustrations by [Illos](https://illos.dev/?utm_source=ferrow-template&utm_medium=example). There are more in the same style there, along with the skills that let your coding agent draw new ones.
