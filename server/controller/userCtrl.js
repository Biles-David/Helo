const bcrypt = require('bcryptjs')

// function getUser () {
//   const db = req.app.get('db');
//   db.get_user()
//   .then(response => res.json(response))
//   .catch(err => console.log(err))
// }

async function getSession(req, res){
  res.status(200).json(req.session.user)
}

async function login ( req, res ) {
  const db = req.app.get('db');
  const check = await db.get_user([req.body.username])
  if(!check[0]) {
    res.status(401).json({error: 'User or Password Incorrect'})
  } else {
    let compare = await bcrypt.compare(req.body.password, check[0].hash)
    if(!compare){
      res.status(410).json({error: 'User or Password Incorrect'})
    } else {
      let user = check[0]
      req.session.user = {
        username: user.username,
        admin: user.admin,
        id: user.id
      }
      res.status(200).json(req.session.user)
    }
  }
}

async function register(req, res) {
  const db = req.app.get("db");
  let isAdmin = false;
  const { username, password } = req.body;
  const result = await db.get_user([username]);
  const existingUser = result[0];
  if (existingUser) {
    return res.status(409).json({ error: "Username taken" });
  }
  const hash = await bcrypt.hash(password, 10);
  let registeredUser = "";
  try {
    registeredUser = await db.new_user([isAdmin, username, hash]);
  } catch {
    res.status(400).json(err => console.log(err));
  }
  const user = registeredUser[0];
  req.session.user = {
    isAdmin: user.is_admin,
    username: user.username,
    id: user.id
  };
  return res.status(201).json(req.session.user);
}

module.exports = {
  login,
  register,
  getSession,
}