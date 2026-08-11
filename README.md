# Optimum Communication Agency — Website

## Overview

A modern, responsive marketing website for **Optimum Communication Agency**, a
communications and branding agency. The site presents the agency's services,
featured projects, and a way for prospective clients to get in touch.

## Features

- Responsive layout (mobile, tablet, desktop)
- Light/dark theme toggle, with the visitor's OS preference respected by default
- Scroll-triggered reveal animations
- Services and project showcase sections
- Contact form (delivered via [Formspree](https://formspree.io))
- SEO essentials: Open Graph/Twitter meta tags, JSON-LD structured data, sitemap, robots.txt

## Technologies Used

- HTML5
- CSS3 (custom properties, no framework)
- Vanilla JavaScript (no build step required)

## Project Structure

```
Optimum-Portofolio-Web/
├── index.html
├── css/
│   └── styles.css
├── js/
│   └── main.js
├── images/            # optimized .jpg + .webp pairs
├── favicon.svg / apple-touch-icon.png / icon-192.png / icon-512.png
├── site.webmanifest
├── robots.txt
└── sitemap.xml
```

## Running Locally

This is a static site with no build step. Serve the folder with any static
file server, for example:

```
npx serve .
```

Then open the printed local URL in your browser.

## Updating Images

Source photos should be resized/compressed before committing. A rough guide:
hero background ≈ 2400px wide, service/project photos ≈ 900–1200px wide,
JPEG quality ~75-80, with a matching `.webp` generated alongside each `.jpg`.

## Contact Form

The form posts to a Formspree endpoint configured in `index.html`
(`<form action="...">`). To change where submissions are delivered, update
that endpoint in your Formspree dashboard or swap in a different form
backend (e.g. Netlify Forms).

## Contact

For inquiries or collaboration, use the contact form on the live site.
