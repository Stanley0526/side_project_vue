# 使用 Node.js 作為開發環境的基礎鏡像
FROM node:18-alpine AS dev-stage

WORKDIR /app

# 複製 package.json 和 package-lock.json
COPY package*.json ./

# 安裝依賴
RUN npm install

# 複製專案的所有檔案
COPY . .

# 暴露前端開發伺服器運行的端口（通常是 8080）
EXPOSE 3000

# 這裡啟動 Vue 開發伺服器
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
