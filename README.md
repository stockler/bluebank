# Blue Bank
Blue Bank é um projeto para testar seus conhecimentos de backend e frontend.

Você irá criar uma aplicação web para simular a transferência bancária entre contas cadastradas.
Esse teste consiste em avaliar seus conhecimentos como fullstack developer.

Você deverá criar um banco de dadaos contendo uma tabela de conta, a tabela deverá conter os seguintes atributos: 
- ID
- CPF do Cliente
- Numero da Agencia 
- Numero da Conta
	
O banco de dados deve ser populado com algumas contas.

## Requisitos Funcionais

1. A tela deverá os seguintes campos: Agencia/Numero da conta origem e destino e valor
2. Verificar a existencia das contas informadas
3. Verificar a disponibilidade do saldo da conta de origem, o valor a ser debitado deve ser maior ou igual ao saldo disponível na conta.

## Requisitos Técnicos

1. Utilizar backend em Java ou NodeJS
2. Aplicar conceitos de orientação a objetos
3. Controlar transação nas operações de saque e deposito

## Diferenciais

1. Aplicar conceitos de SOLID
2. Testes unitários
3. Utilizar bibliotecas de frontend (JQuery, Bootstrap, Angular, ModuleJS, etc)

##Requirements

- **`node`** >= **4.2.0**
- **`npm`** >= **3.0.0**

#Quick start
```bash
# clone the repo without git history
git clone --depth 1 https://github.com/stockler/bluebank.git
```

##For back-end
```bash
# change current directory to bluebank/server
cd bluebank/server

# install dependencies
npm install

# Database - need mongoDB installed
# execute script to populate database
node populate

# build the project
gulp build-test

# run the server
npm start

# For test use this accounts

Agency: 3505
AccountNumber: 45380
cpf: 12345678900

Agency: 3505
AccountNumber: 45322
cpf: 31200023499

Agency: 3408
AccountNumber: 12345
cpf: 12345698700

Agency: 2143
AccountNumber: 9831
cpf: 32198712300


```

You may want to stop:
```bash
# stop the server
ctrl + c

```

##Unit Testing
```bash
# run unit tests (single run)
npm test
```

##For front-end

```bash
# change current directory to bluebank/client
cd bluebank/client

# install dependencies
npm install

# build the project
gulp build-app

# run the server
npm start
```
Go to [http://localhost:8080](http://localhost:8080) in your browser.

You may want to stop:
```bash
# stop the server
ctrl + c

```

##Unit Testing
```bash
# run unit tests (single run)
npm test

```

##End-to-End Testing
For end-to-end tests you need to start Selenium Server (webdriver) first and server.
```bash

We need run in 3 terminals for run this test

# update Selenium Server (webdriver) (terminal 1)
npm run webdriver:update

# start Selenium Server (webdriver) (terminal 1)
npm run webdriver:start

# start Server (express.js) (terminal 2)
npm start

# run end-to-end test in another terminal (terminal 3 - single run)
npm run e2e
```

#License
The MIT License (MIT)

Copyright (c) 2017 Rafael Stockler

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
