import { h as head, p as pop, a as push } from "../../../chunks/index2.js";
import { t as transparentLogo } from "../../../chunks/logo-transparent.js";
import { a as attr } from "../../../chunks/attributes.js";
function _page($$payload, $$props) {
  push();
  head($$payload, ($$payload2) => {
    $$payload2.title = `<title>Events - Tech Talk Augusta</title>`;
    $$payload2.out += `<meta name="description" content="Join our upcoming tech events in Augusta, Georgia. Monthly meetups, workshops, and networking opportunities for the local tech community."> <meta name="keywords" content="Tech Events, Augusta Georgia, Technology Meetups, Networking Events, Tech Workshops"> <meta name="author" content="Tech Talk Augusta"> <meta property="og:title" content="Tech Events - Tech Talk Augusta"> <meta property="og:description" content="Join our upcoming tech events in Augusta, Georgia. Monthly meetups, workshops, and networking opportunities for the local tech community."> <meta property="og:image" content="https://techtalkaugusta.com/images/og-image.jpg"> <meta property="og:url" content="https://techtalkaugusta.com/events"> <meta name="twitter:card" content="summary_large_image"> <meta name="twitter:title" content="Tech Events - Tech Talk Augusta"> <meta name="twitter:description" content="Join our upcoming tech events in Augusta, Georgia. Monthly meetups, workshops, and networking opportunities for the local tech community."> <meta name="twitter:image" content="https://techtalkaugusta.com/images/twitter-image.jpg">`;
  });
  $$payload.out += `<section class="hero svelte-1detmli"><div class="container"><div class="hero-content svelte-1detmli"><img${attr("src", transparentLogo)} alt="Tech Talk Augusta Logo" class="hero-logo svelte-1detmli"> <h1>Upcoming Events</h1> <p class="hero-text svelte-1detmli">Join us for exciting tech events, workshops, and networking opportunities in Augusta.</p></div></div></section> <section class="events-section svelte-1detmli"><div class="container">`;
  {
    $$payload.out += "<!--[-->";
    $$payload.out += `<div class="loading svelte-1detmli"><p>Loading events...</p></div>`;
  }
  $$payload.out += `<!--]--> <div class="past-events svelte-1detmli"><h2>Past Events</h2> <p class="lead svelte-1detmli">Missed an event? Check out our past talks and presentations on our blog.</p> <a href="https://dev.to/techtalkaugusta" class="btn btn-secondary" target="_blank" rel="noopener noreferrer">View Past Events</a></div></div></section>`;
  pop();
}
export {
  _page as default
};
