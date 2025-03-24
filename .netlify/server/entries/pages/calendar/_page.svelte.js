import { e as ensure_array_like, h as head, p as pop, b as stringify, a as push } from "../../../chunks/index2.js";
import { t as transparentLogo } from "../../../chunks/logo-transparent.js";
import { a as attr } from "../../../chunks/attributes.js";
import { e as escape_html } from "../../../chunks/escaping.js";
const stockEvent = "/_app/immutable/assets/stock-event.DOFu0X5Z.jpg";
function _page($$payload, $$props) {
  push();
  let filteredEvents;
  const events = [
    {
      id: 1,
      title: "Web Development Workshop",
      date: "2024-04-15",
      time: "6:00 PM",
      location: "Augusta Tech Hub",
      description: "Join us for a hands-on workshop on modern web development techniques.",
      type: "workshop",
      image: stockEvent
    },
    {
      id: 2,
      title: "AI & Machine Learning Meetup",
      date: "2024-04-22",
      time: "7:00 PM",
      location: "Virtual Event",
      description: "Discussion on the latest developments in AI and machine learning.",
      type: "meetup",
      image: stockEvent
    },
    {
      id: 3,
      title: "Cybersecurity Panel",
      date: "2024-05-01",
      time: "6:30 PM",
      location: "Augusta University",
      description: "Expert panel discussion on current cybersecurity challenges and solutions.",
      type: "panel",
      image: stockEvent
    }
  ];
  filteredEvents = events;
  const each_array = ensure_array_like(filteredEvents);
  head($$payload, ($$payload2) => {
    $$payload2.title = `<title>Calendar - Tech Talk Augusta</title>`;
    $$payload2.out += `<meta name="description" content="View upcoming tech events, workshops, and meetups in Augusta, Georgia. Join our community for knowledge sharing and networking."> <meta name="keywords" content="Augusta Tech Events, Tech Meetups, Workshops, Calendar, Georgia Tech Community"> <meta property="og:title" content="Calendar - Tech Talk Augusta"> <meta property="og:description" content="View upcoming tech events, workshops, and meetups in Augusta, Georgia. Join our community for knowledge sharing and networking."> <meta property="og:image" content="https://techtalkaugusta.com/images/og-image.jpg"> <meta property="og:url" content="https://techtalkaugusta.com/calendar">`;
  });
  $$payload.out += `<section class="hero svelte-1iclimw"><div class="container"><div class="hero-content svelte-1iclimw"><img${attr("src", transparentLogo)} alt="Tech Talk Augusta Logo" class="hero-logo svelte-1iclimw"> <h1>Upcoming Events</h1> <p class="lead svelte-1iclimw">Join us for exciting tech talks, workshops, and networking events in Augusta.</p></div></div></section> <section class="calendar svelte-1iclimw"><div class="container"><div class="filters svelte-1iclimw"><button${attr("class", `filter-btn ${stringify("active")} svelte-1iclimw`)}>All Events</button> <button${attr("class", `filter-btn ${stringify("")} svelte-1iclimw`)}>Meetups</button> <button${attr("class", `filter-btn ${stringify("")} svelte-1iclimw`)}>Workshops</button> <button${attr("class", `filter-btn ${stringify("")} svelte-1iclimw`)}>Panels</button></div> <div class="events-grid svelte-1iclimw"><!--[-->`;
  for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
    let event = each_array[$$index];
    $$payload.out += `<div class="event-card svelte-1iclimw"><div class="event-image svelte-1iclimw"><img${attr("src", event.image)}${attr("alt", event.title)} class="svelte-1iclimw"></div> <div class="event-content svelte-1iclimw"><div class="event-date svelte-1iclimw"><span class="date">${escape_html(new Date(event.date).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric"
    }))}</span> <span class="time">${escape_html(event.time)}</span></div> <h3>${escape_html(event.title)}</h3> <p class="location svelte-1iclimw">${escape_html(event.location)}</p> <p class="description svelte-1iclimw">${escape_html(event.description)}</p> <a href="/forms/event-registration" class="btn btn-primary">Register</a></div></div>`;
  }
  $$payload.out += `<!--]--></div> `;
  if (filteredEvents.length === 0) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<div class="no-events svelte-1iclimw"><p>No events found for the selected category.</p></div>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></div></section> <section class="cta svelte-1iclimw"><div class="container"><div class="cta-content svelte-1iclimw"><h2>Want to Stay Updated?</h2> <p>Subscribe to our newsletter to receive updates about upcoming events and community news.</p> <a href="/forms/newsletter" class="btn btn-secondary">Subscribe to Newsletter</a></div></div></section>`;
  pop();
}
export {
  _page as default
};
