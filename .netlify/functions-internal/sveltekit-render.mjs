import { init } from '../serverless.js';

export const handler = init((() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["apple-touch-icon.png","favicon.png","logo-transparent.png","manifest.json","robots.txt","sitemap.xml"]),
	mimeTypes: {".png":"image/png",".json":"application/json",".txt":"text/plain",".xml":"text/xml"},
	_: {
		client: {"start":"_app/immutable/entry/start.DO5B4195.js","app":"_app/immutable/entry/app.TklUCvGL.js","imports":["_app/immutable/entry/start.DO5B4195.js","_app/immutable/chunks/entry.ChzSZx0O.js","_app/immutable/chunks/runtime.C6T6GBmi.js","_app/immutable/entry/app.TklUCvGL.js","_app/immutable/chunks/runtime.C6T6GBmi.js","_app/immutable/chunks/render.BqeH8zyP.js","_app/immutable/chunks/events.CNt_jFt3.js","_app/immutable/chunks/misc.Bu-x4KxW.js","_app/immutable/chunks/svelte-head.ZfISMJus.js","_app/immutable/chunks/disclose-version.BCBsShNa.js","_app/immutable/chunks/if.DkyURfaS.js","_app/immutable/chunks/proxy.YTT63jqs.js","_app/immutable/chunks/props.Bwm1-Ux7.js","_app/immutable/chunks/store.CLgO3C__.js","_app/immutable/chunks/index-client.C6j2Nm2h.js"],"stylesheets":[],"fonts":[],"uses_env_dynamic_public":false},
		nodes: [
			__memo(() => import('../server/nodes/0.js')),
			__memo(() => import('../server/nodes/1.js')),
			__memo(() => import('../server/nodes/4.js')),
			__memo(() => import('../server/nodes/5.js')),
			__memo(() => import('../server/nodes/6.js')),
			__memo(() => import('../server/nodes/7.js')),
			__memo(() => import('../server/nodes/8.js')),
			__memo(() => import('../server/nodes/9.js')),
			__memo(() => import('../server/nodes/10.js')),
			__memo(() => import('../server/nodes/11.js')),
			__memo(() => import('../server/nodes/12.js')),
			__memo(() => import('../server/nodes/13.js'))
		],
		routes: [
			{
				id: "/api/auth/callback",
				pattern: /^\/api\/auth\/callback\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('../server/entries/endpoints/api/auth/callback/_server.ts.js'))
			},
			{
				id: "/api/discord",
				pattern: /^\/api\/discord\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('../server/entries/endpoints/api/discord/_server.ts.js'))
			},
			{
				id: "/api/discord/events",
				pattern: /^\/api\/discord\/events\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('../server/entries/endpoints/api/discord/events/_server.ts.js'))
			},
			{
				id: "/api/discord/reminder",
				pattern: /^\/api\/discord\/reminder\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('../server/entries/endpoints/api/discord/reminder/_server.ts.js'))
			},
			{
				id: "/blog",
				pattern: /^\/blog\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			},
			{
				id: "/calendar",
				pattern: /^\/calendar\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 3 },
				endpoint: null
			},
			{
				id: "/contact",
				pattern: /^\/contact\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 4 },
				endpoint: null
			},
			{
				id: "/events",
				pattern: /^\/events\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 5 },
				endpoint: null
			},
			{
				id: "/forms/call-for-speakers",
				pattern: /^\/forms\/call-for-speakers\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 6 },
				endpoint: null
			},
			{
				id: "/forms/contact",
				pattern: /^\/forms\/contact\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 7 },
				endpoint: null
			},
			{
				id: "/forms/create-event",
				pattern: /^\/forms\/create-event\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 8 },
				endpoint: null
			},
			{
				id: "/privacy",
				pattern: /^\/privacy\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 9 },
				endpoint: null
			},
			{
				id: "/resources",
				pattern: /^\/resources\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 10 },
				endpoint: null
			},
			{
				id: "/sverdle",
				pattern: /^\/sverdle\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 11 },
				endpoint: null
			}
		],
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})());
