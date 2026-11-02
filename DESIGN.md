# Design notes

The homepage is a personal index: Praveen’s real portrait in the centre, with Entrepreneurship, Side projects, Professional experience, Cricket, Competitions and About around it. Keep this arrangement intact. Mobile uses the same portrait and chapters in a readable touch index.

Instrument Serif headings and DM Sans body text sit on warm paper (#F4F1E9), with dark ink (#282923), muted text (#64645A) and a brick accent (#8A392B). The site avoids repeated product cards and generated product screenshots. Optimus has the first and largest work section. Weave and BookHop remain side projects.

The supplied outdoor portrait anchors Home and About. The vertical cricket photograph appears on Home/About, and the horizontal photograph in Cricket. Captions do not infer a match or season. Project pages remain complete as text stories when screenshots are absent.

Motion includes a portrait entrance and gentle float, moving connector dashes, scroll transforms, staggered entry rows, animated native disclosures and photo movement. The visible pause control persists per browser tab. System reduced motion disables effects. Required content is never left opacity-hidden, and links work without JavaScript.

Motion uses native browser features documented by MDN: [Element.animate](https://developer.mozilla.org/en-US/docs/Web/API/Element/animate), [IntersectionObserver](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API) and [prefers-reduced-motion](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion). Native cross-document transitions are excluded for compatibility with the embedded browser.

Clean release pages contain no authoring strips, review desks, verification notes or asset placeholders. Empty optional fields are omitted. Product development stages, incoming roles, team versus individual results and the Optimus waitlist context remain factual parts of the story.
