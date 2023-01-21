FROM node:14

# RUN set -xe; \
#     \
#     yarn global add vuepress@1.9.7; \
#     \
#     rm -rf /tmp/* /var/tmp/* /var/cache/apk/* 

#RUN yarn add vuepress
#RUN yarn add -D vuepress@next
# RUN yarn global add vue vue-cli
# vue-cli vue-template-compiler 
#COPY package.json /

COPY ./blog/ /blog/

WORKDIR /blog/

RUN yarn add vuepress
# VOLUME [ "docs" ]

EXPOSE 8080

#ENTRYPOINT ["yarn", "build", "docs"]
ENTRYPOINT ["yarn", "docs:dev"]
