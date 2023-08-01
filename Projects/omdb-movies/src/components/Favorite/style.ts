import styled from 'styled-components'

export const BaseButton = styled.button`
  all: unset;
  overflow: hidden;
  cursor: pointer;
  position: absolute;
  z-index: 2;
  top: 0;
  right: 0;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0 0 0 12px;
  transition: 125ms;
  background-color: rgba(155,155,155,.6);
  backdrop-filter: blur(6px);

  svg {
    width: 24px;
    transition: 125ms;
  }

  &:hover {
    svg {
      transform: scale(1.25);
    }
  }
`

export const AddFavoriteButton = styled(BaseButton)`
  svg {
    path {
      fill: #E4000F;
    }
  }
`

export const RemoveFavoriteButton = styled(BaseButton)`
  svg {
    path {
      fill: #efefef;
    }
}`