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


