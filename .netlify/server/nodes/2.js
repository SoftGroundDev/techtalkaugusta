import * as universal from '../entries/pages/_page.ts.js';

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+page.ts";
export const imports = ["_app/immutable/nodes/2.CiJ6NihB.js","_app/immutable/chunks/disclose-version.BCBsShNa.js","_app/immutable/chunks/runtime.C6T6GBmi.js","_app/immutable/chunks/legacy.C3oKRWSD.js","_app/immutable/chunks/svelte-head.ZfISMJus.js","_app/immutable/chunks/attributes.5-UI1alx.js","_app/immutable/chunks/misc.Bu-x4KxW.js","_app/immutable/chunks/logo-transparent.BYNQx-Ov.js","_app/immutable/chunks/stock-community.Bf7cHwj8.js"];
export const stylesheets = ["_app/immutable/assets/2.Clkuz5Pf.css"];
export const fonts = [];
