import { MongoClient } from "mongodb";

async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;
    
    const client = await MongoClient.connect(
      "mongodb+srv://ajlaleric:6iqIt2it71orTDjA@cluster0.8hldfm4.mongodb.net/?retryWrites=true&w=majority"
    );
    console.log(client);
    const db = client.db();
    
    const meetupCollections = db.collection("meetups");
    const result = await meetupCollections.insertOne(data);

    console.log(result);

    client.close();
    res.status(201).json({
      message: "Meetup added!",
    });
  }
}

export default handler;
