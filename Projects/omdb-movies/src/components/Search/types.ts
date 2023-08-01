import { InputHTMLAttributes, Dispatch, SetStateAction } from 'react'

export interface IProps {
  changeEvent: InputHTMLAttributes<HTMLInputElement>['onChange']
  value: string
}

export interface IContainerProps {
  value: string;
  query: Dispatch<SetStateAction<string>>;
}