# ANSIBLE

## Playbooks

### Playbook example

```
---
  - name: Install Apache
    hosts: group1
    user: root
    tasks:
      - name: Install HTTPD
        yum: name=httpd state=latest
```

### Task example

```
--- 
- hosts: group2
  remote_user: root
  tasks: 
  - name: Ensure postgresql is at the latest
    yum: 
      name: postgresql
      state: latest
  - name: Ensure that postgresql is started
    service:
      name: postgresql
      state: started
```

### Install packages

```
- name: Install list of packages
  apt: name={{item}} state=installed
  with_items:
       - package1
       - package2
       - package3
       - etc
```

### Syntax YAML

```
---
  name: Anderson Freitas
  job: Devops
  employed: True
  foods:
     - Apple
     - Orange
     - Mango

  languages:
       python: Basic
       Shell: Advanced

  education: |
       4 GCSEs
       3 A-Levels

  phrase: > I love
            ansible and
            yml
```

```
tip: | (pipe) adiciona conteudo em nova linha. > (maior que) adiciona o conteudo em uma unica linha.
``` 

## Inventory

File: /etc/ansible/hosts

Example

```
[all-server]
srv01 ansible_host=10.0.0.1 ansible_user=root
srv02 ansible_host=10.0.0.2
srv03 ansible_host=10.0.0.3
10.0.0.4

[group1]
srv01
srv03
```

### Ansible VARS

 - Playbook
 - Arquivo VARS
 - Register Tasks
 - Linha de comando
 - Fatos do Ansible
 - Role: 
        - Defaults
        - Vars Ansible


**Declarando variavel:**

```
nome_turma: Curso Ansible
```

**Obtendo Variavel**

```
class: "{{nome_turma}}"
```

**Registrando variavel na Task**

```
 - name: Executando comando
   shell: cat /etc/passwd
   register: retorno
```

**Linha de comando**

```
ansible-playbook playbook.yml --extra-vars "nome_turma='Curso Ansible'"
```

**Variaveis Facts**

```
ansible hostname -m setup
```

### Roles

Estructure:

```
roles/
	webservers/
		tasks/
		handlers/
		files/
		templates/
		vars/
		defaults/
		meta/
```

*Tasks*
Contem a lista das principais tasks a serem executadas no host

*Handlers*
Contem tasks que podem ser usadas para manipular estado de determinado servico

*Defaults*
Usado para por as variaveis defaults usadas nas tasks da nossa role

*Vars*
Usado para por variaveis que podem ser consideradas estaticas nas tasks

*Files*
Contem arquivos que podem ser enviados (deploy) para o host

*Meta*
Define metadata para a role em questao.


