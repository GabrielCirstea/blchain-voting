# Mic proiect Blockchain

Scop sistem de *voting*

Stadiu: **pre-alpha**

## Fisiere

Toate contractele sunt in contracts

Instructionile pentru deploy sunt in migrations

### contracts

* Voting.sol - are potential de proiect

### migrations

Fisierele care fac deployment pe o retea de test in cazul de fata

## Pasi compilare si executare

* Compialre:
```
truffle compile
```
* Deployment:
```
truffle migrate
```
* Interactione in consola
```
truffle console
```
* pentru a lucra cu un contract:
```
let app = await <contractName>.deployed()
```
* pentru incarcarea addreselor din ganache:
```
let accounts = await web3.eth.getAccounts()
```

Toate functiile contractului se executa din app:
```
app.vote()
```

Daca se doreste a executa o actiune a contractului de pe alta adresa:
```
app.vote({from: accounts[x]})
```
, se adauga {from: <adresa>}, in lista de parametri
