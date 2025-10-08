import crypto from 'crypto'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { password } = body

  // Get password hash from environment variable
  const storedHash = process.env.DOWNLOADS_PASSWORD_HASH

  if (!storedHash) {
    throw createError({
      statusCode: 500,
      message: 'Server configuration error'
    })
  }

  if (!password) {
    throw createError({
      statusCode: 400,
      message: 'Password required'
    })
  }

  // Hash the input password using Node.js crypto (same as generate script)
  const inputHash = crypto.createHash('sha256').update(password).digest('hex')

  // Compare hashes
  const isValid = inputHash === storedHash

  return {
    success: isValid
  }
})
