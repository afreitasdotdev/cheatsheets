# ANSIBLE

## Playbooks

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