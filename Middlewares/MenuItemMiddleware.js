
export function MenuItemMiddleware (req, res, next) {
  const allMenuItems = ['big pizza', 'small pizza', 'cola', 'water', 'garlic bread']
  res.json(allMenuItems)
  res.status(200)
  next()
}
