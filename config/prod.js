// production key values

module.exports = {
  // your OnSched client credentials
  onschedClientID:     process.env.ONSCHED_CLIENT_ID,
  onschedClientSecret: process.env.ONSCHED_CLIENT_SECRET,
  scope:               process.env.SCOPE,

  // OnSched OpenID Connect URL
  onschedIdentityURL:  process.env.ONSCHED_IDENTITY_URL,

  // OnSched API URL
  onschedApiURL:       process.env.ONSCHED_API_URL,

  // a random sequence of characters for setting the
  // encrypted session cookie
  cookieKey:           process.env.COOKIE_KEY
}
