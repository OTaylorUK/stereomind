// components/Layout.tsx
import React from 'react';

import { Navbar, Footer } from '@/components';

interface Props {
  children: React.ReactNode;
}


export const Layout = ({ children }: Props) => {
  return (
    <div className={' min-h-screen bg-white flex flex-col items-center '}>
      <Navbar />
      <div className={'pt-40 w-full min-h-screen  flex flex-col items-center '}>
        {children}
      </div>
      <Footer/>
    </div>
  );
}

