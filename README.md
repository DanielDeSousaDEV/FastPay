<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->
<a id="readme-top"></a>
<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Don't forget to give the project a star!
*** Thanks again! Now go create something AMAZING! :D
-->






<!-- PROJECT LOGO -->
<div align="center">

  <h3 align="center">FastPay</h3>

  <p align="center">
    Simplifique suas cobranças com Pix, boleto e cartão de crédito
  </p>
</div>

<div align="center">

<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->
[![LinkedIn][linkedin-shield]][linkedin-url]
</div>

<!-- ABOUT THE PROJECT -->
## Sobre o Projeto

<!-- [![Product Name Screen Shot][product-screenshot]](https://github.com/DanielDeSousaDEV/PayForge) -->

FastPay é um **sistema de cobranças online**, desenvolvido para simplificar a forma como empresas e profissionais gerenciam seus recebimentos. O projeto foi criado como parte de um processo seletivo, com foco em boas práticas de desenvolvimento e integração com a **API do Asaas**.

* Permite criar cobranças com **Pix, boleto e cartão de crédito**
* Facilita o acompanhamento de pagamentos em tempo real
* Oferece uma base sólida para integrar soluções financeiras em outros sistemas

<p align="right">(<a href="#readme-top">Voltar para o topo</a>)</p>



## Tecnologias Utilizadas

No desenvolvimento deste projeto, as seguintes tecnologias foram utilizadas para estruturar o sistema e facilitar a manutenção do código. 

* [![Express][Express.com]][Express-url]
* [![Typescript][Typescript.com]][TypeScript-url]
* [![Prisma][Prisma.com]][Prisma-url]
* [![Biome][Biome.com]][Biome-url]
* [![NodeJs][Node.js.com]][Node.js-url]

<p align="right">(<a href="#readme-top">Voltar para o topo</a>)</p>

## Configuração inicial

Este é um exemplo de como fornecer instruções para configurar o projeto localmente.  
Para obter uma cópia local e colocar o sistema em funcionamento, siga esses passos:

### Pré-requisitos

Certifique-se de ter as seguintes ferramentas instaladas e configuradas:
* Node.JS e NPM
* Git
* Conta [SandBox do Asaas](https://sandbox.asaas.com/)

### Instalação

_Siga o passo a passo abaixo para configurar o projeto em seu ambiente local._

1. Clone o repositório
      ```sh
      git clone https://github.com/DanielDeSousaDEV/FastPay.git
      ```
2. Entre na pasta criada
      ```sh
      cd FastPay
      ```
3. Instale os pacote do NPM
      ```sh
      npm install
      ```
4. Copie e cole o arquivo o arquivo `.env.example` e renomeie para `.env`
      ```
      cp .env.example .env
      ```
5. Configure as seguintes variáveis de ambiente
      ```
      DATABASE_URL="mysql://root:root@localhost:3306/fastpay"
      ASAAS_API_KEY=
      ```
6. Crie os arquivos do prisma
      ```
      npx prisma migrate dev
      ```
7.  Execute o projeto
      ```sh
      npm run dev
      ```

<p align="right">(<a href="#readme-top">Voltar para o topo</a>)</p>

# Testes
Criei duas formas de realiza teste na aplicação
* Pela [collection do Postman](https://drive.google.com/file/d/1PfCR8yYdcUBEDfBeZQoWhto2nzU0Y845/view?usp=sharing).
* Pela interface do swagger disponível em `/api-docs`.

<!-- CONTACT -->
## Contato

Daniel De Sousa - danieldesousa.dev@gmail.com

Link do repositório: [https://github.com/DanielDeSousaDEV/FastPay](https://github.com/DanielDeSousaDEV/FastPay)

<p align="right">(<a href="#readme-top">Voltar para o topo</a>)</p>


<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/in/daniel-de-sousa-257275314/
[Typescript.com]: https://img.shields.io/badge/Typescript-030712?style=for-the-badge&logo=typescript&logoColor=00bcff
[Typescript-url]: https://www.typescriptlang.org/
[Biome.com]: https://img.shields.io/badge/Biome-0F172A?style=for-the-badge&logo=biome&logoColor=60a5fa
[Biome-url]: https://biomejs.dev/pt-br/
[Zod.com]: https://img.shields.io/badge/Zod-0F172A?style=for-the-badge&logo=zod&logoColor=4090ff
[Zod-url]: https://zod.dev/
[Prisma.com]: https://img.shields.io/badge/Prisma-0a0a17?style=for-the-badge&logo=prisma&logoColor=white
[Prisma-url]: https://www.prisma.io/
[Node.js.com]: https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white
[Node.js-url]: https://nodejs.org/
[Express.com]: https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white
[Express-url]: https://expressjs.com/
