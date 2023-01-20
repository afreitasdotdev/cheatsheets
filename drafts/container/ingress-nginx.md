# Ingress with Nginx 

Cada pod precisa ter um ingress.yaml, deployment.yaml, namespace.yaml, kustomization.yaml e tbm um service.yaml 

usar template padrão do ingress.yaml, alterando somente o host. Com porta, path e afins.

k apply -f -k pasta/ pra fazer o deploy de todos os yamls dentro da pasta

# Ingress

Responsável por criar a entrada no cluster. 

# Deployment

Responsável por enviar o serviço pro cluster (pod)

# Namespace 

Caso não exista, criará um novo NS.

# Kustomization

Para declarar todos os resources da pasta do app e fazer o apply no kubectl automagicamente

# Service

Irá criar o service de entrada no cluster. Deve ser do tipo ClusterIP pq o nginx fará o Load Balancer.



# Comandos

Listar todos os ingress criados em um namespace

k get all,ingress -n mercado-pago