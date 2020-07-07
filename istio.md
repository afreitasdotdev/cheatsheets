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

# tip: If your instance not have external ip, you can connect using ssh. Use the port 7777 to connect at port 31380.
# ssh ubuntu@ip -A -L7777:localhost:31380 
# Open in your browser, localhost: 7777
# Log in Kiali using user and password created before.
