import NextImage from "next/image"

type ImageProps = {
  imgSrc: string;
  width: string | number;
  alternativeText?: string;
  height: string | number;
  layout: "fixed" | "fill" | "intrinsic" | "responsive";
  classes?: string;
  objectFit?: string | any
}

const Image: React.FC<ImageProps> = (props) => {
  const { imgSrc, width, alternativeText, height, layout, classes, objectFit } = props

  const loader = ({ src, width, quality }) => {
    return `${src}?w=${width}&q=${quality || 75}`
  }

  return (
    <NextImage
      alt={alternativeText ?? ""}
      className={classes}
      draggable={false}
      height={height}
      layout={layout}
      loader={loader}
      objectFit={objectFit ?? "contain"}
      src={imgSrc}
      width={width}
    />
  )
}

export default Image
