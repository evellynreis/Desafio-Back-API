# Descrição
Esta API foi desenvolvida utilizando Node.js, Express, Yarn e Knex para o banco de dados. O banco de dados é um PostgreSQL que está rodando em um container Docker. 
A API permite gerenciar slugs e usuários, possibilitando criar novos slugs e associá-los a usuários.

# Caracteristicas da API
- Endpoint listando todos emblemas registrados
- Endpoint para resgatar um emblema pelo slug garantindo que o mesmo emblema não seja resgatado duas vezes pelo mesmo usuário.
- Lista todos os emblemas já resgatados por um usuário específico.
- Adiciona a capacidade de filtrar os emblemas pelo nome no endpoint de listagem de emblemas.

# Pré-requisitos
Antes de iniciar, certifique-se de ter o Docker instalado em sua máquina.

# Passo a Passo para Configuração do Ambiente
# 1. Inicie o Docker
Primeiro, você precisa iniciar os containers Docker. Navegue até a pasta raiz do projeto e execute o comando abaixo para iniciar o Docker Compose:
- docker-compose up -d

# 2. Instale as Dependências
Instale todas as dependências do projeto utilizando Yarn:
- yarn install

# 3. Configure o Banco de Dados
Você precisará rodar as migrations para criar as tabelas e inserir os dados iniciais no banco de dados.
- As migrations estão em uma pasta separada no projeto.

# 4. Inicializando o Servidor
Para iniciar o servidor, utilize o comando:
- yarn start

