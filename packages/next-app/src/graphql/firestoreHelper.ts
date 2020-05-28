import firebase, { firestore } from "firebase"
import { VideoInput, PlaylistInput } from "../graphql/type-defs.graphqls"
import { initFirebase } from "../utils/initFirebase"

export class FirestoreDao {
  static PLAYLISTS_VIDEOS = "playlists_videos"
  static VIDEOS = "videos"
  static PLAYLISTS = "playlists"

  db: firebase.firestore.Firestore
  uid: string
  playlistCollection: firebase.firestore.CollectionReference
  videoCollection: firebase.firestore.CollectionReference
  playlistsVideoLinkCollection: firebase.firestore.CollectionReference

  constructor(uid: string) {
    initFirebase()
    this.db = firebase.firestore()
    this.uid = uid
    this.playlistCollection = this.db.collection(FirestoreDao.PLAYLISTS)
    this.videoCollection = this.db.collection(FirestoreDao.VIDEOS)
    this.playlistsVideoLinkCollection = this.db.collection(
      FirestoreDao.PLAYLISTS_VIDEOS,
    )
  }
  async deleteVideo(id: string | firestore.DocumentReference) {
    const doc = typeof id === "string" ? this.videoCollection.doc(id) : id
    const snapshots = await this.db
      .collectionGroup(FirestoreDao.PLAYLISTS_VIDEOS)
      .where("ref", "==", doc)
      .where("uid", "==", this.uid)
      .get()

    await Promise.all(
      snapshots.docs.map(async (item) => {
        await item.ref.delete()
      }),
    )

    await doc.delete()
  }

  async updatePlaylistWithNewInfo(params: {
    playlist: string | firebase.firestore.DocumentReference
    totalSec: number
    previousTotalSec?: number
    type: "add" | "delete"
  }) {
    const playlistDoc =
      typeof params.playlist === "string"
        ? this.playlistCollection.doc(params.playlist)
        : params.playlist
    const playlistRes = await playlistDoc.get()
    if (!playlistRes.exists) {
      throw new Error("This video doesn't exist")
    }
    const data = playlistRes.data()!
    if (data.uid !== this.uid) {
      throw new Error("Permission denied")
    }
    await playlistDoc.update({
      numOfVideos: firebase.firestore.FieldValue.increment(
        params.type === "add" ? 1 : -1,
      ),
      totalSec: firebase.firestore.FieldValue.increment(
        params.type === "add" ? params.totalSec : params.totalSec * -1,
      ),
    })
  }
  async updateVideo(
    video: string | firebase.firestore.DocumentReference,
    videoInput: VideoInput,
  ) {
    const videoDoc =
      typeof video === "string"
        ? this.db.collection(FirestoreDao.VIDEOS).doc(video)
        : video
    return await videoDoc.update({
      comment: videoInput.comment,
      start: videoInput.start,
      end: videoInput.end,
    })
  }
  async getPlaylistById(id: string) {
    const doc = this.db.collection(FirestoreDao.PLAYLISTS).doc(id)
    const snapshot = await doc.get()
    if (!snapshot.exists) {
      throw new Error("This video doesn't exist")
    }
    const data = snapshot.data()!
    if (data.uid !== this.uid) {
      throw new Error("Permission denied")
    }
    return {
      doc,
      data: {
        id: data.id,
        name: data.name,
        numOfVideos: data.numOfVideos,
        totalSec: data.totalSec,
        created: data.created.toDate(),
        comment: data.comment,
      },
    }
  }
  async getVideo(video: string | firebase.firestore.DocumentReference) {
    const doc =
      typeof video === "string"
        ? this.db.collection(FirestoreDao.VIDEOS).doc(video)
        : video
    const snapshot = await doc.get()
    if (!snapshot.exists) {
      throw new Error("This video deosn't exist")
    }
    const data = snapshot.data()!
    if (data.uid !== this.uid) {
      throw new Error("Permission denied")
    }
    const tmpSnapshots = await this.db
      .collectionGroup(FirestoreDao.PLAYLISTS_VIDEOS)
      .where("ref", "==", doc)
      .where("uid", "==", this.uid)
      .get()

    const playlists = await Promise.all(
      tmpSnapshots.docs.map(async (item) => {
        const playlistDoc: firestore.DocumentReference = item.get("playlistRef")
        const playlistSnapshot = await playlistDoc.get()
        return {
          id: playlistSnapshot.id,
          name: playlistSnapshot.get("name"),
          permission: playlistSnapshot.get("permission"),
          comment: playlistSnapshot.get("comment"),
          numOfVideos: playlistSnapshot.get("numOfVideos"),
          totalSec: playlistSnapshot.get("totalSec"),
          created: playlistSnapshot.get("created").toDate(),
        }
      }),
    )

    return {
      doc,
      data: {
        id: snapshot.id,
        title: data.title,
        start: data.start,
        end: data.end,
        videoId: data.videoId,
        comment: data.comment,
        created: data.created.toDate(),
        playlists,
      },
    }
  }
  async getVideos() {
    const snapshots = await this.videoCollection
      .where("uid", "==", this.uid)
      .orderBy("created", "desc")
      .get()
    if (snapshots.empty) {
      return []
    }
    return snapshots.docs.map((item) => ({
      id: item.id,
      title: item.get("title"),
      videoId: item.get("videoId"),
      start: item.get("start"),
      end: item.get("end"),
      comment: item.get("comment"),
      uid: this.uid,
      created: item.get("created").toDate(),
    }))
  }
  async getPlaylists() {
    const snapshots = await this.db
      .collection(FirestoreDao.PLAYLISTS)
      .where("uid", "==", this.uid)
      .orderBy("created", "desc")
      .get()
    if (snapshots.empty) {
      return []
    }

    return await Promise.all(
      snapshots.docs.map(async (item) => {
        const first = await item.ref
          .collection(FirestoreDao.PLAYLISTS_VIDEOS)
          .orderBy("created", "asc")
          .limit(1)
          .get()
        const firstVideoId = first.empty ? "" : first.docs[0].get("videoId")
        return {
          id: item.id,
          name: item.get("name"),
          comment: item.get("comment"),
          numOfVideos: item.get("numOfVideos"),
          totalSec: item.get("totalSec"),
          firstVideoId,
          permission: item.get("permission"),
          created: item.get("created").toDate(),
        }
      }),
    )
  }

  async getPlaylistVideoLinksByVideo(
    video: string | firebase.firestore.DocumentReference,
  ) {
    const videoDoc =
      typeof video === "string"
        ? this.db.collection(FirestoreDao.VIDEOS).doc()
        : video
    const snapshots = await this.db
      .collection(FirestoreDao.PLAYLISTS_VIDEOS)
      .where("video", "==", videoDoc)
      .where("uid", "==", this.uid)
      .get()
    return snapshots.docs.map((item) => {
      const data = item.data()
      return {
        doc: this.db.collection(FirestoreDao.PLAYLISTS_VIDEOS).doc(item.id),
        data: {
          video: data.video,
          playlist: data.playlist,
          created: data.created.toDate(),
          videoId: data.videoId,
        },
      }
    })
  }
  async getPlaylistsByVideo(video: string | firebase.firestore.DocumentReference) {
    const videoDoc =
      typeof video === "string"
        ? this.db.collection(FirestoreDao.VIDEOS).doc()
        : video
    const snapshots = await this.db
      .collectionGroup(FirestoreDao.PLAYLISTS_VIDEOS)
      .where("ref", "==", videoDoc)
      .where("uid", "==", this.uid)
      .get()

    return await Promise.all(
      snapshots.docs.map(async (item) => {
        const doc = item.get("playlistRef")
        const snapshot: firestore.DocumentSnapshot = await doc.get()
        return {
          id: snapshot.id,
          totalSec: snapshot.get("totalSec"),
          numOfVideos: snapshot.get("numOfVideos"),
          name: snapshot.get("name"),
          comment: snapshot.get("comment"),
          created: snapshot.get("created").toDate(),
        }
      }),
    )
  }
  async updatePlaylistTotalSec(
    playlist: string | firebase.firestore.DocumentReference,
    totalSec: number,
  ) {
    const doc =
      typeof playlist === "string"
        ? this.db.collection(FirestoreDao.PLAYLISTS).doc(playlist)
        : playlist
    await doc.update({ totalSec })
  }
  async deletePlaylist(playlist: string | firestore.DocumentReference) {
    const doc =
      typeof playlist === "string" ? this.playlistCollection.doc(playlist) : playlist
    await doc.delete()
  }
  async deleteVideoFromPlaylist({
    playlist,
    video,
    duration,
  }: {
    playlist: string | firestore.DocumentReference
    video: string | firestore.DocumentReference
    duration: number
  }) {
    const playlistDoc =
      typeof playlist === "string" ? this.playlistCollection.doc(playlist) : playlist
    const videoDoc =
      typeof video === "string" ? this.videoCollection.doc(video) : video
    const snapshots = await playlistDoc
      .collection(FirestoreDao.PLAYLISTS_VIDEOS)
      .where("ref", "==", videoDoc)
      .get()

    await Promise.all(
      snapshots.docs.map(async (item) => {
        await item.ref.delete()
        await this.updatePlaylistWithNewInfo({
          playlist: playlistDoc,
          totalSec: duration,
          type: "delete",
        })
      }),
    )
  }
  async deleteVideoFromPlaylistGroup(video: string | firestore.DocumentReference) {
    const videoDoc =
      typeof video === "string" ? this.videoCollection.doc(video) : video
    const videoSnapshot = await videoDoc.get()
    const videoData = {
      start: videoSnapshot.get("start"),
      end: videoSnapshot.get("end"),
    }
    const snapshots = await this.db
      .collectionGroup(FirestoreDao.PLAYLISTS_VIDEOS)
      .where("uid", "==", this.uid)
      .where("ref", "==", videoDoc)
      .get()

    await Promise.all(
      snapshots.docs.map(async (item) => {
        await this.updatePlaylistWithNewInfo({
          playlist: item.get("playlistRef"),
          totalSec: videoData.end - videoData.start,
          type: "delete",
        })
        await item.ref.delete()
      }),
    )
  }
  async addPlaylistsVideosLink(params: {
    video: string | firebase.firestore.DocumentReference
    playlist: string | firebase.firestore.DocumentReference
    videoId: string
  }) {
    const { video, playlist, videoId } = params
    const videoDoc =
      typeof video === "string"
        ? this.db.collection(FirestoreDao.VIDEOS).doc(video)
        : video
    const playlistDoc =
      typeof playlist === "string"
        ? this.db.collection(FirestoreDao.VIDEOS).doc(playlist)
        : video
    const snapshot = await this.playlistsVideoLinkCollection.add({
      video: videoDoc,
      playlist: playlistDoc,
      created: new Date(),
      uid: this.uid,
      videoId,
    })
    return snapshot.id
  }
  async addVideo(input: VideoInput) {
    return await this.videoCollection.add({
      user: this.uid,
      title: input.title,
      start: input.start,
      end: input.end,
      comment: input.comment,
      videoId: input.videoId,
      uid: this.uid,
      created: new Date(),
    })
  }
  async addPlaylist(input: PlaylistInput) {
    return await this.playlistCollection.add({
      uid: this.uid,
      name: input.name,
      permission: input.permission,
      comment: input.comment ?? "",
      totalSec: 0,
      numOfVideos: 0,
      created: firebase.firestore.Timestamp.now(),
    })
  }
  async addVideoIntoPlaylist({
    playlist,
    video,
  }: {
    playlist: string | firestore.DocumentReference
    video: firestore.DocumentReference
  }) {
    const doc =
      typeof playlist === "string" ? this.playlistCollection.doc(playlist) : playlist
    const videosCollection = doc.collection(FirestoreDao.PLAYLISTS_VIDEOS)
    const videoSnapshot = await video.get()
    if (!videoSnapshot.exists) {
      throw new Error("Unexpectedly, the video doesn't exist")
    }
    const end: number = videoSnapshot.get("end")
    const start: number = videoSnapshot.get("start")
    await videosCollection.add({
      playlistRef: doc,
      videoId: videoSnapshot.get("videoId"),
      title: videoSnapshot.get("title"),
      start,
      end,
      comment: videoSnapshot.get("comment"),
      created: videoSnapshot.get("created").toDate(),
      uid: this.uid,
      ref: video,
    })
    await doc.update({
      numOfVideos: firestore.FieldValue.increment(1),
      totalSec: firestore.FieldValue.increment(end - start),
    })
  }
  async getPlaylist(playlist: string | firebase.firestore.DocumentReference) {
    const doc =
      typeof playlist === "string" ? this.playlistCollection.doc(playlist) : playlist

    const playlistSnapshot = await doc.get()
    if (!playlistSnapshot.exists) {
      return null
    }
    const playlistData = playlistSnapshot.data()!

    const playlistResult = {
      id: playlistSnapshot.id,
      name: playlistData.name,
      permission: playlistData.permission,
      comment: playlistData.comment,
      totalSec: playlistData.totalSec,
      numOfVideos: playlistData.numOfVideos,
      uid: playlistData.uid,
      created: playlistData.created.toDate(),
    }

    const videoSnapshots = await doc
      .collection(FirestoreDao.PLAYLISTS_VIDEOS)
      .orderBy("created", "asc")
      .get()

    if (videoSnapshots.empty) {
      return {
        playlist: playlistResult,
        videos: [],
        firstVideoId: null,
      }
    }

    const videos = videoSnapshots.docs.map((video) => ({
      id: video.get("ref").id,
      title: video.get("title"),
      start: video.get("start"),
      end: video.get("end"),
      uid: video.get("uid"),
      videoId: video.get("videoId"),
      comment: video.get("comment"),
      created: video.get("created").toDate(),
    }))
    return {
      playlist: playlistResult,
      videos,
      firstVideoId: videos[0].videoId,
    }
  }
}
