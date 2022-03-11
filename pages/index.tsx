import type { NextPage } from 'next'

const Home: NextPage = () => {
 return null
}

export async function getStaticProps() {
  return  {
    redirect: {
      permanent: false,
      destination: "/media/list/page/1"
    }
  }
}

export default Home
