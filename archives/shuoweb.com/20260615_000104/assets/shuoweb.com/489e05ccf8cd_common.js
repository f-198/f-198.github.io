(function () {

  /* ========= 防重复加载 ========= */
  if (window.__SHUOWEB_UI__) return;
  window.__SHUOWEB_UI__ = true;


  /* ========= 等待 body存在 ========= */
  function ready(fn) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", fn);
    } else {
      fn();
    }
  }


  ready(init);


  function init() {

    /* ================= 样式 ================= */
    if (!document.getElementById("shuoweb-style")) {
      const style = document.createElement("style");
      style.id = "shuoweb-style";

      style.textContent = `
:root {
  --primary: #007AFF;
  --primary-light: #E3F2FD;
  --bg: #F8FAFC;
  --card-bg: rgba(255, 255, 255, 0.8);
  --text-main: #1E293B;
  --text-sub: #64748B;
  --shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.05);
  --radius: 16px;
  --transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
body.pink {
  --primary: #FF2D55;
  --primary-light: #FFF0F3;
  --bg: #FFF5F7;
}
* {
  box-sizing: border-box;
}

* {
    -webkit-tap-highlight-color: transparent;
}

button, a, [role="button"] {
    -webkit-user-select: none;
    user-select: none;
    outline: none;
}

@font-face {
    font-family: '666font';
    src: url('https://shuoweb.com/css/font.ttf');
}

body {
  margin: 0;
  font-family: '666font', sans-serif;
  background: var(--bg);
  color: var(--text-main);
  transition: var(--transition);
  line-height: 1.6;
}

/* ========= 顶部导航 ========= */
header {
  position: sticky;
  top: 0;
  z-index: 100;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 5%;
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(255,255,255,0.3);
}
.logo {
  font-size: 20px;
  font-weight: 800;
  letter-spacing: -0.5px;
  background: linear-gradient(135deg, var(--primary), #5856D6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.theme-btn {
  cursor: pointer;
  border: none;
  background: var(--primary);
  color: white;
  padding: 8px 18px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 500;
  box-shadow: 0 4px 15px rgba(0, 122, 255, 0.2);
  transition: var(--transition);
}
.theme-btn:hover {
  transform: scale(1.05);
  filter: brightness(1.1);
}

div:has(> button) {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 10px;
}

/* =============================== 全局通用 DIV 样式 =============================== */
/* 这里的策略是针对作为“直接子级”或“块级容器”的 div 进行增强 */
div {
    /* 继承主题定义的变量 */
    border-radius: var(--radius);
    transition: var(--transition);
    /* 默认不加背景，但如果是主要内容块，它会显得非常干净 */
}

/* 模拟卡片效果：自动识别具有实际内容的 div (可选，让布局更高级) */
div:not(:empty) {
    box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.1); /* 极其微弱的边框线 */
}

/* =============================== 全局通用 INPUT 样式 =============================== */
input {
    /* 基础尺寸与间距 */
    width: 100%; /* 可根据需要改 auto */
    max-width: 400px;
    padding: 12px 16px;
    margin: 8px 0;
    
    /* 核心视觉：磨砂玻璃感 */
    background: var(--card-bg);
    border: 1px solid rgba(255, 255, 255, 0.3);
    border-radius: var(--radius); /* 自动跟随全局圆角 */
    
    /* 文字样式 */
    color: var(--text-main);
    font-size: 14px;
    font-family: inherit;
    
    /* 交互与性能 */
    outline: none;
    transition: var(--transition);
    box-shadow: var(--shadow);
    -webkit-appearance: none; /* 移除移动端原生阴影 */
}

/* 占位符颜色调整 */
input::placeholder {
    color: var(--text-sub);
    opacity: 0.6;
}

/* 重点：获取焦点时的状态 */
input:focus {
    background: #ffffff; /* 聚焦时变白，增加对比度 */
    border-color: var(--primary); /* 边框变主题色 */
    box-shadow: 0 0 0 4px var(--primary-light); /* 呼吸灯外发光 */
    transform: translateY(-1px); /* 轻微上浮感 */
}

/* 针对粉色主题的自动适配 (如果需要特殊微调) */
body.pink input:focus {
    box-shadow: 0 0 0 4px rgba(255, 45, 85, 0.15);
}



/* =============================== 全局通用 BUTTON 样式 =============================== */
/* 彻底重写所有原生按钮，使其符合克莱因蓝/极客粉主题 */
button {
    /* 基础布局 */
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 10px 24px;
    margin: 5px;
    
    /* 视觉特征 */
    background: var(--primary);
    color: #FFFFFF !important;
    border: none;
    outline: none;
    border-radius: 12px;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    
    /* 动画与交互 */
    position: relative;
    overflow: hidden;
    transition: var(--transition);
    box-shadow: var(--shadow);
    
    /* 移动端优化 */
    -webkit-tap-highlight-color: transparent;
    user-select: none;
    white-space: nowrap;
}

/* 鼠标悬停：上浮 + 呼吸感 */
button:hover {
    transform: translateY(-3px) scale(1.02);
    filter: brightness(1.1);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
}

/* 点击反馈：物理压感回弹 */
button:active {
    transform: translateY(1px) scale(0.95);
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    transition: all 0.1s ease; /* 瞬间反馈 */
}

/* 扫光动效：利用伪元素实现 */
button::before {
    content: "";
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
        90deg,
        transparent,
        rgba(255, 255, 255, 0.3),
        transparent
    );
    transition: none;
}

button:hover::before {
    left: 100%;
    transition: all 0.6s ease;
}

/* 针对禁用状态的自动处理 */
button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none !important;
    background: var(--text-sub);
}



/* ========= 动画 ========= */
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
.section {
  animation: fadeInUp 0.6s ease-out forwards;
}

/* ========= Hero 区域 ========= */
.hero {
  padding: 60px 20px 40px;
  text-align: center;
}
.hero h1 {
  font-size: clamp(28px, 5vw, 42px);
  margin: 0 0 12px 0;
  font-weight: 800;
  color: var(--text-main);
}
.hero p {
  color: var(--text-sub);
  font-size: 16px;
  max-width: 600px;
  margin: 0 auto;
}

/* ========= 内容布局 ========= */
#content {
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 20px 60px;
}
.section {
  margin-bottom: 40px;
  animation: fadeInUp 0.6s ease-out forwards;
}
.section-title {
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 10px;
  padding-left: 5px;
}
.section-title svg {
  width: 22px;
  height: 22px;
  color: var(--primary);
}

/* ========= 卡片设计 ========= */
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 20px;
}
.card {
  background: var(--card-bg);
  border: 1px solid rgba(255,255,255,0.4);
  border-radius: var(--radius);
  padding: 24px 16px;
  text-align: center;
  cursor: pointer;
  transition: var(--transition);
  box-shadow: var(--shadow);
  position: relative;
  overflow: hidden;
}
.card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, var(--primary), transparent);
  opacity: 0;
  transition: var(--transition);
  z-index: 0;
}
.card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 40px -15px rgba(0,0,0,0.1);
  border-color: var(--primary);
}
.card:hover::before {
  opacity: 0.03;
}
.icon-box {
  position: relative;
  z-index: 1;
  width: 48px;
  height: 48px;
  margin: 0 auto 15px;
  background: var(--primary-light);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--primary);
  transition: var(--transition);
}
.card:hover .icon-box {
  transform: rotate(-5deg) scale(1.1);
  background: var(--primary);
  color: white;
}
.card-title {
  position: relative;
  z-index: 1;
  font-size: 15px;
  font-weight: 600;
  color: var(--text-main);
  transition: all 0.3s ease;
}
.card:hover .card-title {
  transform: translateY(-2px);
  color: var(--primary);
}

/* ========= 页脚 ========= */
footer {
  text-align: center;
  padding: 40px;
  color: var(--text-sub);
  font-size: 14px;
}

/* 移动端适配 */
@media (max-width: 480px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
  }
  .hero {
    padding: 40px 15px 30px;
  }
}

/* 按钮基础样式（和你现有主题统一） */
.btn {
  position: relative;
  border: none;
  outline: none;
  cursor: pointer;
  padding: 10px 22px;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 500;
  background: var(--primary);
  color: #fff;
  transition: all 0.3s ease;
  overflow: hidden;
}

/* 1. 缩放 + 高亮（最通用） */
.btn-scale:hover {
  transform: scale(1.06);
  box-shadow: 0 8px 20px rgba(0, 122, 255, 0.25);
}
.btn-scale:active {
  transform: scale(0.97);
}

/* 2. 上浮动 */
.btn-float:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 20px rgba(0,0,0,0.1);
}

/* 3. 扫光效果 */
.btn-shine::after {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
  transition: all 0.6s ease;
}
.btn-shine:hover::after {
  left: 100%;
}

/* 4. 边框呼吸 */
.btn-border {
  background: transparent;
  color: var(--primary);
  border: 2px solid var(--primary);
}
.btn-border:hover {
  background: var(--primary);
  color: #fff;
  box-shadow: 0 0 12px var(--primary);
}

/* 5. 圆角变方 */
.btn-rect {
  border-radius: 8px;
}
.btn-rect:hover {
  border-radius: 2px;
}

/* 6. 脉冲扩散 */
.btn-pulse:hover {
  box-shadow: 0 0 0 4px rgba(0, 122, 255, 0.2);
}
@keyframes pulse {
  0% { box-shadow: 0 0 0 0 rgba(0, 122, 255, 0.4); }
  100% { box-shadow: 0 0 0 12px transparent; }
}
.btn-pulse:hover {
  animation: pulse 1.2s infinite;
}

/* 主题按钮 - 优化版 */
.theme-btn {
  cursor: pointer;
  border: none;
  background: var(--primary);
  color: white;
  padding: 8px 18px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 500;
  box-shadow: 0 4px 15px rgba(0, 122, 255, 0.2);
  transition: var(--transition);
  position: relative;
  overflow: hidden;
  white-space: nowrap;

  /* 去掉点击蓝色高亮 */
  -webkit-tap-highlight-color: transparent;
  outline: none;
  user-select: none;
}

/* 扫光效果 */
.theme-btn::after {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent);
  transition: all 0.6s ease;
}

/* 悬浮 */
.theme-btn:hover {
  transform: translateY(-2px) scale(1.05);
  filter: brightness(1.08);
}
.theme-btn:hover::after {
  left: 100%;
}

/* 按压效果 */
.theme-btn:active {
  transform: translateY(0) scale(0.96);
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

/* 全局统一过渡 */
* {
  transition: var(--transition);
}

/* 主题色渐变过渡 */
:root, body.pink {
  transition: background 0.4s cubic-bezier(0.4, 0, 0.2, 1),
              color 0.4s cubic-bezier(0.4, 0, 0.2, 1),
              border-color 0.4s cubic-bezier(0.4, 0, 0.2, 1),
              box-shadow 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

/* 头部导航渐变 */
header {
  transition: background 0.4s, border-color 0.4s, box-shadow 0.4s;
}

/* Logo 颜色渐变 */
.logo {
  transition: background 0.4s;
}

/* 按钮增强过渡 */
.theme-btn {
  transition: all 0.3s cubic-bezier(0.25, 1, 0.5, 1);
}

/* 卡片全套流畅过渡 */
.card {
  transition: all 0.4s cubic-bezier(0.25, 1, 0.5, 1);
}
.icon-box {
  transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
}
.card-title {
  transition: transform 0.3s, color 0.3s;
}

/* 标题、文字颜色渐变 */
.hero h1,
.hero p,
.section-title {
  transition: color 0.4s;
}

/* 页脚文字渐变 */
footer {
  transition: color 0.4s;
}

/* 全局主题切换渐变动画 */
*,
::before,
::after {
  transition: color 0.4s cubic-bezier(0.4, 0, 0.2, 1),
              background 0.4s cubic-bezier(0.4, 0, 0.2, 1),
              background-color 0.4s cubic-bezier(0.4, 0, 0.2, 1),
              border-color 0.4s cubic-bezier(0.4, 0, 0.2, 1),
              fill 0.4s cubic-bezier(0.4, 0, 0.2, 1),
              stroke 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

/* 无下划线链接（加 class="link-plain"） */
.link-plain {
  text-decoration: none !important;
}

/* 按钮式链接（加 class="link-btn"） */
.link-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 14px;
  background: var(--primary-light);
  color: var(--primary);
  border-radius: 8px;
  font-weight: 500;
  transition: all 0.3s ease;
  text-decoration: none;
}
.link-btn:hover {
  background: var(--primary);
  color: #fff;
  transform: translateY(-1px);
}

/* 页脚友情链接 - 高级动效按钮 */
.footer-link {
  display: inline-block;
  margin: 0 10px;
  padding: 6px 14px;
  background: var(--primary-light);
  color: var(--primary);
  border-radius: 20px;
  font-size: 14px;
  font-weight: 500;
  text-decoration: none;
  -webkit-tap-highlight-color: transparent;
  outline: none;
  user-select: none;
  position: relative;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.25, 1, 0.5, 1);
}

/* 扫光动效 */
.footer-link::after {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
  transition: left 0.6s ease;
}

/* 悬浮效果 */
.footer-link:hover {
  background: var(--primary);
  color: #fff;
  transform: translateY(-2px) scale(1.05);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  text-decoration: none;
}
.footer-link:hover::after {
  left: 100%;
}

/* 按压效果 */
.footer-link:active {
  transform: translateY(0) scale(0.96);
}

/* 1. 基础类：平时持续跳动，同时备好过渡效果 */
.combo-duang {
  display: inline-block;
  will-change: transform;
  
  /* 挂载持续跳动的动画 (假设你已经定义了 continuous-duang 关键帧) */
  animation: continuous-duang 2.5s infinite ease-in-out;
  
  /* 提前写好过渡曲线，等动画停掉时，这个过渡就会生效 */
  transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275),
              box-shadow 0.4s ease;
}

/* 2. 悬浮状态：打断动画，执行放大 */
.combo-duang:hover {
  /* 关键：取消循环动画，防止它干扰悬停效果 */
  animation: none; 
  
  /* 执行常规的交互 Duang */
  transform: scale(1.05) translateY(-3px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.12);
}

/* 3. 点击状态：打断动画，执行下压 */
.combo-duang:active {
  animation: none;
  transform: scale(0.92) translateY(2px);
  transition: transform 0.1s ease, box-shadow 0.1s ease;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

/* 之前写过的关键帧 (如果你没存的话，贴在这里) */
@keyframes continuous-duang {
  0%   { transform: scale(1); }
  15%  { transform: scale(1.1) translateY(-4px); }
  30%  { transform: scale(0.95) translateY(2px); }
  45%  { transform: scale(1.03); }
  60%  { transform: scale(1); }
  100% { transform: scale(1); }
}

.glass-card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: 
    box-shadow 0.3s ease, 
    background 0.3s ease, 
    transform 0.3s ease;
}

.glass-card:hover {
  background: rgba(255, 255, 255, 0.2);
  /* 增加阴影弥散范围，模拟悬浮高度增加 */
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  transform: translateY(-5px);
}

.nav-list {
  display: flex;
  position: relative;
  padding: 8px;
  background: rgba(255, 255, 255, 0.1); /* 在磨砂之上加一层极淡的背景 */
  border-radius: 50px;
}

.nav-link {
  position: relative;
  z-index: 2;
  padding: 10px 20px;
  transition: color 0.3s ease;
}

/* 使用伪元素制作跟随滑块 */
/* 注意：这个纯CSS方案是针对单个Item的，若需跨Item平滑移动需少量JS */
.nav-link::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50px;
  z-index: -1;
  opacity: 0;
  transform: scale(0.8);
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1); /* 带有弹性回弹 */
}

.nav-link:hover::before {
  opacity: 1;
  transform: scale(1);
}

.nav-link {
  background: linear-gradient(90deg, #fff, #fff, #4facfe, #fff, #fff);
  background-size: 200% 100%;
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent; /* 隐藏原始文字颜色 */
  transition: background-position 0s;
}

.nav-link:hover {
  background-position: -100% 0;
  transition: background-position 0.6s ease;
}

/* 默认状态 */
.header {
  position: fixed;
  top: 0;
  width: 100%;
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  padding: 20px 0;
}

/* 滚动状态 (需要配合简单的 JS 添加 .scrolled 类) */
.header.scrolled {
  top: 20px;
  width: 90%; /* 宽度收缩 */
  left: 5%;
  border-radius: 20px;
  padding: 10px 0;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.nav-item {
  position: relative;
  z-index: 1;
}

/* 悬停时的"胶囊"背景 */
.nav-item::before {
  content: "";
  position: absolute;
  inset: 5px -10px; /* 控制胶囊的大小范围 */
  background: rgba(255, 255, 255, 0.15);
  border-radius: 8px;
  z-index: -1;
  opacity: 0;
  transform: scale(0.9);
  transition: all 0.3s cubic-bezier(0.23, 1, 0.32, 1);
}

.nav-item:hover::before {
  opacity: 1;
  transform: scale(1);
}

.navbar {
  /* 你现有的属性... */
  position: relative;
  overflow: hidden; /* 裁剪流光 */
}

/* 增加一根流动的细线 */
.navbar::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: -100%;
  width: 50%;
  height: 1px;
  background: linear-gradient(
    90deg, 
    transparent, 
    rgba(255, 255, 255, 0.8), 
    #4facfe, 
    transparent
  );
  animation: sweep 5s infinite linear;
}

@keyframes sweep {
  0% { left: -100%; }
  100% { left: 200%; }
}

/* 移动端滚动流畅不卡顿 */
html, body {
  -webkit-overflow-scrolling: touch !important;
  overflow-scrolling: touch !important;
}

/* ===============================
   文本 & 列表 · 完美适配当前主题
=============================== */

/* 标题 */
h1, h2, h3, h4, h5, h6 {
  margin: 1rem 0 0.7rem;
  font-weight: 700;
  line-height: 1.4;
  color: var(--text-main);
  user-select: none;
  transition: var(--transition);
}
h1 { font-size: 26px; }
h2 { font-size: 24px; }
h3 { font-size: 22px; }
h4 { font-size: 20px; }
h5 { font-size: 18px; }
h6 { font-size: 16px; }

/* 段落 */
p {
  margin: 0.7rem 0;
  line-height: 1.7;
  font-size: 15px;
  color: var(--text-sub);
  user-select: none;
  transition: var(--transition);
}

/* 列表共用 */
ul, ol {
  margin: 0.8rem 0;
  padding-left: 1.4rem;
  user-select: none;
  transition: var(--transition);
}

/* 无序列表 */
ul {
  list-style: none;
  padding-left: 1rem;
}
ul li {
  position: relative;
  margin: 0.5rem 0;
  line-height: 1.6;
  font-size: 15px;
  color: var(--text-sub);
  padding-left: 0.4rem;
}
ul li::before {
  content: '';
  position: absolute;
  left: -0.9rem;
  top: 0.65rem;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--primary);
  opacity: 0.65;
  transition: var(--transition);
}

/* 有序列表 */
ol {
  list-style: none;
  counter-reset: ol-num;
  padding-left: 1.2rem;
}
ol li {
  position: relative;
  margin: 0.5rem 0;
  line-height: 1.6;
  font-size: 15px;
  color: var(--text-sub);
  padding-left: 0.4rem;
}
ol li::before {
  counter-increment: ol-num;
  content: counter(ol-num) ".";
  position: absolute;
  left: -1.4rem;
  color: var(--primary);
  opacity: 0.75;
  font-weight: 600;
  transition: var(--transition);
}

/* ===============================
   移动端适配
=============================== */
@media (max-width: 768px) {
  h1 { font-size: 24px; }
  h2 { font-size: 22px; }
  h3 { font-size: 20px; }
  h4 { font-size: 18px; }
  h5 { font-size: 17px; }
  h6 { font-size: 16px; }

  p, ul li, ol li {
    font-size: 14px;
    line-height: 1.6;
  }
}

/* ===============================
   全新独立文本居中样式（适配双主题）
=============================== */

/* 标题居中 */
.article h2,
.article h3,
.article h4,
.article h5,
.article h6 {
  text-align: center;
  color: var(--text-main);
  font-weight: 700;
  margin: 1rem 0;
  transition: var(--transition);
}

/* 段落居中 */
.article p {
  text-align: center;
  color: var(--text-sub);
  line-height: 1.7;
  margin: 0.6rem 0;
  transition: var(--transition);
}

/* 列表居中 + 无小圆点 */
.article ul,
.article ol {
  list-style: none;
  padding-left: 0;
  text-align: center;
  margin: 1rem 0;
  transition: var(--transition);
}

.article li {
  color: var(--text-sub);
  margin: 0.4rem 0;
  transition: var(--transition);
}

/* 标题全局居中 */
h1,
h2,
h3,
h4,
h5,
h6 {
  text-align: center !important;
  color: var(--text-main) !important;
  font-weight: 700 !important;
  transition: var(--transition) !important;
}

/* 段落全局居中 */
p {
  text-align: center !important;
  color: var(--text-sub) !important;
  transition: var(--transition) !important;
}

/* 列表全局居中 + 去掉小圆点 */
ul,
ol {
  list-style: none !important;
  padding-left: 0 !important;
  text-align: center !important;
  transition: var(--transition) !important;
}

ul li,
ol li {
  text-align: center !important;
  color: var(--text-sub) !important;
  transition: var(--transition) !important;
}

/* ===============================
   视频标签样式 · 适配当前主题
=============================== */

/* 视频容器（让视频居中、带圆角、防拖拽） */
video {
  display: block;
  max-width: 100%;
  width: 100%;
  height: auto;
  margin: 1rem auto;
  border-radius: var(--radius);
  background: #000;
  outline: none;
  -webkit-user-drag: none;
  user-select: none;
  pointer-events: auto;
  transition: var(--transition);
  box-shadow: var(--shadow);
}

/* 视频外层包裹（用于居中、间距、磨砂背景） */
.video-box {
  position: relative;
  width: 100%;
  max-width: 800px;
  margin: 1.2rem auto;
  padding: 12px;
  background: var(--card-bg);
  border-radius: calc(var(--radius) + 4px);
  box-shadow: var(--shadow);
  transition: var(--transition);
}

/* 移动端适配 */
@media (max-width: 768px) {
  .video-box {
    padding: 8px;
    margin: 1rem auto;
  }
  video {
    border-radius: 12px;
  }
}

/* ===============================
   全局 <a href> 链接 → 主题按钮样式（已优化）
=============================== */

/* ⚠️ 关键修复：链接居中的核心规则 */
a {
  display: inline-block !important;
  margin-left: auto !important;
  margin-right: auto !important;
  text-align: center !important;
  
  /* 按钮样式 */
  background-color: var(--primary) !important;
  color: #fff !important;
  border-radius: var(--radius) !important;
  padding: 12px 28px !important;
  
  text-decoration: none !important;
  font-weight: 500 !important;
  font-size: 15px !important;
  white-space: nowrap !important;
  
  border: none !important;
  outline: none !important;
  box-shadow: var(--shadow) !important;
  transition: var(--transition) !important;
  
  -webkit-touch-callout: none;
  -webkit-tap-highlight-color: transparent;
  user-select: none !important;
}

/* 按钮悬浮效果 */
a:hover {
  transform: translateY(-2px) !important;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15) !important;
  opacity: 0.92 !important;
  color: #fff !important;
}

/* 按钮点击效果 */
a:active {
  transform: translateY(1px) !important;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08) !important;
}

/* 让所有包含链接的容器也自动居中 */
body {
  text-align: center;
}

/* 每日一言 - 刷新句子按钮 */
.refresh-btn {
  cursor: pointer;
  border: none;
  background: var(--primary);
  color: #fff;
  font-size: 14px;
  font-weight: 500;
  padding: 12px 28px;
  border-radius: 999px;
  box-shadow: 0 6px 18px rgba(0, 122, 255, 0.15);
  transition: var(--transition);
  position: relative;
  overflow: hidden;
}

/* 悬浮动效 */
.refresh-btn:hover {
  transform: translateY(-2px) scale(1.03);
  box-shadow: 0 8px 22px rgba(0, 122, 255, 0.2);
}

/* 点击动效 */
.refresh-btn:active {
  transform: translateY(0) scale(0.97);
  transition: all 0.1s ease;
}

/* 粉色主题自动适配 */
body.pink .refresh-btn {
  box-shadow: 0 6px 18px rgba(255, 45, 85, 0.15);
}
body.pink .refresh-btn:hover {
  box-shadow: 0 8px 22px rgba(255, 45, 85, 0.2);
}

/* 点击波纹动画 */
.refresh-btn::after {
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 999px;
  transform: scale(0);
  opacity: 0;
  transition: transform 0.5s ease, opacity 0.3s ease;
}
.refresh-btn:active::after {
  transform: scale(1.2);
  opacity: 1;
  transition: 0s;
}

/* ===============================
   全局通用 textarea 样式 · 适配 SHUOWEB 主题
=============================== */
textarea {
  /* 基础布局 */
  width: 100%;
  max-width: 800px;
  min-height: 120px;
  padding: 14px 16px;
  margin: 10px 0;
  resize: vertical; /* 允许垂直拖动 */

  /* 磨砂玻璃质感（和 input 保持一致） */
  background: var(--card-bg);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: var(--radius);
  box-shadow: var(--shadow);

  /* 文字样式 */
  font-family: '666font', sans-serif;
  font-size: 15px;
  color: var(--text-main);
  line-height: 1.6;

  /* 交互 */
  outline: none;
  transition: var(--transition);
  -webkit-appearance: none;
  appearance: none;
}

/* 占位符 */
textarea::placeholder {
  color: var(--text-sub);
  opacity: 0.6;
}

/* 聚焦状态：呼吸光效 + 轻微上浮 */
textarea:focus {
  background: #ffffff;
  border-color: var(--primary);
  box-shadow: 0 0 0 4px var(--primary-light);
  transform: translateY(-1px);
}

/* 粉色主题适配 */
body.pink textarea:focus {
  box-shadow: 0 0 0 4px rgba(255, 45, 85, 0.15);
}

/* 禁用状态 */
textarea:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  background: rgba(255, 255, 255, 0.4);
}

/* 只读状态 */
textarea[readonly] {
  background: rgba(255, 255, 255, 0.5);
  border-color: rgba(255, 255, 255, 0.4);
  box-shadow: none;
  transform: none;
}


      `;

      document.head.appendChild(style);
    }


    /* ================= Header ================= */

    if (!document.getElementById("shuoweb-header")) {

      const header = document.createElement("header");
      header.id = "shuoweb-header";

      header.innerHTML = `
        <div class="logo">SHUOWEB</div>
        <button class="theme-btn" id="themeText">切换主题</button>
      `;

      // 插入到 body 最前
      document.body.insertBefore(header, document.body.firstChild);
    }


    /* ================= Footer ================= */

    if (!document.getElementById("shuoweb-footer")) {
  const footer = document.createElement("footer");
  footer.id = "shuoweb-footer";

  footer.innerHTML = `
    <div class="footer-links">
      <a href="https://github.com/free-4/free-4.github.io/issues" class="footer-link" target="_blank">评论区</a>
    </div>
    <p>&copy; 2026 SHUOWEB.COM</p><br>
    页面浏览量：<span id="vercount_value_page_pv">Loading</span>
  `;

  document.body.appendChild(footer);
}


    /* ================= 主题系统 ================= */

    window.toggleTheme = function () {
      const isPink = document.body.classList.toggle("pink");
      localStorage.setItem("theme", isPink ? "pink" : "blue");
      updateBtn(isPink);
    };

    document
      .getElementById("themeText")
      ?.addEventListener("click", toggleTheme);


    function updateBtn(isPink) {
      const btn = document.getElementById("themeText");
      if (btn)
        btn.innerText = isPink ? "克莱因蓝" : "浪漫极客粉";
    }

    const saved = localStorage.getItem("theme") === "pink";
    if (saved) document.body.classList.add("pink");
    updateBtn(saved);
  }

})();

let lastScroll = 0;
const header = document.querySelector('header');

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;

  if (!header) return;

  // 1. 处理"变身"效果：滚动超过 50px 就收缩
  if (currentScroll > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }

  // 2. 进阶：向下滚动隐藏，向上滚动显示（防干扰模式）
  if (currentScroll > lastScroll && currentScroll > 200) {
    header.style.transform = 'translateY(-120%)'; // 隐藏
  } else {
    header.style.transform = 'translateY(0)'; // 显示
  }
  lastScroll = currentScroll;
});

!function(){"use strict";const t=[];let e=!1,n=null;const o="visitorCountData",a=async()=>{const t=window.location.href;if(!t.startsWith("http"))return null;const e=new AbortController,n=setTimeout((()=>e.abort()),5e3);try{const o=await fetch("https://events.vercount.one/api/v2/log",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({url:t}),signal:e.signal});if(clearTimeout(n),!o.ok)throw new Error(`HTTP ${o.status}`);return(t=>"success"===t?.status&&t.data?t.data:"error"===t?.status?(console.warn("API error:",t.message),t.data||{site_uv:0,site_pv:0,page_pv:0}):t||{site_uv:0,site_pv:0,page_pv:0})(await o.json())}catch(t){return clearTimeout(n),"AbortError"===t.name?console.warn("Request timeout"):console.warn("API error:",t.message),null}},s=()=>{if(n)return n;return n={},["site_pv","page_pv","site_uv"].forEach((t=>{n[`busuanzi_value_${t}`]=document.getElementById(`busuanzi_value_${t}`),n[`busuanzi_container_${t}`]=document.getElementById(`busuanzi_container_${t}`),n[`vercount_value_${t}`]=document.getElementById(`vercount_value_${t}`),n[`vercount_container_${t}`]=document.getElementById(`vercount_container_${t}`)})),n},r=t=>{const e=s();["site_pv","page_pv","site_uv"].forEach((n=>{const o=String(t[n]||"0"),a=e[`busuanzi_value_${n}`],s=e[`vercount_value_${n}`];a&&(a.textContent=o),s&&(s.textContent=o)}))},u=()=>{const t=s();["site_pv","page_pv","site_uv"].forEach((e=>{const n=t[`busuanzi_container_${e}`],o=t[`vercount_container_${e}`];n&&(n.style.display="inline"),o&&(o.style.display="inline")}))};var i;i=async()=>{(()=>{const t=s();["site_pv","page_pv","site_uv"].forEach((e=>{const n=t[`busuanzi_container_${e}`],o=t[`vercount_container_${e}`];n&&(n.style.display="none"),o&&(o.style.display="none")}))})();const t=await a();if(t)r(t),(t=>{try{localStorage.setItem(o,JSON.stringify(t))}catch(t){}})(t),u();else{const t=(()=>{try{const t=localStorage.getItem(o);return t?JSON.parse(t):null}catch(t){return null}})();t&&(r(t),u())}},e||"loading"!==document.readyState?i():(t.push(i),document.addEventListener("DOMContentLoaded",(()=>{e=!0,t.forEach((t=>t()))}),{once:!0}))}();

(function () {
    /* ========= 防重复加载 ========= */
    if (window.__SHUOWEB_SETTINGS_PRO__) return;
    window.__SHUOWEB_SETTINGS_PRO__ = true;

    function ready(fn) {
        if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", fn);
        else fn();
    }
    ready(initSettings);

    /* ================= 分类定义（仅用于分组标签）================= */
    const CATEGORIES = [
        { id: 'experience', label: '体验' },
        { id: 'appearance', label: '外观' },
        { id: 'debug',      label: '调试' },
    ];

    /* ================= 核心配置数据 ================= */
    const settingsOptions = [

        /* ── 体验 ── */
        {
            id: 'opt-immersive', category: 'experience',
            name: '沉浸浏览模式', desc: '隐藏导航与页脚，专注内容阅读',
            type: 'switch',
            icon: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"/>`
        },
        {
            id: 'opt-progress', category: 'experience',
            name: '阅读进度指示器', desc: '在页面顶部显示实时滚动阅读进度条',
            type: 'switch',
            icon: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0
                012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0
                012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>`
        },
        {
            id: 'opt-totop', category: 'experience',
            name: '快速回顶按钮', desc: '页面右下角显示悬浮回到顶部的快捷按钮',
            type: 'switch',
            icon: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M5 15l7-7 7 7"/>`
        },
        {
            id: 'opt-extlink', category: 'experience',
            name: '外链新标签拦截', desc: '自动将页面所有外部链接在新标签中安全打开',
            type: 'switch',
            icon: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>`
        },
        {
            id: 'opt-termux', category: 'experience',
            name: 'Termux 终端环境', desc: '全局等宽字体，适配移动端代码阅读与编译',
            type: 'switch',
            icon: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>`
        },
        {
            id: 'opt-noscroll', category: 'experience',
            name: '平滑滚动增强', desc: '为页面注入原生级丝滑平滑滚动动效',
            type: 'switch',
            icon: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"/>`
        },

        /* ── 外观 ── */
        {
            id: 'opt-darkmode', category: 'appearance',
            name: '暗色夜间模式', desc: '切换至暗黑主题，减少蓝光保护双眼',
            type: 'switch',
            icon: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/>`
        },
        {
            id: 'opt-m3', category: 'appearance',
            name: 'Material Design 3 引擎', desc: '切换至 Google M3 圆角与扁平化投影逻辑',
            type: 'switch',
            icon: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14
                0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/>`
        },
        {
            id: 'opt-grayscale', category: 'appearance',
            name: '页面灰度模式', desc: '将整个页面渲染为灰阶，适合纪念日或专注场景',
            type: 'switch',
            icon: `<circle cx="12" cy="12" r="9" stroke-width="2"/>
                <path stroke-linecap="round" stroke-width="2" d="M12 3v18"/>`
        },
        {
            id: 'opt-highlight', category: 'appearance',
            name: '鼠标光晕跟随', desc: '为鼠标指针添加柔光光晕，增强视觉沉浸感',
            type: 'switch',
            icon: `<circle cx="12" cy="12" r="3" stroke-width="2"/>
                <path stroke-linecap="round" stroke-width="2"
                d="M12 1v3M12 20v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M1 12h3M20 12h3
                M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12"/>`
        },
        {
            id: 'opt-fontsize', category: 'appearance',
            name: '全局字体缩放', desc: '当前: 100%（标准阅读）',
            type: 'range', min: '80', max: '140', step: '10', value: '100',
            icon: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M4 7V4h16v3M9 20h6M12 4v16"/>`
        },

        /* ── 调试 ── */
        {
            id: 'opt-fps', category: 'debug',
            name: '实时性能监控', desc: '在屏幕右上角显示 FPS / DOM 数量 / 内存占用',
            type: 'switch',
            icon: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M13 10V3L4 14h7v7l9-11h-7z"/>`
        },
        {
            id: 'opt-debug', category: 'debug',
            name: '前端布局调试网格', desc: '显示所有 DOM 元素的边界，辅助页面开发',
            type: 'switch',
            icon: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0
                012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0
                012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2
                0 01-2 2h-2a2 2 0 01-2-2v-2z"/>`
        },
        {
            id: 'opt-noemoji', category: 'debug',
            name: '严格极简 (Emoji 净化)', desc: '全局拦截并移除系统自带 Emoji，仅保留纯净 SVG',
            type: 'switch',
            icon: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728
                12.728L5.636 5.636"/>`
        },
        {
            id: 'opt-speed', category: 'debug',
            name: 'UI 物理回弹速率', desc: '当前: 1.0x（阻尼优化）',
            type: 'range', min: '0', max: '2', step: '0.5', value: '1',
            icon: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0
                4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"/>`
        },
    ];

    function initSettings() {
        injectStyle();
        createDOM();
        bindEvents();
        loadData();
    }

    /* ================= 1. 注入样式 ================= */
    function injectStyle() {
        if (document.getElementById("shuoweb-settings-style-pro")) return;
        const style = document.createElement("style");
        style.id = "shuoweb-settings-style-pro";
        style.textContent = `
            /* ── 遮罩 ── */
            .shuo-settings-mask {
                position: fixed; inset: 0; z-index: 99999;
                background: rgba(15, 23, 42, 0.45);
                backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);
                display: flex; justify-content: center; align-items: center;
                opacity: 0; pointer-events: none;
                transition: opacity 0.35s cubic-bezier(0.4, 0, 0.2, 1);
            }
            .shuo-settings-mask.active { opacity: 1; pointer-events: auto; }

            /* ── 面板（桌面居中）── */
            .shuo-settings-panel {
                width: 92%; max-width: 520px; max-height: 88vh;
                background: #ffffff;
                border-radius: 28px; padding: 24px 24px 20px;
                box-shadow: 0 40px 80px rgba(0,0,0,0.2), 0 0 0 1px rgba(255,255,255,0.6);
                transform: translateY(50px) scale(0.92);
                transition: transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
                display: flex; flex-direction: column; overflow: hidden;
                box-sizing: border-box;
            }
            .shuo-settings-mask.active .shuo-settings-panel { transform: translateY(0) scale(1); }

            /* ── 头部 ── */
            .shuo-settings-header {
                display: flex; justify-content: space-between; align-items: center;
                margin-bottom: 16px; padding: 0 4px 16px;
                border-bottom: 1px solid rgba(0,0,0,0.06);
                flex-shrink: 0;
            }
            .shuo-settings-title {
                font-size: 20px; font-weight: 800; color: #1c1c1e;
                margin: 0; display: flex; align-items: center; gap: 10px; letter-spacing: -0.4px;
            }
            .shuo-settings-title svg { width: 22px; height: 22px; color: #007AFF; flex-shrink: 0; }
            .shuo-close-btn {
                width: 36px; height: 36px; border-radius: 50%;
                background: #EBF4FF; color: #007AFF;
                display: flex; justify-content: center; align-items: center;
                cursor: pointer; transition: all 0.3s ease; flex-shrink: 0;
            }
            .shuo-close-btn:hover { transform: rotate(90deg); background: #007AFF; color: #fff; }

            /* ── 搜索框 ── */
            .shuo-search-wrap {
                position: relative; margin-bottom: 14px; flex-shrink: 0;
            }
            .shuo-search-icon {
                position: absolute; left: 13px; top: 50%; transform: translateY(-50%);
                width: 16px; height: 16px; color: #8e8e93; pointer-events: none;
            }
            .shuo-search-input {
                width: 100%; box-sizing: border-box; padding: 10px 14px 10px 36px;
                border-radius: 14px; border: 1.5px solid rgba(0,0,0,0.08);
                background: #f2f2f7; color: #1c1c1e;
                font-size: 14px; outline: none;
                transition: border-color 0.2s, box-shadow 0.2s;
                -webkit-appearance: none;
            }
            .shuo-search-input:focus {
                border-color: #007AFF;
                box-shadow: 0 0 0 3px rgba(0,122,255,0.12);
            }

            /* ── 滚动区 ── */
            .shuo-settings-body {
                overflow-y: auto; overflow-x: hidden;
                padding: 2px 0 8px; display: flex; flex-direction: column; gap: 8px;
                scrollbar-width: none; -webkit-overflow-scrolling: touch;
                flex: 1; min-height: 0;
            }
            .shuo-settings-body::-webkit-scrollbar { display: none; }

            /* ── 分组标签 ── */
            .shuo-cat-label {
                font-size: 11px; font-weight: 800; color: #8e8e93;
                text-transform: uppercase; letter-spacing: 1.4px;
                padding: 8px 4px 2px;
                display: flex; align-items: center; gap: 8px;
                flex-shrink: 0;
            }
            .shuo-cat-label::after {
                content: ''; flex: 1; height: 1px;
                background: rgba(142,142,147,0.3);
            }

            /* ── 设置卡片 ── */
            .shuo-setting-item {
                display: flex; align-items: center; gap: 12px;
                padding: 13px 14px; background: #f2f2f7;
                border-radius: 18px; border: 1px solid rgba(0,0,0,0.04);
                box-shadow: 0 1px 6px rgba(0,0,0,0.04);
                transition: border-color 0.25s, box-shadow 0.25s;
                flex-shrink: 0;
            }
            @media (hover: hover) {
                .shuo-setting-item:hover {
                    border-color: #c7dcff;
                    box-shadow: 0 4px 16px rgba(0,0,0,0.07);
                }
            }
            .shuo-setting-item.shuo-hidden { display: none !important; }

            .shuo-setting-icon {
                width: 40px; height: 40px; border-radius: 11px;
                background: #EBF4FF; color: #007AFF;
                display: flex; justify-content: center; align-items: center; flex-shrink: 0;
            }
            .shuo-setting-icon svg { width: 20px; height: 20px; fill: none; stroke: currentColor; }
            .shuo-setting-info { flex-grow: 1; min-width: 0; }
            .shuo-setting-name {
                font-size: 14px; font-weight: 700; color: #1c1c1e; margin-bottom: 2px;
                white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
            }
            .shuo-setting-desc {
                font-size: 11.5px; color: #6e6e73; line-height: 1.4;
            }

            /* ── iOS Switch ── */
            .shuo-switch {
                appearance: none; -webkit-appearance: none;
                width: 50px; height: 28px; background: rgba(0,0,0,0.12);
                border-radius: 30px; position: relative; cursor: pointer; outline: none;
                transition: background 0.28s ease; flex-shrink: 0;
            }
            .shuo-switch::after {
                content: ''; position: absolute; top: 2px; left: 2px;
                width: 24px; height: 24px; background: #fff; border-radius: 50%;
                box-shadow: 0 2px 6px rgba(0,0,0,0.22);
                transition: transform 0.38s cubic-bezier(0.34, 1.56, 0.64, 1);
            }
            .shuo-switch:checked { background: #007AFF; }
            .shuo-switch:checked::after { transform: translateX(22px); }

            /* ── Range ── */
            .shuo-range-container { width: 96px; flex-shrink: 0; }
            .shuo-range {
                -webkit-appearance: none; width: 100%; height: 6px;
                background: #d0e4ff; border-radius: 6px; outline: none; cursor: pointer;
            }
            .shuo-range::-webkit-slider-thumb {
                -webkit-appearance: none; appearance: none;
                width: 20px; height: 20px; border-radius: 50%;
                background: #007AFF; cursor: pointer;
                box-shadow: 0 2px 6px rgba(0,0,0,0.22); transition: transform 0.15s;
            }
            .shuo-range::-webkit-slider-thumb:active { transform: scale(1.3); }

            /* ── Footer 2×2 ── */
            .shuo-settings-footer {
                display: grid; grid-template-columns: 1fr 1fr; gap: 9px;
                padding-top: 14px; border-top: 1px solid rgba(0,0,0,0.06);
                flex-shrink: 0;
            }
            .shuo-btn {
                padding: 12px 8px; border-radius: 16px; border: none;
                font-size: 13px; font-weight: 700; cursor: pointer;
                transition: filter 0.2s ease, transform 0.2s ease;
                display: flex; align-items: center; justify-content: center; gap: 6px;
                line-height: 1; -webkit-tap-highlight-color: transparent;
            }
            @media (hover: hover) {
                .shuo-btn:hover { filter: brightness(1.1); transform: translateY(-1px); }
            }
            .shuo-btn:active { filter: brightness(0.92); transform: translateY(0) scale(0.97); }
            .shuo-btn svg {
                width: 14px; height: 14px; fill: none;
                stroke: currentColor; stroke-width: 2.2; flex-shrink: 0;
            }
            /* ── 按钮：全部使用实色背景 + 白色文字，确保高对比度 ── */
            .shuo-btn.primary { background: #007AFF; color: #ffffff; box-shadow: 0 4px 14px rgba(0,122,255,0.38); }
            .shuo-btn.success { background: #25C452; color: #ffffff; box-shadow: 0 4px 14px rgba(37,196,82,0.38); }
            .shuo-btn.warning { background: #F5970A; color: #ffffff; box-shadow: 0 4px 14px rgba(245,151,10,0.38); }
            .shuo-btn.danger  { background: #E8234A; color: #ffffff; box-shadow: 0 4px 14px rgba(232,35,74,0.38); }

            /* ── Toast ── */
            .shuo-toast {
                position: fixed; bottom: 36px; left: 50%;
                transform: translateX(-50%) translateY(16px);
                background: rgba(28,28,30,0.92); color: #fff; padding: 10px 22px;
                border-radius: 24px; font-size: 13.5px; font-weight: 600;
                backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);
                z-index: 999999999;
                opacity: 0; pointer-events: none;
                transition: all 0.32s cubic-bezier(0.34,1.56,0.64,1);
                white-space: nowrap;
            }
            .shuo-toast.show { opacity: 1; transform: translateX(-50%) translateY(0); }

            /* ── 动态功能类 ── */
            body.immersive-mode header,
            body.immersive-mode nav,
            body.immersive-mode footer {
                opacity: 0 !important; pointer-events: none !important;
                transform: translateY(-100%) !important;
            }
            body.termux-mode { font-family: 'Courier New', Consolas, 'SF Mono', monospace !important; }
            body.m3-mode { --radius: 28px !important; --shadow: 0 2px 6px rgba(0,0,0,0.08) !important; }
            body.debug-mode * { outline: 1px dashed rgba(0,122,255,0.35) !important; }
            html.shuo-smooth * { scroll-behavior: smooth !important; }

            /* 暗色模式 */
            html.shuo-dark { filter: invert(1) hue-rotate(180deg); }
            html.shuo-dark img,
            html.shuo-dark video,
            html.shuo-dark canvas,
            html.shuo-dark [style*="background-image"] { filter: invert(1) hue-rotate(180deg); }
            html.shuo-dark #shuoweb-settings-mask,
            html.shuo-dark #shuo-fps-monitor,
            html.shuo-dark #shuo-progress-bar,
            html.shuo-dark #shuo-totop-btn,
            html.shuo-dark .shuo-toast { filter: invert(1) hue-rotate(180deg); }

            /* 灰度模式 */
            html.shuo-grayscale { filter: grayscale(1); }
            html.shuo-dark.shuo-grayscale { filter: invert(1) hue-rotate(180deg) grayscale(1); }
            html.shuo-dark.shuo-grayscale #shuoweb-settings-mask,
            html.shuo-dark.shuo-grayscale #shuo-fps-monitor { filter: invert(1) hue-rotate(180deg) grayscale(1); }

            /* ── FPS 悬浮窗 ── */
            #shuo-fps-monitor {
                position: fixed; top: 15px; right: 15px; z-index: 99998;
                background: rgba(0,0,0,0.88); color: #0f0;
                font-family: 'SF Mono', Consolas, monospace;
                padding: 8px 14px; border-radius: 12px; font-size: 11.5px; font-weight: 600;
                pointer-events: none; display: none; line-height: 1.75;
                box-shadow: 0 4px 16px rgba(0,0,0,0.35); border: 1px solid rgba(0,255,0,0.25);
            }
            body.fps-mode #shuo-fps-monitor { display: block; }

            /* ── 阅读进度条 ── */
            #shuo-progress-bar {
                position: fixed; top: 0; left: 0; z-index: 999999;
                height: 3px; width: 0%;
                background: linear-gradient(90deg, #007AFF 0%, #5856D6 60%, #AF52DE 100%);
                border-radius: 0 3px 3px 0;
                box-shadow: 0 0 10px #007AFF;
                transition: width 0.1s linear; display: none; pointer-events: none;
            }
            body.progress-mode #shuo-progress-bar { display: block; }

            /* ── 回顶按钮 ── */
            #shuo-totop-btn {
                position: fixed; bottom: 88px; right: 20px; z-index: 99997;
                width: 48px; height: 48px; border-radius: 50%;
                background: #007AFF !important;
                border: none !important; outline: none !important;
                display: none; justify-content: center; align-items: center;
                cursor: pointer; padding: 0;
                box-shadow: 0 4px 18px rgba(0,122,255,0.42);
                opacity: 0; transform: translateY(16px) scale(0.8);
                transition: opacity 0.35s ease, transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1),
                            box-shadow 0.25s ease;
                -webkit-tap-highlight-color: transparent;
            }
            body.totop-mode #shuo-totop-btn { display: flex; }
            #shuo-totop-btn.visible { opacity: 1; transform: translateY(0) scale(1); }
            #shuo-totop-btn:hover { box-shadow: 0 8px 28px rgba(0,122,255,0.55); transform: scale(1.1) !important; }
            #shuo-totop-btn:active { transform: scale(0.95) !important; }

            /* ── 鼠标光晕 ── */
            #shuo-cursor-glow {
                position: fixed; width: 300px; height: 300px; border-radius: 50%;
                background: radial-gradient(circle, rgba(0,122,255,0.08) 0%, transparent 70%);
                pointer-events: none; z-index: 99990; transform: translate(-50%, -50%);
                transition: left 0.08s ease-out, top 0.08s ease-out; display: none;
            }
            body.highlight-mode #shuo-cursor-glow { display: block; }

            /* ════════════════════════════════════════
               移动端适配：底部弹出 Sheet 样式
               ════════════════════════════════════════ */
            @media (max-width: 600px) {
                /* 遮罩改为底部对齐 */
                .shuo-settings-mask {
                    align-items: flex-end;
                }
                /* 面板从底部弹出，圆角仅上方 */
                .shuo-settings-panel {
                    width: 100%;
                    max-width: 100%;
                    max-height: 91vh;
                    border-radius: 22px 22px 0 0;
                    padding: 16px 16px calc(20px + env(safe-area-inset-bottom, 0px));
                    transform: translateY(100%);
                    transition: transform 0.42s cubic-bezier(0.32, 0.72, 0, 1);
                    box-shadow: 0 -8px 40px rgba(0,0,0,0.18);
                }
                .shuo-settings-mask.active .shuo-settings-panel {
                    transform: translateY(0);
                }
                /* 顶部拖动指示条 */
                .shuo-settings-panel::before {
                    content: '';
                    display: block;
                    width: 36px; height: 4px;
                    background: rgba(0,0,0,0.15);
                    border-radius: 2px;
                    margin: 0 auto 14px;
                    flex-shrink: 0;
                }
                .shuo-settings-title { font-size: 17px; }
                .shuo-settings-header { margin-bottom: 12px; padding-bottom: 12px; }
                /* 设置项更紧凑 */
                .shuo-setting-item {
                    padding: 11px 12px; gap: 10px; border-radius: 14px;
                }
                .shuo-setting-icon {
                    width: 36px; height: 36px; border-radius: 9px;
                }
                .shuo-setting-icon svg { width: 18px; height: 18px; }
                .shuo-setting-name { font-size: 13.5px; }
                .shuo-setting-desc { font-size: 11px; }
                /* Switch 稍小 */
                .shuo-switch { width: 46px; height: 26px; }
                .shuo-switch::after { width: 22px; height: 22px; }
                .shuo-switch:checked::after { transform: translateX(20px); }
                /* Range 控件 */
                .shuo-range-container { width: 78px; }
                /* 底部按钮 */
                .shuo-settings-footer { gap: 8px; padding-top: 12px; }
                .shuo-btn {
                    font-size: 12.5px; padding: 11px 6px;
                    border-radius: 14px; gap: 5px;
                }
                .shuo-btn svg { width: 13px; height: 13px; }
                /* 回顶按钮适配底部安全区 */
                #shuo-totop-btn {
                    bottom: calc(76px + env(safe-area-inset-bottom, 0px));
                    right: 16px;
                    width: 44px; height: 44px;
                }
                /* Toast 留出安全区 */
                .shuo-toast {
                    bottom: calc(24px + env(safe-area-inset-bottom, 0px));
                }
            }

            @media (max-width: 380px) {
                .shuo-settings-title { font-size: 15.5px; gap: 7px; }
                .shuo-settings-title svg { width: 18px; height: 18px; }
                .shuo-btn { font-size: 11.5px; }
            }
        `;
        document.head.appendChild(style);
    }

    /* ================= 2. 构建 DOM ================= */
    function createDOM() {
        const mask = document.createElement('div');
        mask.className = 'shuo-settings-mask';
        mask.id = 'shuoweb-settings-mask';

        /* 搜索框（无 Tab 导航）*/
        const searchHTML = `
            <div class="shuo-search-wrap">
                <svg class="shuo-search-icon" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2">
                    <circle cx="11" cy="11" r="7"/>
                    <path stroke-linecap="round" d="M21 21l-3.5-3.5"/>
                </svg>
                <input class="shuo-search-input" id="shuo-search" type="search"
                    placeholder="搜索功能…" autocomplete="off" autocorrect="off" spellcheck="false">
            </div>`;

        /* 按分类构建列表 */
        let listHTML = '';
        CATEGORIES.forEach(cat => {
            const items = settingsOptions.filter(o => o.category === cat.id);
            if (!items.length) return;
            listHTML += `<div class="shuo-cat-label" data-label="${cat.id}">${cat.label}</div>`;
            items.forEach(opt => {
                const control = opt.type === 'switch'
                    ? `<input type="checkbox" class="shuo-switch" id="${opt.id}">`
                    : `<div class="shuo-range-container">
                           <input type="range" class="shuo-range" id="${opt.id}"
                               min="${opt.min}" max="${opt.max}" step="${opt.step}" value="${opt.value}">
                       </div>`;
                listHTML += `
                    <div class="shuo-setting-item" data-cat="${opt.category}" data-name="${opt.name}">
                        <div class="shuo-setting-icon">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">${opt.icon}</svg>
                        </div>
                        <div class="shuo-setting-info">
                            <div class="shuo-setting-name">${opt.name}</div>
                            <div class="shuo-setting-desc" id="desc-${opt.id}">${opt.desc}</div>
                        </div>
                        ${control}
                    </div>`;
            });
        });

        /* 按钮 SVG */
        const svgShare  = `<svg viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round"
            d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0
            110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0
            00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"/></svg>`;
        const svgExport = `<svg viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round"
            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>`;
        const svgImport = `<svg viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round"
            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"/></svg>`;
        const svgTrash  = `<svg viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round"
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6
            m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>`;

        mask.innerHTML = `
            <div class="shuo-settings-panel" id="shuoweb-settings-panel">
                <div class="shuo-settings-header">
                    <h3 class="shuo-settings-title">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0
                                002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0
                                001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0
                                00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0
                                00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0
                                00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0
                                00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0
                                001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                        </svg>
                        Engineers Pro
                    </h3>
                    <div class="shuo-close-btn" id="shuo-close-btn" role="button" aria-label="关闭">
                        <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor"
                            stroke-width="2.5" fill="none">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
                        </svg>
                    </div>
                </div>
                ${searchHTML}
                <div class="shuo-settings-body" id="shuo-settings-body">
                    ${listHTML}
                </div>
                <div class="shuo-settings-footer">
                    <button class="shuo-btn primary" id="btn-copy-url">${svgShare} 分享入口</button>
                    <button class="shuo-btn success"  id="btn-export">${svgExport} 导出配置</button>
                    <button class="shuo-btn warning"  id="btn-import">${svgImport} 导入配置</button>
                    <button class="shuo-btn danger"   id="btn-clear-data">${svgTrash} 重置引擎</button>
                </div>
            </div>
        `;
        document.body.appendChild(mask);

        /* ── FPS 监控 ── */
        const fpsDiv = document.createElement('div');
        fpsDiv.id = 'shuo-fps-monitor';
        document.body.appendChild(fpsDiv);

        /* ── 进度条 ── */
        const progressBar = document.createElement('div');
        progressBar.id = 'shuo-progress-bar';
        document.body.appendChild(progressBar);

        /* ── 回顶按钮（内联 SVG 属性，确保任意宿主页面均可渲染）── */
        const totopBtn = document.createElement('button');
        totopBtn.id = 'shuo-totop-btn';
        totopBtn.setAttribute('aria-label', '回到顶部');
        totopBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24" width="22" height="22"
            fill="none"
            stroke="#ffffff"
            stroke-width="2.8"
            stroke-linecap="round"
            stroke-linejoin="round"
            style="display:block;pointer-events:none;">
            <path d="M5 15l7-7 7 7"/>
        </svg>`;
        document.body.appendChild(totopBtn);

        /* ── 光晕 ── */
        const glowDiv = document.createElement('div');
        glowDiv.id = 'shuo-cursor-glow';
        document.body.appendChild(glowDiv);

        /* ── Toast ── */
        const toast = document.createElement('div');
        toast.className = 'shuo-toast';
        toast.id = 'shuo-toast';
        document.body.appendChild(toast);

        /* ── 导入文件选择 ── */
        const importInput = document.createElement('input');
        importInput.type = 'file'; importInput.id = 'shuo-import-input';
        importInput.accept = '.json'; importInput.style.display = 'none';
        document.body.appendChild(importInput);
    }

    /* ================= 3. 功能实现 ================= */

    /* Toast */
    let toastTimer;
    function showToast(msg) {
        const t = document.getElementById('shuo-toast');
        t.textContent = msg;
        t.classList.add('show');
        clearTimeout(toastTimer);
        toastTimer = setTimeout(() => t.classList.remove('show'), 2200);
    }

    /* FPS 监控 */
    let fpsLoopId;
    function toggleFPS(on) {
        const el = document.getElementById('shuo-fps-monitor');
        if (on) {
            let last = performance.now(), frames = 0;
            const loop = () => {
                const now = performance.now();
                frames++;
                if (now >= last + 1000) {
                    const fps = Math.round((frames * 1000) / (now - last));
                    const dom = document.getElementsByTagName('*').length;
                    const mem = (performance.memory)
                        ? `MEM: ${(performance.memory.usedJSHeapSize / 1048576).toFixed(1)}MB`
                        : '';
                    el.innerHTML = `FPS: ${fps}<br>DOM: ${dom}${mem ? '<br>' + mem : ''}`;
                    el.style.color = fps < 30 ? '#ff3b30' : fps < 50 ? '#ffcc00' : '#34c759';
                    el.style.borderColor = el.style.color;
                    frames = 0; last = now;
                }
                fpsLoopId = requestAnimationFrame(loop);
            };
            fpsLoopId = requestAnimationFrame(loop);
        } else {
            cancelAnimationFrame(fpsLoopId);
            el.innerHTML = '';
        }
    }

    /* Emoji 净化 */
    let emojiObserver = null;
    function toggleEmojiPurifier(on) {
        const re = /[\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF]/g;
        const purify = (node) => {
            if (node.nodeType === 3) {
                if (re.test(node.nodeValue)) node.nodeValue = node.nodeValue.replace(re, '');
            } else if (node.nodeType === 1 && node.childNodes) {
                if (node.id === 'shuoweb-settings-mask' || node.tagName?.toLowerCase() === 'svg') return;
                node.childNodes.forEach(purify);
            }
        };
        if (on) {
            purify(document.body);
            emojiObserver = new MutationObserver(ms => ms.forEach(m => m.addedNodes.forEach(purify)));
            emojiObserver.observe(document.body, { childList: true, subtree: true, characterData: true });
        } else {
            if (emojiObserver) { emojiObserver.disconnect(); emojiObserver = null; }
            if (confirm('Emoji 已解除拦截。是否刷新页面以恢复原始显示？')) location.reload();
        }
    }

    /* 阅读进度条 */
    let progressH = null;
    function toggleProgress(on) {
        const bar = document.getElementById('shuo-progress-bar');
        if (on) {
            progressH = () => {
                const h = document.documentElement.scrollHeight - window.innerHeight;
                bar.style.width = (h > 0 ? Math.min(100, (window.scrollY / h) * 100) : 0) + '%';
            };
            window.addEventListener('scroll', progressH, { passive: true });
            progressH();
        } else {
            if (progressH) window.removeEventListener('scroll', progressH);
            progressH = null; bar.style.width = '0%';
        }
    }

    /* 回顶按钮 */
    let totopH = null;
    function toggleTotop(on) {
        const btn = document.getElementById('shuo-totop-btn');
        if (on) {
            totopH = () => btn.classList.toggle('visible', window.scrollY > 300);
            window.addEventListener('scroll', totopH, { passive: true });
            btn.onclick = () => window.scrollTo({ top: 0, behavior: 'smooth' });
            totopH();
        } else {
            if (totopH) window.removeEventListener('scroll', totopH);
            totopH = null; btn.classList.remove('visible');
        }
    }

    /* 外链拦截 */
    let extH = null;
    function toggleExtLink(on) {
        if (on) {
            extH = (e) => {
                const a = e.target.closest('a');
                if (a && a.href && !a.href.startsWith(location.origin) &&
                    !/^(#|javascript)/.test(a.getAttribute('href') || '')) {
                    a.target = '_blank'; a.rel = 'noopener noreferrer';
                }
            };
            document.addEventListener('click', extH, true);
            document.querySelectorAll(`a[href]:not([href^="#"]):not([href^="javascript"])`).forEach(a => {
                try {
                    if (new URL(a.href).origin !== location.origin) {
                        a.target = '_blank'; a.rel = 'noopener noreferrer';
                    }
                } catch {}
            });
        } else {
            if (extH) document.removeEventListener('click', extH, true);
            extH = null;
        }
    }

    /* 暗色模式 */
    function toggleDarkMode(on) {
        document.documentElement.classList.toggle('shuo-dark', on);
    }

    /* 灰度模式 */
    function toggleGrayscale(on) {
        document.documentElement.classList.toggle('shuo-grayscale', on);
    }

    /* 平滑滚动 */
    function toggleSmoothScroll(on) {
        document.documentElement.classList.toggle('shuo-smooth', on);
    }

    /* 鼠标光晕 */
    let glowH = null;
    function toggleHighlight(on) {
        const glow = document.getElementById('shuo-cursor-glow');
        if (on) {
            glowH = (e) => { glow.style.left = e.clientX + 'px'; glow.style.top = e.clientY + 'px'; };
            window.addEventListener('mousemove', glowH, { passive: true });
        } else {
            if (glowH) window.removeEventListener('mousemove', glowH);
            glowH = null;
        }
    }

    /* ================= 4. 事件绑定 ================= */
    function bindEvents() {
        const mask = document.getElementById('shuoweb-settings-mask');
        const closeBtn = document.getElementById('shuo-close-btn');

        window.addEventListener('hashchange', checkHash);
        closeBtn.addEventListener('click', closeSettings);
        mask.addEventListener('click', e => { if (e.target === mask) closeSettings(); });
        document.addEventListener('keydown', e => { if (e.key === 'Escape') closeSettings(); });

        /* 搜索框（已移除 Tab，直接按文字过滤）*/
        document.getElementById('shuo-search').addEventListener('input', e => {
            filterItems(e.target.value);
        });

        /* Switch 绑定工厂 */
        const bindSwitch = (id, cls, cb) => {
            const el = document.getElementById(id);
            if (!el) return;
            el.addEventListener('change', e => {
                const v = e.target.checked;
                if (cls) document.body.classList.toggle(cls, v);
                localStorage.setItem(`shuo_${id}`, v);
                if (cb) cb(v);
            });
        };

        bindSwitch('opt-immersive', 'immersive-mode');
        bindSwitch('opt-termux',   'termux-mode');
        bindSwitch('opt-m3',       'm3-mode');
        bindSwitch('opt-debug',    'debug-mode');
        bindSwitch('opt-fps',      'fps-mode', toggleFPS);
        bindSwitch('opt-noemoji',  '', toggleEmojiPurifier);
        bindSwitch('opt-progress', 'progress-mode', toggleProgress);
        bindSwitch('opt-totop',    'totop-mode', toggleTotop);
        bindSwitch('opt-extlink',  '', toggleExtLink);
        bindSwitch('opt-darkmode', '', toggleDarkMode);
        bindSwitch('opt-grayscale','', toggleGrayscale);
        bindSwitch('opt-noscroll', '', toggleSmoothScroll);
        bindSwitch('opt-highlight','highlight-mode', toggleHighlight);

        /* 动画速率 */
        const speedEl = document.getElementById('opt-speed');
        const speedDesc = document.getElementById('desc-opt-speed');
        speedEl.addEventListener('input', e => {
            const v = parseFloat(e.target.value);
            const map = { 0: '0s', 0.5: '0.6s', 1: '0.3s', 1.5: '0.15s', 2: '0.05s' };
            document.documentElement.style.setProperty('--transition',
                `all ${map[v] ?? '0.3s'} cubic-bezier(0.4, 0, 0.2, 1)`);
            speedDesc.textContent = v === 0 ? '已禁用全局动画' : `当前: ${v}x 阻尼`;
            localStorage.setItem('shuo_opt_speed', v);
        });

        /* 字体缩放 */
        const fontEl = document.getElementById('opt-fontsize');
        const fontDesc = document.getElementById('desc-opt-fontsize');
        fontEl.addEventListener('input', e => {
            const v = parseInt(e.target.value);
            document.documentElement.style.fontSize = v + '%';
            const label = v === 100 ? '标准' : v < 100 ? '缩小' : '放大';
            fontDesc.textContent = `当前: ${v}%（${label}）`;
            localStorage.setItem('shuo_opt_fontsize', v);
        });

        /* 分享入口 */
        document.getElementById('btn-copy-url').addEventListener('click', () => {
            navigator.clipboard.writeText(location.origin + location.pathname + '#setting')
                .then(() => showToast('✓ 入口链接已复制'))
                .catch(() => showToast('复制失败，请手动复制地址栏'));
        });

        /* 导出配置 */
        document.getElementById('btn-export').addEventListener('click', () => {
            const cfg = {};
            Object.keys(localStorage).filter(k => k.startsWith('shuo_'))
                .forEach(k => { cfg[k] = localStorage.getItem(k); });
            const blob = new Blob([JSON.stringify(cfg, null, 2)], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = Object.assign(document.createElement('a'), {
                href: url, download: `engineers-pro-${Date.now()}.json`
            });
            a.click(); URL.revokeObjectURL(url);
            showToast('✓ 配置已导出');
        });

        /* 导入配置 */
        document.getElementById('btn-import').addEventListener('click', () => {
            document.getElementById('shuo-import-input').click();
        });
        document.getElementById('shuo-import-input').addEventListener('change', function () {
            const file = this.files[0]; if (!file) return;
            const reader = new FileReader();
            reader.onload = e => {
                try {
                    const cfg = JSON.parse(e.target.result);
                    Object.entries(cfg).forEach(([k, v]) => {
                        if (k.startsWith('shuo_')) localStorage.setItem(k, v);
                    });
                    if (confirm('✓ 配置导入成功！刷新页面以应用所有设置？')) location.reload();
                } catch { showToast('文件格式错误，请检查 JSON'); }
            };
            reader.readAsText(file);
            this.value = '';
        });

        /* 重置引擎 */
        document.getElementById('btn-clear-data').addEventListener('click', () => {
            if (confirm('确认清空所有开发者配置缓存？此操作不可撤销。')) {
                Object.keys(localStorage).filter(k => k.startsWith('shuo_'))
                    .forEach(k => localStorage.removeItem(k));
                location.href = location.pathname;
            }
        });
    }

    /* ── 搜索过滤（已移除分类 Tab，仅保留文字搜索）── */
    function filterItems(query) {
        const q = (query || '').trim().toLowerCase();
        const body = document.getElementById('shuo-settings-body');
        body.querySelectorAll('.shuo-setting-item').forEach(item => {
            const nameMatch = !q || item.dataset.name.toLowerCase().includes(q);
            item.classList.toggle('shuo-hidden', !nameMatch);
        });
        /* 若某分类下所有项都被搜索隐藏，也隐藏分类标签 */
        body.querySelectorAll('.shuo-cat-label').forEach(label => {
            const labelCat = label.dataset.label;
            const hasVisible = [...body.querySelectorAll(`.shuo-setting-item[data-cat="${labelCat}"]`)]
                .some(el => !el.classList.contains('shuo-hidden'));
            label.style.display = hasVisible ? '' : 'none';
        });
    }

    /* ================= 5. 状态恢复 ================= */
    function checkHash() {
        const mask = document.getElementById('shuoweb-settings-mask');
        if (window.location.hash === '#setting') {
            mask.classList.add('active');
            document.body.style.overflow = 'hidden';
        } else {
            mask.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    function closeSettings() {
        history.replaceState(null, null, location.pathname + location.search);
        checkHash();
    }

    function loadData() {
        const applySwitch = (id, cls, cb) => {
            const el = document.getElementById(id); if (!el) return;
            const v = localStorage.getItem(`shuo_${id}`) === 'true';
            el.checked = v;
            if (v) { if (cls) document.body.classList.add(cls); if (cb) cb(true); }
        };

        applySwitch('opt-immersive', 'immersive-mode');
        applySwitch('opt-termux',    'termux-mode');
        applySwitch('opt-m3',        'm3-mode');
        applySwitch('opt-debug',     'debug-mode');
        applySwitch('opt-fps',       'fps-mode', toggleFPS);
        applySwitch('opt-noemoji',   '', toggleEmojiPurifier);
        applySwitch('opt-progress',  'progress-mode', toggleProgress);
        applySwitch('opt-totop',     'totop-mode', toggleTotop);
        applySwitch('opt-extlink',   '', toggleExtLink);
        applySwitch('opt-darkmode',  '', toggleDarkMode);
        applySwitch('opt-grayscale', '', toggleGrayscale);
        applySwitch('opt-noscroll',  '', toggleSmoothScroll);
        applySwitch('opt-highlight', 'highlight-mode', toggleHighlight);

        const speedVal = localStorage.getItem('shuo_opt_speed');
        if (speedVal !== null) {
            const el = document.getElementById('opt-speed');
            el.value = speedVal; el.dispatchEvent(new Event('input'));
        }

        const fontVal = localStorage.getItem('shuo_opt_fontsize');
        if (fontVal !== null) {
            const el = document.getElementById('opt-fontsize');
            el.value = fontVal; el.dispatchEvent(new Event('input'));
        }

        checkHash();
    }

})();