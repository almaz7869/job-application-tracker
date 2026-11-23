const envBase = import.meta.env.VITE_API_BASE_URL || '';
const savedBase = typeof localStorage !== 'undefined' ? localStorage.getItem('apiBaseUrl') : '';
const BASE = (envBase || savedBase || window.location.origin).replace(/\/$/, '');
export async function api(path, options = {}) {
  const headers = { ...(options.body instanceof FormData ? {} : { 'Content-Type': 'application/json' }), ...(options.headers || {}) };
  const token = localStorage.getItem('accessToken');
  if (token) headers.Authorization = `Bearer ${token}`;
  const method = (options.method || 'GET').toUpperCase();
  const attempts = method === 'GET' ? 2 : 1;
  let lastError;
  for (let attempt = 0; attempt < attempts; attempt++) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 12000);
    try {
      const response = await fetch(`${BASE}${path}`, { ...options, headers, signal: controller.signal });
      if (!response.ok) {
        let message = `Request failed (${response.status})`;
        try { message = (await response.json()).message || message; } catch {}
        const responseError = new Error(message); responseError.status = response.status; throw responseError;
      }
      if (response.status === 204) return null;
      return response.json();
    } catch (error) {
      lastError = error.name === 'AbortError' ? new Error('The service took too long to respond. Try again.') : error;
      if (attempt + 1 < attempts && !(error.status >= 400 && error.status < 500)) await new Promise(resolve => setTimeout(resolve, 350));
      else throw lastError;
    } finally { clearTimeout(timer); }
  }
  throw lastError || new Error('The service is unavailable.');
}
export async function checkApi() { return api('/api/health'); }
