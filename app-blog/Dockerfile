FROM node:19.1

# RUN set -xe; \
#     \
#     yarn global add vuepress@1.9.7; \
#     \
#     rm -rf /tmp/* /var/tmp/* /var/cache/apk/* 

RUN  yarn
RUN yarn add -D vuepress@next
# RUN yarn global add vue vue-cli
# vue-cli vue-template-compiler 
#COPY package.json /

COPY ./src /

WORKDIR /

# VOLUME [ "docs" ]

EXPOSE 8080

ENTRYPOINT ["vuepress", "build", "docs"]
#ENTRYPOINT ["yarn", "docs:dev"]
