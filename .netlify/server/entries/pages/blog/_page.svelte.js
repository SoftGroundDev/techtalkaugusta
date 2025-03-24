import { h as head } from "../../../chunks/index2.js";
import { t as transparentLogo } from "../../../chunks/images.js";
import { a as attr } from "../../../chunks/attributes.js";
function _page($$payload) {
  head($$payload, ($$payload2) => {
    $$payload2.title = `<title>Blog - Tech Talk Augusta</title>`;
    $$payload2.out += `<meta name="description" content="Stay updated with the latest tech news, tutorials, and community stories from Tech Talk Augusta."> <meta name="keywords" content="Tech Blog, Augusta Tech News, Technology Articles, Community Stories"> <meta property="og:title" content="Blog - Tech Talk Augusta"> <meta property="og:description" content="Stay updated with the latest tech news, tutorials, and community stories from Tech Talk Augusta."> <meta property="og:type" content="website">`;
  });
  $$payload.out += `<section class="hero svelte-2sdtg2"><div class="container"><div class="hero-content svelte-2sdtg2"><img${attr("src", transparentLogo)} alt="Tech Talk Augusta Logo" class="hero-logo svelte-2sdtg2"> <h1>Tech Talk Blog</h1> <p class="lead svelte-2sdtg2">Stay updated with the latest tech news, tutorials, and community stories.</p></div></div></section> <section class="coming-soon svelte-2sdtg2"><div class="container"><div class="content svelte-2sdtg2"><h2 class="svelte-2sdtg2">Coming Soon!</h2> <p class="svelte-2sdtg2">We're working on bringing you insightful articles, tutorials, and stories from our tech community.
                In the meantime, join us on Discord to participate in discussions and stay updated.</p> <div class="cta svelte-2sdtg2"><a href="https://discord.gg/techtalkaugusta" class="btn btn-primary" target="_blank" rel="noopener noreferrer">Join Our Discord</a></div></div></div></section>`;
}
export {
  _page as default
};
