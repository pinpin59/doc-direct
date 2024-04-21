const admin = (req, res, next) => {
    if (req.userInfos.role !== 'ROLE_ADMIN')
      return res.status(403).json({ error: 'Access forbidden' })
    next()
  }
  
module.exports = admin
  