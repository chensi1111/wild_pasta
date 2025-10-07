# 餐廳訂位與點餐系統（Full-Stack Project）

一個結合會員、訂單、金流、郵件通知與動畫互動的全端專案。  
使用 React 與 Node.js 打造，整合多項第三方 API 與安全機制，並使用GitHub Actions執行每日排程。  

---

## 專案架構

| 類別 | 技術 |
|------|------|
| **前端** | React、Redux、Material UI |
| **後端** | Node.js、Express、PostgreSQL (NeonDB)、Swagger |
| **部署** | Vercel（前端）、Render（後端）|
| **日誌與監控** | Winston |
| **第三方整合** | ECPay API、Gmail API、Google OAuth |

---

## 系統配置

### 金流整合
- 串接 **綠界科技 ECPay API**
- 支援信用卡付款與交易狀態回傳

### 訂單通知與驗證碼寄信
- 串接 **Gmail API**
- 自動寄送訂單確認信與驗證碼郵件

### 登入與認證
- JWT + Refresh Token 雙重驗證機制

### 防刷與安全機制
- Rate Limit 請求限制（防止暴力攻擊）
- 重複提交防護（避免重複下單）
- Content Security Policy (CSP)
- HttpOnly / Secure Cookie
- XSS 防護
- Prepared Statement 防 SQL Injection

### 部署
- **Vercel**：前端自動部署  
- **Render**：後端 API 伺服器  

### 資料庫
- **NeonDB（PostgreSQL 雲端資料庫）**
- 結構化設計、索引優化、交易安全

### API 文件
- 使用 **Swagger UI** 自動生成 RESTful API 文件

---

## 功能介紹

### 會員系統
- 註冊 / 登入 / 忘記密碼
- 登出其他裝置
- 修改密碼 / Email
- 查詢訂單紀錄

### 購物車與訂單
- 支援外帶與訂位
- 集點系統
- Email 訂單確認與取消
- 信用卡付款整合（ECPay）

### UI / UX 設計
- 翻頁式菜單設計
- 使用 **Framer Motion** 實現流暢動畫效果
- 響應式介面設計（RWD）

---

## 專案亮點
- 採用 **前後端分離架構**
- 整合多項第三方 API
- 完整安全防護與防刷機制
- 清晰 API 文件與模組化架構設計

---

## License
此專案僅作為學習與作品展示用途。

---