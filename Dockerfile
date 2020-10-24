FROM node:14-alpine
WORKDIR /home/app/

RUN apk update \
  apk add --no-cache python3 make g++ automake autoconf \
  libpng-dev libtool nasm binutils vips-dev fftw-dev bcryptjs && \
  apk add --repository http://dl-3.alpinelinux.org/alpine/edge/community \
  --repository http://dl-3.alpinelinux.org/alpine/edge/main \
  && rm -fR /var/cache/apk/*

RUN npm install -g gatsby-cli

ENV PATH /home/app/node_modules/.bin:$PATH

COPY package*.json /home/app/
COPY . /home/app/

RUN cd /home/app/
RUN npm install

# Fix Error: 'darwin-x64' binaries cannot be used on the 'linuxmusl-x64' platform
# https://github.com/gatsbyjs/gatsby/issues/11084
RUN npm i --arch=x64 --platform=linux sharp

# https://github.com/gatsbyjs/gatsby/issues/26723
RUN npm uninstall gatsby-plugin-sharp && npm i gatsby-plugin-sharp@2.6.26

RUN npm run build

EXPOSE 8000

CMD ["gatsby", "develop", "-H", "0.0.0.0"]
