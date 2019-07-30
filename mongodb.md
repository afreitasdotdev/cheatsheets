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


