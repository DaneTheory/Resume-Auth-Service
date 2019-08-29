export default async (req, res) => {
    try {
      return await {
        message: 'Default Route'
      }
    } catch(err) {
      console.error(err)
      return err
    }
}
