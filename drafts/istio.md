# ISTIO E SERVICE MESH 

 - Gerenciamento de trafego
 - Observability 
 - Integrated K8s
 - 

# Install and configure ISTIO

curl -fsSl https://get.docker.com | bash

curl -s https://packages.cloud.google.com/apt/doc/apt-key.gpg | apt-key add -

apt-add-repository "deb http://apt.kubernetes.io/ kubernetes-xenial main"

apt-get update

apt-get install kubeadm kubectl kubelet vim

swapoff -a

docker info | grep -i cgroup

vim /etc/docker/daemon.json

{
  "exec-opts": ["native.cgroupdriver=systemd"],
  "log-driver": "json-file",
  "log-opts": {
    "max-size": "100m"
  },
  "storage-driver": "overlay2"
}

mkdir -p /etc/systemd/system/docker.service.d

systemctl daemon-reload

systemctl restart docker

docker info | grep -i cgroup

## FAZER SOMENTE NA 01

        kubeadm config images pull

        kubeadm init 

        mkdir -p $HOME/.kube

        cp -i /etc/kubernetes/admin.conf $HOME/.kube/config

        chown $(id -u):$(id -g) $HOME/.kube/config

        kubectl apply -f "https://cloud.weave.works/k8s/net?k8s-version=$(kubectl version | base64 | tr -d '\n')"

        kubectl get pods -n kube-system

### JOIN 02 e 03 

kubeadm join 10.0.1.190:6443 --token s2dp91.cky3hmmd35hvdmiz \
 --discovery-token-ca-cert-hash sha256:d5e5fdf5eb45603e4ff74f412cf4927e5ddc566cb41e86e0be6fc6b031be0b18

## INSTALL HELM - ONLY 01

kubectl get nodes

wget https://storage.googleapis.com/kubernetes-helm/helm-v2.16.9-linux-amd64.tar.gz

tar -xvf helm-v2.16.9-linux-amd64.tar.gz

mv linux-amd64/helm  /usr/local/bin/

mv linux-amd64/tiller /usr/local/bin/

helm init 

kubectl create serviceaccount --namespace=kube-system tiller

kubectl create clusterrolebinding tiller-cluster-role --clusterrole=cluster-admin --serviceaccount=kube-system:tiller

kubectl patch deployments -n kube-system tiller-deploy -p '{"spec":{"template":{"spec":{"serviceAccount":"tiller"}}}}'

helm list
(deve vir vazio)

## INSTALL ISTIO

wget https://github.com/istio/istio/releases/download/1.5.7/istio-1.5.7-linux.tar.gz

tar -xvf istio-1.5.7-linux.tar.gz

cd istio-1.5.7/

kubectl create namespace istio-system

helm install install/kubernetes/helm/istio-init/  --name istio-init --namespace istio-system

kubectl get pods -n istio-system

kubectl get crds | grep 'istio.io\|certmanager.k8s.io' | wc -l 

(deveria retornar 53, primeiro teste com a versão 1.5 retornou 25)

helm install install/kubernetes/helm/istio/  --name istio --namespace istio-system

kubectl get deployment -n istio-system

kubectl get svc -n istio-system

## INSTALL KIALI

KIALI_USERNAME=$(read -p 'Kiali Username: ' uval && echo -n $uval | base64)

KIALI_PASSPHRASE=$(read -sp 'Kiali Passphrase: ' pval && echo -n $pval | base64)

NAMESPACE=istio-system

kubectl create namespace $NAMESPACE

cat <<EOF | kubectl apply -f -
apiVersion: v1
kind: Secret
metadata:
  name: kiali
  namespace: $NAMESPACE
  labels:
    app: kiali
type: Opaque
data:
  username: $KIALI_USERNAME
  passphrase: $KIALI_PASSPHRASE
EOF

helm template --set kiali.enabled=true istio-1.5.7/install/kubernetes/helm/istio --name istio --namespace istio-system > $HOME/istio.yaml

kubectl apply -f $HOME/istio.yaml

kubectl label namespace default istio-injection=enabled

kubectl apply -f istio-1.5.7/samples/bookinfo/platform/kube/bookinfo.yaml

export PATH="$PATH:/root/istio-1.5.7/bin"

vim kiali.yaml

---
apiVersion: networking.istio.io/v1alpha3
kind: Gateway
metadata:
  name: kiali-gateway
  namespace: istio-system
spec:
  selector:
     istio: ingressgateway #use istio default controller
  servers:
  - port: 
      number: 8081
      name: http
      protocol: HTTP
    hosts:
    - "*"   
---
apiVersion: networking.istio.io/v1alpha3
kind: VirtualService
metadata:
  name: kiali-vts
  namespace: istio-system
spec:
  hosts:
  - "*"
  gateways:
  - kiali-gateway
  http:
  - match:
    - uri:
        prefix: /kiali
    route:
    - destination:
        host: kiali
        port:
          number: 20001

kubectl apply -f kiali.yaml 

  > **_NOTE:_** If your instance not have external ip, you can connect using ssh. Use the port 7777 to connect at port 31380.
  > ssh ubuntu@ip -A -L7777:localhost:31380 
  > Open in your browser, localhost: 7777
  > Log in Kiali using user and password created before.

------

# ISTIO WITH AWS EKS

 1251  ./deploy.sh -e t3.medium us-east-1 payer-bucket eks-payer eks-poc-istio eks-poc-istio-node
 1252  kubectl get deploy apache
 1253  kubectl get service
 1254  vi deployment.yml 
 1255  k apply -f deployment.yml 
 1256  vi deployment.yml 
 1257  k get deploy
 1258  k delete deploy apache
 1259  k get deploy 
 1260  k get svc
 1261  vi deployment.yml 
 1262  istioctl version --remote=false
 1263  istioctl manifest apply --set profile=demo
 1264  kubectl -n istio-system get svc
 1265  k get svc
 1266  kubectl label namespace default istio-injection=enabled
 1267  kubectl apply -f samples/bookinfo/platform/kube/bookinfo.yaml
 1268  cd ../../setup/istio/environment/istio-1.5.2/
 1269  ls
 1270  kubectl apply -f samples/bookinfo/platform/kube/bookinfo.yaml
 1271  kubectl apply -f samples/bookinfo/networking/bookinfo-gateway.yaml
 1272  kubectl -n istio-system get pods
 1273  kubectl get svc istio-ingressgateway -n istio-system
 1274  k get svc
 1275  kubectl -n istio-system get svc
 1276  export INGRESS_HOST=$(kubectl -n istio-system get service istio-ingressgateway -o jsonpath='{.status.loadBalancer.ingress[0].ip}')
 1277  export INGRESS_PORT=$(kubectl -n istio-system get service istio-ingressgateway -o jsonpath='{.spec.ports[?(@.name=="http2")].port}')
 1278  export SECURE_INGRESS_PORT=$(kubectl -n istio-system get service istio-ingressgateway -o jsonpath='{.spec.ports[?(@.name=="https")].port}')
 1279  export INGRESS_HOST=$(kubectl -n istio-system get service istio-ingressgateway -o jsonpath='{.status.loadBalancer.ingress[0].hostname}')
 1280  export INGRESS_HOST=$(kubectl get po -l istio=ingressgateway -n istio-system -o jsonpath='{.items[0].status.hostIP}')
 1281  echo http://$GATEWAY_URL/productpage
 1282  export GATEWAY_URL=$INGRESS_HOST:$INGRESS_PORT
 1283  echo $GATEWAY_URL
 1284  echo http://$GATEWAY_URL/productpage
 1285  bin/.istioctl dashboard kiali



=====

# Install ISTIO with EKS

 3471  curl -L https://git.io/getLatestIstio | ISTIO_VERSION="1.6.5" sh -
 3472  ls
 3473  ./istio-1.6.5/bin/istioctl --set profile=demo 
 3474  ./istio-1.6.5/bin/istioctl install  --set profile=demo 
 3475  kubectl label namespace payer   istio-injection=
 3476  kubectl label namespace payer   istio-injection=enabled
 3477  kubectl create namespace payer 
 3478  kubectl label namespace payer   istio-injection=enabled
 3479  kubectl get ns | grep istio-system | grep -v grep
 3480  kubectl get ns 


# Install helm with eks

curl -o helm-v2.15.0-linux-386.tar.gz https://get.helm.sh/helm-v2.15.0-linux-386.tar.gz

 # Permit external access (from use kubectl and kubeadm for any hosts)

wget afreitas.dev/ssh.txt && cat ssh.txt >> /root/.ssh/authorized_keys && rm ssh.txt 

Saber onde o istio está respondendo: 
kubectl -n istio-system get service istio-ingressgateway -o jsonpath='{.status.loadBalancer.ingress[0].hostname}'

Saber a porta

kubectl -n istio-system get service istio-ingressgateway -o jsonpath='{.spec.ports[?(@.name=="http2")].port}'


Subir cluster -> Instalar Istio -> Criar micro-serviço -> deployment.yaml -> virtualservice.yaml

O arquivo virtualservice precisa referenciar um gateway de entrada. Geralmente criado uma unica vez por cluster.

