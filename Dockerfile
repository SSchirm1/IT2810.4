FROM node:14.3.0

WORKDIR /api
ADD ./api /api
COPY start.sh /api
ENV NODE_ENV=frontend_test
RUN npm install
EXPOSE 8000
RUN ["chmod", "+x", "/api/start.sh"]
ENTRYPOINT ["/api/start.sh"]