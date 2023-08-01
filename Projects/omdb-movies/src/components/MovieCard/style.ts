import styled from 'styled-components'
import { motion } from "framer-motion"

export const PosterWrapper = styled.div`
  position: relative;
  display: flex;

  img {
    aspect-ratio: 9/16;
    object-fit: cover;
    object-position: center top;
    border-radius: 12px;
    width: 100%;
  }
`

export const InfosWrapper = styled.div`
  position: absolute;
  z-index: 2;
  bottom: -100px;
  left: 0;
  width: 100%;
  padding: 16px;
  text-align: center;
  background-color: rgba(155,155,155,.6);
  backdrop-filter: blur(6px);
  transition: 325ms;

  p {
    color: #efefef;
    font-size: 14px;
    line-height: 125%;
    margin: 0 0 6px;
  }

  time {
    color: #efefef;
    font-size: 14px;
  }
`

export const MovieCardWrapper = styled(motion.div)`
  position: relative;
  background-color: white;
  border-radius: 12px;
  max-width: 240px;
  min-width: 160px;
  overflow: hidden;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

  &:hover {
    ${InfosWrapper} {
      bottom: 0;
    }
  }
`