# Local run

Can run this project in your local by just running below command.
```bash
npm run build
```
Then their will be `out` folder generated.

Then you can run below command to run OSRM backend and application in your local machine.

```bash
podman-compose -f ./app-compose.yaml up
```
(Or you can use `docker-compose` depend on which tool you are using)
