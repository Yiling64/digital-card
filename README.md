# 數位名片（方倚靈）

## 本機預覽

直接用瀏覽器打開 `index.html` 即可。

## 圖片怎麼嵌入？

這份作業使用 **相對路徑**（最推薦）：

- 把照片放在 `assets/avatar.png`
- HTML 用 `<img src="./assets/avatar.png">` 讀取

只要你把整個資料夾一起上傳到網站（例如 GitHub Pages），圖片就會正常顯示。

## 交作業：給老師一個 HTML 網址（GitHub Pages）

1. 到 GitHub 新增一個 repository（例如：`digital-card`）
2. 把 `digital-card/` 資料夾裡的檔案全部上傳到 repo **根目錄**（要看到 `index.html` 在最外層）
3. GitHub repo → **Settings** → **Pages**
4. Source 選 **Deploy from a branch**
5. Branch 選 `main`（或 `master`） / Folder 選 `/ (root)` → Save
6. 等 1–2 分鐘，Pages 會給你一個網址（例如：`https://<你的帳號>.github.io/digital-card/`）

之後把這個網址交給老師即可。

## （選用）如果老師要求「只有一個 HTML 檔」

可以把圖片轉成 Base64，塞進 `<img src="data:image/png;base64,...">`。
缺點是檔案會變很大、不好維護；除非老師明講「單檔」，不建議。

