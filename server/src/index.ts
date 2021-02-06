import express from "express";
import http from "http";
import admin from 'firebase-admin'
// tslint:disable-next-line:no-var-requires
const bodyParser = require("body-parser");
// tslint:disable:no-console
const app = express();
const port = 8000; // default port to listen

app.set("port",port); // saw this on a random guide, idk if it's needed
const server = http.createServer(app);
// tslint:disable-next-line:no-var-requires
const cors = require("cors");
// DATABASE SET UP

// just following firebase cloudstore site example, may not need to do a require import
// tslint:disable-next-line:no-var-requires
const serviceAccount = require('../key/money-watch-9fad3-firebase-adminsdk-pb6d1-9ed8da59c2.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.get('/', (req, res) => {
  res.send("test");
})

app.get("/items/", async (req, res)=>{
  const itemsRef = db.collection('items');

  itemsRef.get().then(coll => {
    const response:any = {}
    coll.forEach(item => response[item.id] = item.data())
    res.send(JSON.stringify(response))
  }).catch(err => {
    console.log("CAUGHT")
    console.log(err)
  })
})

app.post("/items/add/", async (req, res) => {
//  let reqParsed = JSON.parse(req.body)
  const itemsRef = db.collection('items').doc(req.body.key)

  itemsRef.get().then( async doc => {
    if (!doc.exists) {
      console.log('Document does not exist. item may be created.!');
      // good to go
      await db.collection('items').doc(req.body.key).set({...req.body.value});

      const itemsRef2 = db.collection('items');

      itemsRef2.get().then(coll => {
        const response:any = {}
        coll.forEach(item => response[item.id] = item.data())
        res.send(JSON.stringify(response))
      }).catch(err => {
        console.log("CAUGHT")
        console.log(err)
      })
    } else {
      console.log('Document exists');
    }
  })
})

app.post("/items/edit/", async (req, res) => {
  //  let reqParsed = JSON.parse(req.body)
    const itemsRef = db.collection('items').doc(req.body.key)

    itemsRef.get().then( async doc => {
      if ( doc.exists) {
        console.log('Document  exist !');
        // good to go
        await db.collection('items').doc(req.body.key).set({...req.body.value});

        const itemsRef2 = db.collection('items');

        itemsRef2.get().then(coll => {
          const response:any = {}
          coll.forEach(item => response[item.id] = item.data())
          res.send(JSON.stringify(response))
        }).catch(err => {
          console.log("CAUGHT")
          console.log(err)
        })
      } else {
        console.log('Document does not exists');
      }
    })
  })

app.post("/items/delete/", async (req, res) => {
  //  let reqParsed = JSON.parse(req.body)
    const itemsRef = db.collection('items').doc(req.body.key)

    itemsRef.get().then( async doc => {
      if ( doc.exists) {
        console.log('Document  exist. item may be deleted.!');
        // good to go
        await db.collection('items').doc(req.body.key).delete();

        const itemsRef2 = db.collection('items');

        itemsRef2.get().then(coll => {
          const response:any = {}
          coll.forEach(item => response[item.id] = item.data())
          res.send(JSON.stringify(response))
        }).catch(err => {
          console.log("CAUGHT")
          console.log(err)
        })
      } else {
        console.log('Document does not exists');
      }
    })
  })


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

