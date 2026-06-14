/* ========================= 字体引入 ========================= */
(function () {
  const style = document.createElement("style");
  style.textContent = `
    @font-face {
      font-family: 'ShuoWeb';
      src: url('https://shuoweb.com/css/font.ttf') format('truetype');
      font-weight: normal;
      font-style: normal;
      font-display: swap;
    }
    body, .card-title, .section-title, .ach-toast-name, .ach-item-name {
      font-family: 'ShuoWeb', -apple-system, BlinkMacSystemFont, 'PingFang SC', sans-serif;
    }
  `;
  document.head.appendChild(style);
})();

/* ========================= 渲染页面逻辑 ========================= */
function render() {
  const root = document.getElementById("content");
  root.innerHTML = "";
  SITE_DATA.forEach((section, sIndex) => {
    const block = document.createElement("div");
    block.className = "section";
    block.style.animationDelay = `${sIndex * 0.1}s`;
    block.innerHTML = `
      <div class="section-title">
        ${ICONS[section.icon] || ICONS.box}
        ${section.name}
      </div>
      <div class="grid"></div>
    `;
    const grid = block.querySelector(".grid");
    section.items.forEach(item => {
      const card = document.createElement("div");
      card.className = "card";
      card.onclick = () => {
        if (item.url !== "#") window.location.href = item.url;
        else alert('此处为演示链接');
      };
      card.innerHTML = `
        <div class="icon-box">
          ${ICONS[item.icon] || ICONS.code}
        </div>
        <div class="card-title">${item.title}</div>
      `;
      grid.appendChild(card);
    });
    root.appendChild(block);
  });
}
render();

/* ========================= 成就系统 ========================= */
(function () {

  /* ---------- SVG 图标库（替代 emoji）---------- */
  const ACH_SVG = {
    star:     `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`,
    terminal: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/></svg>`,
    matrix:   `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>`,
    glitch:   `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="3"/></svg>`,
    skull:    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 2C8.13 2 5 5.13 5 9c0 2.38 1.19 4.47 3 5.74V17a2 2 0 002 2h4a2 2 0 002-2v-2.26C17.81 13.47 19 11.38 19 9c0-3.87-3.13-7-7-7z"/><line x1="9" y1="17" x2="9" y2="20"/><line x1="15" y1="17" x2="15" y2="20"/><line x1="9" y1="12" x2="9" y2="12.01"/><line x1="15" y1="12" x2="15" y2="12.01"/></svg>`,
    flame:    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 2c0 0-5 5-5 10a5 5 0 0010 0c0-3-2-5-2-5s-1 2-3 2c0-3 0-7 0-7z"/></svg>`,
    keyboard: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="2" y="6" width="20" height="12" rx="2"/><line x1="6" y1="10" x2="6" y2="10"/><line x1="10" y1="10" x2="10" y2="10"/><line x1="14" y1="10" x2="14" y2="10"/><line x1="18" y1="10" x2="18" y2="10"/><line x1="6" y1="14" x2="18" y2="14"/></svg>`,
    heart:    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>`,
    click:    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18"/></svg>`,
    moon:     `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>`,
    search:   `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>`,
    folder:   `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z"/></svg>`,
    crown:    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M2 20h20M4 20l2-12 6 6 4-9 4 9 2-3 2 9"/></svg>`,
    gamepad:  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="2" y="6" width="20" height="14" rx="2"/><path d="M6 14h4m-2-2v4"/><circle cx="15" cy="13" r="1" fill="currentColor"/><circle cx="18" cy="11" r="1" fill="currentColor"/></svg>`,
    lock:     `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>`,
    zap:      `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>`,
    eye:      `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>`,
    copy:     `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>`,
    mouse:    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="6" y="2" width="12" height="20" rx="6"/><line x1="12" y1="2" x2="12" y2="8"/></svg>`,
    anchor:   `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="5" r="3"/><line x1="12" y1="8" x2="12" y2="22"/><path d="M5 12H2a10 10 0 0020 0h-3"/></svg>`,
    trophy:   `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M6 9H4.5a2.5 2.5 0 010-5H6"/><path d="M18 9h1.5a2.5 2.5 0 000-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0012 0V2z"/></svg>`,
    question: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12" y2="17.01"/></svg>`,
    sunset:   `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M17 18a5 5 0 00-10 0"/><line x1="12" y1="2" x2="12" y2="9"/><line x1="4.22" y1="10.22" x2="5.64" y2="11.64"/><line x1="1" y1="18" x2="3" y2="18"/><line x1="21" y1="18" x2="23" y2="18"/><line x1="18.36" y1="11.64" x2="19.78" y2="10.22"/><line x1="23" y1="22" x2="1" y2="22"/><polyline points="16 5 12 9 8 5"/></svg>`,
    scroll:   `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="12" y1="18" x2="12" y2="12"/><line x1="9" y1="15" x2="15" y2="15"/></svg>`,
    clock:    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
  };

  /* ---------- 成就定义 ---------- */
  const ACHIEVEMENTS = [
    // ── 公开成就 ──
    { id: "first_visit",    icon: "star",     name: "初探者",     desc: "欢迎来到 shuoweb.com！",                   secret: false },
    { id: "open_panel",     icon: "folder",   name: "成就猎人",   desc: "打开了成就面板，好奇心驱使你前行",           secret: false },
    // ── 隐藏成就 ──
    { id: "sudo_mode",      icon: "terminal", name: "超级管理员", desc: "通过 #sudo 解锁了隐藏通道",                 secret: true  },
    { id: "matrix_mode",    icon: "matrix",   name: "黑客帝国",   desc: "看见了数字雨，真相只在一念间",               secret: true  },
    { id: "hack_mode",      icon: "glitch",   name: "故障美学",   desc: "感受了像素与噪声的碰撞",                   secret: true  },
    { id: "token_114514",   icon: "skull",    name: "臭名昭著",   desc: "输入了传说中的 114514",                    secret: true  },
    { id: "token_666666",   icon: "flame",    name: "暗黑使徒",   desc: "召唤了 666666 的黑暗之力",                 secret: true  },
    { id: "token_1024",     icon: "keyboard", name: "程序员节",   desc: "以 1024 致敬每一位码农",                   secret: true  },
    { id: "konami_code",    icon: "gamepad",  name: "上上下下",   desc: "Konami Code 永远的神",                    secret: true  },
    { id: "secret_word",    icon: "heart",    name: "情书",       desc: '在页面上拼出了 "shuo"',                   secret: true  },
    { id: "click_maniac",   icon: "click",    name: "疯狂点击",   desc: "连续点击标题 7 次",                       secret: true  },
    { id: "idle_watcher",   icon: "moon",     name: "在线摸鱼",   desc: "静止不动 60 秒被发现了",                   secret: true  },
    { id: "devtools_open",  icon: "search",   name: "开发者视角", desc: "用 DevTools 探索了网页的秘密",             secret: true  },
    // ── 新增成就 ──
    { id: "night_owl",      icon: "moon",     name: "深夜访客",   desc: "在深夜（0:00–5:00）访问了这个页面",         secret: true  },
    { id: "speed_scroller", icon: "zap",      name: "极速浏览",   desc: "以惊人的速度滚动了页面",                   secret: true  },
    { id: "right_clicker",  icon: "mouse",    name: "另类探索者", desc: "右键检查了页面，细节控玩家",                 secret: true  },
    { id: "triple_visit",   icon: "anchor",   name: "回头客",     desc: "第 3 次以上访问 shuoweb.com",              secret: true  },
    { id: "scroll_bottom",  icon: "scroll",   name: "到达彼岸",   desc: "滚动到了页面最底部",                       secret: true  },
    { id: "copy_content",   icon: "copy",     name: "信息收集者", desc: "复制了页面上的内容",                       secret: true  },
    { id: "double_click",   icon: "eye",      name: "双击大师",   desc: "双击了某个卡片",                          secret: true  },
    { id: "long_stay",      icon: "clock",    name: "深度探索者", desc: "在页面上停留超过 3 分钟",                  secret: true  },
    { id: "sunset_visit",   icon: "sunset",   name: "黄昏访客",   desc: "在傍晚时分（17:00–19:00）到访",            secret: true  },
    // ── 终极成就 ──
    { id: "shake_phone",    icon: "zap",      name: "摇滚精神",   desc: "摇晃手机召唤了隐藏终端",                   secret: true  },
    { id: "all_unlocked",   icon: "crown",    name: "全图鉴",     desc: "解锁了所有彩蛋成就，你是真正的探索者",       secret: true  },
  ];

  /* ---------- 读取 & 保存（带版本去重） ---------- */
  const STORAGE_KEY = "shuoweb_achievements_v2";

  function getUnlocked() {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]"); }
    catch { return []; }
  }
  function saveUnlocked(arr) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(arr));
  }

  /* ---------- 解锁成就（防重复） ---------- */
  window.unlockAchievement = function (id) {
    const unlocked = getUnlocked();
    if (unlocked.includes(id)) return;          // 已解锁 → 直接退出
    const ach = ACHIEVEMENTS.find(a => a.id === id);
    if (!ach) return;
    unlocked.push(id);
    saveUnlocked(unlocked);
    showAchievementToast(ach);
    // 检查全图鉴（排除 all_unlocked 自身）
    const eggIds = ACHIEVEMENTS.filter(a => a.id !== "all_unlocked").map(a => a.id);
    if (eggIds.every(eid => unlocked.includes(eid))) {
      setTimeout(() => window.unlockAchievement("all_unlocked"), 900);
    }
  };

  /* ---------- Toast 通知 ---------- */
  function showAchievementToast(ach) {
    injectStyles();
    const existing = document.querySelectorAll(".ach-toast");
    const offset = existing.length * 90;          // 多条堆叠偏移

    const toast = document.createElement("div");
    toast.className = "ach-toast";
    toast.style.bottom = `${24 + offset}px`;
    toast.innerHTML = `
      <div class="ach-toast-icon-wrap">
        ${ACH_SVG[ach.icon] || ACH_SVG.star}
      </div>
      <div class="ach-toast-body">
        <div class="ach-toast-label">
          ${ACH_SVG.trophy}
          <span>成就解锁</span>
        </div>
        <div class="ach-toast-name">${ach.name}</div>
        <div class="ach-toast-desc">${ach.desc}</div>
      </div>
      <div class="ach-toast-progress"></div>
    `;
    document.body.appendChild(toast);

    requestAnimationFrame(() => {
      requestAnimationFrame(() => toast.classList.add("ach-toast--show"));
    });
    setTimeout(() => {
      toast.classList.remove("ach-toast--show");
      toast.classList.add("ach-toast--hide");
      setTimeout(() => toast.remove(), 500);
    }, 3800);
  }

  /* ---------- 成就面板 ---------- */
  function buildPanel() {
    injectStyles();
    const unlocked = getUnlocked();
    const existing = document.getElementById("ach-panel");
    if (existing) {
      existing.classList.remove("ach-panel--show");
      setTimeout(() => existing.remove(), 280);
      return;
    }
    window.unlockAchievement("open_panel");

    const panel = document.createElement("div");
    panel.id = "ach-panel";

    const count = unlocked.length;
    const total = ACHIEVEMENTS.length;
    const pct   = ((count / total) * 100).toFixed(1);

    const items = ACHIEVEMENTS.map(a => {
      const done   = unlocked.includes(a.id);
      const hidden = a.secret && !done;
      const iconSvg = ACH_SVG[a.icon] || ACH_SVG.star;
      return `
        <div class="ach-item ${done ? "ach-item--done" : "ach-item--locked"}">
          <div class="ach-item-icon">
            ${hidden ? ACH_SVG.lock : iconSvg}
          </div>
          <div class="ach-item-text">
            <div class="ach-item-name">${hidden ? "???" : a.name}</div>
            <div class="ach-item-desc">${hidden ? "这是一个隐藏成就" : a.desc}</div>
          </div>
          ${done ? '<div class="ach-item-check"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg></div>' : ""}
        </div>
      `;
    }).join("");

    panel.innerHTML = `
      <div class="ach-panel-header">
        <div class="ach-panel-title">
          <div class="ach-panel-title-icon">${ACH_SVG.trophy}</div>
          <span>成就</span>
          <span class="ach-panel-count">${count} / ${total}</span>
        </div>
        <button class="ach-panel-close" id="ach-panel-close-btn" aria-label="关闭">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
      </div>
      <div class="ach-progress-wrap">
        <div class="ach-progress-bar">
          <div class="ach-progress-fill" style="width:${pct}%"></div>
        </div>
        <span class="ach-progress-label">${pct}%</span>
      </div>
      <div class="ach-list">${items}</div>
      <div class="ach-panel-hint">
        桌面按 <kbd>?</kbd> &nbsp;·&nbsp; 移动端长按分区标题
      </div>
    `;
    document.body.appendChild(panel);

    // 关闭按钮
    document.getElementById("ach-panel-close-btn").addEventListener("click", () => {
      panel.classList.remove("ach-panel--show");
      setTimeout(() => panel.remove(), 280);
    });

    // 点击面板外关闭
    setTimeout(() => {
      document.addEventListener("click", function outsideClick(e) {
        if (!panel.contains(e.target)) {
          panel.classList.remove("ach-panel--show");
          setTimeout(() => panel.remove(), 280);
          document.removeEventListener("click", outsideClick);
        }
      });
    }, 100);

    requestAnimationFrame(() => {
      requestAnimationFrame(() => panel.classList.add("ach-panel--show"));
    });
  }

  /* ---------- 触发器：键盘 ? ---------- */
  document.addEventListener("keydown", e => {
    if (e.key === "?" || (e.shiftKey && e.key === "/")) buildPanel();
  });

  /* ---------- 触发器：长按 section-title（移动端）---------- */
  (function () {
    let longPressTimer = null;
    function onTouchStart() {
      longPressTimer = setTimeout(() => {
        longPressTimer = null;
        if (navigator.vibrate) navigator.vibrate(40);
        buildPanel();
      }, 600);
    }
    function cancelLongPress() { clearTimeout(longPressTimer); longPressTimer = null; }
    function bindLongPress() {
      document.querySelectorAll(".section-title").forEach(t => {
        t.addEventListener("touchstart", onTouchStart, { passive: true });
        t.addEventListener("touchend",   cancelLongPress, { passive: true });
        t.addEventListener("touchmove",  cancelLongPress, { passive: true });
      });
    }
    document.readyState === "loading"
      ? document.addEventListener("DOMContentLoaded", bindLongPress)
      : bindLongPress();
  })();

  /* ---------- 首次访问 ---------- */
  window.unlockAchievement("first_visit");

  /* ---------- 新增触发器：深夜访客 ---------- */
  (function () {
    const h = new Date().getHours();
    if (h >= 0 && h < 5) window.unlockAchievement("night_owl");
  })();

  /* ---------- 新增触发器：黄昏访客 ---------- */
  (function () {
    const h = new Date().getHours();
    if (h >= 17 && h < 19) window.unlockAchievement("sunset_visit");
  })();

  /* ---------- 新增触发器：回头客（访问计数）---------- */
  (function () {
    const key = "shuoweb_visit_count";
    let cnt = parseInt(localStorage.getItem(key) || "0", 10) + 1;
    localStorage.setItem(key, cnt);
    if (cnt >= 3) window.unlockAchievement("triple_visit");
  })();

  /* ---------- 新增触发器：极速滚动 ---------- */
  (function () {
    let lastY = 0, lastT = Date.now();
    let triggered = false;
    window.addEventListener("scroll", () => {
      if (triggered) return;
      const now = Date.now();
      const dy  = Math.abs(window.scrollY - lastY);
      const dt  = now - lastT || 1;
      if (dt < 200 && dy / dt > 3) {        // 速度阈值 px/ms
        triggered = true;
        window.unlockAchievement("speed_scroller");
      }
      lastY = window.scrollY;
      lastT = now;
    }, { passive: true });
  })();

  /* ---------- 新增触发器：右键菜单 ---------- */
  (function () {
    let triggered = false;
    document.addEventListener("contextmenu", () => {
      if (triggered) return;
      triggered = true;
      window.unlockAchievement("right_clicker");
    });
  })();

  /* ---------- 新增触发器：滚动到底部 ---------- */
  (function () {
    let triggered = false;
    function checkBottom() {
      if (triggered) return;
      const scrolled = window.scrollY + window.innerHeight;
      const total    = document.documentElement.scrollHeight;
      if (scrolled >= total - 20) {
        triggered = true;
        window.unlockAchievement("scroll_bottom");
      }
    }
    window.addEventListener("scroll", checkBottom, { passive: true });
  })();

  /* ---------- 新增触发器：复制内容 ---------- */
  (function () {
    let triggered = false;
    document.addEventListener("copy", () => {
      if (triggered) return;
      triggered = true;
      window.unlockAchievement("copy_content");
    });
  })();

  /* ---------- 新增触发器：双击卡片 ---------- */
  (function () {
    let triggered = false;
    function bindDoubleClick() {
      document.querySelectorAll(".card").forEach(card => {
        card.addEventListener("dblclick", () => {
          if (triggered) return;
          triggered = true;
          window.unlockAchievement("double_click");
        });
      });
    }
    document.readyState === "loading"
      ? document.addEventListener("DOMContentLoaded", bindDoubleClick)
      : bindDoubleClick();
  })();

  /* ---------- 新增触发器：停留 3 分钟 ---------- */
  (function () {
    setTimeout(() => window.unlockAchievement("long_stay"), 3 * 60 * 1000);
  })();

  /* ========================= 样式注入 ========================= */
  let stylesInjected = false;
  function injectStyles() {
    if (stylesInjected) return;
    stylesInjected = true;

    const s = document.createElement("style");
    s.textContent = `
      /* ══════════════════════════════════════════════
         CSS 变量 & 全局动画
      ══════════════════════════════════════════════ */
      :root {
        --ach-bg:           #0d0d18;
        --ach-surface:      rgba(18, 18, 32, 0.97);
        --ach-border:       rgba(255,255,255,0.08);
        --ach-border-glow:  rgba(124,106,247,0.5);
        --ach-accent:       #8b7cf8;
        --ach-accent2:      #f5a623;
        --ach-accent3:      #3ecfcf;
        --ach-text:         #eeeef8;
        --ach-text-sub:     rgba(230,230,255,0.55);
        --ach-muted:        rgba(255,255,255,0.30);
        --ach-done-bg:      rgba(139,124,248,0.10);
        --ach-done-glow:    rgba(139,124,248,0.22);
        --ach-radius:       20px;
        --ach-font:         'ShuoWeb', -apple-system, BlinkMacSystemFont, 'PingFang SC', sans-serif;
        --ach-shadow:
          0 0 0 1px rgba(255,255,255,0.06),
          0 8px 32px rgba(0,0,0,0.5),
          0 32px 80px rgba(0,0,0,0.6),
          0 0 80px rgba(139,124,248,0.08);
      }

      /* 关键帧 */
      @keyframes achPanelIn    { from { transform: translateY(22px) scale(0.94); opacity: 0; } to { transform: none; opacity: 1; } }
      @keyframes achItemIn     { from { transform: translateX(-8px); opacity: 0; } to { transform: none; opacity: 1; } }
      @keyframes achShimmer    { from { transform: translateX(-100%) skewX(-15deg); } to { transform: translateX(250%) skewX(-15deg); } }
      @keyframes achPulseRing  { 0%,100% { box-shadow: 0 0 0 0 rgba(139,124,248,0.4); } 50% { box-shadow: 0 0 0 6px rgba(139,124,248,0); } }
      @keyframes achGlow       { 0%,100% { opacity: 0.6; } 50% { opacity: 1; } }
      @keyframes achToastIn    { from { transform: translateX(calc(100% + 32px)); opacity: 0; } to { transform: none; opacity: 1; } }
      @keyframes achToastOut   { from { transform: none; opacity: 1; } to { transform: translateX(calc(100% + 32px)); opacity: 0; } }
      @keyframes achProgress   { from { transform: scaleX(1); } to { transform: scaleX(0); } }
      @keyframes achOrbit      {
        0%   { transform: rotate(0deg)   translateX(44px) rotate(0deg); }
        100% { transform: rotate(360deg) translateX(44px) rotate(-360deg); }
      }
      @keyframes achOrbit2     {
        0%   { transform: rotate(120deg)   translateX(44px) rotate(-120deg); }
        100% { transform: rotate(480deg)   translateX(44px) rotate(-480deg); }
      }
      @keyframes achOrbit3     {
        0%   { transform: rotate(240deg)   translateX(44px) rotate(-240deg); }
        100% { transform: rotate(600deg)   translateX(44px) rotate(-600deg); }
      }
      @keyframes achRotate     { to { transform: rotate(360deg); } }
      @keyframes achFloat      { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-4px); } }
      @keyframes achBadgePop   { 0% { transform: scale(0) rotate(-20deg); } 80% { transform: scale(1.15) rotate(3deg); } 100% { transform: scale(1) rotate(0); } }

      /* ══════════════════════════════════════════════
         成就面板 — 主容器
      ══════════════════════════════════════════════ */
      #ach-panel {
        position: fixed;
        bottom: 28px; right: 24px;
        width: 356px;
        max-height: 580px;
        background: var(--ach-surface);
        border-radius: var(--ach-radius);
        z-index: 9001;
        display: flex;
        flex-direction: column;
        box-shadow: var(--ach-shadow);
        overflow: hidden;
        font-family: var(--ach-font);
        opacity: 0;
        transform: translateY(22px) scale(0.94);
        transition: none;
        /* 渐变描边边框 via outline + pseudo */
      }
      #ach-panel::before {
        content: '';
        position: absolute; inset: 0;
        border-radius: inherit;
        padding: 1px;
        background: linear-gradient(135deg,
          rgba(139,124,248,0.55) 0%,
          rgba(255,255,255,0.08) 40%,
          rgba(62,207,207,0.35) 70%,
          rgba(245,166,35,0.4) 100%
        );
        -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
        -webkit-mask-composite: xor;
        mask-composite: exclude;
        pointer-events: none;
        z-index: 10;
      }
      /* 背景噪点纹理 */
      #ach-panel::after {
        content: '';
        position: absolute; inset: 0;
        border-radius: inherit;
        background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
        background-size: 160px;
        opacity: 0.6;
        pointer-events: none;
        z-index: 0;
      }
      #ach-panel.ach-panel--show {
        animation: achPanelIn 0.38s cubic-bezier(.34,1.42,.64,1) forwards;
      }

      /* ══════════════════════════════════════════════
         顶部标题区
      ══════════════════════════════════════════════ */
      .ach-panel-header {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 18px 18px 14px;
        flex-shrink: 0;
        z-index: 2;
        overflow: hidden;
      }
      /* 标题区微光背景 */
      .ach-panel-header::before {
        content: '';
        position: absolute; inset: 0;
        background: linear-gradient(135deg,
          rgba(139,124,248,0.14) 0%,
          transparent 60%
        );
        pointer-events: none;
      }
      /* 底部分割线渐变 */
      .ach-panel-header::after {
        content: '';
        position: absolute; bottom: 0; left: 18px; right: 18px;
        height: 1px;
        background: linear-gradient(90deg,
          transparent,
          rgba(139,124,248,0.5) 30%,
          rgba(62,207,207,0.4) 70%,
          transparent
        );
      }

      .ach-panel-title {
        display: flex;
        align-items: center;
        gap: 10px;
        font-size: 15px;
        font-weight: 800;
        color: var(--ach-text);
        letter-spacing: 0.03em;
        text-shadow: 0 0 20px rgba(139,124,248,0.4);
      }

      /* 图标容器：旋转光圈 */
      .ach-panel-title-icon {
        position: relative;
        width: 32px; height: 32px;
        flex-shrink: 0;
        display: flex; align-items: center; justify-content: center;
      }
      .ach-panel-title-icon svg {
        width: 18px; height: 18px;
        color: var(--ach-accent2);
        position: relative; z-index: 2;
        filter: drop-shadow(0 0 6px rgba(245,166,35,0.7));
        animation: achFloat 3s ease-in-out infinite;
      }
      .ach-panel-title-icon::before {
        content: '';
        position: absolute; inset: 0;
        border-radius: 50%;
        border: 1.5px dashed rgba(245,166,35,0.35);
        animation: achRotate 8s linear infinite;
      }
      /* 轨道小点 */
      .ach-panel-title-icon::after {
        content: '';
        position: absolute;
        width: 5px; height: 5px;
        background: var(--ach-accent);
        border-radius: 50%;
        top: 50%; left: 50%;
        margin: -2.5px;
        animation: achOrbit 3s linear infinite;
        box-shadow: 0 0 6px var(--ach-accent);
      }

      .ach-panel-count {
        font-size: 11px;
        font-weight: 600;
        color: var(--ach-accent);
        background: rgba(139,124,248,0.12);
        border: 1px solid rgba(139,124,248,0.25);
        padding: 2px 9px;
        border-radius: 20px;
        letter-spacing: 0.04em;
      }

      .ach-panel-close {
        position: relative;
        width: 30px; height: 30px;
        display: flex; align-items: center; justify-content: center;
        background: rgba(255,255,255,0.04);
        border: 1px solid rgba(255,255,255,0.08);
        color: var(--ach-muted);
        cursor: pointer;
        border-radius: 10px;
        transition: background 0.2s, color 0.2s, border-color 0.2s, box-shadow 0.2s;
        padding: 0;
        z-index: 3;
      }
      .ach-panel-close svg { width: 14px; height: 14px; }
      .ach-panel-close:hover {
        background: rgba(255,255,255,0.10);
        border-color: rgba(255,255,255,0.18);
        color: var(--ach-text);
        box-shadow: 0 0 12px rgba(139,124,248,0.25);
      }

      /* ══════════════════════════════════════════════
         进度区
      ══════════════════════════════════════════════ */
      .ach-progress-wrap {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 12px 18px 10px;
        flex-shrink: 0;
        z-index: 2;
        position: relative;
      }

      .ach-progress-bar {
        flex: 1;
        height: 5px;
        background: rgba(255,255,255,0.06);
        border-radius: 10px;
        overflow: visible;
        position: relative;
      }
      .ach-progress-fill {
        position: relative;
        height: 100%;
        background: linear-gradient(90deg, var(--ach-accent) 0%, var(--ach-accent3) 50%, var(--ach-accent2) 100%);
        background-size: 200% 100%;
        border-radius: 10px;
        transition: width 1s cubic-bezier(.4,0,.2,1);
        box-shadow:
          0 0 10px rgba(139,124,248,0.6),
          0 0 24px rgba(139,124,248,0.3);
        overflow: hidden;
      }
      /* 进度条流光 */
      .ach-progress-fill::after {
        content: '';
        position: absolute; inset: 0;
        background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
        transform: translateX(-100%) skewX(-15deg);
        animation: achShimmer 2.5s ease-in-out infinite 0.8s;
      }
      /* 进度条末端发光圆点 */
      .ach-progress-fill::before {
        content: '';
        position: absolute; right: -3px; top: 50%;
        width: 8px; height: 8px;
        background: #fff;
        border-radius: 50%;
        transform: translateY(-50%);
        box-shadow:
          0 0 6px var(--ach-accent),
          0 0 14px var(--ach-accent);
        opacity: 0.9;
      }

      .ach-progress-label {
        font-size: 11px;
        font-weight: 700;
        color: var(--ach-accent);
        white-space: nowrap;
        min-width: 38px;
        text-align: right;
        letter-spacing: 0.04em;
      }

      /* ══════════════════════════════════════════════
         成就列表
      ══════════════════════════════════════════════ */
      .ach-list {
        overflow-y: auto;
        padding: 6px 10px 8px;
        flex: 1;
        position: relative;
        z-index: 2;
        scrollbar-width: thin;
        scrollbar-color: rgba(139,124,248,0.25) transparent;
      }
      .ach-list::-webkit-scrollbar { width: 3px; }
      .ach-list::-webkit-scrollbar-track { background: transparent; }
      .ach-list::-webkit-scrollbar-thumb {
        background: rgba(139,124,248,0.3);
        border-radius: 10px;
      }

      /* ── 成就条目 ── */
      .ach-item {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 10px 12px;
        border-radius: 14px;
        margin-bottom: 4px;
        position: relative;
        cursor: default;
        transition: background 0.2s, transform 0.18s, box-shadow 0.2s;
        overflow: hidden;
        opacity: 0;
        animation: achItemIn 0.3s ease forwards;
      }
      /* 每个条目入场延迟 */
      .ach-item:nth-child(1)  { animation-delay: 0.03s; }
      .ach-item:nth-child(2)  { animation-delay: 0.06s; }
      .ach-item:nth-child(3)  { animation-delay: 0.09s; }
      .ach-item:nth-child(4)  { animation-delay: 0.12s; }
      .ach-item:nth-child(5)  { animation-delay: 0.15s; }
      .ach-item:nth-child(6)  { animation-delay: 0.18s; }
      .ach-item:nth-child(7)  { animation-delay: 0.21s; }
      .ach-item:nth-child(8)  { animation-delay: 0.24s; }
      .ach-item:nth-child(9)  { animation-delay: 0.27s; }
      .ach-item:nth-child(n+10) { animation-delay: 0.30s; }

      .ach-item:hover {
        background: rgba(255,255,255,0.04);
        transform: translateX(2px);
      }

      /* 已解锁 */
      .ach-item--done {
        background: var(--ach-done-bg);
        box-shadow:
          inset 0 0 0 1px rgba(139,124,248,0.2),
          0 2px 12px rgba(139,124,248,0.08);
      }
      .ach-item--done:hover {
        background: rgba(139,124,248,0.16);
        box-shadow:
          inset 0 0 0 1px rgba(139,124,248,0.3),
          0 4px 20px rgba(139,124,248,0.15);
      }
      /* 已解锁：左侧彩条 */
      .ach-item--done::before {
        content: '';
        position: absolute; left: 0; top: 20%; bottom: 20%;
        width: 2.5px;
        border-radius: 10px;
        background: linear-gradient(180deg, var(--ach-accent), var(--ach-accent3));
        box-shadow: 0 0 8px var(--ach-accent);
      }
      /* 已解锁：流光扫过 */
      .ach-item--done::after {
        content: '';
        position: absolute; inset: 0;
        background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.06) 50%, transparent 100%);
        transform: translateX(-100%) skewX(-20deg);
        animation: achShimmer 4s ease-in-out infinite 1s;
        pointer-events: none;
      }

      /* 未解锁 */
      .ach-item--locked {
        opacity: 0.42;
        filter: saturate(0.3);
      }
      .ach-item--locked:hover {
        opacity: 0.55;
        filter: saturate(0.5);
        transform: none;
      }

      /* ── 图标盒子 ── */
      .ach-item-icon {
        width: 38px; height: 38px;
        border-radius: 12px;
        display: flex; align-items: center; justify-content: center;
        background: rgba(255,255,255,0.06);
        border: 1px solid rgba(255,255,255,0.08);
        flex-shrink: 0;
        color: rgba(255,255,255,0.5);
        transition: transform 0.2s, box-shadow 0.2s;
      }
      .ach-item:hover .ach-item-icon { transform: scale(1.08) rotate(-3deg); }
      .ach-item--done .ach-item-icon {
        color: var(--ach-accent2);
        background: rgba(245,166,35,0.1);
        border-color: rgba(245,166,35,0.22);
        box-shadow: 0 0 14px rgba(245,166,35,0.2), inset 0 1px 0 rgba(255,255,255,0.1);
      }
      .ach-item--done:hover .ach-item-icon {
        box-shadow: 0 0 20px rgba(245,166,35,0.35), inset 0 1px 0 rgba(255,255,255,0.1);
      }
      .ach-item-icon svg { width: 19px; height: 19px; }

      /* ── 文字 ── */
      .ach-item-text { flex: 1; min-width: 0; }
      .ach-item-name {
        font-size: 13px; font-weight: 700;
        color: var(--ach-text);
        white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        letter-spacing: 0.01em;
      }
      .ach-item--done .ach-item-name {
        background: linear-gradient(90deg, var(--ach-text), rgba(230,230,255,0.75));
        -webkit-background-clip: text; -webkit-text-fill-color: transparent;
        background-clip: text;
      }
      .ach-item-desc {
        font-size: 11px;
        color: var(--ach-text-sub);
        margin-top: 2px;
        white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        letter-spacing: 0.01em;
      }

      /* ── 勾选徽章 ── */
      .ach-item-check {
        width: 22px; height: 22px;
        display: flex; align-items: center; justify-content: center;
        background: linear-gradient(135deg, var(--ach-accent), var(--ach-accent3));
        border-radius: 50%;
        flex-shrink: 0;
        box-shadow: 0 0 10px rgba(139,124,248,0.5);
        animation: achBadgePop 0.35s cubic-bezier(.34,1.56,.64,1) both;
      }
      .ach-item-check svg { width: 11px; height: 11px; color: #fff; }

      /* ══════════════════════════════════════════════
         底部提示
      ══════════════════════════════════════════════ */
      .ach-panel-hint {
        padding: 10px 18px 15px;
        font-size: 11px;
        color: rgba(255,255,255,0.20);
        text-align: center;
        position: relative;
        z-index: 2;
        flex-shrink: 0;
        letter-spacing: 0.03em;
      }
      .ach-panel-hint::before {
        content: '';
        position: absolute; top: 0; left: 18px; right: 18px;
        height: 1px;
        background: linear-gradient(90deg,
          transparent,
          rgba(255,255,255,0.08) 30%,
          rgba(255,255,255,0.08) 70%,
          transparent
        );
      }
      .ach-panel-hint kbd {
        display: inline-block;
        background: rgba(255,255,255,0.07);
        border: 1px solid rgba(255,255,255,0.14);
        border-bottom-width: 2px;
        border-radius: 5px;
        padding: 1px 6px;
        font-size: 10px;
        font-family: inherit;
        letter-spacing: 0.02em;
        color: rgba(255,255,255,0.35);
      }

      /* ══════════════════════════════════════════════
         Toast 通知
      ══════════════════════════════════════════════ */
      .ach-toast {
        position: fixed;
        right: 22px;
        width: 330px;
        background: rgba(14, 14, 26, 0.97);
        border-radius: 16px;
        z-index: 9002;
        display: flex;
        align-items: center;
        gap: 13px;
        padding: 14px 16px 16px;
        font-family: var(--ach-font);
        overflow: hidden;
        opacity: 0;
        transform: translateX(calc(100% + 32px));
        transition: none;
        /* 渐变描边 */
        box-shadow:
          0 0 0 1px rgba(139,124,248,0.35),
          0 8px 32px rgba(0,0,0,0.55),
          0 0 40px rgba(139,124,248,0.12),
          inset 0 1px 0 rgba(255,255,255,0.06);
      }
      .ach-toast--show {
        animation: achToastIn 0.42s cubic-bezier(.34,1.42,.64,1) forwards;
      }
      .ach-toast--hide {
        animation: achToastOut 0.34s ease-in forwards;
      }

      /* Toast 左侧彩边 */
      .ach-toast::before {
        content: '';
        position: absolute; left: 0; top: 0; bottom: 0;
        width: 3px;
        background: linear-gradient(180deg, var(--ach-accent), var(--ach-accent3), var(--ach-accent2));
        box-shadow: 0 0 12px rgba(139,124,248,0.6);
      }

      /* Toast 背景光晕 */
      .ach-toast::after {
        content: '';
        position: absolute; top: -20px; left: 10px;
        width: 100px; height: 100px;
        background: radial-gradient(circle, rgba(139,124,248,0.12), transparent 70%);
        pointer-events: none;
      }

      .ach-toast-icon-wrap {
        width: 44px; height: 44px;
        border-radius: 14px;
        background: rgba(139,124,248,0.12);
        border: 1px solid rgba(139,124,248,0.28);
        display: flex; align-items: center; justify-content: center;
        color: var(--ach-accent);
        flex-shrink: 0;
        position: relative;
        z-index: 1;
        box-shadow: 0 0 16px rgba(139,124,248,0.2), inset 0 1px 0 rgba(255,255,255,0.1);
        animation: achPulseRing 2.5s ease-in-out infinite;
      }
      .ach-toast-icon-wrap svg { width: 22px; height: 22px; filter: drop-shadow(0 0 4px rgba(139,124,248,0.6)); }

      .ach-toast-body { flex: 1; min-width: 0; position: relative; z-index: 1; }
      .ach-toast-label {
        display: flex; align-items: center; gap: 5px;
        font-size: 10px; font-weight: 700;
        color: var(--ach-accent2);
        text-transform: uppercase;
        letter-spacing: 0.10em;
        margin-bottom: 4px;
      }
      .ach-toast-label svg { width: 10px; height: 10px; }
      .ach-toast-name {
        font-size: 14px; font-weight: 800;
        color: var(--ach-text);
        white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        letter-spacing: 0.01em;
      }
      .ach-toast-desc {
        font-size: 11px;
        color: var(--ach-text-sub);
        margin-top: 3px;
        white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
      }

      /* 底部倒计时进度条 */
      .ach-toast-progress {
        position: absolute;
        bottom: 0; left: 0;
        height: 2px;
        background: linear-gradient(90deg, var(--ach-accent), var(--ach-accent3), var(--ach-accent2));
        background-size: 200% 100%;
        width: 100%;
        transform-origin: left;
        animation: achProgress 3.8s linear forwards;
        box-shadow: 0 0 8px rgba(139,124,248,0.6);
      }

      /* ══════════════════════════════════════════════
         移动端
      ══════════════════════════════════════════════ */
      @media (max-width: 480px) {
        #ach-panel {
          bottom: 0; right: 0; left: 0;
          width: 100%; max-height: 72vh;
          border-radius: 22px 22px 0 0;
          transform: translateY(100%);
        }
        #ach-panel.ach-panel--show {
          animation: none;
          transform: translateY(0);
          opacity: 1;
          transition: transform 0.38s cubic-bezier(.34,1.42,.64,1);
        }
        .ach-toast { right: 12px; left: 12px; width: auto; }
      }
    `;
    document.head.appendChild(s);
  }

})(); // ← 成就系统结束


/* ========================= 彩蛋 1: #sudo ========================= */
/*
  触发方式：
  ① URL hash: 在地址栏末尾加 #sudo 后回车（页面加载时 / hashchange 均可）
  ② 键盘: 连续输入字母 s → u → d → o（无需 Enter，立即触发）
*/
(function () {
  let triggered = false;

  function fireSudo() {
    if (triggered) return;
    triggered = true;
    // 清除 hash，避免下次刷新重复触发
    if (window.location.hash === "#sudo") {
      try { history.replaceState(null, "", window.location.pathname + window.location.search); } catch(e){}
    }
    window.unlockAchievement("sudo_mode");
    triggerSudoEffect();
    // 30 秒后允许再次触发（防重复已由 unlockAchievement 内部保证，此处只控制特效）
    setTimeout(() => { triggered = false; }, 30000);
  }

  // ① URL hash 检测 —— 三重保险：load / hashchange / DOMContentLoaded
  function checkHash() {
    if (window.location.hash === "#sudo") fireSudo();
  }
  window.addEventListener("hashchange", checkHash);
  window.addEventListener("load",       checkHash);
  if (document.readyState !== "loading") {
    checkHash();
  } else {
    document.addEventListener("DOMContentLoaded", checkHash);
  }

  // ② 键盘输入 "sudo"（纯字母，连续，无需 Enter）
  let sudoBuf = "";
  const SUDO_TARGET = "sudo";
  document.addEventListener("keydown", e => {
    if (e.ctrlKey || e.altKey || e.metaKey) return;
    if (e.key.length !== 1) return;            // 跳过功能键、方向键
    sudoBuf += e.key.toLowerCase();
    if (sudoBuf.length > SUDO_TARGET.length) {
      sudoBuf = sudoBuf.slice(-SUDO_TARGET.length);
    }
    if (sudoBuf === SUDO_TARGET) {
      sudoBuf = "";
      fireSudo();
    }
  });

  // ③ 视觉特效：终端风格全屏覆盖
  function triggerSudoEffect() {
    if (document.getElementById("sudo-overlay")) return;

    const overlay = document.createElement("div");
    overlay.id = "sudo-overlay";
    overlay.style.cssText = `
      position:fixed;inset:0;z-index:99997;
      background:rgba(0,8,2,0.92);
      display:flex;flex-direction:column;justify-content:center;align-items:center;
      font-family:'Courier New',Courier,monospace;
      opacity:0;transition:opacity 0.3s;
      cursor:pointer;
    `;

    // 打字机逐行输出
    const lines = [
      { text: "shuoweb ~ $ sudo su",            color: "#00ff88", delay: 0    },
      { text: "Password: ••••••••",              color: "#88ffbb", delay: 600  },
      { text: "Authentication successful.",      color: "#00ff88", delay: 1200 },
      { text: "Welcome, root.",                  color: "#ffffff", delay: 1700 },
      { text: "[sudo] shell session opened",     color: "#00cc66", delay: 2200 },
      { text: ">>> 隐藏通道已解锁 <<<",          color: "#ffd700", delay: 2700 },
    ];

    const terminal = document.createElement("div");
    terminal.style.cssText = `
      width:min(520px,90vw);
      background:rgba(0,18,6,0.97);
      border:1px solid rgba(0,255,136,0.25);
      border-radius:12px;
      padding:24px 28px;
      box-shadow:0 0 60px rgba(0,255,136,0.12),0 0 0 1px rgba(0,255,136,0.08);
    `;

    // 标题栏
    const titleBar = document.createElement("div");
    titleBar.style.cssText = `
      display:flex;align-items:center;gap:8px;margin-bottom:16px;padding-bottom:12px;
      border-bottom:1px solid rgba(0,255,136,0.15);
    `;
    titleBar.innerHTML = `
      <div style="width:12px;height:12px;border-radius:50%;background:#ff5f56"></div>
      <div style="width:12px;height:12px;border-radius:50%;background:#ffbd2e"></div>
      <div style="width:12px;height:12px;border-radius:50%;background:#27c93f"></div>
      <span style="flex:1;text-align:center;font-size:12px;color:rgba(0,255,136,0.4);letter-spacing:0.1em">shuoweb — bash</span>
    `;
    terminal.appendChild(titleBar);

    const output = document.createElement("div");
    output.style.cssText = "line-height:1.9;font-size:13px;letter-spacing:0.04em;";
    terminal.appendChild(output);

    overlay.appendChild(terminal);

    const hint = document.createElement("div");
    hint.style.cssText = "color:rgba(255,255,255,0.18);font-size:11px;margin-top:20px;font-family:inherit;letter-spacing:0.05em;";
    hint.textContent = "点击任意处关闭";
    overlay.appendChild(hint);

    document.body.appendChild(overlay);
    requestAnimationFrame(() => requestAnimationFrame(() => overlay.style.opacity = "1"));

    // 逐行打字机效果
    lines.forEach(({ text, color, delay }) => {
      setTimeout(() => {
        const row = document.createElement("div");
        row.style.cssText = `color:${color};white-space:pre;overflow:hidden;width:0;transition:width 0.4s ease;`;
        row.textContent = text;
        output.appendChild(row);
        requestAnimationFrame(() => requestAnimationFrame(() => {
          row.style.width = row.scrollWidth + "px";
        }));
      }, delay);
    });

    // 点击关闭
    overlay.addEventListener("click", () => {
      overlay.style.opacity = "0";
      setTimeout(() => overlay.remove(), 350);
    });

    // 4.5 秒后自动关闭
    setTimeout(() => {
      if (document.getElementById("sudo-overlay")) {
        overlay.style.opacity = "0";
        setTimeout(() => overlay.remove(), 350);
      }
    }, 4500);
  }
})();


/* ========================= 彩蛋 2: 数字雨 (Matrix) ========================= */
/* 触发方式：键盘输入 ↑↓↑↓（方向键）—— 必须用 keydown，keypress 不捕获方向键 */
(function () {
  const TARGET = ["ArrowUp","ArrowDown","ArrowUp","ArrowDown"];
  let seq = [];
  document.addEventListener("keydown", e => {
    const isArrow = ["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].includes(e.key);
    if (!isArrow) { seq = []; return; }
    seq.push(e.key);
    if (seq.length > TARGET.length) seq.shift();
    if (seq.join(",") === TARGET.join(",")) {
      seq = [];
      window.unlockAchievement("matrix_mode");
      triggerMatrix();
    }
  });

  function triggerMatrix() {
    const canvas = document.createElement("canvas");
    canvas.style.cssText = `
      position:fixed;inset:0;z-index:99995;pointer-events:none;
      opacity:0;transition:opacity 0.5s;
    `;
    document.body.appendChild(canvas);
    const ctx   = canvas.getContext("2d");
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
    const cols   = Math.floor(canvas.width / 16);
    const drops  = Array(cols).fill(1);
    const chars  = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*<>/\\|";
    requestAnimationFrame(() => canvas.style.opacity = "1");

    const iv = setInterval(() => {
      ctx.fillStyle = "rgba(0,0,0,0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#0f0";
      ctx.font = "14px monospace";
      drops.forEach((y, i) => {
        ctx.fillText(chars[Math.floor(Math.random() * chars.length)], i * 16, y * 16);
        if (y * 16 > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      });
    }, 50);

    setTimeout(() => {
      clearInterval(iv);
      canvas.style.opacity = "0";
      setTimeout(() => canvas.remove(), 600);
    }, 4000);
  }
})();


/* ========================= 彩蛋 3: 故障美学 (Glitch) ========================= */
/* 触发方式：键盘输入 glitch */
(function () {
  let buf = "";
  const TARGET = "glitch";
  document.addEventListener("keydown", e => {
    if (e.key.length !== 1) return; // 跳过方向键、功能键等
    if (e.ctrlKey || e.altKey || e.metaKey) return;
    buf += e.key.toLowerCase();
    if (buf.length > TARGET.length + 4) buf = buf.slice(-(TARGET.length + 4));
    if (buf.endsWith(TARGET)) {
      buf = "";
      window.unlockAchievement("hack_mode");
      triggerGlitch();
    }
  });

  function triggerGlitch() {
    const root = document.documentElement;
    const animId = setInterval(() => {
      const x = (Math.random() - 0.5) * 8;
      const y = (Math.random() - 0.5) * 4;
      root.style.filter = `hue-rotate(${Math.random()*360}deg) contrast(${1.2+Math.random()*0.5})`;
      root.style.transform = `translate(${x}px,${y}px)`;
    }, 50);
    setTimeout(() => {
      clearInterval(animId);
      root.style.filter = "";
      root.style.transform = "";
    }, 1500);
  }
})();


/* ========================= 彩蛋 4–6: 数字 token ========================= */
/*
  触发方式：键盘连续输入对应数字序列即可
  ① 114514  ② 666666  ③ 1024
  注意：使用 keypress（只响应可打印字符）保持与原版行为一致，
  避免 keydown 误监听方向键/功能键导致缓冲区意外清空。
*/
(function () {
  let buf = "";
  const MAX = 6;

  const TOKENS = [
    {
      seq: "114514", id: "token_114514",
      effect() {
        showTokenBanner("114514", "#ff6b35",
          "臭名昭著",
          "这个数字承载了互联网的集体记忆",
          `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M12 2C8.13 2 5 5.13 5 9c0 2.38 1.19 4.47 3 5.74V17a2 2 0 002 2h4a2 2 0 002-2v-2.26C17.81 13.47 19 11.38 19 9c0-3.87-3.13-7-7-7z"/></svg>`
        );
      }
    },
    {
      seq: "666666", id: "token_666666",
      effect() {
        // 短暂暗色脉冲 + 横幅
        const flash = document.createElement("div");
        flash.style.cssText = `
          position:fixed;inset:0;z-index:99994;pointer-events:none;
          background:radial-gradient(ellipse at center,rgba(180,0,60,0.35),transparent 70%);
          opacity:0;transition:opacity 0.3s;
        `;
        document.body.appendChild(flash);
        requestAnimationFrame(() => requestAnimationFrame(() => flash.style.opacity = "1"));
        setTimeout(() => { flash.style.opacity = "0"; setTimeout(() => flash.remove(), 400); }, 900);

        showTokenBanner("666666", "#c00060",
          "暗黑使徒",
          "六六六，传说中的黑暗之力已被你召唤",
          `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M12 2c0 0-5 5-5 10a5 5 0 0010 0c0-3-2-5-2-5s-1 2-3 2c0-3 0-7 0-7z"/></svg>`
        );
      }
    },
    {
      seq: "1024", id: "token_1024",
      effect() {
        // 短暂二进制雨效果
        triggerBinaryRain();
        showTokenBanner("1024", "#5ea8ff",
          "程序员节",
          "2^10 = 1024，以此致敬每一位码农",
          `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="2" y="6" width="20" height="12" rx="2"/><line x1="6" y1="10" x2="6" y2="10"/><line x1="10" y1="10" x2="10" y2="10"/><line x1="14" y1="10" x2="14" y2="10"/><line x1="18" y1="10" x2="18" y2="10"/><line x1="6" y1="14" x2="18" y2="14"/></svg>`
        );
      }
    },
  ];

  // keypress 只触发于可打印字符，天然跳过方向键、功能键，与原版行为完全一致
  document.addEventListener("keypress", e => {
    const ch = e.key;
    if (!/^[0-9]$/.test(ch)) {
      // 非数字可打印字符：清空缓冲（与原版一致）
      buf = "";
      return;
    }
    buf += ch;
    if (buf.length > MAX) buf = buf.slice(-MAX);

    for (const token of TOKENS) {
      if (buf.endsWith(token.seq)) {
        buf = "";
        window.unlockAchievement(token.id);
        token.effect();
        break;
      }
    }
  });

  // ── 通用横幅 ──
  function showTokenBanner(code, color, title, desc, iconSvg) {
    const existing = document.getElementById("token-banner");
    if (existing) existing.remove();

    const el = document.createElement("div");
    el.id = "token-banner";
    el.style.cssText = `
      position:fixed;top:50%;left:50%;
      transform:translate(-50%,-50%) scale(0.8);
      z-index:99998;
      background:rgba(8,8,16,0.97);
      border:1px solid ${color}55;
      border-radius:18px;
      padding:28px 40px;
      text-align:center;
      font-family:-apple-system,BlinkMacSystemFont,'PingFang SC',sans-serif;
      box-shadow:0 0 0 1px ${color}22, 0 20px 60px rgba(0,0,0,0.6), 0 0 60px ${color}22;
      opacity:0;
      transition:transform 0.42s cubic-bezier(.34,1.56,.64,1),opacity 0.3s;
      min-width:280px;
    `;
    el.innerHTML = `
      <div style="width:52px;height:52px;margin:0 auto 14px;color:${color};
        filter:drop-shadow(0 0 10px ${color});
        border-radius:14px;padding:10px;
        background:${color}18;border:1px solid ${color}33;">
        ${iconSvg}
      </div>
      <div style="font-size:22px;font-weight:900;color:${color};letter-spacing:0.06em;
        margin-bottom:6px;text-shadow:0 0 20px ${color}88;">${code}</div>
      <div style="font-size:15px;font-weight:700;color:#eeeef8;margin-bottom:6px;">${title}</div>
      <div style="font-size:12px;color:rgba(255,255,255,0.45);line-height:1.6;max-width:240px;">${desc}</div>
    `;
    document.body.appendChild(el);
    requestAnimationFrame(() => requestAnimationFrame(() => {
      el.style.opacity = "1";
      el.style.transform = "translate(-50%,-50%) scale(1)";
    }));
    el.addEventListener("click", () => {
      el.style.opacity = "0";
      el.style.transform = "translate(-50%,-50%) scale(0.85)";
      setTimeout(() => el.remove(), 350);
    });
    setTimeout(() => {
      if (document.getElementById("token-banner") === el) {
        el.style.opacity = "0";
        el.style.transform = "translate(-50%,-50%) scale(0.85)";
        setTimeout(() => el.remove(), 350);
      }
    }, 3500);
  }

  // ── 1024 特效：快速二进制雨 ──
  function triggerBinaryRain() {
    const canvas = document.createElement("canvas");
    canvas.style.cssText = "position:fixed;inset:0;z-index:99993;pointer-events:none;opacity:0;transition:opacity 0.4s;";
    document.body.appendChild(canvas);
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
    const ctx   = canvas.getContext("2d");
    const cols  = Math.floor(canvas.width / 18);
    const drops = Array.from({length: cols}, () => Math.floor(Math.random() * canvas.height / 18));
    requestAnimationFrame(() => canvas.style.opacity = "1");

    const iv = setInterval(() => {
      ctx.fillStyle = "rgba(0,6,20,0.12)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#5ea8ff";
      ctx.font = "bold 14px monospace";
      drops.forEach((y, i) => {
        ctx.globalAlpha = 0.7 + Math.random() * 0.3;
        ctx.fillText(Math.random() > 0.5 ? "1" : "0", i * 18, y * 18);
        if (y * 18 > canvas.height && Math.random() > 0.97) drops[i] = 0;
        drops[i]++;
      });
      ctx.globalAlpha = 1;
    }, 50);

    setTimeout(() => {
      clearInterval(iv);
      canvas.style.opacity = "0";
      setTimeout(() => canvas.remove(), 500);
    }, 2000);
  }
})();


/* ========================= 彩蛋 7: Konami Code ========================= */
(function () {
  const KONAMI = ["ArrowUp","ArrowUp","ArrowDown","ArrowDown","ArrowLeft","ArrowRight","ArrowLeft","ArrowRight","b","a"];
  let seq = [];
  document.addEventListener("keydown", e => {
    seq.push(e.key);
    if (seq.length > KONAMI.length) seq.shift();
    if (seq.join(",") === KONAMI.join(",")) {
      seq = [];
      window.unlockAchievement("konami_code");
      triggerKonami();
    }
  });

  function triggerKonami() {
    launchConfetti();
    const banner = document.createElement("div");
    banner.style.cssText = `
      position:fixed;top:50%;left:50%;
      transform:translate(-50%,-50%) scale(0);
      z-index:99998;
      background:linear-gradient(135deg,#667eea,#764ba2,#f093fb);
      color:#fff;padding:32px 52px;border-radius:20px;text-align:center;
      font-family:-apple-system,BlinkMacSystemFont,'PingFang SC',sans-serif;
      box-shadow:0 24px 80px rgba(0,0,0,0.5);
      transition:transform 0.4s cubic-bezier(.34,1.56,.64,1);
    `;
    banner.innerHTML = `
      <div style="width:52px;height:52px;margin:0 auto 12px;color:#fff;opacity:0.9">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6">
          <rect x="2" y="6" width="20" height="14" rx="2"/>
          <path d="M6 14h4m-2-2v4"/><circle cx="15" cy="13" r="1" fill="currentColor"/>
          <circle cx="18" cy="11" r="1" fill="currentColor"/>
        </svg>
      </div>
      <h2 style="margin:0 0 6px;font-size:20px;font-weight:800">Konami Code Activated!</h2>
      <p style="opacity:.75;font-size:13px;margin:0">↑↑↓↓←→←→BA · 传说中的秘籍</p>
    `;
    document.body.appendChild(banner);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => banner.style.transform = "translate(-50%,-50%) scale(1)");
    });
    setTimeout(() => {
      banner.style.transform = "translate(-50%,-50%) scale(0)";
      setTimeout(() => banner.remove(), 400);
    }, 3000);
  }

  function launchConfetti() {
    const colors = ["#f9ca24","#f0932b","#6ab04c","#e55039","#5470ff","#9b59b6","#1abc9c"];
    for (let i = 0; i < 100; i++) {
      const dot = document.createElement("div");
      const color = colors[Math.floor(Math.random() * colors.length)];
      const size  = 6 + Math.random() * 8;
      dot.style.cssText = `
        position:fixed;z-index:99997;border-radius:2px;pointer-events:none;
        width:${size}px;height:${size}px;background:${color};
        left:${Math.random()*100}vw;top:-20px;
        animation:confettiFall ${1.5+Math.random()*2}s ease-in forwards;
        transform:rotate(${Math.random()*360}deg);
      `;
      document.body.appendChild(dot);
      setTimeout(() => dot.remove(), 3500);
    }
    if (!document.getElementById("confetti-style")) {
      const s = document.createElement("style");
      s.id = "confetti-style";
      s.textContent = `@keyframes confettiFall{to{transform:translateY(105vh) rotate(720deg);opacity:0}}`;
      document.head.appendChild(s);
    }
  }
})();


/* ========================= 彩蛋 8: 输入 "shuo" ========================= */
(function () {
  let buf = "";
  const TARGET = "shuo";
  document.addEventListener("keydown", e => {
    if (e.key.length !== 1) return;
    if (e.ctrlKey || e.altKey || e.metaKey) return;
    buf += e.key.toLowerCase();
    if (buf.length > TARGET.length) buf = buf.slice(-TARGET.length);
    if (buf === TARGET) {
      buf = "";
      window.unlockAchievement("secret_word");
      triggerLoveLetter();
    }
  });

  function triggerLoveLetter() {
    if (document.getElementById("love-letter-overlay")) return;
    const overlay = document.createElement("div");
    overlay.id = "love-letter-overlay";
    overlay.style.cssText = `
      position:fixed;inset:0;z-index:99999;
      display:flex;flex-direction:column;justify-content:center;align-items:center;
      text-align:center;cursor:pointer;
      font-family:-apple-system,BlinkMacSystemFont,'PingFang SC',sans-serif;
      background:radial-gradient(ellipse at center,#1a1a2e,#16213e,#0f3460);
      opacity:0;transition:opacity 0.4s;
    `;
    overlay.innerHTML = `
      <div style="width:60px;height:60px;color:#ff6b9d;animation:heartBeat 1s infinite alternate;margin-bottom:16px">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" fill="#ff6b9d"/>
        </svg>
      </div>
      <h2 style="color:#ff6b9d;font-size:22px;margin:0 0 10px;font-weight:800">你找到了情书</h2>
      <p style="color:rgba(255,255,255,0.6);font-size:14px;max-width:280px;line-height:1.9;margin:0">
        感谢每一位探索 shuoweb.com 的你<br>好奇心是最美好的品质
      </p>
      <small style="color:rgba(255,255,255,0.2);font-size:11px;margin-top:28px">点击关闭</small>
      <style>@keyframes heartBeat{from{transform:scale(1)}to{transform:scale(1.18)}}</style>
    `;
    document.body.appendChild(overlay);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => overlay.style.opacity = "1");
    });
    overlay.onclick = () => {
      overlay.style.opacity = "0";
      setTimeout(() => overlay.remove(), 400);
    };
  }
})();


/* ========================= 彩蛋 9: 连击标题 7 次 ========================= */
(function () {
  let clickCount = 0, timer = null;

  function bindTitleClicks() {
    document.querySelectorAll(".section-title").forEach(title => {
      title.style.setProperty("pointer-events", "auto", "important");
      title.style.cursor = "pointer";
      title.querySelectorAll("*").forEach(child => {
        child.style.setProperty("pointer-events", "none", "important");
      });

      const handler = () => {
        clickCount++;
        clearTimeout(timer);
        timer = setTimeout(() => { clickCount = 0; }, 2000);
        if (clickCount >= 7) {
          clickCount = 0;
          clearTimeout(timer);
          window.unlockAchievement("click_maniac");
          triggerClickEgg(title);
        }
      };
      title.addEventListener("click",      handler, true);
      title.addEventListener("touchstart", handler, { capture: true, passive: true });
    });
  }

  document.readyState === "loading"
    ? document.addEventListener("DOMContentLoaded", bindTitleClicks)
    : bindTitleClicks();

  function triggerClickEgg(el) {
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const colors = ["#FFD700","#FF6347","#00CED1","#DA70D6","#7FFF00"];

    for (let i = 0; i < 30; i++) {
      const p     = document.createElement("div");
      const angle = (i / 30) * Math.PI * 2;
      const dist  = 60 + Math.random() * 80;
      const color = colors[Math.floor(Math.random() * colors.length)];
      p.style.cssText = `
        position:fixed;left:${cx}px;top:${cy}px;
        width:8px;height:8px;border-radius:50%;background:${color};
        z-index:99996;pointer-events:none;
        transition:all 0.6s ease-out;transform:translate(-50%,-50%);
      `;
      document.body.appendChild(p);
      requestAnimationFrame(() => {
        p.style.transform = `translate(calc(-50% + ${Math.cos(angle)*dist}px),calc(-50% + ${Math.sin(angle)*dist}px)) scale(0)`;
        p.style.opacity = "0";
      });
      setTimeout(() => p.remove(), 700);
    }

    const rainbowColors = ["#ff6b9d","#ffcc00","#00e5ff","#69ff47","#ff6b9d"];
    el.style.transition = "color 0.2s";
    rainbowColors.forEach((c, i) => setTimeout(() => el.style.color = c, i * 100));
    setTimeout(() => el.style.color = "", 600);
  }
})();


/* ========================= 彩蛋 10: 摸鱼 60 秒 ========================= */
(function () {
  let idleTimer = null, triggered = false;

  function resetTimer() {
    clearTimeout(idleTimer);
    idleTimer = setTimeout(triggerIdle, 60000);
  }

  function triggerIdle() {
    if (triggered) return;
    triggered = true;
    window.unlockAchievement("idle_watcher");

    const banner = document.createElement("div");
    banner.style.cssText = `
      position:fixed;top:20px;left:50%;transform:translateX(-50%) translateY(-20px);
      z-index:99996;background:rgba(8,8,16,0.9);color:#e8e8f0;
      padding:12px 22px;border-radius:30px;font-size:13px;
      font-family:-apple-system,BlinkMacSystemFont,'PingFang SC',sans-serif;
      border:1px solid rgba(255,255,255,0.12);backdrop-filter:blur(12px);
      opacity:0;transition:transform 0.4s ease,opacity 0.4s ease;
      display:flex;align-items:center;gap:8px;
    `;
    banner.innerHTML = `
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#7c6af7" stroke-width="2">
        <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>
      </svg>
      你已经 60 秒没有动了，在摸鱼吗？
    `;
    document.body.appendChild(banner);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        banner.style.transform = "translateX(-50%) translateY(0)";
        banner.style.opacity = "1";
      });
    });
    setTimeout(() => {
      banner.style.transform = "translateX(-50%) translateY(-20px)";
      banner.style.opacity = "0";
      setTimeout(() => banner.remove(), 400);
    }, 4000);

    setTimeout(() => { triggered = false; }, 65000);
  }

  ["mousemove","keydown","scroll","click","touchstart"].forEach(evt => {
    document.addEventListener(evt, resetTimer, { passive: true });
  });
  resetTimer();
})();


/* ========================= 彩蛋 11: DevTools 检测 ========================= */
(function () {
  let alerted = false;
  const threshold = 160;

  setInterval(() => {
    if (alerted) return;
    const widthDiff  = window.outerWidth  - window.innerWidth  > threshold;
    const heightDiff = window.outerHeight - window.innerHeight > threshold;
    if (widthDiff || heightDiff) {
      alerted = true;
      window.unlockAchievement("devtools_open");
      console.log(
        "%c 欢迎，开发者！\n%c你正在检查 shuoweb.com 的源码，很好奇嘛？",
        "font-size:18px;color:#7c6af7;font-weight:bold;",
        "font-size:13px;color:#8b949e;"
      );
    }
  }, 1000);
})();


/* ===================================================================================
   移动端隐藏终端 —— 让手机用户也能触发所有键盘彩蛋
   触发方式：长按页面顶部 Logo / 标题区域 1.5 秒（比成就面板的 0.6s 更长，避免误触）
   面板内支持输入：sudo / glitch / shuo / 114514 / 666666 / 1024 / 上上下下 / konami
=================================================================================== */
(function () {

  /* ── 暗号映射表 ── */
  const CODES = [
    { input: "sudo",                   action: () => fireMobileCode("sudo")     },
    { input: "glitch",                 action: () => fireMobileCode("glitch")   },
    { input: "shuo",                   action: () => fireMobileCode("shuo")     },
    { input: "114514",                 action: () => fireMobileCode("114514")   },
    { input: "666666",                 action: () => fireMobileCode("666666")   },
    { input: "1024",                   action: () => fireMobileCode("1024")     },
    { input: "上上下下",               action: () => fireMobileCode("matrix")   },
    { input: "konami",                 action: () => fireMobileCode("konami")   },
  ];

  /* ── 分发到各彩蛋逻辑 ── */
  function fireMobileCode(code) {
    switch (code) {
      case "sudo":
        window.unlockAchievement("sudo_mode");
        // 复用已有特效：模拟 hash 变化触发
        window.location.hash = "#sudo";
        break;
      case "glitch":
        window.unlockAchievement("hack_mode");
        triggerGlitchMobile();
        break;
      case "shuo":
        window.unlockAchievement("secret_word");
        triggerLoveLetterMobile();
        break;
      case "114514":
        window.unlockAchievement("token_114514");
        showMobileTokenBanner("114514", "#ff6b35", "臭名昭著", "这个数字承载了互联网的集体记忆");
        break;
      case "666666":
        window.unlockAchievement("token_666666");
        showMobileTokenBanner("666666", "#c00060", "暗黑使徒", "六六六，传说中的黑暗之力已被你召唤");
        break;
      case "1024":
        window.unlockAchievement("token_1024");
        showMobileTokenBanner("1024", "#5ea8ff", "程序员节", "2^10 = 1024，致敬每一位码农");
        break;
      case "matrix":
        window.unlockAchievement("matrix_mode");
        triggerMatrixMobile();
        break;
      case "konami":
        window.unlockAchievement("konami_code");
        triggerKonamiMobile();
        break;
    }
  }

  /* ── 效果函数 ── */

  function triggerGlitchMobile() {
    const root = document.documentElement;
    let count = 0;
    const iv = setInterval(() => {
      const x = (Math.random() - 0.5) * 8;
      const y = (Math.random() - 0.5) * 4;
      root.style.filter    = `hue-rotate(${Math.random()*360}deg) contrast(${1.2+Math.random()*0.5})`;
      root.style.transform = `translate(${x}px,${y}px)`;
      if (++count > 30) {
        clearInterval(iv);
        root.style.filter    = "";
        root.style.transform = "";
      }
    }, 50);
  }

  function triggerLoveLetterMobile() {
    if (document.getElementById("love-letter-overlay")) return;
    const overlay = document.createElement("div");
    overlay.id = "love-letter-overlay";
    overlay.style.cssText = `
      position:fixed;inset:0;z-index:99999;
      display:flex;flex-direction:column;justify-content:center;align-items:center;
      text-align:center;cursor:pointer;
      font-family:-apple-system,BlinkMacSystemFont,'PingFang SC',sans-serif;
      background:radial-gradient(ellipse at center,#1a1a2e,#16213e,#0f3460);
      opacity:0;transition:opacity 0.4s;
    `;
    overlay.innerHTML = `
      <div style="width:60px;height:60px;color:#ff6b9d;animation:heartBeat 1s infinite alternate;margin-bottom:16px">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" fill="#ff6b9d"/>
        </svg>
      </div>
      <h2 style="color:#ff6b9d;font-size:22px;margin:0 0 10px;font-weight:800">你找到了情书</h2>
      <p style="color:rgba(255,255,255,0.6);font-size:14px;max-width:280px;line-height:1.9;margin:0">
        感谢每一位探索 shuoweb.com 的你<br>好奇心是最美好的品质
      </p>
      <small style="color:rgba(255,255,255,0.2);font-size:11px;margin-top:28px">点击关闭</small>
      <style>@keyframes heartBeat{from{transform:scale(1)}to{transform:scale(1.18)}}</style>
    `;
    document.body.appendChild(overlay);
    requestAnimationFrame(() => requestAnimationFrame(() => overlay.style.opacity = "1"));
    overlay.onclick = () => { overlay.style.opacity = "0"; setTimeout(() => overlay.remove(), 400); };
  }

  function triggerMatrixMobile() {
    const canvas = document.createElement("canvas");
    canvas.style.cssText = "position:fixed;inset:0;z-index:99995;pointer-events:none;opacity:0;transition:opacity 0.5s;";
    document.body.appendChild(canvas);
    const ctx  = canvas.getContext("2d");
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
    const cols  = Math.floor(canvas.width / 16);
    const drops = Array(cols).fill(1);
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*";
    requestAnimationFrame(() => canvas.style.opacity = "1");
    const iv = setInterval(() => {
      ctx.fillStyle = "rgba(0,0,0,0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#0f0";
      ctx.font = "14px monospace";
      drops.forEach((y, i) => {
        ctx.fillText(chars[Math.floor(Math.random() * chars.length)], i * 16, y * 16);
        if (y * 16 > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      });
    }, 50);
    setTimeout(() => {
      clearInterval(iv);
      canvas.style.opacity = "0";
      setTimeout(() => canvas.remove(), 600);
    }, 4000);
  }

  function triggerKonamiMobile() {
    const colors = ["#f9ca24","#f0932b","#6ab04c","#e55039","#5470ff","#9b59b6"];
    for (let i = 0; i < 80; i++) {
      const dot = document.createElement("div");
      const color = colors[Math.floor(Math.random() * colors.length)];
      const size  = 6 + Math.random() * 8;
      dot.style.cssText = `
        position:fixed;z-index:99997;border-radius:2px;pointer-events:none;
        width:${size}px;height:${size}px;background:${color};
        left:${Math.random()*100}vw;top:-20px;
        animation:confettiFall ${1.5+Math.random()*2}s ease-in forwards;
        transform:rotate(${Math.random()*360}deg);
      `;
      document.body.appendChild(dot);
      setTimeout(() => dot.remove(), 3500);
    }
    if (!document.getElementById("confetti-style")) {
      const s = document.createElement("style");
      s.id = "confetti-style";
      s.textContent = `@keyframes confettiFall{to{transform:translateY(105vh) rotate(720deg);opacity:0}}`;
      document.head.appendChild(s);
    }
  }

  function showMobileTokenBanner(code, color, title, desc) {
    const el = document.createElement("div");
    el.style.cssText = `
      position:fixed;top:50%;left:50%;
      transform:translate(-50%,-50%) scale(0.85);
      z-index:99998;
      background:rgba(8,8,16,0.97);
      border:1px solid ${color}55;
      border-radius:18px;padding:28px 36px;text-align:center;
      font-family:-apple-system,BlinkMacSystemFont,'PingFang SC',sans-serif;
      box-shadow:0 0 60px ${color}22,0 20px 60px rgba(0,0,0,0.6);
      opacity:0;transition:transform 0.42s cubic-bezier(.34,1.56,.64,1),opacity 0.3s;
      min-width:260px;cursor:pointer;
    `;
    el.innerHTML = `
      <div style="font-size:26px;font-weight:900;color:${color};letter-spacing:0.06em;
        margin-bottom:8px;text-shadow:0 0 20px ${color}88;">${code}</div>
      <div style="font-size:15px;font-weight:700;color:#eeeef8;margin-bottom:6px;">${title}</div>
      <div style="font-size:12px;color:rgba(255,255,255,0.45);line-height:1.6;">${desc}</div>
    `;
    document.body.appendChild(el);
    requestAnimationFrame(() => requestAnimationFrame(() => {
      el.style.opacity = "1";
      el.style.transform = "translate(-50%,-50%) scale(1)";
    }));
    el.onclick = () => { el.style.opacity = "0"; setTimeout(() => el.remove(), 300); };
    setTimeout(() => { el.style.opacity = "0"; setTimeout(() => el.remove(), 300); }, 3000);
  }

  /* ── 移动端终端面板 UI ── */
  function openMobileTerminal() {
    if (document.getElementById("mobile-terminal")) return;

    // 注入终端样式（只注入一次）
    if (!document.getElementById("mobile-terminal-style")) {
      const s = document.createElement("style");
      s.id = "mobile-terminal-style";
      s.textContent = `
        /* 遮罩层 */
        #mobile-terminal-mask {
          position: fixed; inset: 0;
          z-index: 99990;
          background: rgba(0,0,0,0.55);
          backdrop-filter: blur(4px);
          -webkit-backdrop-filter: blur(4px);
          opacity: 0;
          transition: opacity 0.28s;
        }
        #mobile-terminal-mask.mt-show { opacity: 1; }

        /* 终端主体 */
        #mobile-terminal {
          position: fixed;
          bottom: 0; left: 0; right: 0;
          z-index: 99991;
          background: rgba(6, 10, 14, 0.98);
          border-radius: 20px 20px 0 0;
          border-top: 1px solid rgba(0,255,136,0.2);
          box-shadow: 0 -8px 40px rgba(0,0,0,0.6), 0 0 0 1px rgba(0,255,136,0.08);
          font-family: 'Courier New', Courier, monospace;
          transform: translateY(100%);
          transition: transform 0.38s cubic-bezier(.34,1.3,.64,1);
          overflow: hidden;
        }
        #mobile-terminal.mt-show { transform: translateY(0); }

        /* 拖动把手 */
        .mt-handle {
          width: 36px; height: 4px;
          background: rgba(255,255,255,0.18);
          border-radius: 4px;
          margin: 10px auto 0;
        }

        /* 标题栏 */
        .mt-titlebar {
          display: flex; align-items: center; gap: 7px;
          padding: 10px 18px 8px;
          border-bottom: 1px solid rgba(0,255,136,0.1);
        }
        .mt-dot { width: 11px; height: 11px; border-radius: 50%; }
        .mt-title {
          flex: 1; text-align: center;
          font-size: 12px; color: rgba(0,255,136,0.4);
          letter-spacing: 0.1em;
        }
        .mt-close-btn {
          background: none; border: none; cursor: pointer;
          color: rgba(255,255,255,0.35); padding: 2px 6px;
          font-size: 16px; line-height: 1;
          border-radius: 6px;
          transition: color 0.15s;
        }
        .mt-close-btn:hover { color: #fff; }

        /* 输出区 */
        .mt-output {
          padding: 12px 18px 8px;
          min-height: 80px;
          max-height: 180px;
          overflow-y: auto;
          font-size: 13px;
          line-height: 1.8;
          color: #00ff88;
          scrollbar-width: none;
        }
        .mt-output::-webkit-scrollbar { display: none; }
        .mt-output-line { opacity: 0; animation: mtLineIn 0.2s ease forwards; }
        @keyframes mtLineIn { from { opacity:0; transform:translateX(-6px); } to { opacity:1; transform:none; } }

        /* 输入区 */
        .mt-input-row {
          display: flex; align-items: center; gap: 10px;
          padding: 10px 14px 20px;
          border-top: 1px solid rgba(0,255,136,0.15);
          background: rgba(0,255,136,0.04);
        }
        .mt-prompt {
          color: #00ff88; font-size: 15px; white-space: nowrap;
          user-select: none; font-weight: bold;
          text-shadow: 0 0 8px rgba(0,255,136,0.6);
        }
        .mt-input-wrap {
          flex: 1;
          background: rgba(0,0,0,0.45);
          border: 1.5px solid rgba(0,255,136,0.35);
          border-radius: 10px;
          padding: 9px 12px;
          display: flex; align-items: center;
          box-shadow: 0 0 0 0 rgba(0,255,136,0);
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .mt-input-wrap:focus-within {
          border-color: rgba(0,255,136,0.7);
          box-shadow: 0 0 0 3px rgba(0,255,136,0.12), 0 0 14px rgba(0,255,136,0.15);
        }
        .mt-input {
          flex: 1;
          background: none;
          border: none;
          outline: none;
          color: #d0ffd8;
          font-family: 'Courier New', Courier, monospace;
          font-size: 15px;
          caret-color: #00ff88;
          letter-spacing: 0.04em;
          min-width: 0;
        }
        .mt-input::placeholder { color: rgba(0,255,136,0.3); font-style: italic; }
        .mt-send-btn {
          background: rgba(0,255,136,0.18);
          border: 1.5px solid rgba(0,255,136,0.45);
          border-radius: 10px;
          color: #00ff88;
          font-size: 13px;
          font-weight: 700;
          padding: 9px 16px;
          cursor: pointer;
          font-family: inherit;
          white-space: nowrap;
          transition: background 0.15s, box-shadow 0.15s, border-color 0.15s;
          letter-spacing: 0.06em;
          text-shadow: 0 0 8px rgba(0,255,136,0.5);
          box-shadow: 0 0 10px rgba(0,255,136,0.1);
          flex-shrink: 0;
        }
        .mt-send-btn:active {
          background: rgba(0,255,136,0.32);
          border-color: rgba(0,255,136,0.7);
          box-shadow: 0 0 18px rgba(0,255,136,0.35);
        }

        /* 提示标签 */
        .mt-hints {
          display: flex; flex-wrap: wrap; gap: 7px;
          padding: 0 18px 14px;
        }
        .mt-hint-tag {
          background: rgba(0,255,136,0.07);
          border: 1px solid rgba(0,255,136,0.15);
          border-radius: 8px;
          color: rgba(0,255,136,0.55);
          font-size: 11px;
          padding: 4px 10px;
          cursor: pointer;
          font-family: 'Courier New', monospace;
          transition: background 0.15s, color 0.15s;
          letter-spacing: 0.04em;
        }
        .mt-hint-tag:active {
          background: rgba(0,255,136,0.18);
          color: #00ff88;
        }
      `;
      document.head.appendChild(s);
    }

    // 遮罩
    const mask = document.createElement("div");
    mask.id = "mobile-terminal-mask";
    document.body.appendChild(mask);

    // 面板
    const panel = document.createElement("div");
    panel.id = "mobile-terminal";
    panel.innerHTML = `
      <div class="mt-handle"></div>
      <div class="mt-titlebar">
        <div class="mt-dot" style="background:#ff5f56"></div>
        <div class="mt-dot" style="background:#ffbd2e"></div>
        <div class="mt-dot" style="background:#27c93f"></div>
        <div class="mt-title">shuoweb — secret terminal</div>
        <button class="mt-close-btn" id="mt-close">✕</button>
      </div>
      <div class="mt-output" id="mt-output">
        <div class="mt-output-line" style="color:rgba(0,255,136,0.5);">上上下下左右左右BA...</div>
        <div class="mt-output-line" style="color:rgba(0,255,136,0.4);animation-delay:0.1s">输入暗号解锁隐藏彩蛋</div>
      </div>
      <div class="mt-hints" id="mt-hints">
        <span class="mt-hint-tag" data-code="sudo">sudo</span>
        <span class="mt-hint-tag" data-code="glitch">glitch</span>
        <span class="mt-hint-tag" data-code="shuo">shuo</span>
        <span class="mt-hint-tag" data-code="114514">114514</span>
        <span class="mt-hint-tag" data-code="666666">666666</span>
        <span class="mt-hint-tag" data-code="1024">1024</span>
        <span class="mt-hint-tag" data-code="matrix">上上下下</span>
        <span class="mt-hint-tag" data-code="konami">konami</span>
      </div>
      <div class="mt-input-row">
        <span class="mt-prompt">$&nbsp;</span>
        <div class="mt-input-wrap">
          <input class="mt-input" id="mt-input" type="text"
                 placeholder="输入暗号..." autocomplete="off"
                 autocorrect="off" autocapitalize="off" spellcheck="false" />
        </div>
        <button class="mt-send-btn" id="mt-send">执行</button>
      </div>
    `;
    document.body.appendChild(panel);

    // 动画入场
    requestAnimationFrame(() => requestAnimationFrame(() => {
      mask.classList.add("mt-show");
      panel.classList.add("mt-show");
    }));

    // 聚焦输入框，唤起软键盘
    setTimeout(() => {
      const input = document.getElementById("mt-input");
      if (input) input.focus();
    }, 380);

    function closeTerminal() {
      mask.classList.remove("mt-show");
      panel.classList.remove("mt-show");
      setTimeout(() => { mask.remove(); panel.remove(); }, 380);
    }

    function printLine(text, color = "#00ff88", delay = 0) {
      const out = document.getElementById("mt-output");
      if (!out) return;
      setTimeout(() => {
        const line = document.createElement("div");
        line.className = "mt-output-line";
        line.style.color = color;
        line.style.animationDelay = "0s";
        line.textContent = text;
        out.appendChild(line);
        out.scrollTop = out.scrollHeight;
      }, delay);
    }

    function submitCode(raw) {
      const code = raw.trim().toLowerCase();
      if (!code) return;

      const input = document.getElementById("mt-input");
      if (input) input.value = "";

      printLine(`$ ${raw}`, "#e8ffe8");

      const match = CODES.find(c =>
        c.input === code || c.input.toLowerCase() === code
      );

      if (match) {
        printLine("✓ 暗号正确 — 正在执行...", "#00ff88", 100);
        setTimeout(() => {
          closeTerminal();
          setTimeout(() => match.action(), 200);
        }, 800);
      } else {
        printLine(`bash: ${raw}: command not found`, "#ff5f5f", 100);
        printLine("提示：点击上方标签填入已知暗号", "rgba(0,255,136,0.4)", 200);
      }
    }

    // 点击标签自动填入并提交
    document.getElementById("mt-hints").addEventListener("click", e => {
      const tag = e.target.closest(".mt-hint-tag");
      if (!tag) return;
      const code = tag.dataset.code;
      // 映射显示文字为实际暗号
      const displayMap = { matrix: "上上下下", konami: "konami" };
      const display = displayMap[code] || code;
      const input = document.getElementById("mt-input");
      if (input) {
        input.value = display;
        input.focus();
      }
      setTimeout(() => submitCode(code), 150);
    });

    // 发送按钮
    document.getElementById("mt-send").addEventListener("click", () => {
      const input = document.getElementById("mt-input");
      if (input) submitCode(input.value);
    });

    // 回车提交
    document.getElementById("mt-input").addEventListener("keydown", e => {
      if (e.key === "Enter") {
        e.preventDefault();
        submitCode(e.target.value);
      }
    });

    // 关闭按钮
    document.getElementById("mt-close").addEventListener("click", closeTerminal);

    // 点击遮罩关闭——必须判断事件目标就是遮罩本身，
    // 防止面板内的点击冒泡上来误触关闭
    mask.addEventListener("click", e => {
      if (e.target === mask) closeTerminal();
    });

    // 阻止面板内的所有点击冒泡到遮罩
    panel.addEventListener("click", e => e.stopPropagation());
  }

  /* ── 移动端触发方式：摇晃手机 ──
     完全不可见，不依赖任何页面元素，与成就面板长按彻底隔离。
     同时新增「摇晃手机」成就。
     桌面端保留 F2 快捷键（调试用）。                         */
  (function () {
    // 摇晃检测参数
    const SHAKE_THRESHOLD = 18;   // 加速度变化阈值（m/s²），避免误触
    const SHAKE_COOLDOWN  = 1500; // 两次触发间最短间隔 ms

    let lastX = null, lastY = null, lastZ = null;
    let lastShakeTime = 0;
    let listening = false;

    function onMotion(e) {
      const acc = e.accelerationIncludingGravity;
      if (!acc) return;

      const { x, y, z } = acc;
      if (lastX === null) { lastX = x; lastY = y; lastZ = z; return; }

      const delta = Math.abs(x - lastX) + Math.abs(y - lastY) + Math.abs(z - lastZ);
      lastX = x; lastY = y; lastZ = z;

      if (delta > SHAKE_THRESHOLD) {
        const now = Date.now();
        if (now - lastShakeTime < SHAKE_COOLDOWN) return;
        lastShakeTime = now;

        if (navigator.vibrate) navigator.vibrate([20, 10, 20]);
        window.unlockAchievement("shake_phone");
        openMobileTerminal();
      }
    }

    function startListening() {
      if (listening) return;
      listening = true;
      window.addEventListener("devicemotion", onMotion, { passive: true });
    }

    // iOS 13+ 需要用户授权才能读取 DeviceMotion
    if (typeof DeviceMotionEvent !== "undefined") {
      if (typeof DeviceMotionEvent.requestPermission === "function") {
        // iOS 13+：需要用户手势触发授权，监听首次 touchend
        function requestOnGesture() {
          DeviceMotionEvent.requestPermission()
            .then(state => { if (state === "granted") startListening(); })
            .catch(() => {});
          document.removeEventListener("touchend", requestOnGesture);
        }
        document.addEventListener("touchend", requestOnGesture, { once: true });
      } else {
        // Android / 旧 iOS：直接监听
        startListening();
      }
    }
  })();

  // 桌面端按 F2 打开（调试用）
  document.addEventListener("keydown", e => {
    if (e.key === "F2") { e.preventDefault(); openMobileTerminal(); }
  });

})();
