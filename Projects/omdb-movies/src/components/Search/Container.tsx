import { ChangeEvent } from 'react'
import Search from "./Search"
import { IContainerProps } from './types'

const Container = (props: IContainerProps) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => { props.query(e.target.value) }

  return <Search
    value={props.value}
    changeEvent={handleChange}
  />
}

export default Container