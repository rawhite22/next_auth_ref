import connectMongo from '../../lib/db'
import User from '../../models/userModel'

export default async function addTest(req, res) {
  try {
    console.log('CONNECTING TO MONGO')
    await connectMongo()
    console.log('CONNECTED TO MONGO')

    console.log('CREATING DOCUMENT')
    const user = await User.create(req.body)
    console.log('CREATED DOCUMENT')

    res.json({ user })
  } catch (error) {
    console.log(error)
    res.json({ error })
  }
}
