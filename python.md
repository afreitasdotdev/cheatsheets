# PYTHON

# General Tips

### Logic conditions

if - se  
else - se não  
then - então  
elif - ou isso  


se(if) x = letra faça (then)  
isso  
se não (else)  
faça aquilo  

ou

se(if) x = letra faça (then)  
isso  
ou (elif ) x = numero (then)  
faça isso  
ou (elif) x = palavra (then)  
aquilo  
else  
echo 123  

### Aritmhetic orders

1 - Resolver parênteses ()  
2 - Potencias **  
3 - Multiplicação, divisão, resto da divisão e divisão inteira ( * ) ( / ) ( % ) ( // )  
4 - Adição e subtração  

### Colors in python

```
\033[Style;Text;Backm

Style
0 - Sem estilo
1 - Negrito
4 - Sublinhado
7 - Inverte Configurações

Text
30 - Branco
31 - Vermelho
32 - Verde
33 - Amarelo
34 - Azul
35 - Magenta
36 - Ciano
37 - Cinza

Background
40 - Branco
41 - Vermelho
42 - Verde
43 - Amarelo
44 - Azul
45 - Magenta
46 - Ciano
47 - Cinza
```

Exemplos

Sem estilo, letra amarela e fundo azul:  
```
\033[0;33;44m

print('\033[0;31;40m Olá Mundo\033[m')

nome = 'Freitas'
print('Olá, \033[0;31;40m{}\033[m. Muito Prazer!'.format(nome))

print('Olá, {}{}{}. Muito Prazer!'.format('\033[0;31;40m', nome, '\033[m'))

cores = {'limpa':'\033[m', 
         'azul':'\033[34m', 
         'amarelo':'\033[33m', 
         'pretoebranco':'\033[7:30m'}

print('Olá, {}{}{}. Muito Prazer!'.format(cores['amarelo'], nome, cores['limpa']))
```

### Enable web server
```python -m SimpleHTTPServer 8080```
