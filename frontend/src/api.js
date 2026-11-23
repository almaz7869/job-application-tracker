const BASE=import.meta.env.VITE_API_BASE_URL||'http://localhost:8080';
export async function api(path,options={}){
  const headers={...(options.body instanceof FormData?{}:{'Content-Type':'application/json'}),...(options.headers||{})};
  const token=localStorage.getItem('accessToken'); if(token) headers.Authorization=`Bearer ${token}`;
  const r=await fetch(BASE+path,{...options,headers});
  if(!r.ok){let m='Request failed ('+r.status+')';try{m=(await r.json()).message||m}catch{}throw new Error(m)}
  if(r.status===204)return null;return r.json()
}
