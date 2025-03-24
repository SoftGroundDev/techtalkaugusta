import * as server from '../entries/pages/sverdle/_page.server.ts.js';

export const index = 13;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/sverdle/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/sverdle/+page.server.ts";
export const imports = ["_app/immutable/nodes/13.BhgoW_uF.js","_app/immutable/chunks/disclose-version.BCBsShNa.js","_app/immutable/chunks/runtime.C6T6GBmi.js","_app/immutable/chunks/render.BqeH8zyP.js","_app/immutable/chunks/events.CNt_jFt3.js","_app/immutable/chunks/misc.Bu-x4KxW.js","_app/immutable/chunks/svelte-head.ZfISMJus.js","_app/immutable/chunks/if.DkyURfaS.js","_app/immutable/chunks/each.D7eA2c-F.js","_app/immutable/chunks/attributes.5-UI1alx.js","_app/immutable/chunks/class.DrbO71JW.js","_app/immutable/chunks/proxy.YTT63jqs.js","_app/immutable/chunks/props.Bwm1-Ux7.js","_app/immutable/chunks/store.CLgO3C__.js","_app/immutable/chunks/entry.ChzSZx0O.js"];
export const stylesheets = ["_app/immutable/assets/13.yeGN9jlM.css"];
export const fonts = [];
