# KHOMP

## General Tips

### Remove driver tormenta2

```
lspci -vvvv | grep -i tor
```

Add the driver in blacklist file: **/etc/modprobe.d/fbdev-blacklist.conf**  

```
blacklist tor2
blacklist tor
```

Reboot the server.  

history: 
```120  find / -name tor2
  121  rm -rf /sys/module/dahdi/holders/tor2 /sys/module/tor2
  122  find / -name tor2
  123  vim /etc/modprobe.d/blacklist
  124  cd /etc/
  126  ls -ltr
  127  cd modprobe.d/
  128  ls -ltr
  129  vim fbdev-blacklist.conf 
  130  reboot
  131  lspci -vv
```

### Reset eth configs

Quando você instala o SNEP através de uma imagem ou faz um deploy através de um template de máquina virtual, no primeiro boot você vai tentar configurar a interface para eth0 e não funciona e você descobre que tem que mudar de eth0 para o nome que o SO reconheceu que pode ser ethX.

Isso acontece porque o sistema operacional que você esta fazendo o deploy através de um template já foi configurado para um hardware e o sistema operacional vincula as informações de hardware físico para a interface ethX no arquivo /etc/udev/rules.d/70-persistent-net.rules

Remove **/etc/udev/rules.d/70-persistent-net.rules** and **reboot -n** the server.
