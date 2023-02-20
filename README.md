# desafio alest

Comecei o projeto dividindo entre apasta de servidor e a pasta do client.

Pasta servidor: Node.js com express para a criação das api's executando o CRUD com o firestore

Pasta client: React.js para fazer a interface com o user utilizando as api's do node

Rotas:

  -Create: "/create" (retorna a response do firestore)
  
  -get: "/get/all" & "/get/:id" (retorna o array de documentos já criados)
  
  -update: "/update" (retorna o documento modificado)
  
  -delete: "/delete/:id" (retorna a nova lista de elementos
  
  
  Front-end components:
  
    -Card(produtos cadastrados), Modal(formulário), App(componente principal que gerencia os estados e chama as apis)
  
  
  # deploy link
  
  https://desafioalest-deploy-production.up.railway.app/
  
  
