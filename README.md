## Dev

1. clonar repositorio
2. crear copia del archivo .env.template, renombrar a .env y modifical las variables de entorno
3. generar Auth_SECRET ```openssl rand -base64 32```
4. installar dependencias ```pnpm i```
5. leventar DB ```docker compose up -d```
6. migracios de prisma ```pnpm prisma migrate dev```
7. generar el cliente de prisma ```pnpm prisma generate```
8. ejecutar seed ```pnpm seed```
9. limpiar localStorage del navegador
10. dev server ```pnpm dev```