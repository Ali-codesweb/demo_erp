import { create } from 'zustand'
import { mountStoreDevtool } from 'simple-zustand-devtools';
const initialState = {
    token : null,
    linh:1,
    showNavbar:true
}
export const authStore = create((set) => ({
    ...initialState,
    setToken : (token)=> set((_)=>({token})),
    setNavbar: (showNavbar)=> set((_)=>({showNavbar}))
}))

if (process.env.NODE_ENV === 'development') {
    mountStoreDevtool('Auth Store', authStore);
  }