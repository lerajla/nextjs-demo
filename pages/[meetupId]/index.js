import { Fragment } from "react";
import MeetupDetail from "../../components/meetups/MeetupDetail";
import { MongoClient, ObjectId } from "mongodb";
import Head from "next/head";

function MeetupDetails(props) {
  return (
    <Fragment>
      <Head>
        <title>Meetup detail {props.meetupData.title}</title>
        <meta name="description" content="Meetup detail"></meta>
      </Head>
      <MeetupDetail
        image={props.meetupData.image}
        title={props.meetupData.title}
        address={props.meetupData.address}
        description={props.meetupData.description}
      />
    </Fragment>
  );
}

export async function getStaticPaths() {
  const client = await MongoClient.connect(
    "mongodb+srv://ajlaleric:6iqIt2it71orTDjA@cluster0.8hldfm4.mongodb.net/?retryWrites=true&w=majority"
  );
  const db = client.db();

  const meetupCollections = db.collection("meetups");
  const meetups = await meetupCollections.find({}, { _id: 1 }).toArray();
  client.close();

  return {
    fallback: 'blocking',
    paths: meetups.map((meetup) => ({
      params: {
        meetupId: meetup._id.toString(),
      },
    })),
  };
}

export async function getStaticProps(context) {
  const meetupId = context.params.meetupId;

  const client = await MongoClient.connect(
    "mongodb+srv://ajlaleric:6iqIt2it71orTDjA@cluster0.8hldfm4.mongodb.net/?retryWrites=true&w=majority"
  );
  const db = client.db();

  const meetupCollections = db.collection("meetups");
  const selectedMeetup = await meetupCollections.findOne({
    _id: new ObjectId(meetupId),
  });
  client.close();

  return {
    props: {
      meetupData: {
        id: selectedMeetup._id.toString(),
        title: selectedMeetup.title,
        address: selectedMeetup.address,
        image: selectedMeetup.image,
        description: selectedMeetup.description,
      },
    },
  };
}

export default MeetupDetails;
