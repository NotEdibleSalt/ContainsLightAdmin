FROM n-base as builder
WORKDIR /web
COPY . .
# RUN cp ./config.ts ./src/utils/http
RUN npm install --registry=https://registry.npm.taobao.org --no-package-lock --no-save
RUN npm run build

FROM nginx:alpine
RUN cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime \
    && echo "Asia/Shanghai" > /etc/timezone
WORKDIR /web
COPY  --from=builder /web/nginx/default.conf /etc/nginx/conf.d/default.conf
COPY  --from=builder /web/dist /web
EXPOSE 80
