import { SITE_CONFIG } from '@/config/site'

export async function GET() {
	const text = `User-agent: *
Allow: /

Sitemap: ${SITE_CONFIG.domain}/sitemap.xml
`
	return new Response(text, {
		headers: { 'Content-Type': 'text/plain; charset=utf-8' },
	})
}
