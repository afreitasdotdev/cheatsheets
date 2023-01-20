# Todo

Add tips and examples

# Jenkins com "sujeiras" na execução do build. Força o clone.
Wipe out repository and force clone


## Agent windows

Liberar permissão para executar o agent como administrator

e é isso mesmo cara
no windows
whoami
ec2amaz-eg5gp6r\administrator
no jenkins
C:\jenkins\workspace\3rd-lib>whoami
nt authority\system

Our solution was to run the Jenkins' service as a separate local admin user. After installing Jenkins, Start => 'services' => Scroll to the Jenkins service => right click => properties => "log on" => "this account" => specify a local admin account.


restart service jenkins

Segui esse passo, pro agent rodar como administrator

C:\jenkins\workspace\3rd-lib>whoami
ec2amaz-eg5gp6r\administrator
[Pipeline] bat
C:\jenkins\workspace\3rd-lib>node-gyp configure build
gyp info it worked if it ends with ok
gyp info using node-gyp@7.0.0


## Configurações para pipeline Hub Payer

Instalar (Apps 32 bits)
Python 2.7
Node 12.18.2
npm install node-addon-api
Net Framework
Net Framework 2.0 { https://www.groovypost.com/howto/enable-net-framework-2-windows-8/

Configurar agent como serviço no windows{
    Our solution was to run the Jenkins' service as a separate local admin user. After installing Jenkins, Start => 'services' => Scroll to the Jenkins service => right click => properties => "log on" => "this account" => specify a local admin account.
}
Java Runtime e Sdk 11 
Visual Studio with C++ 
Git for Windows (Esse pode ser 64 bits) 
