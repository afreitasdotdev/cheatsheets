# SECRETS

Você pode criar um Secret primeiramente em um arquivo, no formato JSON ou YAML, e depois criar o objeto. 
O recurso Secret contém dois mapas: data e stringData. O campo data é usado para armazenar dados arbitrários, codificados usando base64. O campo stringData é usado por conveniência, e permite que você use dados para um Secret como strings não codificadas. As chaves para data e stringData precisam ser compostas por caracteres alfanuméricos, _, - ou ..

