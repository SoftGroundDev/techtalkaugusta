import { b as stringify, s as store_get, u as unsubscribe_stores, p as pop, a as push } from "../../chunks/index2.js";
import { p as page } from "../../chunks/stores.js";
import { t as transparentLogo } from "../../chunks/logo-transparent.js";
import { a as attr } from "../../chunks/attributes.js";
import { e as escape_html } from "../../chunks/escaping.js";
import "../../chunks/client.js";
function Header($$payload, $$props) {
  push();
  var $$store_subs;
  $$payload.out += `<header${attr("class", `svelte-uw1crb ${stringify([""].filter(Boolean).join(" "))}`)}><div class="container svelte-uw1crb"><a href="/" class="logo svelte-uw1crb"><img${attr("src", transparentLogo)} alt="Tech Talk Augusta Logo" class="svelte-uw1crb"></a> <button class="menu-toggle svelte-uw1crb" aria-label="Toggle menu"><span${attr("class", `hamburger svelte-uw1crb ${stringify([""].filter(Boolean).join(" "))}`)}></span></button> <nav${attr("class", `svelte-uw1crb ${stringify([""].filter(Boolean).join(" "))}`)}><ul class="svelte-uw1crb"><li><a href="/"${attr("class", `svelte-uw1crb ${stringify([
    store_get($$store_subs ??= {}, "$page", page).url.pathname === "/" ? "active" : ""
  ].filter(Boolean).join(" "))}`)}>Home</a></li> <li><a href="/about"${attr("class", `svelte-uw1crb ${stringify([
    store_get($$store_subs ??= {}, "$page", page).url.pathname === "/about" ? "active" : ""
  ].filter(Boolean).join(" "))}`)}>About</a></li> <li><a href="/events"${attr("class", `svelte-uw1crb ${stringify([
    store_get($$store_subs ??= {}, "$page", page).url.pathname === "/events" ? "active" : ""
  ].filter(Boolean).join(" "))}`)}>Events</a></li> <li><a href="/blog"${attr("class", `svelte-uw1crb ${stringify([
    store_get($$store_subs ??= {}, "$page", page).url.pathname === "/blog" ? "active" : ""
  ].filter(Boolean).join(" "))}`)}>Blog</a></li> <li><a href="/resources"${attr("class", `svelte-uw1crb ${stringify([
    store_get($$store_subs ??= {}, "$page", page).url.pathname === "/resources" ? "active" : ""
  ].filter(Boolean).join(" "))}`)}>Resources</a></li> <li><a href="/contact"${attr("class", `svelte-uw1crb ${stringify([
    store_get($$store_subs ??= {}, "$page", page).url.pathname === "/contact" ? "active" : ""
  ].filter(Boolean).join(" "))}`)}>Contact</a></li></ul></nav></div></header>`;
  if ($$store_subs) unsubscribe_stores($$store_subs);
  pop();
}
function Footer($$payload, $$props) {
  push();
  let currentYear = (/* @__PURE__ */ new Date()).getFullYear();
  $$payload.out += `<footer class="svelte-1fcm997"><div class="container"><div class="footer-grid svelte-1fcm997"><div class="footer-brand svelte-1fcm997"><img${attr("src", transparentLogo)} alt="Tech Talk Augusta Logo" class="footer-logo svelte-1fcm997"> <p class="svelte-1fcm997">Building a thriving tech community in Augusta, Georgia through innovation, connection, and equity.</p></div> <div class="footer-links svelte-1fcm997"><h3 class="svelte-1fcm997">Quick Links</h3> <ul class="svelte-1fcm997"><li class="svelte-1fcm997"><a href="/about" class="svelte-1fcm997">About Us</a></li> <li class="svelte-1fcm997"><a href="/events" class="svelte-1fcm997">Events</a></li> <li class="svelte-1fcm997"><a href="/blog" class="svelte-1fcm997">Blog</a></li> <li class="svelte-1fcm997"><a href="/resources" class="svelte-1fcm997">Resources</a></li> <li class="svelte-1fcm997"><a href="/forms/contact" class="svelte-1fcm997">Contact</a></li></ul></div> <div class="footer-social svelte-1fcm997"><h3 class="svelte-1fcm997">Connect With Us</h3> <div class="social-links svelte-1fcm997"><a href="https://discord.gg/techtalkaugusta" target="_blank" rel="noopener noreferrer" aria-label="Join our Discord" class="svelte-1fcm997"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"></path></svg></a> <a href="https://twitter.com/techtalkaugusta" target="_blank" rel="noopener noreferrer" aria-label="Follow us on Twitter" class="svelte-1fcm997"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"></path></svg></a> <a href="https://github.com/techtalkaugusta" target="_blank" rel="noopener noreferrer" aria-label="Follow us on GitHub" class="svelte-1fcm997"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"></path></svg></a></div></div></div> <div class="footer-bottom svelte-1fcm997"><p>© ${escape_html(currentYear)} Tech Talk Augusta. All rights reserved.</p></div></div></footer>`;
  pop();
}
function _layout($$payload, $$props) {
  push();
  let { children } = $$props;
  $$payload.out += `<div class="app svelte-va6s1s">`;
  Header($$payload);
  $$payload.out += `<!----> <main class="svelte-va6s1s"><div class="content-wrapper svelte-va6s1s">`;
  children($$payload);
  $$payload.out += `<!----></div></main> `;
  Footer($$payload);
  $$payload.out += `<!----></div>`;
  pop();
}
export {
  _layout as default
};
