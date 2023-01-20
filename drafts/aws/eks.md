# REQUISITOS



## Download kubectl
```
curl -LO https://storage.googleapis.com/kubernetes-release/release/$(curl -s https://storage.googleapis.com/kubernetes-release/release/stable.txt)/bin/linux/amd64/kubectl
chmod +x kubectl
sudo mv kubectl /usr/local/bin
```


## Download the aws-iam-authenticator
```
wget https://github.com/kubernetes-sigs/aws-iam-authenticator/releases/download/v0.5.0/aws-iam-authenticator_0.5.0_darwin_amd64
chmod +x aws-iam-authenticator_0.5.0_darwin_amd64
sudo mv aws-iam-authenticator_0.5.0_darwin_amd64 /usr/local/bin/aws-iam-authenticator
```

## Modify providers.tf

Choose your region. EKS is not available in every region, use the Region Table to check whether your region is supported: https://aws.amazon.com/about-aws/global-infrastructure/regional-product-services/

Make changes in providers.tf accordingly (region, optionally profile)

## Alguns conceitos
- O cluster do EKS é composto basicamente de 2 elementos macros: cluster e workgroups.
- O cluster é o serviço principal, responsável por gerenciar os worker nodes e worker groups.
- O work node é uma máquina, física ou virtual, onde serão publicados os containers, gerenciados por pods. Pods, por sua vez, é um grupo de um ou mais containers, que contém uma configuração específica de como rodar, em quantas cópias, etc.
- O work group, como o nome diz, é um grupo de work nodes, podendo, no ambiente AWS, ser gerenciado ou não.

## Criação dos arquivos Terraform















### refs

https://medium.com/@orlando.burli/criando-e-gerenciando-um-cluster-kubernetes-stage-e-produ%C3%A7%C3%A3o-na-aws-com-terraform-5109e4b15ed7