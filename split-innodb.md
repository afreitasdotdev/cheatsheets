Como todos sabem, na madrugada de sexta pra sábado eu fiquei responsável de fazer algumas alterações no banco de dados da Havan. Segue abaixo a necessidade e o que foi feito pra solucionar.

Se não quiser ler tudo, um spoiler:

Removi o snep25 e recriei o mesmo, separando o ibdata por banco/por tabela pra diminuir espaço em disco e facilitar manutenções futuras. 

Daqui pra baixo explicação passo a passo do processo.

Há alguns meses o Martins vem informando que o espaço em disco disponível da máquina Discador estava cada vez menor, mesmo depois de remover alguns dados do CDR e fazer uma limpeza minuciosa na máquina, o espaço em disco disponível não aumentava.  Isso tudo em razão do arquivo ibdata estar crescendo cada vez mais. Para quem quiser entender o funcionamento e o que o ibdata faz, segue link explicativo: 

https://13minutosdeumdba.wordpress.com/2011/06/26/misterios-do-ibdata/

Sabendo então que o espaço em disco estava com os dias contados, ficou acordado então entre o Martins e a Opens que faríamos a manutenção no servidor.

Para fazermos a manutenção seria necessário uma janela grande, tendo em vista que os procedimentos incluíam a remoção do banco snep25 e recriação do mesmo, com o CDR e lista_abandono dos últimos 3 meses. Mesmo sendo um procedimento não muito complexo, era necessário atenção, visto que tudo seria feito em um ambiente de produção.

A parte de backups e remoção do banco levou cerca de 2 horas, o banco da Havan é extenso, uma média de 700 mil ligações/mês, o que tornou o processo bem demorado.

Devido as condições do cenário, achei melhor separar o ibdata por bancos e dentro de cada banco separar por tabelas, não sendo necessário ter só um arquivo ibdata com tamanho estratosférico.

Isso tudo quer dizer, antes tínhamos só um arquivo com muitos gigas que contia todas as informações de todos os bancos e tabelas, armazenava todos os registros e dados, agora, o arquivo ibdata ainda existe  dentro de /var/lib/mysql, mas não com todos os dados, quem faz isso agora são diretórios com o nome do banco, ou seja, assim:

```snep-sc-01-matriz-discador-dac:~# ls -lha /var/lib/mysql/
total 29M
drwx------  5 mysql mysql 4,0K Set  2 08:50 .
drwxr-xr-x 31 root  root  4,0K Abr  6  2016 ..
-rw-r--r--  1 mysql mysql    0 Mar 31  2016 debian-5.5.flag
-rw-rw----  1 mysql mysql  18M Set  4 10:24 ibdata1
-rw-rw----  1 mysql mysql 5,0M Set  4 10:24 ib_logfile0
-rw-rw----  1 mysql mysql 5,0M Set  4 10:24 ib_logfile1
drwx------  2 mysql mysql 4,0K Mar 31  2016 mysql
-rw-------  1 mysql mysql    6 Mar 31  2016 mysql_upgrade_info
drwx------  2 mysql mysql 4,0K Mar 31  2016 performance_schema
drwx------  2 mysql mysql 4,0K Set  2 03:12 snep25
```

Se olharmos dentro do diretório snep25, vemos o seguinte:

```snep-sc-01-matriz-discador-dac:~# ls -lha /var/lib/mysql/snep25/
total 4,6G
drwx------ 2 mysql mysql 4,0K Set  2 03:12 .
drwx------ 5 mysql mysql 4,0K Set  2 08:50 ..
-rw-rw---- 1 mysql mysql 8,8K Set  2 00:06 ad_campaign.frm
-rw-rw---- 1 mysql mysql  96K Set  2 00:06 ad_campaign.ibd
-rw-rw---- 1 mysql mysql 8,5K Set  2 00:06 ad_campaign_log_contact.frm
-rw-rw---- 1 mysql mysql 112K Set  2 00:06 ad_campaign_log_contact.ibd
-rw-rw---- 1 mysql mysql 8,5K Set  2 00:06 ad_campaign_log_detail.frm
-rw-rw---- 1 mysql mysql 112K Set  2 00:06 ad_campaign_log_detail.ibd
-rw-rw---- 1 mysql mysql 8,7K Set  2 00:06 ad_campaign_log.frm
-rw-rw---- 1 mysql mysql 528K Set  2 00:06 ad_campaign_log.ibd
-rw-rw---- 1 mysql mysql 8,5K Set  2 00:06 ad_contact.frm
-rw-rw---- 1 mysql mysql  96K Set  2 00:06 ad_contact.ibd
-rw-rw---- 1 mysql mysql 8,5K Set  2 00:06 ad_control_point.frm
-rw-rw---- 1 mysql mysql  96K Set  2 00:06 ad_control_point.ibd
-rw-rw---- 1 mysql mysql 8,6K Set  2 00:06 ad_event.frm
-rw-rw---- 1 mysql mysql 128K Set  2 00:06 ad_event.ibd
-rw-rw---- 1 mysql mysql 8,4K Set  2 00:06 ad_group_campaign.frm
-rw-rw---- 1 mysql mysql 112K Set  2 00:06 ad_group_campaign.ibd
-rw-rw---- 1 mysql mysql 8,4K Set  2 00:06 ad_group_contact.frm
-rw-rw---- 1 mysql mysql 112K Set  2 00:06 ad_group_contact.ibd
-rw-rw---- 1 mysql mysql 8,4K Set  2 00:06 ad_group.frm
-rw-rw---- 1 mysql mysql 320K Set  2 00:06 ad_group.ibd
-rw-rw---- 1 mysql mysql 8,5K Set  2 00:06 ad_phone.frm
-rw-rw---- 1 mysql mysql  96K Set  2 00:06 ad_phone.ibd
-rw-rw---- 1 mysql mysql 8,5K Set  2 00:06 agent_availability.frm
-rw-rw---- 1 mysql mysql  23M Set  4 10:27 agent_availability.ibd
-rw-rw---- 1 mysql mysql 8,5K Set  2 00:07 agent_config.frm
-rw-rw---- 1 mysql mysql  96K Set  2 00:07 agent_config.ibd
-rw-rw---- 1 mysql mysql 8,5K Set  2 00:07 agentes.frm
-rw-rw---- 1 mysql mysql  96K Set  2 00:07 agentes.ibd
-rw-rw---- 1 mysql mysql 8,6K Set  2 00:07 agent_event.frm
-rw-rw---- 1 mysql mysql  96K Set  2 00:07 agent_event.ibd
-rw-rw---- 1 mysql mysql 8,7K Set  2 00:07 alertas.frm
-rw-rw---- 1 mysql mysql  96K Set  2 00:07 alertas.ibd
-rw-rw---- 1 mysql mysql 8,4K Set  2 00:07 ars_cidade.frm
-rw-rw---- 1 mysql mysql 288K Set  2 00:07 ars_cidade.ibd
-rw-rw---- 1 mysql mysql 8,5K Set  2 00:07 ars_ddd.frm
-rw-rw---- 1 mysql mysql 624K Set  2 00:07 ars_ddd.ibd
-rw-rw---- 1 mysql mysql 8,4K Set  2 00:07 ars_estado.frm
-rw-rw---- 1 mysql mysql  96K Set  2 00:07 ars_estado.ibd
-rw-rw---- 1 mysql mysql 8,4K Set  2 00:07 ars_operadora.frm
-rw-rw---- 1 mysql mysql  96K Set  2 00:07 ars_operadora.ibd
-rw-rw---- 1 mysql mysql 8,5K Set  2 00:07 ars_prefixo.frm
-rw-rw---- 1 mysql mysql  11M Set  2 00:07 ars_prefixo.ibd
-rw-rw---- 1 mysql mysql 8,5K Set  2 00:07 cc_configuration.frm
-rw-rw---- 1 mysql mysql  96K Set  2 00:07 cc_configuration.ibd
-rw-rw---- 1 mysql mysql 8,5K Set  2 00:07 ccustos.frm
-rw-rw---- 1 mysql mysql  96K Set  2 00:07 ccustos.ibd
-rw-rw---- 1 mysql mysql 8,5K Set  2 00:07 cdr_compactado.frm
-rw-rw---- 1 mysql mysql  96K Set  2 00:07 cdr_compactado.ibd
-rw-rw---- 1 mysql mysql  13K Set  2 00:10 cdr.frm
-rw-rw---- 1 mysql mysql 2,4G Set  4 10:27 cdr.ibd
-rw-rw---- 1 mysql mysql 8,4K Set  2 00:07 contacts_group.frm
-rw-rw---- 1 mysql mysql  96K Set  2 00:07 contacts_group.ibd
-rw-rw---- 1 mysql mysql 8,7K Set  2 00:07 contacts_names.frm
-rw-rw---- 1 mysql mysql 112K Set  2 00:07 contacts_names.ibd
-rw-rw---- 1 mysql mysql   65 Set  2 00:04 db.opt
-rw-rw---- 1 mysql mysql 8,5K Set  2 00:07 events.frm
-rw-rw---- 1 mysql mysql  96K Set  2 00:07 events.ibd
-rw-rw---- 1 mysql mysql 8,5K Set  2 00:07 expr_alias_expression.frm
-rw-rw---- 1 mysql mysql 112K Set  2 00:07 expr_alias_expression.ibd
-rw-rw---- 1 mysql mysql 8,4K Set  2 00:07 expr_alias.frm
-rw-rw---- 1 mysql mysql  96K Set  2 00:07 expr_alias.ibd
-rw-rw---- 1 mysql mysql 8,4K Set  2 00:07 group_queues.frm
-rw-rw---- 1 mysql mysql  96K Set  2 00:07 group_queues.ibd
-rw-rw---- 1 mysql mysql 8,4K Set  2 00:07 groups.frm
-rw-rw---- 1 mysql mysql 112K Set  2 00:07 groups.ibd
-rw-rw---- 1 mysql mysql 8,4K Set  2 00:07 grupos.frm
-rw-rw---- 1 mysql mysql  96K Set  2 00:07 grupos.ibd
-rw-rw---- 1 mysql mysql  13K Set  2 03:12 lista_abandono.frm
-rw-rw---- 1 mysql mysql 2,2G Set  4 10:27 lista_abandono.ibd
-rw-rw---- 1 mysql mysql 8,5K Set  2 00:07 logged_agents.frm
-rw-rw---- 1 mysql mysql 112K Set  4 10:27 logged_agents.ibd
-rw-rw---- 1 mysql mysql 8,7K Set  2 00:07 logs.frm
-rw-rw---- 1 mysql mysql 112K Set  2 00:07 logs.ibd
-rw-rw---- 1 mysql mysql 9,2K Set  2 00:07 logs_parametros.frm
-rw-rw---- 1 mysql mysql  96K Set  2 00:07 logs_parametros.ibd
-rw-rw---- 1 mysql mysql  13K Set  2 00:07 logs_regra.frm
-rw-rw---- 1 mysql mysql 112K Set  2 00:07 logs_regra.ibd
-rw-rw---- 1 mysql mysql 8,9K Set  2 00:07 logs_tarifas.frm
-rw-rw---- 1 mysql mysql  96K Set  2 00:07 logs_tarifas.ibd
-rw-rw---- 1 mysql mysql 9,1K Set  2 00:07 logs_trunk.frm
-rw-rw---- 1 mysql mysql  96K Set  2 00:07 logs_trunk.ibd
-rw-rw---- 1 mysql mysql 8,7K Set  2 00:07 logs_users.frm
-rw-rw---- 1 mysql mysql  96K Set  2 00:07 logs_users.ibd
-rw-rw---- 1 mysql mysql 8,5K Set  2 00:07 match_db_log.frm
-rw-rw---- 1 mysql mysql  96K Set  2 00:07 match_db_log.ibd
-rw-rw---- 1 mysql mysql 8,5K Set  2 00:07 members_group_queues.frm
-rw-rw---- 1 mysql mysql 128K Set  2 00:07 members_group_queues.ibd
-rw-rw---- 1 mysql mysql 8,6K Set  2 00:07 operadoras.frm
-rw-rw---- 1 mysql mysql  96K Set  2 00:07 operadoras.ibd
-rw-rw---- 1 mysql mysql 8,5K Set  2 00:07 oper_ccustos.frm
-rw-rw---- 1 mysql mysql  96K Set  2 00:07 oper_ccustos.ibd
-rw-rw---- 1 mysql mysql 8,5K Set  2 00:07 oper_contas.frm
-rw-rw---- 1 mysql mysql  96K Set  2 00:07 oper_contas.ibd
-rw-rw---- 1 mysql mysql  19K Set  2 00:07 peers.frm
-rw-rw---- 1 mysql mysql 160K Set  2 00:07 peers.ibd
-rw-rw---- 1 mysql mysql 8,5K Set  2 00:07 permissoes.frm
-rw-rw---- 1 mysql mysql  96K Set  2 00:07 permissoes.ibd
-rw-rw---- 1 mysql mysql 8,5K Set  2 00:07 permissoes_vinculos.frm
-rw-rw---- 1 mysql mysql  96K Set  2 00:07 permissoes_vinculos.ibd
-rw-rw---- 1 mysql mysql 8,4K Set  2 00:07 queue_benchmark.frm
-rw-rw---- 1 mysql mysql 377K Set  4 10:27 queue_benchmark.MYD
-rw-rw---- 1 mysql mysql 1,0K Set  4 10:27 queue_benchmark.MYI
-rw-rw---- 1 mysql mysql 8,6K Set  2 00:07 queue_log.frm
-rw-rw---- 1 mysql mysql  96K Set  2 00:07 queue_log.ibd
-rw-rw---- 1 mysql mysql 8,6K Set  2 00:07 queue_members.frm
-rw-rw---- 1 mysql mysql 112K Set  2 00:07 queue_members.ibd
-rw-rw---- 1 mysql mysql 8,4K Set  2 00:07 queue_peers.frm
-rw-rw---- 1 mysql mysql  96K Set  2 00:07 queue_peers.ibd
-rw-rw---- 1 mysql mysql 8,5K Set  2 00:07 queues_agent.frm
-rw-rw---- 1 mysql mysql  96K Set  2 00:07 queues_agent.ibd
-rw-rw---- 1 mysql mysql  15K Set  2 00:07 queues.frm
-rw-rw---- 1 mysql mysql  96K Set  2 00:07 queues.ibd
-rw-rw---- 1 mysql mysql 8,5K Set  2 00:07 registry.frm
-rw-rw---- 1 mysql mysql  96K Set  2 00:07 registry.ibd
-rw-rw---- 1 mysql mysql 8,5K Set  2 00:07 regras_negocio_actions_config.frm
-rw-rw---- 1 mysql mysql 144K Set  2 00:07 regras_negocio_actions_config.ibd
-rw-rw---- 1 mysql mysql 8,5K Set  2 00:07 regras_negocio_actions.frm
-rw-rw---- 1 mysql mysql 144K Set  2 00:07 regras_negocio_actions.ibd
-rw-rw---- 1 mysql mysql 8,8K Set  2 00:07 regras_negocio.frm
-rw-rw---- 1 mysql mysql 224K Set  2 00:07 regras_negocio.ibd
-rw-rw---- 1 mysql mysql 8,5K Set  2 00:07 rotinas.frm
-rw-rw---- 1 mysql mysql  96K Set  2 00:07 rotinas.ibd
-rw-rw---- 1 mysql mysql 8,5K Set  2 00:07 services_log.frm
-rw-rw---- 1 mysql mysql 9,0M Set  2 00:07 services_log.ibd
-rw-rw---- 1 mysql mysql 8,5K Set  2 00:07 sounds.frm
-rw-rw---- 1 mysql mysql  96K Set  2 00:07 sounds.ibd
-rw-rw---- 1 mysql mysql 8,6K Set  2 00:07 tarifas.frm
-rw-rw---- 1 mysql mysql 112K Set  2 00:07 tarifas.ibd
-rw-rw---- 1 mysql mysql 8,6K Set  2 00:07 tarifas_valores.frm
-rw-rw---- 1 mysql mysql  96K Set  2 00:07 tarifas_valores.ibd
-rw-rw---- 1 mysql mysql 8,6K Set  2 00:07 time_history.frm
-rw-rw---- 1 mysql mysql  96K Set  2 00:07 time_history.ibd
-rw-rw---- 1 mysql mysql 8,6K Set  2 00:07 trunk_map.frm
-rw-rw---- 1 mysql mysql  96K Set  2 00:07 trunk_map.ibd
-rw-rw---- 1 mysql mysql  14K Set  2 00:07 trunks.frm
-rw-rw---- 1 mysql mysql 112K Set  2 13:47 trunks.ibd
-rw-rw---- 1 mysql mysql 8,5K Set  2 00:07 vinculos.frm
-rw-rw---- 1 mysql mysql  96K Set  2 00:07 vinculos.ibd
-rw-rw---- 1 mysql mysql 8,8K Set  2 00:07 voicemail_messages.frm
-rw-rw---- 1 mysql mysql 112K Set  2 00:07 voicemail_messages.ibd
-rw-rw---- 1 mysql mysql 9,4K Set  2 00:07 voicemail_users.frm
-rw-rw---- 1 mysql mysql 112K Set  2 00:07 voicemail_users.ibd
```

Dentro do diretório existe dois arquivos pra cada uma das tabelas do snep, um arquivo .frm que armazena a estrutura da tabela e um arquivo .ibd que salva todos os dados e informações.

Note em negrito, marquei as tabelas CDR e lista_abandono, ambas com tamanhos consideráveis e o ibdata, no comando anterior com 18Mb.

Essa segmentação facilita caso o mesmo processo seja feito no futuro. Usei como base para todo o procedimento essa documentação:

http://www.thegeekstuff.com/2016/02/mysql-innodb-file-per-table/?utm_content=buffer4e40d&utm_medium=social&utm_source=plus.google.com&utm_campaign=buffer

Pra quem quiser em pt_BR:

https://13minutosdeumdba.wordpress.com/2011/06/30/manutencao-no-ibdata/

Lembre-se, os arquivos .frm e .ibd são extremamente importantes para o funcionamento do banco, a exclusão do mesmo implica na perda de dados das tabelas correspondentes.

Existem alguns pontos referente a segmentação que ainda quero testar, como criar link simbólico, apagar informações e etc, assim que realizar os testes, atualizo este e-mail.
