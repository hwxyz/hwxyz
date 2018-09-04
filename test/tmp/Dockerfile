FROM 10.253.105.75:5050/env/node:8.10.0

COPY package.json /app/package.json
WORKDIR /app

ENV SASS_BINARY_SITE http://npm.zhonganonline.com/node-mirrors/node-sass/

RUN npm --registry http://npm.zhonganonline.com install

COPY ./ /app/

RUN npm run build

EXPOSE 8080

CMD ["node", "server/base.js"]