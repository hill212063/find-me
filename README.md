# Local run

Can run this project in your local by just running the OSRM server first and wait for the server to finish initialization and then run the app server.

**OSRM server**
```bash
podman-compose -f ./docker-compose.yaml up
```
(Or you can use `docker-compose` depend on which tool you are using)

**App server**
```bash
npm run dev
```

# Reference
- [Socket io with Next js](https://socket.io/how-to/use-with-nextjs)
- [Guide for OSRM server](https://blog.afi.io/blog/introduction-to-osrm-setting-up-osrm-backend-using-docker/)

