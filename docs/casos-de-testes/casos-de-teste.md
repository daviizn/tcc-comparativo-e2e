# Roteiro de Testes — SauceDemo
 
**CT01 a CT20** · Aplicação sob teste: <https://www.saucedemo.com>
 
---
 
## CT01 — Login com credenciais válidas
 
| Funcionalidade | Prioridade | Tipo | Complexidade | Automatizável |
| --- | --- | --- | --- | --- |
| Autenticação | Alta | Funcional — Positivo | Baixa | Sim |
 
**Objetivo:** validar autenticação bem-sucedida com credenciais corretas.
 
```gherkin
Cenário: Login realizado com usuário e senha válidos
 
  Dado que o usuário acessa a URL https://www.saucedemo.com
    E o campo "Username" está visível e habilitado
 
  Quando o usuário preenche o campo "Username" com "standard_user"
    E o usuário preenche o campo "Password" com "secret_sauce"
    E o usuário clica no botão "Login"
 
  Então o sistema redireciona para a página de listagem de produtos
    E a URL exibida contém "/inventory.html"
    E o título da página é "Swag Labs"
```
 
---
 
## CT02 — Login com credenciais inválidas
 
| Funcionalidade | Prioridade | Tipo | Complexidade | Automatizável |
| --- | --- | --- | --- | --- |
| Autenticação | Alta | Funcional — Negativo | Baixa | Sim |
 
**Objetivo:** verificar a exibição de mensagem de erro ao informar credenciais incorretas.
 
```gherkin
Cenário: Tentativa de login com usuário e senha inválidos
 
  Dado que o usuário acessa a URL https://www.saucedemo.com
 
  Quando o usuário preenche o campo "Username" com "usuario_invalido"
    E o usuário preenche o campo "Password" com "senha_errada"
    E o usuário clica no botão "Login"
 
  Então o sistema permanece na tela de login
    E é exibida a mensagem de erro:
      "Epic sadface: Username and password do not match any user in this service"
    E os campos de usuário e senha são destacados com indicação visual de erro
```
 
---
 
## CT03 — Adicionar produto ao carrinho
 
| Funcionalidade | Prioridade | Tipo | Complexidade | Automatizável |
| --- | --- | --- | --- | --- |
| Carrinho de compras | Alta | Funcional — Positivo | Baixa | Sim |
 
**Objetivo:** validar a inclusão de item no carrinho a partir da listagem de produtos.
 
```gherkin
Cenário: Produto adicionado ao carrinho com sucesso
 
  Dado que o usuário está autenticado com as credenciais válidas
    E o usuário está na página de listagem de produtos
 
  Quando o usuário clica no botão "Add to cart" do produto "Sauce Labs Backpack"
 
  Então o botão do produto é alterado para "Remove"
    E o ícone do carrinho exibe o contador com o valor "1"
```
 
---
 
## CT04 — Remover produto do carrinho
 
| Funcionalidade | Prioridade | Tipo | Complexidade | Automatizável |
| --- | --- | --- | --- | --- |
| Carrinho de compras | Alta | Funcional — Positivo | Baixa | Sim |
 
**Objetivo:** validar a remoção de item previamente adicionado ao carrinho.
 
```gherkin
Cenário: Produto removido do carrinho com sucesso
 
  Dado que o usuário está autenticado com as credenciais válidas
    E o produto "Sauce Labs Backpack" foi adicionado ao carrinho
 
  Quando o usuário clica no botão "Remove" do produto "Sauce Labs Backpack"
 
  Então o botão é alterado novamente para "Add to cart"
    E o ícone do carrinho não exibe nenhum contador
    E o carrinho está vazio ao ser acessado
```
 
---
 
## CT05 — Ordenação de produtos
 
| Funcionalidade | Prioridade | Tipo | Complexidade | Automatizável |
| --- | --- | --- | --- | --- |
| Listagem e filtros | Média | Funcional — Positivo | Média | Sim |
 
**Objetivo:** verificar a reordenação dos produtos ao alterar o critério de ordenação.
 
```gherkin
Cenário: Produtos reordenados pelo critério selecionado
 
  Dado que o usuário está autenticado com as credenciais válidas
    E o usuário está na página de listagem de produtos
 
  Quando o usuário acessa o seletor de ordenação
      e escolhe a opção "Name (Z to A)"
 
  Então os produtos são reapresentados em ordem alfabética decrescente
    E o primeiro produto exibido possui nome com a letra
      de maior valor alfabético
```
 
---
 
## CT06 — Finalização de compra
 
| Funcionalidade | Prioridade | Tipo | Complexidade | Automatizável |
| --- | --- | --- | --- | --- |
| Checkout | Alta | Funcional — Positivo | **Alta** | Sim |
 
**Objetivo:** validar o fluxo completo de compra, desde a adição ao carrinho até a confirmação do pedido.
 
```gherkin
Cenário: Compra finalizada com sucesso após preenchimento de dados
 
  Dado que o usuário está autenticado com as credenciais válidas
    E o produto "Sauce Labs Bike Light" foi adicionado ao carrinho
 
  Quando o usuário acessa o carrinho
    E o usuário clica no botão "Checkout"
    E preenche o campo "First Name" com "João"
    E preenche o campo "Last Name" com "Silva"
    E preenche o campo "Zip/Postal Code" com "70000-000"
    E clica no botão "Continue"
    E clica no botão "Finish"
 
  Então é exibida a mensagem "Thank you for your order!"
    E o carrinho é reinicializado, sem itens
```
 
---
 
## CT07 — Login com senha em branco
 
| Funcionalidade | Prioridade | Tipo | Complexidade | Automatizável |
| --- | --- | --- | --- | --- |
| Autenticação | Alta | Funcional — Negativo | Baixa | Sim |
 
**Objetivo:** verificar o comportamento do sistema ao omitir o campo de senha no formulário de login.
 
```gherkin
Cenário: Tentativa de login sem preenchimento do campo de senha
 
  Dado que o usuário acessa a URL https://www.saucedemo.com
 
  Quando o usuário preenche o campo "Username" com "standard_user"
    E o campo "Password" é mantido em branco
    E o usuário clica no botão "Login"
 
  Então o sistema permanece na tela de login
    E é exibida a mensagem de erro: "Epic sadface: Password is required"
```
 
---
 
## CT08 — Login com usuário em branco
 
| Funcionalidade | Prioridade | Tipo | Complexidade | Automatizável |
| --- | --- | --- | --- | --- |
| Autenticação | Alta | Funcional — Negativo | Baixa | Sim |
 
**Objetivo:** verificar o comportamento do sistema ao omitir o campo de nome de usuário no formulário de login.
 
```gherkin
Cenário: Tentativa de login sem preenchimento do campo de usuário
 
  Dado que o usuário acessa a URL https://www.saucedemo.com
 
  Quando o campo "Username" é mantido em branco
    E o usuário preenche o campo "Password" com "secret_sauce"
    E o usuário clica no botão "Login"
 
  Então o sistema permanece na tela de login
    E é exibida a mensagem de erro: "Epic sadface: Username is required"
```
 
---
 
## CT09 — Login com usuário bloqueado
 
| Funcionalidade | Prioridade | Tipo | Complexidade | Automatizável |
| --- | --- | --- | --- | --- |
| Autenticação | Alta | Funcional — Negativo | Baixa | Sim |
 
**Objetivo:** validar o tratamento de conta bloqueada ao tentar realizar autenticação.
 
```gherkin
Cenário: Tentativa de login com conta bloqueada
 
  Dado que o usuário acessa a URL https://www.saucedemo.com
 
  Quando o usuário preenche o campo "Username" com "locked_out_user"
    E o usuário preenche o campo "Password" com "secret_sauce"
    E o usuário clica no botão "Login"
 
  Então o sistema permanece na tela de login
    E é exibida a mensagem de erro: "Epic sadface: Sorry, this user has been locked out."
```
 
---
 
## CT10 — Logout do sistema
 
| Funcionalidade | Prioridade | Tipo | Complexidade | Automatizável |
| --- | --- | --- | --- | --- |
| Autenticação | Alta | Funcional — Positivo | Baixa | Sim |
 
**Objetivo:** validar o encerramento de sessão autenticada e o bloqueio de acesso direto à URL protegida.
 
```gherkin
Cenário: Sessão encerrada corretamente após acionamento do logout
 
  Dado que o usuário está autenticado com as credenciais válidas
 
  Quando o usuário acessa o menu lateral clicando no ícone de hambúrguer
    E o usuário clica na opção "Logout"
 
  Então o sistema redireciona para a tela de login
    E ao tentar acessar diretamente a URL "/inventory.html",
      o sistema redireciona novamente para a tela de login
```
 
---
 
## CT11 — Visualização de detalhes do produto
 
| Funcionalidade | Prioridade | Tipo | Complexidade | Automatizável |
| --- | --- | --- | --- | --- |
| Catálogo de produtos | Média | Funcional — Positivo | Baixa | Sim |
 
**Objetivo:** verificar a exibição completa das informações de um produto na tela de detalhe.
 
```gherkin
Cenário: Detalhes do produto exibidos corretamente ao acessar a página individual
 
  Dado que o usuário está autenticado com as credenciais válidas
    E o usuário está na página de listagem de produtos
 
  Quando o usuário clica sobre o nome do produto "Sauce Labs Fleece Jacket"
 
  Então a tela de detalhes do produto é exibida
    E o nome do produto é apresentado corretamente
    E a descrição do produto está visível
    E o preço do produto é exibido no formato monetário
    E o botão "Add to cart" está habilitado
```
 
---
 
## CT12 — Adicionar múltiplos produtos ao carrinho
 
| Funcionalidade | Prioridade | Tipo | Complexidade | Automatizável |
| --- | --- | --- | --- | --- |
| Carrinho de compras | Média | Funcional — Positivo | Média | Sim |
 
**Objetivo:** validar o acúmulo correto de itens distintos no carrinho de compras.
 
```gherkin
Cenário: Múltiplos produtos adicionados e contabilizados corretamente no carrinho
 
  Dado que o usuário está autenticado com as credenciais válidas
    E o usuário está na página de listagem de produtos
 
  Quando o usuário clica em "Add to cart" do produto "Sauce Labs Backpack"
    E o usuário clica em "Add to cart" do produto "Sauce Labs Bike Light"
    E o usuário clica em "Add to cart" do produto "Sauce Labs Bolt T-Shirt"
 
  Então o contador do ícone do carrinho exibe o valor "3"
    E ao acessar o carrinho, os três produtos são listados
      com seus respectivos nomes e preços
```
 
---
 
## CT13 — Persistência do carrinho após navegação
 
| Funcionalidade | Prioridade | Tipo | Complexidade | Automatizável |
| --- | --- | --- | --- | --- |
| Carrinho de compras | Média | Funcional — Positivo | Média | Sim |
 
**Objetivo:** validar que itens adicionados ao carrinho permanecem disponíveis após navegação entre páginas.
 
```gherkin
Cenário: Itens do carrinho mantidos após navegação pela aplicação
 
  Dado que o usuário está autenticado com as credenciais válidas
    E o produto "Sauce Labs Backpack" foi adicionado ao carrinho
 
  Quando o usuário clica sobre o nome do produto "Sauce Labs Fleece Jacket"
      para acessar seus detalhes
    E o usuário clica no botão "Back to products"
 
  Então o ícone do carrinho ainda exibe o contador com o valor "1"
    E ao acessar o carrinho, o produto "Sauce Labs Backpack"
      ainda consta na listagem
```
 
---
 
## CT14 — Cancelamento do checkout
 
| Funcionalidade | Prioridade | Tipo | Complexidade | Automatizável |
| --- | --- | --- | --- | --- |
| Checkout | Média | Funcional — Positivo | Média | Sim |
 
**Objetivo:** validar que o usuário pode cancelar o fluxo de compra sem perder os itens do carrinho.
 
```gherkin
Cenário: Checkout cancelado na etapa de informações pessoais
 
  Dado que o usuário está autenticado com as credenciais válidas
    E o produto "Sauce Labs Bike Light" foi adicionado ao carrinho
 
  Quando o usuário acessa o carrinho
    E o usuário clica no botão "Checkout"
    E o usuário clica no botão "Cancel" na tela de informações pessoais
 
  Então o sistema retorna à tela do carrinho
    E o produto "Sauce Labs Bike Light" ainda está presente no carrinho
```
 
---
 
## CT15 — Validação de campos obrigatórios no checkout
 
| Funcionalidade | Prioridade | Tipo | Complexidade | Automatizável |
| --- | --- | --- | --- | --- |
| Checkout | Alta | Funcional — Negativo | Média | Sim |
 
**Objetivo:** validar que o sistema impede o avanço no checkout quando campos obrigatórios estão em branco.
 
```gherkin
Cenário: Avanço bloqueado ao tentar continuar checkout sem preencher os dados
 
  Dado que o usuário está autenticado com as credenciais válidas
    E o produto "Sauce Labs Backpack" foi adicionado ao carrinho
 
  Quando o usuário acessa o carrinho
    E o usuário clica no botão "Checkout"
    E os campos "First Name", "Last Name" e "Zip/Postal Code"
      são mantidos em branco
    E o usuário clica no botão "Continue"
 
  Então o sistema permanece na tela de informações de entrega
    E é exibida a mensagem de erro: "Error: First Name is required"
```
 
---
 
## CT16 — Ordenação por preço crescente
 
| Funcionalidade | Prioridade | Tipo | Complexidade | Automatizável |
| --- | --- | --- | --- | --- |
| Listagem e filtros | Baixa | Funcional — Positivo | Baixa | Sim |
 
**Objetivo:** validar que os produtos são reordenados do menor para o maior preço.
 
```gherkin
Cenário: Produtos reordenados em sequência crescente de preço
 
  Dado que o usuário está autenticado com as credenciais válidas
    E o usuário está na página de listagem de produtos
 
  Quando o usuário acessa o seletor de ordenação
      e escolhe a opção "Price (low to high)"
 
  Então os produtos são reapresentados em ordem crescente de valor
    E o primeiro produto exibido possui o menor preço dentre todos os itens listados
    E cada produto subsequente apresenta preço igual ou superior ao anterior
```
 
---
 
## CT17 — Remoção de produto pela tela do carrinho
 
| Funcionalidade | Prioridade | Tipo | Complexidade | Automatizável |
| --- | --- | --- | --- | --- |
| Carrinho de compras | Média | Funcional — Positivo | Baixa | Sim |
 
**Objetivo:** validar a remoção de um item na tela do carrinho e a sincronização do estado com a página de listagem de produtos.
 
```gherkin
Cenário: Item removido pela tela do carrinho sem afetar os demais
 
  Dado que o usuário está autenticado com as credenciais válidas
    E os produtos "Sauce Labs Backpack" e "Sauce Labs Bike Light"
      foram adicionados ao carrinho
 
  Quando o usuário acessa o carrinho
    E o usuário clica no botão "Remove" do produto "Sauce Labs Backpack"
 
  Então o produto "Sauce Labs Backpack" deixa de ser listado no carrinho
    E o produto "Sauce Labs Bike Light" permanece listado com seu respectivo preço
    E o contador do ícone do carrinho exibe o valor "1"
    E ao retornar à listagem de produtos, o botão do produto
      "Sauce Labs Backpack" exibe novamente "Add to cart"
    E o botão do produto "Sauce Labs Bike Light" permanece exibindo "Remove"
```
 
---
 
## CT18 — Validação dos demais campos obrigatórios no checkout
 
| Funcionalidade | Prioridade | Tipo | Complexidade | Automatizável |
| --- | --- | --- | --- | --- |
| Checkout | Média | Funcional — Negativo | Média | Sim |
 
**Objetivo:** validar que o sistema verifica individualmente cada campo obrigatório do formulário de checkout.
 
```gherkin
Cenário: Avanço bloqueado a cada campo obrigatório não preenchido
 
  Dado que o usuário está autenticado com as credenciais válidas
    E o produto "Sauce Labs Backpack" foi adicionado ao carrinho
    E o usuário está na tela de informações do checkout
 
  Quando o usuário preenche o campo "First Name" com "João"
    E os campos "Last Name" e "Zip/Postal Code" são mantidos em branco
    E o usuário clica no botão "Continue"
 
  Então o sistema permanece na tela de informações do checkout
    E é exibida a mensagem de erro: "Error: Last Name is required"
 
  Mas ao preencher "Last Name" com "Silva" e acionar "Continue" novamente,
      a mensagem exibida passa a ser: "Error: Postal Code is required"
    E em nenhuma das tentativas o sistema avança para a tela "Checkout: Overview"
```
 
---
 
## CT19 — Proteção de rotas internas sem sessão autenticada
 
| Funcionalidade | Prioridade | Tipo | Complexidade | Automatizável |
| --- | --- | --- | --- | --- |
| Autenticação | Alta | Funcional — Negativo | Média | Sim |
 
**Objetivo:** validar que as páginas internas não são acessíveis por digitação direta de URL quando não existe sessão autenticada.
 
```gherkin
Cenário: Acesso direto a URLs protegidas é bloqueado
 
  Dado que o usuário não possui sessão autenticada na aplicação
 
  Quando o usuário acessa diretamente a URL "/cart.html"
 
  Então o sistema redireciona para a tela de login
    E é exibida a mensagem:
      "Epic sadface: You can only access '/cart.html' when you are logged in."
    E ao acessar diretamente a URL "/checkout-step-one.html", o sistema redireciona
      novamente para a tela de login, exibindo a mensagem equivalente para essa rota
    E ao acessar diretamente a URL "/checkout-complete.html", o sistema redireciona
      novamente para a tela de login, exibindo a mensagem equivalente para essa rota
    E em nenhum dos acessos são exibidos dados de produtos ou do carrinho
```
 
---
 
## CT20 — Isolamento do carrinho entre contas após encerramento de sessão
 
| Funcionalidade | Prioridade | Tipo | Complexidade | Automatizável |
| --- | --- | --- | --- | --- |
| Autenticação | Alta | Funcional — Positivo | Média | Sim |
 
**Objetivo:** validar que o conteúdo do carrinho de um usuário não permanece acessível a outro usuário que se autentique em seguida no mesmo navegador.
 
**Situação de execução:** reprovado por defeito conhecido (DEF-01).
 
```gherkin
Cenário: Carrinho não é herdado por outra conta após troca de usuário
 
  Dado que o usuário "standard_user" está autenticado com as credenciais válidas
    E o produto "Sauce Labs Backpack" foi adicionado ao carrinho
    E o contador do ícone do carrinho exibe o valor "1"
 
  Quando o usuário aciona a opção "Logout" pelo menu lateral
    E é realizado novo login com o usuário "problem_user" e a senha "secret_sauce"
 
  Então o sistema exibe a página de listagem de produtos
    E o ícone do carrinho não exibe nenhum contador
    E o carrinho está vazio ao ser acessado
    E o botão do produto "Sauce Labs Backpack" exibe "Add to cart"
```