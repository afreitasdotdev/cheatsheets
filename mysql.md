# MYSQL

## General Tips

### Reset auto_increment

```ALTER TABLE regras_negocio AUTO_INCREMENT = 1;```

Based on http://stackoverflow.com/questions/8923114/how-to-reset-auto-increment-in-mysql
CAUTION: Need erase all rules before.

### Split InnoDB

[Link](./split-innodb.md)

### Dump specific query

```
mysqldump -u snep -p snep25 cdr --where="calldate like '2014-11-%'" > dump.sql
```

### Concat query results

```
select name,secret from peers;
```

name,secret  
1000,ASUDHASUIDA  
1001,qd8hqbq7wh  
1002,aOIsdj98qwhduwq  

Depois

1000,10001000
1001,10011001
1002,10021002

```
update peers set secret = concat(name,name);
```

### Change one word in field

```
update table set column = replace(column, "foo bar", "bar bar");
```
```
update ccustos set descricao = replace(descricao, "Operadora X", "E1 VIVO");
```
