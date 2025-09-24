import React from 'react'
import { Title, Meta, Link } from "react-head";

const Seo = ({ title, description, image, url }) => {
  return (
     <>
      <Title>{title}</Title>
      <Meta name="description" content={description} />
      <Meta property="og:title" content={title} />
      <Meta property="og:description" content={description} />
      {image && <Meta property="og:image" content={image} />}
      {url && <Link rel="canonical" href={url} />}
    </>
  )
}

export default Seo