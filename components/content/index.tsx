import { ApolloError } from "apollo-client";
import React, { useEffect, useState } from "react"
import Grid from '@material-ui/core/Grid'
import CircularProgress from '@material-ui/core/CircularProgress';
import { useRouter } from "next/router";

import Image from '../image'

import { extractError } from "@/utils/errors";

type ContentProps = {
  isLoading?: boolean;
  isError?: boolean
  error?: ApolloError
}

const Content: React.FC<ContentProps> = ({
  isLoading,
  isError,
  error,
  children
}) => {
  const router = useRouter();

  const [loadingPage, setLoadingPage] = useState(false)

  const loadingStart = () => setLoadingPage(true)
  const loadingEnd = () => setLoadingPage(false)

  useEffect(() => {
    router.events.on("routeChangeStart", loadingStart);
    router.events.on("routeChangeComplete", loadingEnd);
    router.events.on("routeChangeError", loadingEnd);

    return () => {
      router.events.off("routeChangeStart", loadingStart);
      router.events.off("routeChangeComplete", loadingEnd);
      router.events.off("routeChangeError", loadingEnd);
    };
  }, [router]);

  if (isLoading || loadingPage) return (
    <Grid alignItems="center" direction="column" justifyContent="center" container>
      <Image
        height={248}
        imgSrc="/loading.jpg"
        layout="intrinsic"
        width={300}
      />
      Loading...
      <CircularProgress style={{
        marginTop: 20
      }} />
    </Grid>
  )

  if (isError) return (
    <React.Fragment children={error ? extractError(error).message : "Error..."} />
  )

  return (
    <Grid children={children} container />
  )
}

export default Content