import MagicString from 'magic-string'
/* rollup-plugin-banner2 */
const defaultOptions = {
	sourcemap: true
}
export default function injectnote(resolveBanner: any, userOptions: any) {
	const opts = {...defaultOptions, ...(userOptions || {})}
	
	return {
		name: 'injectnote',
		async renderChunk(code: any, chunk: any, options: any) {
			const banner = await resolveBanner(chunk, options)
			if (!banner) return {code, map: null}
			if (!opts.sourcemap) return banner + code

			const magicString = new MagicString(code)
			magicString.prepend(String(banner))

			return {
				code: magicString.toString(),
				map: magicString.generateMap({hires: true})
			}
		}
	}
}
