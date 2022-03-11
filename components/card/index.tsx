/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react"
import Link from "next/link"
import CardUI from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';

import styles from './styles'

import Image from '@/components/image'
import { excerptStr } from "@/utils/string";


type CardProps = {
  title: string;
  subHeader: string;
  href: string
  imgSrc: string
  imgWidth: string | number;
  imgHeight: string | number;
  description: string
}

const useStyles = makeStyles(styles)

const Card: React.FC<CardProps> = (props) => {
  const classes = useStyles();

  return (
    <Link href={`${props.href}`}>
      <a className="card-link">
        <CardUI classes={{
          root: classes.root
        }}>
          <CardHeader
            className={classes.cardHeader}
            subheader={props.subHeader}
            title={excerptStr(props.title, 18)}
          />
          <CardMedia
            className={classes.media}
            component={
              () => (
                <Image
                  height={props.imgHeight}
                  imgSrc={props.imgSrc}
                  layout="responsive"
                  objectFit="cover"
                  width={props.imgWidth}
                />
              )
            }
          />

          <CardContent>
            <div dangerouslySetInnerHTML={{
              __html: props.description ? excerptStr(props.description, 70) : ''
            }} />
          </CardContent>
        </CardUI>
      </a>
    </Link>
  )
}

export default Card