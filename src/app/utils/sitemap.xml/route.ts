const REMOTE_SITEMAP_URL = 'https://langagent.ir/utils/blog/sitemap.xml';

export const revalidate = 60 * 60; // revalidate proxy cache hourly

export async function GET() {
  try {
    const upstreamResponse = await fetch(REMOTE_SITEMAP_URL, {
      // Let Next.js cache the upstream response based on the `revalidate` value.
      next: { revalidate },
    });

    if (!upstreamResponse.ok) {
      console.error(
        `[sitemap] Upstream request failed with status ${upstreamResponse.status}`,
      );
      return new Response('Failed to load sitemap', {
        status: 502,
        headers: { 'Content-Type': 'text/plain; charset=utf-8' },
      });
    }

    const xml = await upstreamResponse.text();

    return new Response(xml, {
      status: 200,
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
        'Cache-Control': `s-maxage=${revalidate}`,
      },
    });
  } catch (error) {
    console.error('[sitemap] Unexpected error', error);
    return new Response('Failed to load sitemap', {
      status: 500,
      headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    });
  }
}
