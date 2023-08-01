import { MovieCardWrapper, PosterWrapper, InfosWrapper } from './style'
import { IProps } from './types'

const MovieCard = (props: IProps) => {
  const cardAnimation = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  }

  return (
    <MovieCardWrapper variants={cardAnimation}>
      <PosterWrapper>
        {props.children}
        <img src={props.poster} alt={props.title} />
      </PosterWrapper>

      <InfosWrapper>
        <p>{props.title}</p>
        <time>{props?.year}</time>
      </InfosWrapper>
    </MovieCardWrapper>
  )
}

export default MovieCard