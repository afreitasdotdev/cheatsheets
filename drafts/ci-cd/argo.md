# ArgoCD with two clusters

First, create a secret with the following content:

```
apiVersion: v1
kind: Secret
metadata:
  namespace: argocd # same namespace of argocd-app
  name: mycluster-secret
  labels:
    argocd.argoproj.io/secret-type: cluster
type: Opaque
stringData:
  name: cluster-name # Get from clusters - name field in config k8s file.
  server: https://mycluster.com # Get from clusters - name - cluster - server field in config k8s file.
  config: |
    {
      "bearerToken": "<authentication token>", # get with: aws-iam-authenticator token -i /CLUSTER-DEVELOP/ <- Cluster name
      "tlsClientConfig": {
        "insecure": false,
        "caData": "<base64 encoded certificate>" # Get from kube/config
      }
    }
```

Import this secret on cluster have a argocd-app
Connect on argocd-server 
Copy kube/config for the cluster you want to add and save as develop-config

```
argocd cluster add --kubeconfig develop-config
```

Go to interface, check if your cluster is Connected

Now, you so can to create any applications on new cluster