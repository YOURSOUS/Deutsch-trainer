# 📘《德语自适应学习小站》前端维护与开发交接文档

你好！欢迎接手本项目。本项目是一个纯前端单文件（SPA）架构的德语自适应学习系统。考虑到后期维护和团队交接，我将核心架构、数据流向以及"绝对不要动"的雷区整理如下。

> **接手第一天的正确姿势**：先跑通它 → 读懂它 → 再改它。千万别上来就重构。

---

## 🛠️ 一、技术栈与目录结构

本项目**没有**使用 Webpack、Vite、Vue 或 React 等任何工程化框架。所有的 UI、业务逻辑和状态管理都高度内聚在一个 `index.html` 里。

| 路径 | 说明 | 备注 |
| --- | --- | --- |
| `index.html` | 主程序（HTML + CSS + 原生 JS 全在这一个文件） | 约 5900 行 / 270KB |
| `data/questions.js` | 主题库（A1–C1），挂到 `window.ALL_QUESTIONS` | |
| `data/words.js` | 词汇库数据 | 最大文件，约 1.1MB |
| `data/dictation.js` | 默写模式题库，挂到 `window.ALL_DICTATION` | 与主题库**完全独立** |
| `data/phonics.js` | 发音与字母数据，挂到 `window.ALL_PHONICS` | |
| `img/` | logo、等级图标（lv1–lv5）、日奈头像 | |
| `_archive/` | 21 个历史版本备份（`index_*备份.html`、`index (2).html`） | ⚠️ **禁止公开访问**，见第五节 |
| `404.html` | 站点 404 页，同时是 `_archive/*` 等敏感路径的封锁落地页 | |
| `netlify.toml` | Netlify 部署配置（`publish = "."` + 敏感路径 404 封锁） | **不可删除**，见第五节 |
| `.gitignore` | 排除 `_archive/`、`.idea/`、`.venv/`、`.workbuddy/`、`node_modules/` | |
| `package.json` | 仅保留元信息，**已无任何依赖**（原 `edge-tts-universal` 已移除） | |
| `convert_words.py` / `pgh.csv` | 早期词汇数据转换脚本与源表 | 一次性工具，可归档 |

数据文件全部通过 `<script>` 标签引入，**不是** ES Module，没有 import/export，加载顺序敏感。

---

## 🧠 二、核心业务逻辑（原理解析）

代码整体使用原生 JS 的 **IIFE（立即执行函数）** 做模块隔离，防止全局变量污染。

### 1. 全局状态与存储引擎（最核心）

- **`state` 对象**：整个应用的单一数据源。包含难度等级、当前视图、错题本（`wrong`）、间隔复习记录（`srs`）、连续打卡（`streak`）、默写错题本（`dictationWrong`）、判题锁（`locked`）等。
- **多源容灾存储 `collectStorageCandidates()`**（`index.html` 约 2154 行）：启动时把所有可能的存档源全部收集起来打分，择优恢复，再把最优结果回写到各处。候选源包括：
  - `de-adaptive-state`（主键，**永不改名**）
  - `de-adaptive-state-backup`（冗余副本）
  - `de-adaptive-state-history`（历史快照容器，只作救急）
  - `sessionStorage`
  - 一批历史遗留键：`de-adaptive-state-v1` / `de-state` / `deutsch-state` / `de-progress` / `de-backup`
  - 另有两个**只读不参与择优**的键（`de-adaptive-state-frozen` 等），用于冻结快照，避免污染打分。
- **防覆盖闸门**：如果启动时没读到存档、且用户未做任何操作，代码会**拒绝写盘**，防止空状态覆盖旧进度。
- **载荷指纹去重**：写入前对快照取哈希，没变化就不重复写，减少 IO。

> ⚠️ **强烈建议不要修改这块逻辑。** 这套"看起来过度设计"的代码，是被真实丢档事故逼出来的。

### 2. SRS（间隔复习）与判题逻辑

- 采用简单的间隔重复：`SRS_STEPS = [1, 3, 7, 15]` 天。
- 错题本规则：同一题**连对 2 次**后移出错题本（`streak >= 2`）。主题库与默写库各有一套独立错题本，但规则一致。
- 选择题 / 填空题 / 默写题共用一套判题逻辑，通过 `norm()` 做大小写、变音（ä/ö/ü/ß）、标点归一化；选项不足 2 个时，选择题会自动回落成填空题。
- 可分动词（trennbare Verben）有单独的判据处理，改动判题时务必回归测试这一类。

### 3. 发音引擎（历经九九八十一难的产物）

- **当前方案**：百度翻译公共接口（`fanyi.baidu.com/gettts`）为主 + 系统 `speechSynthesis` 兜底。
- **不要尝试改回 Netlify Edge TTS。** 公网云函数的冷启动 + 跨国网络延迟会导致极差的体验，这是已经踩过并回退过的坑。
- 手机端没声音，是安卓系统未安装德语 TTS 语音包，**不是代码 Bug**。

### 4. 四大会话视图

顶部 tab 切换，由 `switchView(name)` 统一驱动，取值只有四个：
`practice`（练习）/ `vocab`（词汇）/ `grammar`（语法）/ `toolbox`（工具箱）。

### 5. 空崎日奈悬浮助手（独立模块）

- 代码位于 `index.html` **最底部的一个独立 IIFE** 中（约 4800 行起）。
- 通过 `window.__STATE__` 和 `window.__SWITCH_VIEW__` **只读**全局状态，自身不写入任何业务状态。
- 支持：自定义台词（存 localStorage）、自定义头像（Canvas 压缩后存 Base64）、拖拽、视线追踪。
- 新增类似挂件时，请照抄这个模式：独立 IIFE + 只读全局入口。

### 6. 微信内置浏览器存档安全提示（2026-10-30 新增）

- 代码在 `index.html` **最末尾的最后一个 `<script>` 块**，又是一个独立 IIFE。
- 触发条件：`/MicroMessenger/i.test(navigator.userAgent)`，小程序 webview 会跳过。
- 行为：左下角淡入一条极轻的提示（12px、半透明卡面、12 秒自动淡出），点 ✕ 关闭后 **7 天内不再出现**。
- 只写自己的键 `de-wx-tip-dismissed`，**不在 `STORE_KEYS` 内**，不会被进度择优逻辑误读；不读不写 `state`，异常全部吞掉。
- 位置约束：`max-width: calc(100vw - 124px)`，为右下角日奈助手（72px 宽 + 24px 边距）让位，避免遮挡。
- **完全回退**：删掉末尾那个 `<script>` 块 + 样式表里的 `#wxTip` 相关 CSS 即可，零副作用。

---

## 🚨 三、接手须知与高危雷区（必看）

1. **禁止污染全局**：加新功能（比如番茄钟）请务必新建 `(function(){ ... })();` 的 IIFE。绝对不要把变量声明在全局，否则很容易和主程序变量打架。
2. **防抖与并发**：主程序里有大量 DOM 事件（尤其答题按钮）。在原有事件上加监听，务必做好状态锁（`state.locked`）判断，防止用户手速过快触发双次判题、双倍写盘。
3. **数据源格式**：加题直接在 `data/*.js` 里按原有数组格式追加，**不要改动主程序里的读取逻辑**。`id` 必须全局唯一，错题本和 SRS 靠它定位。
4. **CSS 变量**：UI 大量使用 `:root` 下的 CSS 变量（`--hina-primary` / `--hina-primary-deep` / `--hina-primary-a25|a32|a45` 等）来支持亮暗色主题。改样式请用变量，不要写死颜色，否则暗色主题会碎。
5. **改前先备份**：仓库里那 21 个 `index_*备份.html` 就是前任的习惯——每次大改前先另存一份。建议保留这个习惯（但请看第五节，记得清理）。

---

## 🚀 四、部署与测试

- **本地开发**：直接双击 `index.html` 能跑，但 `file://` 协议下部分跨域功能（调 API）会受限。建议用 VS Code 的 **Live Server** 插件。
- **线上部署**：托管在 GitHub + Netlify。推送到 `main` 分支 → Netlify 自动拉取部署。
- **无需构建、无需依赖**：`netlify.toml` 里 `publish = "."`，仓库根目录即发布目录，没有 build 步骤，也没有云函数。
- **敏感路径封锁**：`netlify.toml` 用 `[[redirects]]` + `status = 404` + `force = true`，把 `/_archive/*`、`/.idea/*`、`/.venv/*`、`/.workbuddy/*` 全部打成 404，回落到根目录的 `404.html`。

> ⚠️ **改完部署配置后必做一次验收**：浏览器直接访问 `<站点域名>/_archive/index_主题前备份.html`，必须看到 404 页面而不是备份文件。`force = true` 一旦漏写，静态文件会"影子化"掉规则，封锁直接失效。

---

## 📝 五、目前遗留的坑 / 待优化方向

### ✅ 已处理（2026-10-30 安全整改）

1. ~~**根目录备份文件会被公开部署**~~ → 21 个历史备份已全部移入 `_archive/`，并在 `netlify.toml` 中用 `force = true` 的 404 规则封死；`.gitignore` 同步排除。**文件本身没删**——这个目录当时并不是 Git 仓库，删掉无法找回。
2. ~~**Edge TTS 死代码未清理**~~ → `netlify/functions/` 整个目录、`node_modules/`、`package-lock.json` 已删除；`package.json` 移除了 `edge-tts-universal`，现在是零依赖。
3. ~~微信内 `sessionStorage` 丢档无提示~~ → 新增左下角轻提示（见第二节第 6 条），微信环境下主动引导换浏览器。

### ⏳ 仍需处理

4. **单文件体积已到临界点**：`index.html` 5900 行，检索和 diff 成本越来越高。若后续还要大改，可考虑把 CSS 抽成 `styles.css`、把判题/SRS/存储拆成 `js/core.js`，但**必须一次一小步**，且每步都能回滚。
5. **移动端兼容性**：安卓需装系统德语语音包才有声，或建议用 Edge 浏览器获得更好的 TTS 支持。
6. **警研智枢项目尚未完全合并入本仓库**，两边存在功能重叠，合并方案待定。
7. **题库量还需继续扩充**，尤其中高级（B2/C1）与默写题库。
8. **仓库尚未纳入 Git 版本管理**：本次整改时确认该目录不是 Git 仓库，也没有任何提交历史。强烈建议尽快 `git init` + 推送到远端，否则下一次"大胆重构"就没有后悔药。
9. **`publish = "."` 是宽口径**：根目录任何新增文件都会被发布。以后放源文件、脚本、草稿，请一律放进 `_archive/` 或新增目录并在 `netlify.toml` 里封锁。

---

## 📦 六、关键变更记录

### 2026-10-30 · 安全整改 + 死代码清理

| 变更 | 文件 | 说明 |
| --- | --- | --- |
| 历史备份归档 | `_archive/`（新建） | 21 个 `index_*.html` + `index (2).html` 从根目录移入，**未删除任何文件** |
| 敏感路径封锁 | `netlify.toml` | 4 条 `status = 404` + `force = true` 规则，新增 `X-Content-Type-Options` / `X-Frame-Options` |
| 404 落地页 | `404.html`（新建） | 自动跟随系统亮暗色，无任何外部依赖 |
| 忽略规则 | `.gitignore`（新建） | 排除 `_archive/`、`.idea/`、`.venv/`、`.workbuddy/`、`node_modules/` |
| 云函数移除 | `netlify/`（整目录删除） | 原 `functions/tts.js` 为 Edge TTS 遗留，主程序早已不调用 |
| 依赖归零 | `package.json` | 移除 `edge-tts-universal`；一并删除 `node_modules/`、`package-lock.json` |
| 微信端提示 | `index.html` | 末尾新增独立 IIFE + `#wxTip` 样式，微信内轻提示换浏览器，7 天内不重复 |

> 回退方式：本次所有改动都是**增量**的。`_archive/` 里的文件原样可用；`index.html` 的改动集中在两处（`</style>` 前的 CSS、`</body>` 前的 `<script>`），整段删掉即回到整改前状态。

---

## 💡 项目经理的唠叨

这套代码是"祖传"的，里面踩满了跨域、缓存、并发、移动端适配的坑。它不好看，但它**在用**。

接手后第一件事，先跑通它，读懂它，然后再去改它。千万别上来就重构，切记切记！
