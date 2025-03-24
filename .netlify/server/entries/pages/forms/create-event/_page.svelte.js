import { h as head, p as pop, a as push } from "../../../../chunks/index2.js";
import "../../../../chunks/client.js";
import { t as transparentLogo } from "../../../../chunks/logo-transparent.js";
import { a as attr } from "../../../../chunks/attributes.js";
import { e as escape_html } from "../../../../chunks/escaping.js";
function _page($$payload, $$props) {
  push();
  let title = "";
  let date = "";
  let time = "";
  let location = "";
  let description = "";
  let registrationUrl = "";
  let enableReminder = true;
  let submitting = false;
  head($$payload, ($$payload2) => {
    $$payload2.title = `<title>Create Event - Tech Talk Augusta</title>`;
    $$payload2.out += `<meta name="description" content="Create a new tech event in Augusta. Your event will be shared on our website and Discord community."> <meta property="og:title" content="Create Event - Tech Talk Augusta"> <meta property="og:description" content="Create a new tech event in Augusta. Your event will be shared on our website and Discord community."> <meta property="og:url" content="https://techtalkaugusta.com/forms/create-event">`;
  });
  $$payload.out += `<section class="hero svelte-1qsz04y"><div class="container"><div class="hero-content svelte-1qsz04y"><img${attr("src", transparentLogo)} alt="Tech Talk Augusta Logo" class="hero-logo svelte-1qsz04y"> <h1>Create an Event</h1> <p class="lead svelte-1qsz04y">Share your tech event with the Augusta community. Your event will be posted on our website and Discord server.</p></div></div></section> <section class="form-section svelte-1qsz04y"><div class="container"><form class="event-form svelte-1qsz04y">`;
  {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> `;
  {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> <div class="form-group svelte-1qsz04y"><label for="title" class="svelte-1qsz04y">Event Title</label> <input type="text" id="title"${attr("value", title)} required placeholder="e.g., Web Development Workshop" class="svelte-1qsz04y"></div> <div class="form-row svelte-1qsz04y"><div class="form-group svelte-1qsz04y"><label for="date" class="svelte-1qsz04y">Date</label> <input type="date" id="date"${attr("value", date)} required${attr("min", (/* @__PURE__ */ new Date()).toISOString().split("T")[0])} class="svelte-1qsz04y"></div> <div class="form-group svelte-1qsz04y"><label for="time" class="svelte-1qsz04y">Time</label> <input type="time" id="time"${attr("value", time)} required class="svelte-1qsz04y"></div></div> <div class="form-group svelte-1qsz04y"><label for="location" class="svelte-1qsz04y">Location</label> <input type="text" id="location"${attr("value", location)} required placeholder="e.g., Augusta Tech Hub" class="svelte-1qsz04y"></div> <div class="form-group svelte-1qsz04y"><label for="description" class="svelte-1qsz04y">Event Description</label> <textarea id="description" required rows="4" placeholder="Describe your event..." class="svelte-1qsz04y">`;
  const $$body = escape_html(description);
  if ($$body) {
    $$payload.out += `${$$body}`;
  }
  $$payload.out += `</textarea></div> <div class="form-group svelte-1qsz04y"><label for="registrationUrl" class="svelte-1qsz04y">Registration URL (Optional)</label> <input type="url" id="registrationUrl"${attr("value", registrationUrl)} placeholder="https://..." class="svelte-1qsz04y"></div> <div class="form-group reminder-section svelte-1qsz04y"><label class="checkbox-label svelte-1qsz04y"><input type="checkbox"${attr("checked", enableReminder, true)} class="svelte-1qsz04y"> Enable Discord Reminder</label> `;
  {
    $$payload.out += "<!--[-->";
    $$payload.out += `<div class="reminder-time svelte-1qsz04y"><label for="reminderTime" class="svelte-1qsz04y">Remind before event:</label> <select id="reminderTime" class="svelte-1qsz04y"><option value="0.5">30 minutes</option><option value="1">1 hour</option><option value="2">2 hours</option><option value="4">4 hours</option><option value="24">1 day</option></select></div>`;
  }
  $$payload.out += `<!--]--></div> <button type="submit" class="btn btn-primary svelte-1qsz04y"${attr("disabled", submitting, true)}>${escape_html("Create Event")}</button></form></div></section>`;
  pop();
}
export {
  _page as default
};
