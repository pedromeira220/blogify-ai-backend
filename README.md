# Planning

## Requisitos funcionais

- O usuário pode criar um blog
- O usuário acessar a página de um blog e ver seus detalhes + posts
- O usuário pode visualizar o conteúdo de um artigo

## Regras de negocio

- Para criar um blog o usuário deve escolher sua cor primária ou deixar a IA escolher

## Requisitos não funcionais

- O nome único do blog deve ser usado na URL para identificação dele
- A IA será o ChatGPT para gerar os blogs
- Para criarmos os artigos do blog, devo enviar no prompt as informações abaixo. É possível escolher a cor primária da aplicação já no prompt em que pedimos os artigos
    - Tema
    - O nome do blog
    - A descrição
- Teremos os seguintes prompts:
    - Uma para gerar a cor primária do blog 
    - Um para gerar os artigos em si, em que pediremos para gerar a imagem da thumb e depois o conteúdo do artigo em markdown

