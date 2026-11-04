const test = require('node:test')
const assert = require('node:assert/strict')
const app = require('../src/server')

test('LMS backend health endpoints return UP', async () => {
  const server = app.listen(0, '127.0.0.1')

  try {
    await new Promise(resolve => server.once('listening', resolve))

    const port = server.address().port

    const endpoints = ['/health/', '/api/health/']

    for (const endpoint of endpoints) {
      const response = await fetch(
        `http://127.0.0.1:${port}${endpoint}`
      )

      assert.equal(response.status, 200)

      const data = await response.json()

      assert.equal(data.status, 'UP')
      assert.equal(data.service, 'LMS Backend')
    }
  } finally {
    await new Promise((resolve, reject) => {
      server.close(error => error ? reject(error) : resolve())
    })
  }
})

test('LMS backend API root returns expected message', async () => {
  const server = app.listen(0, '127.0.0.1')

  try {
    await new Promise(resolve => server.once('listening', resolve))

    const port = server.address().port
    const response = await fetch(`http://127.0.0.1:${port}/api`)

    assert.equal(response.status, 200)

    const data = await response.json()

    assert.equal(data.message, 'LMS Backend API is running')
  } finally {
    await new Promise((resolve, reject) => {
      server.close(error => error ? reject(error) : resolve())
    })
  }
})
