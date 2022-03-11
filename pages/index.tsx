import type { NextPage } from 'next'
import { useEffect } from 'react'
import { useRouter } from "next/router";
import React from 'react';

const Home: NextPage = () => {
  const router = useRouter();

  useEffect(() => {
    router.push("/media/list/page/1")
  }, [router])

  return <React.Fragment />
}

export default Home
