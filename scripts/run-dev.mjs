import { spawn } from 'node:child_process'

const npmCommand = process.platform === 'win32' ? 'npm.cmd' : 'npm'
const projects = ['backend', 'frontend']
const children = projects.map((project) =>
  spawn(npmCommand, ['--prefix', project, 'run', 'dev'], {
    detached: process.platform !== 'win32',
    stdio: 'inherit',
  }),
)

let stopping = false

function stop(exitCode = 0) {
  if (stopping) return
  stopping = true

  for (const child of children) {
    if (child.killed || child.exitCode !== null) continue

    if (process.platform !== 'win32' && child.pid) {
      try {
        process.kill(-child.pid, 'SIGTERM')
      } catch {
        child.kill('SIGTERM')
      }
    } else {
      child.kill('SIGTERM')
    }
  }

  process.exitCode = exitCode
}

for (const child of children) {
  child.on('error', (error) => {
    console.error(error)
    stop(1)
  })

  child.on('exit', (code, signal) => {
    if (!stopping) stop(code ?? (signal ? 1 : 0))
  })
}

process.on('SIGINT', () => stop(0))
process.on('SIGTERM', () => stop(0))
