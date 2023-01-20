<!-- 

ERRO 400 the plain http request was sent to https port 

Mesmo criando e adicionando o certificado no load balancer, dava o erro acima, só resolveu editando
o controlador do ingress, conforme este link: https://github.com/kubernetes/ingress-nginx/issues/5206

editei o ingress-nginx-controller, na linha 100, alterei de https para http

-->


# NGINX


Dockerfile pra sites usando node-js: 

```
FROM node:14.18.1 as build

RUN mkdir -p /app/node_modules/ && chown -R node:node /app/
WORKDIR /app
ADD package*.json /app/

COPY ./ /app/
COPY --chown=node:node . . 

RUN npm install 
USER node
RUN npm run build

# # 
FROM nginx

EXPOSE 80
RUN rm -rf /usr/share/nginx/html/index.html && rm /etc/nginx/conf.d/default.conf

COPY ./k8s/nginx-default.conf /etc/nginx/conf.d/default.conf

COPY --from=build /app/dist/ /app/dist/
RUN cp -R /app/dist/ /etc/nginx/html/ 
RUN mv /app/dist/* /usr/share/nginx/html/. && chown root:root /usr/share/nginx/html/*


CMD ["nginx", "-g", "daemon off;"]
# CMD ["httpd-foreground"]

```

Pra usar rotas dinamicas, precisa habilitar o try_files no nginx.conf dentro de /etc/nginx/conf.d: 

```
    location / {
        root   /usr/share/nginx/html;
        index  index.html index.htm;
        try_files $uri $uri/ /index.html;

    }

```

Para problemas com mime type, especificar os tipos e caminhos no nginx.conf: 

```
    location  /usr/share/nginx/html/css {
        add_header  Content-Type    text/css;
    }
    location /usr/share/nginx/html/js {
        add_header  Content-Type    application/x-javascript;
    }


```