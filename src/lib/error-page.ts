export function renderErrorPage(): string {
  return `<!doctype html>
<html lang="es">
  <head>
    <meta charset="utf-8" />
    <title>Algo no salió como esperábamos | Exento</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#2C2724" />
    <style>
      body { font-family: Georgia, "Times New Roman", serif; background: #2c2724; color: #f6f1e4; display: grid; place-items: center; min-height: 100vh; margin: 0; padding: 1.5rem; }
      .card { max-width: 32rem; width: 100%; text-align: center; }
      .eyebrow { font-family: ui-sans-serif, system-ui, sans-serif; font-size: 10px; letter-spacing: 0.42em; text-transform: uppercase; color: #d4b56a; margin: 0 0 1.5rem; }
      h1 { font-size: 2.25rem; font-weight: 300; margin: 0 0 0.75rem; }
      p { font-family: ui-sans-serif, system-ui, sans-serif; color: #c4b8a4; margin: 0 0 1.75rem; font-size: 0.9rem; }
      .actions { display: flex; gap: 0.75rem; justify-content: center; flex-wrap: wrap; }
      a, button { padding: 0.75rem 1.25rem; font: 500 10px/1 ui-sans-serif, system-ui, sans-serif; letter-spacing: 0.28em; text-transform: uppercase; cursor: pointer; text-decoration: none; border: 1px solid transparent; }
      .primary { background: #d4b56a; color: #2c2724; }
      .secondary { background: transparent; color: #d4b56a; border-color: #b89a6a; }
    </style>
  </head>
  <body>
    <div class="card">
      <p class="eyebrow">Exento</p>
      <h1>Algo no salió como esperábamos.</h1>
      <p>Intenta nuevamente o regresa a nuestra página principal.</p>
      <div class="actions">
        <button class="primary" onclick="location.reload()">Intentar nuevamente</button>
        <a class="secondary" href="/">Volver al inicio</a>
      </div>
    </div>
  </body>
</html>`;
}
