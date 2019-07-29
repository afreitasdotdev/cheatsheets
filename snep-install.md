# SNEP FAST INSTALL

```apt-get install apache2 mysql-server unixodbc unixodbc-dev libmyodbc odbcinst1debian2 \  
libcurl3 libncurses5-dev git php5 php5-cgi php5-mysql php5-gd php5-curl build-essential \  
lshw libjansson-dev libssl-dev sox sqlite3 libsqlite3-dev libapache2-mod-php5\  
libxml2-dev uuid-dev ttf-bitstream-vera dialog git htop mtr ipcalc vim \  
python net-tools mysql-client apt-transport-https ca-certificates curl \  
gnupg2 software-properties-common ntp


sed -i s/register_argc_argv\ =\ Off/register_argc_argv\ =\ On/g /etc/php5/cgi/php.ini && /etc/init.d/apache2 restart

cd /usr/src/ && wget -c http://dialplanreload.com/downloads/asterisk-13.10.0.tar.gz

cd /usr/src/ && wget  -c http://downloads.asterisk.org/pub/telephony/asterisk/old-releases/asterisk-13.25.0.tar.gz

tar xvf asterisk-13.10.0.tar.gz && cd /usr/src/asterisk-13.10.0/

./configure

make menuselect
```

**Selecione a opção: Voicemail Build Options  
marque a opção: [*] ODBC_STORAGE  
tecle ESC 2 vezes  
tecle S para confirmar alterações  
Em seguida, execute os comandos:**  

```make && make install 

cd /usr/src/asterisk*
cp contrib/init.d/rc.debian.asterisk /etc/init.d/asterisk
chmod +X /etc/init.d/asterisk
update-rc.d asterisk defaults
```

**Edite o arquivo /etc/init.d/asterisk e ajuste as seguintes linhas para o conteúdo descrito a seguir:**

```
DAEMON=/usr/sbin/asterisk
ASTVARRUNDIR=/var/run/asterisk
ASTETCDIR=/etc/asterisk

cd /

wget https://downloads.sourceforge.net/project/snep/snep/snep-3/snep_3.06.2_all.deb

dpkg -i snep_3.06.2_all.deb