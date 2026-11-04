const express = require('express')
const healthRouter = require('./routes/health')

const app = express()
const PORT = process.env.PORT || 5000

app.use(express.json())

app.use('/health', healthRouter)

app.get('/api', (req, res) => {
  res.json({
    message: 'LMS Backend API is running'
  })
})

app.listen(PORT, '0.0.0.0', () => {
  console.log(`LMS backend running on port ${PORT}`)
})
