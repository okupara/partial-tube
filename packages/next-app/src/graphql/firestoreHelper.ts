import firebase from "firebase"

export const getVideoWithId = async (
  db: firebase.firestore.Firestore,
  id: string,
) => {
  const doc = db.collection("videos").doc(id)
  const snapshot = await doc.get()

  if (!snapshot.exists) {
    return null
  }
  const data = snapshot.data()!

  return {
    doc,
    data: {
      id: snapshot.id,
      title: data.title,
      start: data.start,
      end: data.end,
      comment: data.comment,
      uid: data.uid,
      created: data.created.toDate(),
    },
  }
}

export const getFirstLinkByPlaylist = async (
  db: firebase.firestore.Firestore,
  playlistDoc: firebase.firestore.DocumentData,
) => {
  return await db
    .collection("playlists_videos")
    .where("playlist", "==", playlistDoc)
    .get()
}

export const getPlaylistsByPlaylistIds = async (
  db: firebase.firestore.Firestore,
  playlistIds: ReadonlyArray<string>,
) => {
  const promises = playlistIds.map((id) => db.collection("playlists").doc(id))
  return await Promise.all(
    promises.map(async (doc) => {
      const snapshot = await doc.get()
      const playlistData = snapshot.data()!
      return {
        doc,
        data: {
          id: snapshot.id,
          name: playlistData.name,
          permission: playlistData.permission,
          firstVideoId: playlistData.firstVideoId,
          totalSec: playlistData.totalSec,
          numOfVideos: playlistData.numOfVideos,
          uid: playlistData.uid,
          created: playlistData.created.toDate(),
        },
      }
    }),
  )
}

export const getPlaylistsByVideo = async (
  db: firebase.firestore.Firestore,
  videoDoc: firebase.firestore.DocumentData,
) => {
  const snapshots = await db
    .collection("playlists_videos")
    .where("video", "==", videoDoc)
    .get()
  if (snapshots.empty) {
    return null
  }
  const LinkData = snapshots.docs.map((item) => {
    const itemData = item.data()!
    return {
      id: item.id,
      video: itemData.video,
      playlist: itemData.playlist,
      created: itemData.created.toDate(),
    }
  })

  let playlists: any[] = [] //TODO: improve the type later.
  for (const link of LinkData) {
    const snapshot = await link.playlist.get()
    const data = snapshot.data()
    playlists = [
      ...playlists,
      {
        linkDocumentId: link.id,
        doc: link.playlist,
        data: {
          id: snapshot.id,
          name: data.name,
          permission: data.permission,
          firstVideoId: data.firstVideoId,
          totalSec: data.totalSec,
          numOfVideos: data.numOfVideos,
          uid: data.uid,
          created: data.created.toDate(),
        },
      },
    ]
  }
  return playlists
}
