const express = require("express");
const path = require("path");

const admin = require("firebase-admin");

const credentials = require("./key.json");

admin.initializeApp({
  credential: admin.credential.cert(credentials),
});

const db = admin.firestore();

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.post("/create", async (req, res) => {
  try {
    const productJson = {
      name: req.body.name,
      price: req.body.price,
      urlImage: req.body.urlImage,
    };
    const response = await db.collection("products").add(productJson);
    console.log(response);
    res.send(response);
  } catch (err) {
    res.send(err);
  }
});

app.get("/get/all", async (req, res) => {
  try {
    const productsRef = db.collection("products");
    const response = await productsRef.get();
    let responseArr = [];

    response.forEach((doc) => {
      const newData = { ...doc.data(), id: doc.id };
      responseArr.push(newData);
    });

    res.send(responseArr);
  } catch (err) {
    res.send(err);
  }
});

app.get("/get/:id", async (req, res) => {
  try {
    const productRef = db.collection("products").doc(req.params.id);
    const response = await productRef.get();

    res.send(response.data());
  } catch (err) {
    res.send(err);
  }
});

app.put("/update", async (req, res) => {
  try {
    const id = req.body.id;
    const productJson = {
      name: req.body.name,
      price: req.body.price,
      urlImage: req.body.urlImage,
    };

    const productRef = await db
      .collection("products")
      .doc(id)
      .update(productJson);
    res.send(productRef);
  } catch (err) {
    res.send(err);
  }
});

app.delete("/delete/:id", async (req, res) => {
  try {
    const response = await db
      .collection("products")
      .doc(req.params.id)
      .delete();
    res.send(response);
  } catch (err) {
    res.send(err);
  }
});

// app.use(express.static(path.join(__dirname, "../client/build")));

// app.get("*", (req, res) => {
//   res.sendFile(
//     path.join(__dirname, "../client/build/index.html"),
//     function (error) {
//       if (error) {
//         res.status(500).send(error);
//       }
//     }
//   );
// });

app.listen(process.env.PORT || 5000, () => {
  console.log("running");
});
