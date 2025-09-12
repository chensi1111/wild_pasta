import style from "./Term.module.css";
function Term() {
  return (
    <div className={style.wrapper}>
      <div className={style.container}>
        <div className={style.title}>服務條款</div>
        <div className={style.date}>生效日期:2025-09-12</div>
        <div className={style.info}>使用本應用程式即表示您同意以下條款：</div>
        <div className={style.subTitle}>1. 使用規範</div>
        <div className={style.content}>- 僅能用於合法用途</div>
        <div className={style.content}>
          - 不得濫用寄信功能或進行垃圾信件行為
        </div>
        <div className={style.subTitle}>2. 帳號安全</div>
        <div className={style.content}>- 您應妥善保管帳號與密碼</div>
        <div className={style.content}>
          - 因帳號資訊外洩造成的損失，由使用者自行承擔
        </div>
        <div className={style.subTitle}>3. 責任限制</div>
        <div className={style.content}>
          -
          本應用對於因系統故障、第三方服務中斷或使用者操作不當所造成的損失不負責
        </div>
        <div className={style.content}>
          - 本應用保留隨時修改功能或停止服務的權利
        </div>
        <div className={style.subTitle}>4. 知識產權</div>
        <div className={style.content}>
          - 本應用程式的程式碼、設計、內容等均受著作權保護
        </div>
        <div className={style.content}>- 未經授權不得轉載或商業使用</div>
        <div className={style.subTitle}>5. 條款更新</div>
        <div className={style.content}>- 我們可能隨時更新本條款</div>
        <div className={style.content}>
          - 更新後持續使用即表示您同意最新條款
        </div>
        <div className={style.subTitle}>6. 聯絡方式</div>
        <div className={style.content}>
          - 如有問題或建議，請聯絡：chensiprojecttest4832@gmail.com
        </div>
      </div>
    </div>
  );
}

export default Term;
