import {readFileSync} from 'node:fs'
import {resolve} from 'node:path'
import {defineConfig, loadEnv} from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Serves /api/* handlers (Vercel-style) during `vite dev`
function devApi(env) {
    return {
        name: 'dev-api',
        configureServer(server) {
            // Same forced-download response vercel.json gives the resume in production.
            server.middlewares.use('/download/AndrewPolsResume.pdf', (req, res) => {
                res.setHeader('Content-Type', 'application/octet-stream')
                res.setHeader('Content-Disposition', 'attachment; filename="AndrewPolsResume.pdf"')
                res.end(readFileSync(resolve(process.cwd(), 'public/AndrewPolsResume.pdf')))
            })

            server.middlewares.use('/api/now-playing', async (req, res) => {
                Object.assign(process.env, env)
                const {default: handler} = await server.ssrLoadModule('/api/now-playing.js')
                const out = {
                    status(code) { res.statusCode = code; return out },
                    setHeader(k, v) { res.setHeader(k, v) },
                    json(body) {
                        res.setHeader('Content-Type', 'application/json')
                        res.end(JSON.stringify(body))
                    },
                }
                await handler(req, out)
            })
        },
    }
}

// https://vite.dev/config/
export default defineConfig(({mode}) => ({
    plugins: [
        react(),
        tailwindcss(),
        devApi(loadEnv(mode, process.cwd(), '')),
    ],
    server: {
        host: "127.0.0.1",
        port: 5173, 
    }
}))
