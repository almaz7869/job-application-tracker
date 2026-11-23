import { useEffect, useState } from 'react';
import { api, checkApi } from './api';
export default function AuthBar(){
  const [health,setHealth]=useState(null),[open,setOpen]=useState(false),[username,setUsername]=useState(''),[password,setPassword]=useState(''),[message,setMessage]=useState('');
  const token=typeof localStorage!=='undefined'&&localStorage.getItem('accessToken');
  useEffect(()=>{checkApi().then(setHealth).catch(()=>setHealth(null));},[]);
  async function login(e){e.preventDefault();setMessage('Connecting securely…');try{const result=await api('/api/auth/login',{method:'POST',body:JSON.stringify({username,password})});localStorage.setItem('accessToken',result.token);setPassword('');setMessage('Connected');location.reload();}catch(error){setMessage(error.message||'Sign-in failed. Check API credentials.');}}
  function logout(){localStorage.removeItem('accessToken');location.reload();}
  return <div className="systembar"><div className="systembar-left"><span className={`connection-dot ${health?'is-online':''}`}/><span>{health?(health.aiConfigured?'Workspace connected · AI ready':'Workspace connected · AI setup needed'):'Interactive preview · API not connected'}</span></div><div className="systembar-right">{token?<><span className="signed-in">Secure API session</span><button className="text-button" onClick={logout}>Sign out</button></>:health&&<button className="text-button" onClick={()=>setOpen(!open)}>{open?'Close':'Sign in to workspace'}</button>}</div>{open&&<form className="signin-panel" onSubmit={login}><label>Workspace username<input autoComplete="username" value={username} onChange={e=>setUsername(e.target.value)} required/></label><label>Password<input type="password" autoComplete="current-password" value={password} onChange={e=>setPassword(e.target.value)} required/></label><button className="primary-button">Connect securely</button>{message&&<small role="status">{message}</small>}</form>}</div>
}
