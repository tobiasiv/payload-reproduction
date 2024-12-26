'use client'

export default function Page() {
  async function login() {
    const result = await fetch('http://localhost:3000/api/customers/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'customer@test.com',
        password: 'password',
      }),
    })

    const data = await result.json()

    console.log(data.user ? 'Login successful' : 'Login failed')
  }

  async function logout() {
    await fetch('http://localhost:3000/api/customers/logout', {
      method: 'POST',
    })
  }

  return (
    <div style={{ display: 'flex', gap: '1rem' }}>
      <button onClick={login}>Login Customer</button>
      <button onClick={logout}>Logout Customer</button>
    </div>
  )
}
