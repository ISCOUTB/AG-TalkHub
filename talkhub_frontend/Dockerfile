FROM nginx:1.17.5

# Expose port 3000
EXPOSE 3000

# Copy Nginx configuration
COPY ./config/talkhub_frontend.conf /etc/nginx/conf.d/default.conf

WORKDIR /talkhub_frontend

ENV VOLTA_HOME "/root/.volta"
ENV PATH "$VOLTA_HOME/bin:$PATH"

RUN apt update && \
    apt --no-install-recommends install -y curl ca-certificates && \
    apt clean && \
    curl https://get.volta.sh | bash && \
    volta install node@20.17.0

COPY package.json .

RUN npm install --ignore-scripts

COPY src src
COPY angular.json .
COPY tsconfig.json .
COPY tsconfig.app.json .
COPY tsconfig.spec.json .
COPY tailwind.config.js .

RUN npx ng build --configuration=production

CMD [nginx -g 'daemon off;']
