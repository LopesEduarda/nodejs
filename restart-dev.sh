#!/bin/bash

# Porta padrão
PORT=${1:-3000}

echo "🧹 Finalizando processos na porta $PORT..."
PID=$(lsof -t -i :$PORT)

if [ -z "$PID" ]; then
  echo "✅ Nenhum processo usando a porta $PORT"
else
  kill -9 $PID
  echo "🔫 Processo $PID finalizado"
fi

echo "🚀 Iniciando servidor com nodemon..."
npm run dev
echo "🔄 Servidor reiniciado na porta $PORT"