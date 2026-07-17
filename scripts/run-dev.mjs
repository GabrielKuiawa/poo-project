import { spawn, spawnSync } from 'node:child_process'

const npmCommand = process.platform === 'win32' ? 'npm.cmd' : 'npm'

function runNpmScript(script) {
  return spawnSync(npmCommand, ['run', script], {
    stdio: 'inherit',
  })
}

const databaseStart = runNpmScript('db:up')

if (databaseStart.status !== 0) {
  process.exit(databaseStart.status ?? 1)
}

const projects = ['backend', 'frontend']
const children = projects.map((project) =>
  spawn(npmCommand, ['--prefix', project, 'run', 'dev'], {
    detached: process.platform !== 'win32',
    stdio: 'inherit',
  }),
)

let stopping = false

function stopChild(child) {
  if (child.killed || child.exitCode !== null) return

  if (process.platform !== 'win32' && child.pid) {
    try {
      process.kill(-child.pid, 'SIGTERM')
      return
    } catch {
      // The process may already have stopped on the original signal.
    }
  }

  child.kill('SIGTERM')
}

function stop(exitCode = 0) {
  if (stopping) return
  stopping = true

  for (const child of children) {
    stopChild(child)
  }

  const databaseStop = runNpmScript('db:down')
  process.exitCode = exitCode || databaseStop.status || 0
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
