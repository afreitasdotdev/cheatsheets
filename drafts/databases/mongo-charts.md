# To backup keys

```
mkdir /tmp/charts-keys-backup
docker run -it --volume mongodb-charts_keys:/volume --volume /tmp/charts-keys-backup:/backup alpine sh -c 'cp /volume/* /backup'
```

# To restore

1 - First, restore the keys:

```
docker volume create mongodb-charts_keys
docker run -it --volume mongodb-charts_keys:/volume --volume /tmp/charts-keys-backup:/backup alpine sh -c 'cp /backup/* /volume'
```

2 - Pull image

```
docker swarm init
docker pull quay.io/mongodb/charts:19.12.2
```



docker stack deploy -c docker-compose.yaml mongodb-charts