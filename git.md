Conceitos:

area de stage:	Cenario onde os arquivos existem no repositorio local mas ainda não foram commitados/gravados
commit:		Aplicar/Gravas as mudanças realizadas



Comandos:

git init . 			
# Iniciar um novo repo no diretório corrente

git status 			
# Verificar status do repositorio

git add <file> 			
# Adiciona <file> a area de stage

git add .			
# Adiciona todo o diretorio corrente a area de stage do repositório

.gitignore			
# Arquivo que define arquivos a serem ignorados

Exemplo de conteudo

tmp/
*log

Ignora todos os arquivos que terminem em .log e o diretório tmp dentro do diretório corrente.

 Depois, necessário adicionar este arquivo a area de stage do repositorio com o comando ->   git add .gitignore 



git commit -m "Commit Inicial"	
# Comando para fazer o commit dos arquivos que estão na area de stage. Parametro -m para adicionar um descritivo do commit

git commit -am "Comentario"	
# Mesma funcionalidade que o comando anterior, porém atualiza os arquivos que foram modificiados e ja tinham sido adicionados a area de stage 
 
git log				
# Mostra o historico de todos os commits do repositorio local. Diferente do git status, esse comando só mostra os commits realizados.

git log -n 1			
# Mostra somente o ultimo commit realizado. "-n 2" mostrará os ultimos dois commits

git log --online		
# Mostrara os commits no formato "uma linha", com as informações resumidas

git log --stat			
# Mostra o resumod dos arquivos alterados e as linhas adicionadas e removidas


# É possível combinar os parâmetros do git log, como por exemplo:

git log -n 2 --oneline --stat	# Este comando irá mostrar os ultimos 2 commits, no formato "uma linha" juntos com os status de linhas adicionadas e removidas

git diff			
# Mostrara a diferença entre os arquivos locais e os ja foram commitados. Não pode ser usado para arquivos novos (que ainda não foram pra area de stage, usando o comando git add)

git diff <file>			
# Para ver apenas as diferenças em um arquivo especifico

git diff --staged 		
# Este comando vai mostrar a diferença entre os arquivos commitados e os que estão na area de stage.

git diff <numero do commit> 	
#  Mostra as diferenças dentro e fora da stage

git diff <num commit inicial>..<num do commit final> 
# Para mostrar as diferenças entre dois commits
Podemos ler o comado anterior como: “mostre as mudanças efetuadas a partir do commit <inicial> até o commit <final>”. Esse comando mostra a difença apenas entre os commits, não leva em conta a area de stage

git diff <num commit>~2		
# Faz o diff do commit informado e as ultimas 2 modificações anteriores

git rm <file>			
# Remover arquivo ja commitado. Será necessário commitar essa remoção. Lembrando que mesmo removido, esse arquivo ficará no histórico de commits.

git mv <file> 			
# Para renomear arquivos e manter o mesmo rastreado pelo git. Necessário o commit para aplicar para o repo.

git checkout -- <file>		
# Desfaz as mudanças ainda não rastreadas do arquivo especificado. Voltando o conteudo para o ultimo commit. Serve também caso tenha removido o arquivo e ainda não tenha sido feito o commit.

git reset -- <file> 		
# Remove o arquivo da area de stage, porém mantem as alteracoes realizadas. Se executar somente "git reset" todos os arquivos serão removidos da area de stage.

git reset --hard		
# Remove todos os arquivos da area de stage e tambem reverte as alterações para o conteudo do ultimo commit 

git revert --no-edit <commit> 	
# Desfaz as alterações feitas pelo commit mencionado
