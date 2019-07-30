# DOCKER

## General Tips

### Remove logs 

Dentro de /var/lib/docker/container/QUALQUERMERDAQUEFOROIDDOCONTAINER/QUALQUERMERDA-json.log  

Se essa porra ficar muito grande, pode apagar com :  

echo 1 > /var/lib/docker/QUALQUERMERDAQUEFOROIDDOCONTAINER/QUALQUERMERDA-json.log  

### Change docker network

Create file **/etc/docker/daemon.json** com o conteudo:

```
{
  "bip": "172.17.0.1/16"
}
```

### Organize when possible

>> instalar docker 
curl -sSl https://get.docker.com | sh 
>> Informacoes sobre o container (IP, porta e afins)
docker inspect CONTAINER_ID

>> Criar um container
docker run -it CONTAINER COMMAND
ex: docker run -it debian /bin/bash 
No primeiro login é necessário usar ctrl+p depois q pra sair e não parar o container 

>> Executar comando dentro de um container
docker exec CONTAINER_ID COMMAND
ex: docker exec 63bd6dba6db /etc/init.d/asterisk stop

>> Logar em um container
docker exec -it  CONTAINER_ID COMMAND
ex: docker exec -it 6aa3e0703d76 /bin/bash

>> expor uma porta
-p porta_externa_porta_do_docker 
ex: -p 8080:80

>> identificar status dos containers
docker ps -a 

>> Identificar consumo de CPU, RAM e REDE
docker stats CONTAINER_ID

>> parar um container
docker stop CONTAINER_ID
ou 
docker stop CONTAINER_IMAGE

>> iniciar um container 
docker start CONTAINER_ID
ou 
docker start CONTAINER_IMAGE

>> remover um container
docker rm CONTAINER_ID
** nesse caso, se o container estiver rodando, não será possivel a remoção

>> forçar a remoçao de um container
docker rm -f CONTAINER_ID
** nesse caso, mesmo que o container esteja rodando, será removido.
>> listar imagens disponíveis no host
docker images

>> remover uma imagem
docker rmi IMAGE_ID
** se tiver container rodando com esta imagem, a remoção não será possível

>> forçar a remoção de uma imagem
docker rmi -f IMAGE_ID
** mesmo que tenha um container rodando com esta imagem, ela será removida

>> nomear um container
--name CONTAINER_NAME
ex: docker run -it --name WEBSERVER debian /bin/bash

>> linkar dois containers
** partindo do principio que o container 1 (grave_mclean) já existe

docker run -it --name CONTAINER_1_NAME --link CONTAINER_2_NAME:COMUNICATION_NAME
ex: docker run -it --name web2 --link grave_mclean:web1 debian 

** testar 

entrar no container 1
ping web2
entrar no container 2
ping web1

>> verificar alterações de um container
docker diff CONTAINER_ID

>> criar uma imagem custom
docker commit CONTAINER_ID IMAGE_NAME
ex: docker commit 8dfhsdf7dgbsa6 snep3:1.0

>> criar um dockerfile
mkdir dockerfile
cd dockerfile
mkdir yourapp
cd yourapp
vi Dockerfile

-------------------------

FROM debian
MAINTAINER tmsi.freitas@gmail.com
RUN apt-get update && apt-get install -y apache2 && apt-get clean 

-------------------------

pwd
yourapp

ls 
Dockerfile

docker build .

docker image

docker build -t labs/yourapp:1.0 .

docker image 

docker run -it labs/yourapp:1.0 /bin/bash 

ps -ef 

ctrl+p q

++++++++++++++++++

aula2 - Docker file 

mkdir Dockerfile
cd Docker file
mkdir yourapp
cd yourapp 
vi Dockerfile

-------------------

FROM debian

RUN apt-get update && apt-get install -y apache2 && apt-get clean 

ENV APACHE_LOCK_DIR="/var/lock"
ENV APACHE_PID_FILE="/var/run/apache2.pid"
ENV APACHE_RUN_USER="www-data"
ENV APACHE_RUN_GROUP="www-data"
ENV APACHE_LOG_DIR="/var/log/apache2"

LABEL Description="WEB Server"

VOLUME /var/www/html

EXPOSE 80

-------------------

docker build -t webserver:1.0 . 

docker images

docker run -it webserver:1.0 /bin/bash 
	ps -ef
	/etc/init.d/apache2 start
	ps -ef 
	ifconfig
ctrl+p q

docker ps -a 

telnet IP_CONTAINER 80
quit

curl CONTAINER IP:80



>> limitar a memoria do container
docker inspect CONTAINER_ID | grep -i mem
* sem limite Memory = 0 

-- criando novo container com memoria limitada
docker run -it -m 512M debian /bin/bash


docker inspect CONTAINER_ID | grep -i mem 

>> limitar processador 
docker run -it --cpu-shares 1024 debian /bin/bash 

docker inspect CONTAINER_ID | grep -i cpu 
CPUShares = 1024

>> alterar memoria com container já criado 
docker update -m 256M CONTAINERD_ID
docker inspect CONTAINER_ID | grep -i mem

>> alterar processador com container já criado
docker update --cpu-shares 512 CONTAINER_ID
docker inspect | grep -i cpu 

>> pegar token do cliente
docker inspect itc-conector | grep OPENS_TOKEN

Salvar imagem do DOCKER:

docker image save IMAGE_ID -o ARQUIVO.tar


Carregar imagem salva 

docker image load -i ARQUIVO.tar


Definir um nome para uma imagem sem nome

docker tag IMAGE_ID reporitório/container:tag


>>> Apagar containers com status exited e remover também seus volumes
docker rm -v $(docker ps -aq -f status=exited)

>>> Iniciar um novo container 
docker run -it from command
e.g. docker run -it debian /bin/bash 

parametros

Setar hostname do container 
--hostname value

Definir nome do container
--name value

>>> Transformar container em imagem 
docker commit container repo/img-name

Comandos relacionados à informações
docker version - exibe a versão do docker que está instalada.
docker inspect ID_CONTAINER - retorna diversas informações sobre o container.
docker ps - exibe todos os containers em execução no momento.
docker ps -a - exibe todos os containers, independente de estarem em execução ou não.
Comandos relacionados à execução
docker run NOME_DA_IMAGEM - cria um container com a respectiva imagem passada como parâmetro.
docker run -it NOME_DA_IMAGEM - conecta o terminal que estamos utilizando com o do container.
docker run -d -P --name NOME dockersamples/static-site - ao executar, dá um nome ao container.
docker run -d -p 12345:80 dockersamples/static-site - define uma porta específica para ser atribuída à porta 80 do container, neste caso 12345.
docker run -v "CAMINHO_VOLUME" NOME_DA_IMAGEM - cria um volume no respectivo caminho do container.
docker run -it --name NOME_CONTAINER --network NOME_DA_REDE NOME_IMAGEM - cria um container especificando seu nome e qual rede deverá ser usada.
Comandos relacionados à inicialização/interrupção
docker start ID_CONTAINER - inicia o container com id em questão.
docker start -a -i ID_CONTAINER - inicia o container com id em questão e integra os terminais, além de permitir interação entre ambos.
docker stop ID_CONTAINER - interrompe o container com id em questão.
Comandos relacionados à remoção
docker rm ID_CONTAINER - remove o container com id em questão.
docker container prune - remove todos os containers que estão parados.
docker rmi NOME_DA_IMAGEM - remove a imagem passada como parâmetro.
Comandos relacionados à construção de Dockerfile
docker build -f Dockerfile - cria uma imagem a partir de um Dockerfile.
docker build -f Dockerfile -t NOME_USUARIO/NOME_IMAGEM - constrói e nomeia uma imagem não-oficial.
docker build -f Dockerfile -t NOME_USUARIO/NOME_IMAGEM CAMINHO_DOCKERFILE - constrói e nomeia uma imagem não-oficial informando o caminho para o Dockerfile.
Comandos relacionados ao Docker Hub
docker login - inicia o processo de login no Docker Hub.
docker push NOME_USUARIO/NOME_IMAGEM - envia a imagem criada para o Docker Hub.
docker pull NOME_USUARIO/NOME_IMAGEM - baixa a imagem desejada do Docker Hub.
Comandos relacionados à rede
hostname -i - mostra o ip atribuído ao container pelo docker (funciona apenas dentro do container).
docker network create --driver bridge NOME_DA_REDE - cria uma rede especificando o driver desejado.

 curl -fsSL https://get.docker.com | bash

docker container ls
docker container ls -a 
docker container run -ti ubuntu # terminal interativo
docker container attach container_id
docker container run -d ubuntu # -d container como daemon 
docker container exec -it container_id bash
docker container stop container-id
docker container start container-id
docker container restart container-id
docker container inspect container-id
docker container pause container-id
docker container unpause container-id
docker container logs -f container-id 
docker container rm containerid
docker container rm -f container-id
docker container stats container-id



stress --cpu 1 --vm-bytes 128M --vm 1 



docker container top containerid
docker container run -d -m 128M nginx
docker container update --cpus 0.2 container-id
docker container update --cpus 0.2 --memory 128M container-id
docker volume create giropops
docker container run -ti --mount type=volume,src=giropops,dst=/giropops debian
docker container run -ti --mount type=bind,src=/opt/giropops,dst=/giropops,ro debian
docker volume ls
docker volume prune #apaga volume que não esta em uso por nenhum container
docker container prune #remove containers parados
docker container create -v /opt/giropops:/giropops --name dbdados centos #modo antigo de criar container 
#dentro do diretorio com o Dockerfile
docker image build -t meu_apache:1.0.0 .

docker commit -m "Adicionado pacote vim e curl" containerid

#adicionar nome e tag em imagem commitada
docker image tag containerid ubuntu-mod:1.0

========== Swarm ==========

PRA UM CLUSTER FUNCIONAR, PRECISA TER NO MINIMO 51% DE MANAGERS PARA CONTINUAR FUNCIONANDO BEM

docker swarm init 
# Inicia cluster em modo swarm

docker swarm init --advertise-addr IP
#Caso haja mais de uma placa de rede, especificar em qual placa/IP deve-se iniciar o cluster 

docker swarm join --token TOKEN IP:PORTA
# Comando para inserir uma instancia no cluster

docker node ls 
# Consulta instancias em cluster 

docker node promote HOSTNAME
# Promove instancia para MANAGER, não LEADER

docker node demote HOSTNAME
# Rebaixa uma instancia, deixa de ser manager

docker swarm leave
# Para sair de um cluster. Em caso de um manager, necessário forçar com -f

docker swarm join-token worker
# Mostra como ingressar novos nodes como worker no cluster

docker swarm join-token manager 
# Mostra como ingressar novos nodes como manager no cluster

docker swarm join-token --rotate (manager|worker)
# Para alterar o token do cluster. Não derruba nodes ativos em andamento, porém não adiciona novos com o token antigo.

docker service create --name webserver --replicas 3 -p 8080:80 nginx
# Criar 3 containers do nginx no cluster

docker service ps webserver 
# Lista todos os containers do cluster e onde estão rodando

 docker service logs -f webserver
# Mostra logs em tempo real do serviço especificado

docker node inspect instance-2
# Inspecionar um node especifico

docker node update --availability (pause|active) instance-2
# Pausar ou ativa um node dentro de um cluster (para que o mesmo não (ou receba) receba mais services)

docker  node inspect instance-2 | egrep -i availability 
            "Availability": "pause"
# Checar o status do node no cluster

docker service scale webserver=10
# Faz o deploy de 10 containers do serviço webserver em todos os nodes ativos do cluster
# Se vc fizer um scale para um numero menor do que a quantidade de containers em execução, ele reduzirá.

docker node update --availability drain instance-2
# Executará um shutdown em todos os services do node especificado. Para manter o cluster, subirá a mesma quantidade de containers que estavam em execução nesse node nos outros que ficaram ativo.

