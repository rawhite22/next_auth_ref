import { getSession, signOut } from 'next-auth/react'

function Authenticated(props) {
  async function getToken() {
    const response = await fetch('/api/auth/token')

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || 'Something went wrong!')
    }
    console.log(data)
    return data
  }

  console.log(props.session)

  return (
    <div>
      Authenticated
      <br />
      <button onClick={getToken}>Get Token</button>
      <button onClick={signOut}>Sign Out</button>
    </div>
  )
}
export default Authenticated

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req })
  console.log(session)
  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  return {
    props: { session },
  }
}
