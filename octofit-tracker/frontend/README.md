# OctoFit Frontend

## Environment Variables

Define `VITE_CODESPACE_NAME` for Codespaces API routing (for example in `.env.local`):

```bash
VITE_CODESPACE_NAME=your-codespace-name
```

The app builds API URLs as:

```text
https://${VITE_CODESPACE_NAME}-8000.app.github.dev/api/[component]/
```

Safe fallback behavior is included. If `VITE_CODESPACE_NAME` is unset, the app uses:

```text
http://localhost:8000/api/[component]/
```
