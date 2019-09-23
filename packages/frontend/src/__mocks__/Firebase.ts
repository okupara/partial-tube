const delay = () => new Promise(res => setTimeout(res, 20))

const user = {
  displayName: 'Hoge Hogeo',
  uid: 'xA28xyMgacDtt',
  photoURL: 'http://hogehoge.com/hoge.png',
  getIdToken: async () => {
    await delay()
    return 'tokentestakjkamk1111'
  }
}

export const AuthedMock = {
  currentUser: { ...user },
  onAuthStateChanged: (
    uFn: (u: unknown) => void,
    eFn: (e: unknown) => void
  ) => {
    uFn(user)
  },
  getRedirectResult: async () => {
    await delay()
    return { credential: {} }
  }
}

export const RedirectedMock = {
  ...AuthedMock,
  onAuthStateChanged: (
    uFn: (u: unknown) => void,
    eFn: (e: unknown) => void
  ) => {
    eFn(new Error('TEST ERROR'))
  }
}
