import styled from 'styled-components'

export const SearchBox = styled.form`
  padding: 60px 24px;
`

export const SearchField = styled.input`
  display: block;
  font-size: 24px;
  line-height: 100%;
  text-align: center;
  font-weight: 400;
  border: none;
  border-bottom: 3px solid #121212;
  padding: 0 20px 18px;
  margin: 0 auto;
  transition: 125ms ease-in-out;

  &:focus {
    outline: 8px dotted #efefef;
    outline-offset: 20px;
  }
`