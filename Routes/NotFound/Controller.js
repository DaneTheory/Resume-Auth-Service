export default async (req, res) => {
    try {
      let msg = {
        message: 'Not Found'
      }
      return await msg
    } catch(err) {
      console.error(err)
      return err
    }
}
