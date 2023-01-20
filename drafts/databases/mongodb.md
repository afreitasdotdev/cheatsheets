# MONGO DB

## General Tips

Logar na CLI sem usuario e senha
mongo 

Escolher banco para ser usado
use dbname

Pesquisar nas collections  
db.NOMEDACOLLECTION.find()

db.NOMEDACOLLECTION.find().pretty   
traz visualmente melhor

db.NOMEDACOLLECTION.find({"campo":"valor"}).pretty()  
Exemplo: db.cadastro.find({"nome":"Freitas"}).pretty()

Conta quantos registros existem com o filtro buscado  
db.NOMEDACOLLECTION.find({"campo":"valor"}).count()

Ordenar resultados

db.NOMEDACOLLECTION.find().sort({"PARAMETER":X})

X = 1 Primeiro para ultimo (1....9999 ou A-Z) - Crescente  
X = -1 Ultimo para primeiro (9999....1 ou Z-A) - Decrescente

Listar usuários do banco  
db.getUsers()

Criar usuario  
db.createUser({user:"freitas",pwd:"123,roles:[{role:"readWrite",db:dbaula4}]"})

roles: perfil de acesso

Saber se o usuário pode autenticar  
db.auth("freitas","123")  

1 - Pode autenticar  
0 - Não pode autenticar


## Usually commands

Remove registries based on datetime, using lte (less than equal)
```
db.transactionLog.deleteMany({transactionDateTime: {$lte: ISODate("2021-12-31T03:00:00")}})
db.transactionLog.deleteMany({transactionDateTime: {$lte: ISODate("2022-04-31T03:00:00")}})
```

#### PAYER ####

Remover registros anteriores a uma data:
    db.transactionLog.deleteMany({transactionDateTime: {$lte: ISODate("2022-04-31T03:00:00")}})

Backup apenas de uma collection, baseada em janela tempo (maior que "gte" e menor que "lte")
    mongoexport -u payer --password P4Y3r5691 --host localhost -d payer -c transactionLog --query '{"transactionDateTime": {"$gte": {"$date": "'2020-01-01T03:00:00.000Z'"}, "$lte": {"$date": "'2021-01-01T02:59:00.000Z'"}}}'--sort '{"transactionDateTime": 1}' --out 2020-transactionLog.json

Backup ignorando uma collection
    mongodump -u $MONGO_USER --password $MONGO_PASS  --host $MONGO_HOST -d payer -o backup/2022-08-01 --forceTableScan --excludeCollection transactionLog

Importando registros baseados em json
    mongoimport --username=payer --db payer  --collection transactionLog JUNpayer_transactionLog.json

Importanto registros baseados em pasta/diretorio
    mongorestore --username=payer 2022-05-17

Busca por data
    db.transactionLog.find({
        transactionDateTime: {
            $lte: ISODate("2022-10-05T00:00:00-03:00"),
            $gte: ISODate("2022-10-04T00:00:00-03:00")
        }
    })
    .sort({
        transactionDateTime: 1
    }).count()