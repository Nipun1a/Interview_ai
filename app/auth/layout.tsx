import { isAuthenticated } from '@/lib/actions/auth.action';
//import { redirect } from 'next/dist/server/api-utils';
import { redirect } from 'next/navigation';
import {ReactNode} from 'react'
import { is } from 'zod/v4/locales'

const Authlayout = async ({children}: {children: ReactNode}) => {
  const isUserAuthenticated = await isAuthenticated();

  if(isUserAuthenticated){
    redirect('/');
  }

  

  if(isUserAuthenticated){
}

  return (
    <div className="auth-layout">{children}</div>
  )
}

export default Authlayout