# ASTERISK

## Asterisk CLI

## Asterisk Modules

## Asterisk Codecs

### G729 Free

Use this url to use free g729 version. WARNING: Able to try.
Celeron - http://asterisk.hosting.lv/bin/codec_g729-ast130-gcc4-glibc-x86_64-barcelona.so

## General Tips

### VOXIP Tips

**Voxip com 2 ips**

```Exemplo de eth1

auto eth1
iface eth1 inet static
        address 10.19.218.210
        netmask 255.255.255.248
	gateway 10.19.218.209
        post-up route add -net 10.0.0.0/8 gw 10.19.218.209
        post-up ip route add 10.19.218.208/255.255.255.248 dev eth1 src 10.19.218.209 table voxip
        post-up ip route add default via 10.19.218.209 table voxip
        post-up ip rule add from 10.19.218.210 table voxip
```
```
[voxip]
disallow=all
type=peer
host=10.255.240.111
outboundproxy=10.255.240.111
fromuser=1736319090
insecure=invite,port
qualify=yes
port=5060
nat=no
allow=alaw
prack=yes
dtmfmode=inband
reinvite=yes
canreinvite=no
defaultuser=1736319090
secret=1736319090
ignoresdpversion=yes
```
[entrada]
disallow=all
type=peer
host=10.255.241.4
outboundproxy=10.255.241.4
fromuser=1736312721
insecure=invite,port
qualify=yes
port=5060
nat=no
allow=alaw
prack=yes
dtmfmode=inband
reinvite=yes
canreinvite=no
defaultuser=1736312721
secret=1736312721
ignoresdpversion=yes
```