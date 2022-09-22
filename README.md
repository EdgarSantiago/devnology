## Sobre o exercício

Você deve construir um sistema para salvar links de artigos de tecnologia.

- [ x ] Desenvolva uma API gerenciar links, com a URL e um título/label. Os links também podem ser editados e excluídos.

- [ x ] Construa uma interface, como quiser, para que um usuário possa ver e gerenciar os links manualmente

- [ x ] Automatize este processo de salvar links com um web crawler que importe artigos de seus blogs favoritos, como a [devGo](https://devgo.com.br/).

- [ x ] Hospede sua aplicação em algum servidor.

## Para rodar

git clone https://github.com/EdgarSantiago/devnology

npm install

npm run dev

Configure o .env com:

- MONGO_URL
- ADMIN_USERNAME
- ADMIN_PASSWORD
- TOKEN

## DEMO

https://devnology.vercel.app

login: admin
senha: admin

## Sobre o app

Utilizei nextjs + typescript para fazer o frontend e o backend, não é a melhor opção para esse projeto
mas utilizei pra terminar o mais rápido possível. O app tem tudo que o exercício pede + um sistema de login. Para o banco de dados utilizei o mongodb mas tambem seria possível com outro banco de dados. Para estilizar utilizei bootstrap + styled-components + framer motion.

Da para importar links de um site, por exemplo https://devgo.com.br/, o backend puxa todos os atribudos HREF das tags <a>, e manda pro banco de dados. Tambem é possível adicionar, deletar e atualizar os links.

## Problemas

Tive um problema na hora de usar o getStaticProps, como eu fiz o backend dentro do next, na hora de buildar
o frontend tentava gerar as páginas estaticas mas não conseguia porque o backend ainda não estava buildado,
minha solução foi tirar o getStaticProps e adicionar useEffect para puxar os dados do backend. Se eu tivesse feito separado esse problema não teria acontecido.
