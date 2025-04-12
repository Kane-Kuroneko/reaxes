// app/api/deelay/route.ts

export async function POST(req: Request) {
	const { searchParams } = new URL(req.url);
	const delay = parseInt(searchParams.get('delay') || '0');
	const target = searchParams.get('target');
	
	if (!target) {
		return new Response(JSON.stringify({ error: 'Missing target' }), {
			status: 400,
			headers: { 'Content-Type': 'application/json' },
		});
	}
	
	await new Promise(res => setTimeout(res, delay));
	
	const body = await req.text(); // 不能直接复用 req.body 的流
	
	const resProxy = await fetch(target, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body,
	});
	
	const proxyText = await resProxy.text();
	return new Response(proxyText, {
		status: resProxy.status,
		headers: {
			'Content-Type': resProxy.headers.get('Content-Type') || 'text/plain',
			'Access-Control-Allow-Origin': '*',
		},
	});
}
