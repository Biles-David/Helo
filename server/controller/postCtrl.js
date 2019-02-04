function getPosts (req, res) {
  const db = req.app.get('db');
  db.get_posts()
  .then(response => res.status(200).json(response))
  .catch(err => console.log(err))
}

function getQueryPosts (req, res) {
  const db = req.app.get('db');
  db.get_query_posts(req.query.username)
  .then(response => res.status(200).json(response))
  .catch(err => console.log(err))
}

module.exports = {
  getPosts,
  getQueryPosts
}