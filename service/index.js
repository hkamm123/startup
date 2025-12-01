const { MongoClient } = require('mongodb');
const config = require('./dbConfig.json');
const { peerProxy } = require('./peerProxy.js');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('startup');
const userCollection = db.collection('user');
const budgetCollection = db.collection('budget');

(async function testConnection() {
  try {
    await db.command({ ping: 1 });
    console.log(`Connected to database`);
  } catch (ex) {
    console.log(`Unable to connect to database with ${url} because ${ex.message}`);
    process.exit(1);
  }
})();

const express = require('express');
const app = express();

const port = process.argv.length > 2 ? process.argv[2] : 4000;

const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const uuid = require('uuid');
const authCookieName = 'token';

app.use(express.json());
app.use(cookieParser());

let apiRouter = express.Router();
app.use(`/api`, apiRouter);

app.use(express.static('public'));

// CreateAuth a new user
// example: curl -v -X POST localhost:4000/api/auth/create -H 'Content-Type: application/json' -d '{"email":"s@byu.edu", "password":"byu"}' -c cookies.txt -b cookies.txt
apiRouter.post('/auth/create', async (req, res) => {
  if (await getUser(req.body.email)) {
    res.status(409).send({ msg: 'Existing user' });
  } else {
    const user = await createUser(req.body.email, req.body.password);

    setAuthCookie(res, user.token);
    await addUser(user);
    res.send({ email: user.email });
  }
});

function getUser(email) {
  return userCollection.findOne({ email: email });
}

async function addUser(user) {
  await userCollection.insertOne(user);
}

// GetAuth login an existing user
// example: curl -v -X POST localhost:4000/api/auth/login -H 'Content-Type: application/json' -d '{"email":"s@byu.edu", "password":"byu"}' -c cookies.txt -b cookies.txt
apiRouter.post('/auth/login', async (req, res) => {
  const user = await getUser(req.body.email);
  if (user) {
    if (await bcrypt.compare(req.body.password, user.password)) {
      user.token = uuid.v4();
      await updateUser(user)
      setAuthCookie(res, user.token);
      res.send({ email: user.email });
      return;
    }
  }
  res.status(401).send({ msg: 'Unauthorized' });
});

async function updateUser(user) {
  await userCollection.updateOne({ email: user.email }, { $set: user });
}

// DeleteAuth logout a user
// example: curl -v -X DELETE localhost:4000/api/auth/logout -c cookies.txt -b cookies.txt
apiRouter.delete('/auth/logout', async (req, res) => {
  const user = await findUser('token', req.cookies[authCookieName]);
  if (user) {
    delete user.token;
    await updateUser(user);
  }
  res.clearCookie(authCookieName);
  res.status(204).end();
});

// Middleware to verify that the user is authorized to call an endpoint
const verifyAuth = async (req, res, next) => {
  const user = await getUserByToken(req.cookies[authCookieName]);
  if (user) {
    next();
  } else {
    res.status(401).send({ msg: 'Unauthorized' });
  }
};

function getUserByToken(token) {
  return userCollection.findOne({ token: token });
}

// GET the budget that belongs to the current user (if there isn't one, then create one)
// example: curl -v -X GET localhost:4000/api/budget -c cookies.txt -b cookies.txt
apiRouter.get('/budget', verifyAuth, async (req, res) => {
  const user = await getUserByToken(req.cookies[authCookieName]);
  const budget = await getBudget(user.email);
  if (budget) {
    res.send(budget.budgetObj);
  } else {
    const newBudget = await createBudget(user.email);
    await addBudget(newBudget);
    res.send(newBudget.budgetObj);
  }
});

function getBudget(ownerEmail) {
  return budgetCollection.findOne({ owner: ownerEmail });
}

async function addBudget(budget) {
  await budgetCollection.insertOne(budget);
}

// PUT update the current user's budget
// example: curl -v -X PUT localhost:4000/api/budget -H 'Content-Type: application/json' -d <budget json> -c cookies.txt -b cookies.txt
apiRouter.put('/budget', verifyAuth, async (req, res) => {
  const user = await getUserByToken(req.cookies[authCookieName]);
  const json = req.body;
  if (!json) return res.status(401).send({ msg: 'No budget provided in request' });
  const existing = await getBudget(user.email);
  if (existing) {
    const newBudget = {
      owner: existing.owner,
      budgetObj: json
    }
    await updateBudget(newBudget)
    res.status(200).send(newBudget.budgetObj);
  }
  return;
});

async function updateBudget(budget) {
  await budgetCollection.updateOne({ owner: budget.owner }, { $set: { budgetObj: budget.budgetObj } });
}

// Default error handler
app.use(function (err, req, res, next) {
  res.status(500).send({ type: err.name, message: err.message });
});

// Return the application's default page if the path is unknown
app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

async function createUser(email, password) {
  const passwordHash = await bcrypt.hash(password, 10);

  const user = {
    email: email,
    password: passwordHash,
    token: uuid.v4(),
  };

  return user;
}

async function createBudget(owner) {
  const budget = {
    owner: owner,
    budgetObj: { categories: [] }
  }

  return budget;
}

// setAuthCookie in the HTTP response
function setAuthCookie(res, authToken) {
  res.cookie(authCookieName, authToken, {
    secure: true,
    httpOnly: true,
    sameSite: 'strict',
  });
}

const httpService = app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

peerProxy(httpService);