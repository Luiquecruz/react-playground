import { MegaMenu } from '../index'

export default function Menu() {
  return (
    <nav className="menu-wrapper">
      <ul className="menu">
        <li>Telefonia</li>
        <li>TV & AV</li>
        <li>Eletrodomésticos</li>
        <li>Informática</li>
        <li>
          <a href="#">Acessórios</a>
        </li>
        <li>SmartThings</li>
        <li>Loja Online</li>
      </ul>

      <ul className="aux-menu">
        <li>Suporte</li>
        <li>Para Empresas</li>
        <li>
          <a href="#">Minha Conta</a>
        </li>
      </ul>

      <MegaMenu />
    </nav>
  )
}