# KUBERNETES CHEATSHEETS / COMMANDS

*You need to install kubectl to use. All commands using kubectl as k*


*Ativar auto-complete: *
kubectl completion bash > /etc/bash_completion.d/kubectl
source <(kubectl completion bash)


*Lista os pods*
kubectl get pods --all-namespaces -w -o wide 
    --all-namespaces    = Todos os namespaces
    -w                  = Mantem executando o comando
    -o wide             = Mais infos, como por ex: onde roda o pod


*Informações do node*
kubectl describe node NODE_NAME

*Infos de um namespace especifico*
kubectl get pods -n NOME_DO_NAMESPACE

*Criar um pod*
kubectl run NAME --image CONTAINER_NAME

*Listar infos de replicaset*
kubectl get replicasets

*Dump do yaml de um pod - Pra usar como template pra criação*
kubectl get pod nginx -o yaml > meu-primeiro.yaml

O arquivo anterior reflete o estado do pod. Nós desejamos utilizar tal arquivo apenas como um modelo, e sendo assim, podemos apagar as entradas que armazenam dados de estado desse pod, como status e todas as demais configurações que são específicas dele. O arquivo final ficará com o conteúdo semelhante a este:

```
  apiVersion: v1
  kind: Pod
  metadata:
    creationTimestamp: null
    labels:
      run: nginx
    name: nginx
  spec:
    containers:
    - image: nginx
      name: nginx
      resources: {}
    dnsPolicy: ClusterFirst
    restartPolicy: Always
  status: {}

```

*Remover um pod*
kubectl delete pod nginx

*Criar pod baseado em arquivo*
kubectl create -f meu-primeiro.yaml

Uma outra forma de criar um arquivo de template é através da opção --dry-run do kubectl, com o funcionamento ligeiramente diferente dependendo do tipo de recurso que será criado. Exemplos:

Para a criação do template de um pod:

kubectl run meu-nginx --image nginx --dry-run=client -o yaml > pod-template.yaml

Para a criação do template de um deployment:

kubectl create deployment meu-nginx --image=nginx --dry-run=client -o yaml > deployment-template.yaml


*Obter infos do comando*
k explain [command] // k explain pod

