import * as universal from '../entries/pages/calendar/_page.ts.js';

export const index = 5;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/calendar/_page.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/calendar/+page.ts";
export const imports = ["_app/immutable/nodes/5.BRGvMAyK.js","_app/immutable/chunks/disclose-version.BCBsShNa.js","_app/immutable/chunks/runtime.C6T6GBmi.js","_app/immutable/chunks/legacy.C3oKRWSD.js","_app/immutable/chunks/render.BqeH8zyP.js","_app/immutable/chunks/events.CNt_jFt3.js","_app/immutable/chunks/misc.Bu-x4KxW.js","_app/immutable/chunks/svelte-head.ZfISMJus.js","_app/immutable/chunks/if.DkyURfaS.js","_app/immutable/chunks/each.D7eA2c-F.js","_app/immutable/chunks/attributes.5-UI1alx.js","_app/immutable/chunks/class.DrbO71JW.js","_app/immutable/chunks/lifecycle.CWLK6BW7.js","_app/immutable/chunks/logo-transparent.BYNQx-Ov.js"];
export const stylesheets = ["_app/immutable/assets/5.BX2LBW0D.css"];
export const fonts = [];
