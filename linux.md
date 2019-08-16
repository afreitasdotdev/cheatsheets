# LINUX

## General Tips

### Debian Network names


 - Onboard  
eno  

 - PCIe identificado pelo slot  
en**s**  

 - PCI idetificado pelo localização fisica do HW  
en**p**2s0  

 - Usar MAC  
enx7837d1ea46da  

 - Wireless  
**wl**p3s0  

Em suma:   

en =   
wl = dispositivo wireless  
p = indica dispositivo PCI  
p**3** = Numero indica bus/barramento da placa  
s = indica slot no sistema  
s**0** = Numero indica o valor do slot  
br = Bridge  
veth = Virtual  

Exemplo:  

lspci | egrep -i  "net|ether"  

wlp6s0 = 03:00.0 Network controller: Intel Corporation Centrino Wireless-N 1030 [Rainbow Peak] (rev 34)  
enp3s0 = 06:00.0 Ethernet controller: Realtek Semiconductor Co., Ltd. RTL8111/8168/8411 PCI Express Gigabit Ethernet Controller (rev 06)  


Names incorporating Firmware/BIOS provided index numbers for on-board devices (example: eno1)  
Names incorporating Firmware/BIOS provided PCI Express hotplug slot index numbers (example: ens1)  
Names incorporating physical/geographical location of the connector of the hardware (example: enp2s0)  
Names incorporating the interfaces's MAC address (example: enx78e7d1ea46da)  
Classic, unpredictable kernel-native ethX naming (example: eth0)  


### Mount NFS server/client with 2 Debian servers

#### Server

 - Instala o NFS
```
apt-get install nfs-kernel-server nfs-common
```

 - Cria a pasta a ser compartilhada
```
mkdir /var/www/snep/arquivos/gravacoesCTB
```

 - Ceda permissão para todo mundo escrever nela
```
chown nobody:nogroup /var/www/snep/arquivos/gravacoesCTB/
```
```
chmod 755 /var/www/snep/arquivos/gravacoesCTB/
```

 - Altere o arquivo exports 
```
vi /etc/exports
```

 - Adicione o mapeamento da pasta criada
```
/var/www/snep/arquivos/gravacoesCTB 192.168.2.18(rw,sync,no_subtree_check)
```

 - Reinicie o NFS
```
/etc/init.d/nfs-kernel-server restart
```

#### Client

 - Instale o cliente NFS
```
apt-get install nfs-common
```

 - Crie uma pasta pra montar
```
mkdir /var/www/sneplivre/arquivos/viaRede-POA
```

 - Monte e seja feliz
```
mount 192.168.1.18:/var/www/snep/arquivos/gravacoesCTB /var/www/sneplivre/arquivos/viaRede-POA/
```

 - Se quiser fazer mais bonitinho e colocar no fstab
```
192.168.1.18:/var/www/snep/arquivos/gravacoesCTB /var/www/sneplivre/arquivos/viaRede-POA/	nfs rw,sync,hard,intr 0 0
```

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
