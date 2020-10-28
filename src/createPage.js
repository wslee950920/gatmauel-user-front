const createPage = (root, tags) => {
  return `
          <!DOCTYPE html>
          <html lang="ko">
          <head>
            <meta charset="utf-8" />
            <link rel="icon" href="/images/icons/favicon.ico" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta name="theme-color" content="#000000" />
            <meta name="description" content="갯마을 바지락 칼국수 보쌈 홈페이지" />
            <meta name="author" content="WSL" />
            <meta name="mobile-web-app-capable" content="yes" />
            <meta name="apple-mobile-web-app-capable" content="yes" />
            <meta name="apple-mobile-web-app-title" content="갯마을" />
            <link rel="apple-touch-icon" href="/images/icons/favicon.ico" />
            <link rel="manifest" href="/manifest.json" />
            <!-- Google Fonts -->
            <link
              rel="stylesheet"
              href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
            />
            <link
              rel="stylesheet"
              href="https://fonts.googleapis.com/icon?family=Material+Icons"
            />
            <!-- Font Awesome -->
            <link 
              rel="stylesheet" 
              href="https://use.fontawesome.com/releases/v5.8.2/css/all.css"
            />
            <!-- Bootstrap core CSS -->
            <link 
              href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.5.0/css/bootstrap.min.css" 
              rel="stylesheet"
            />
            <!-- Material Design Bootstrap -->
            <link 
              href="https://cdnjs.cloudflare.com/ajax/libs/mdbootstrap/4.19.1/css/mdb.min.css" 
              rel="stylesheet"
            />
            <style>
              .root {
                visibility: hidden;
              }

              .ssr-loading {
                position: fixed;
                z-index: 99;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: white;
                display: flex;
                justify-content: center;
                align-items: center;
              }
          
              .ssr-loading.hidden {
                animation: fadeOut 1s;
                animation-fill-mode: forwards;
              }
          
              @keyframes fadeOut {
                100% {
                  opacity: 0;
                  visibility: hidden;
                }
              }
            </style>
            <title>갯마을</title>
            ${tags.styles}
            ${tags.links}
          </head>
          <body>
            <noscript>You need to enable JavaScript to run this app.</noscript>
            <div id="root" class="root">
              ${root}
            </div>
            <div class="ssr-loading" id="ssr-loading">
              <img src="/images/icons/logo192.png" alt="Loading..." />
            </div>
            ${tags.scripts}
            <script>
              window.addEventListener("load", function () {
                const loading = document.getElementById("ssr-loading");
                const root = document.getElementById("root");

                root.className -= "root"
                loading.className += " hidden"; // class "loader hidden"
              });
            </script>
          </body>
      </html>
      `;
};

export default createPage;
