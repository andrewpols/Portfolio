import {readFileSync} from 'node:fs'
import {resolve} from 'node:path'
import {defineConfig, loadEnv} from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import {mockNowPlaying} from './dev/mock-now-playing.js'

// Serves /api/* handlers (Vercel-style) during `vite dev`
function devApi(env) {
    const mockStartedAt = Date.now()
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
                // NOW_PLAYING_MOCK=1 serves fake songs and never calls Spotify (see dev/mock-now-playing.js).
                if (env.NOW_PLAYING_MOCK === '1') {
                    res.setHeader('Content-Type', 'application/json')
                    res.end(JSON.stringify(mockNowPlaying(mockStartedAt)))
                    return
                }
                Object.assign(process.env, env)
                const {default: handler} = await server.ssrLoadModule('/api/now-playing.js')
                const out = {
                    status(code) { res.statusCode = code; return out },
                    setHeader(k, v) { res.setHeader(k, v) },
                    end() { res.end() },
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
