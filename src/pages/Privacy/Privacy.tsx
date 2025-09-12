import style from "./Privacy.module.css";
function Privacy() {
  return (
    <div className={style.wrapper}>
      <div className={style.container}>
        <div className={style.title}>隱私權政策</div>
        <div className={style.date}>生效日期:2025-09-12</div>
        <div className={style.info}>
          我們重視您的隱私權，本應用程式
          (以下稱「我們」)承諾保護使用者的個人資料。請在使用前仔細閱讀以下條款。
        </div>
        <div className={style.subTitle}>1. 我們收集的資料</div>
        <div className={style.content}>
          - 您的帳號資訊（例如：電子郵件、名稱、帳號 ID）
        </div>
        <div className={style.content}>- 您使用本應用的操作紀錄</div>
        <div className={style.content}>
          - 本應用透過 Google OAuth 或 Gmail API
          收集的授權資訊（僅限寄信功能所需）
        </div>
        <div className={style.subTitle}>2. 資料使用方式</div>
        <div className={style.content}>- 提供登入與寄信功能</div>
        <div className={style.content}>- 儲存使用者設定或操作紀錄</div>
        <div className={style.content}>- 改善服務與除錯</div>
        <div className={style.subTitle}>3. 資料保護</div>
        <div className={style.content}>- 我們不會將您的資料出售給第三方</div>
        <div className={style.content}>- 使用 HTTPS 保護資料傳輸</div>
        <div className={style.content}>- 密碼與敏感資訊採加密儲存</div>
        <div className={style.subTitle}>4. Cookies 與第三方服務</div>
        <div className={style.content}>
          - 本應用可能使用 cookies 或第三方服務，例如 Google OAuth
        </div>
        <div className={style.content}>- 僅收集功能所需資訊，不做額外追蹤</div>
        <div className={style.subTitle}>5. 使用者權利</div>
        <div className={style.content}>
          - 您可以要求我們查詢、修改或刪除您的個人資料
        </div>
        <div className={style.content}>
          - 聯絡方式：chensiprojecttest4832@gmail.com
        </div>
        <div className={style.subTitle}>6. 隱私權政策更新</div>
        <div className={style.content}>
          - 我們保留隨時更新政策的權利，更新後會於本頁面公告
        </div>
      </div>
    </div>
  );
}

export default Privacy;
