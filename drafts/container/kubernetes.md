# KUBERNETES

## INSTALL K8s

## Basic Comands

***[see more](k8s-cheatsheets.md) *** 

*Listar pods. w == watch*  
kubectl get pod --all-namespaces -w

*Listar pods. wide == Mostrar o node onde roda o serviço*
kubectl get pod --all-namespaces -o wide 

*Informações do node*
kubectl describe node NODE_NAME

*Infos de um namespace especifico*
kubectl get pods -n NOME_DO_NAMESPACE

*Criar um deployment*
kubectl run NAME --image CONTAINER_NAME

*Listar infos de replicaset*
kubectl get replicasets



*Estrutura k8s*

```
deployment { 
    replicaset {
        pod { 
            container{
                'nginx'
            }
        }
    }
}
```

**Service é responsável por gerenciar as entradas do clusters.**

*Listar services configurados*
kubectl get services

kubectl describe replicasets nome-do-deployment


*Aumentar qtde de containers/replicas de um deployment*
kubectl scale --replicas=10 deployment NOME_DO_CONTAINER

*Diminuir qtde*
kubectl scale --replicas=2 deployment NOME_DO_CONTAINER


*Dividir carga entre dois serviços (Exemplo, canary release ou AB Test) - Configurar dentro do arquivo service*
 - Ter os dois deployments rodando, exemplos:

kubectl get deployments

nginx-1.0
nginx-2.0

Necessário que os dois serviços tenham labels iguais. Para saber o label: kubectl describe deployments. nginx
Quem faz essa distruibuição é o service, que é uma camada acima do deployment:

```
service {
    deployment { 
        replicaset {
            pod { 
                container{
                    'nginx'
                }
            }
        }
    }
}
```

*Remover um deployment*
kubectl delete deployments. NOME_DO_DEPLOY

*Listar características do deployment em formato yaml*
kubectl get deployments. NOME_DO_DEPLOY -o yaml 


*Criar um service*
kubectl expose deployment NOME_DO_DEPLOY_PRA_EXPOR 

Tipos de Services:
ClusterIP = IP válido somente dentro do cluster
NodePort = Expoe o serviço externamente

*Remover um service*
kubectl delete service NOME_DO_DEPLOY_PRA_EXPOR

*Criar um service de um tipo especifico*
kubectl expose deployment NOME_DO_DEPLOY_PRA_EXPOR --type=NodePort

*Listar services criados*
kubectl get services

*Listar endpoints - IP de acesso ao pod, se tiver 10 replicas, haverá 10 ips*
kubectl get endpoints

Toda requisição chega no svc da aplicação, o service direciona para os endopoints, que entrega a requisição para os pods (app)

# Service

Principais componenetes do service (svc)

apiVersion: v1                                                      # Versão utilizada da api 
kind: Service                                                       # Tipo do item a ser criado, pode ser por exemplo, service, pod etc.
metadata:                                                           # Caracteristicas do svc que vai ser criado
    labels:                                                         # 
        run: nginx                                                  # 
    name: nginx                                                     # Nome do serviço
    namespace: default                                              # Nome do namespace que será criado o svc
spec:                                                               # Especificações do svc
    ports:
    - port: 80                                                      # Se necessário mais de uma porta, só declarar um novo - port
        protocol: TCP
        targetPort: 80                                              # Porta de destino no container
    selector:                                                       # Serve para definir para quais deployments esse svc vai ser usado
        run: nginx                                                  # Nesse caso de exemplo, todos os pods/deployments chamados nginx
    type: ClusterIP                                                 # Tipo do service a ser criado


## Tipos de Service

ClusterIP: Cria um ip acessível dentro do cluster para um serviço
NodePort: Expoe uma porta para um pod
LoadBalancer: Cria um balanceador de carga para a aplicação/pods


# Minikube

Portas que devemos nos preocupar: 

MASTER kube-apiserver 			=> 	6443 		TCP 
etcd server API 		    	=>	2379-2380 	TCP 
Kubelet API 			    	=> 	10250 		TCP 
kube-scheduler 			    	=> 	10251 		TCP 
kube-controller-manager 		=> 	10252 		TCP 
Kubelet API Read-only 			=> 	10255 		TCP 
WORKER Kubelet API 		    	=> 	10250 		TCP 
Kubelet API Read-only 			=> 	10255 		TCP 
NodePort Services 		    	=> 	30000-32767 TCP

Antes de instalar o minikube, instalar o kubectl:

```curl -LO https://storage.googleapis.com/kubernetes-release/release/$(curl -s https://storage.googleapis.com/kubernetes-release/release/stable.txt)/bin/linux/amd64/kubectl```

```chmod +x kubectl && mv kubectl /usr/local/bin/```

doc:
https://kubernetes.io/docs/tasks/tools/install-minikube/


```curl -Lo minikube https://storage.googleapis.com/minikube/releases/latest/minikube-linux-amd64 \ && chmod +x minikube```

```sudo cp minikube /usr/local/bin && rm minikube```


```
minikube start
kubectl get nodes
minikube ip
minikube ssh 
minikube start
minikube stop
minikube dashboard
minikube logs
```

# Secrets 

To use a private registry to your containers, is needed to save a credentials. This is valide for default namespace, if your need in another NS, needed create another register. 

kubectl create secret generic regcred \
--from-file=.dockerconfigjson=/home/freitas/.docker/config.json \
--type=kubernetes.io/dockerconfigjson \
--namespace=dev


## Componentes do Kubernetes

O k8s tem os seguintes componentes principais:

Master node
Worker node
Services
Controllers
Pods
Namespaces e quotas
Network e policies
Storage
kube-apiserver é a central de operações do cluster k8s. Todas as chamadas, internas ou externas são tratadas por ele. Ele é o único que conecta no ETCD.

kube-scheduller usa um algoritmo para verificar em qual node o pod deverá ser hospedado. Ele verifica os recursos disponíveis do node para verificar qual o melhor node para receber aquele pod.

No ETCD são armazenados o estado do cluster, rede e outras informações persistentes.

kube-controller-manager é o controle principal que interage com o kube-apiserver para determinar o seu estado. Se o estado não bate, o manager irá contactar o controller necessário para checar seu estado desejado. Tem diversos controllers em uso como: os endpoints, namespace e replication.

O kubelet interage com o Docker instalado no node e garante que os contêineres que precisavam estar em execução realmente estão.

O kube-proxy é o responsável por gerenciar a rede para os contêineres, é o responsável por expor portas dos mesmos.

Supervisord é o responsável por monitorar e restabelecer, se necessário, o kubelet e o Docker. Por esse motivo, quando existe algum problema em relação ao kubelet, como por exemplo o uso do driver cgroup diferente do que está rodando no Docker, você perceberá que ele ficará tentando subir o kubelet frequentemente.

Pod é a menor unidade que você irá tratar no k8s. Você poderá ter mais de um contêiner por Pod, porém vale lembrar que eles dividirão os mesmos recursos, como por exemplo IP. Uma das boas razões para se ter mais de um contêiner em um Pod é o fato de você ter os logs consolidados.

O Pod, por poder possuir diversos contêineres, muitas das vezes se assemelha a uma VM, onde você poderia ter diversos serviços rodando compartilhando o mesmo IP e demais recursos.

Services é uma forma de você expor a comunicação através de um NodePort ou LoadBalancer para distribuir as requisições entre diversos Pods daquele Deployment. Funciona como um balanceador de carga.

