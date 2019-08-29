export default async (req, res) => {
    try {
      let msg = {
        message: 'Hello Route'
      }
      return await msg
    } catch(err) {
      console.error(err)
      return err
    }
}
