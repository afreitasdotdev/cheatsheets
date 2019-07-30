# LINUX

## General Tips

### Random

```
[ $[ $RANDOM %6 ] = 0 ] && ls || echo "Click"
```

### Use ls to show path file

```
#:~ pwd
/var/www/html/snep/arquivos

#:~ ls -d -1 $PWD/*/*.*  | grep 99998888
/var/www/html/snep/arquivos/2017-01-09/148398_20170109_1708_8888_99998888.wav
```

### Create file base on list

```
for i in $(cat arquivo.txt ) ; do echo  >  $i ; echo CRIADO - $i ; done
```

### Order using **sort**

Mostrar unico resultado com base em uma coluna

```
sort -u -t, -k1,1 file
```

-u for unique  
-t, so comma is the delimiter  
-k1,1 for the key field 1  

-r reverse  

```
sort -r -u -t, -k2,2  teste-rel
```

### Network scan

```
nmap -sn 172.28.1.*
```

exemplo:  

Nmap scan report for 172.28.1.143  
Host is up (-0.10s latency).  
MAC Address: F8:03:32:01:6F:E3 (Khomp)  
