import React from "react";

import {
  Container,
  Row,
  Panel,
  Column,
  Gallery,
  Section,
  Description,
} from "./styles";

import ProductAction from "../ProductAction";
import SellerInfo from "../SellerInfo";

import tShirt from "../../assets/tshirt.png";

const Product: React.FC = () => {
  return (
    <Container>
      <Row>
        <a href="#">Compartilhar</a>
        <a href="#">Vender um igual</a>
      </Row>

      <Panel>
        <Column>
          <Gallery>
            <img src={tShirt} alt="t-shirt" />
          </Gallery>

          <Info />
        </Column>

        <Column>
          <ProductAction />
          <SellerInfo />

          <WarrantySection />
          <WarrantySection />
          <WarrantySection />
        </Column>
      </Panel>
    </Container>
  );
};

const WarrantySection = () => (
  <Section>
    <h4>Garantia</h4>

    <div>
      <span>
        <p className="title">Compra garantida por Lorem Ipsun</p>
        <p className="description">
          receba o produto que está esperando ou devolvemos o dinheiro.
        </p>
      </span>

      <span>
        <p className="title">Garantia com o vendedor</p>
        <p className="description">Sem garantia.</p>
      </span>
    </div>

    <a href="#">Saiba mais sobre garantia</a>
  </Section>
);

const Info = () => (
  <Description>
    <h2>Descrição</h2>

    <p>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptates
      totam, accusamus eveniet dolorem doloribus accusantium, impedit
      consequatur officiis illum esse repudiandae nemo earum! Enim eligendi,
      accusamus obcaecati molestiae maiores saepe ducimus quos nemo in beatae
      minima debitis quaerat praesentium error delectus dicta.
      <br />
      <br />
      Itens inclusos: <br />
      - 1x lorem <br />
      - 1x ipsum <br />
      - 1x dolor <br />
      - 1x sit <br />
      - 1x amet
      <br />
      <br />
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur nisi
      molestiae vero illo debitis perspiciatis corporis, adipisci cupiditate
      dicta, non fugit facilis distinctio consectetur quos unde magni mollitia
      doloremque labore dignissimos? Deserunt, obcaecati maiores molestias
      quidem aliquid ducimus debitis ipsam, labore corrupti in facere ex!
      Tempore consequatur magnam distinctio odio, voluptas neque delectus minima
      dolores error corporis, corrupti molestias unde!
    </p>
  </Description>
);

export default Product;
