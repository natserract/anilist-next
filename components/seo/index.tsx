import { NextSeo } from "next-seo"
import React from "react"

type SeoProps = {
  metaTitle: string;
  metaDescription: string;
  site_url: string;
  images: {
    url: string;
  }[];
  contentType: "content" | "article";
  isRoot?: boolean
}

const Seo: React.FC<Partial<SeoProps>> = (props) => {
  const defaultSeo = {
    site_name: "Functrees",
    twitter: {
      site: "@functrees",
      cardType: "summary_large_image"
    },
    robots: {
      maxImagePreview: "large"
    }
  }

  const subTitle = `${!props?.isRoot ? (' |' + defaultSeo.site_name) : ': Anilist'}`

  const additionalMetaTags = [
    {
      name: "twitter:description",
      content: props?.metaDescription
    },
    {
      name: "twitter:image:src",
      content: props?.images ? props?.images[0]?.url : "",
    },
    {
      name: "al:web:url",
      content: props?.site_url,
    }
  ]

  const openGraph = {
    type: props?.contentType ?? "website",
    url: props?.site_url,
    title: props?.metaTitle,
    description: props?.metaDescription,
    site_name: defaultSeo.site_name,
    images: props?.images || [],
  }

  return (
    <NextSeo
      additionalMetaTags={{ ...additionalMetaTags }}
      canonical={props?.site_url}
      description={props?.metaDescription}
      openGraph={openGraph}
      robotsProps={{
        maxImagePreview: "large"
      }}
      title={props?.metaTitle}
      titleTemplate={`%s${subTitle}`}
      twitter={{ ...defaultSeo.twitter }}
    />
  )
}

export default Seo