## Dev

1. clonar repositorio
2. crear copia del archivo .env.template, renombrar a .env y modifical las variables de entorno
3. installar dependencias ```pnpm i```
4. leventar DB ```docker compose up -d```
5. migracios de prisma ```pnpm prisma migrate dev```
6. generar el cliente de prisma ```pnpm prisma generate```
7. ejecutar seed ````pnpm seed```
8. dev server ```pnpm dev```