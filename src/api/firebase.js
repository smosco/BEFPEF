import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  query,
  collection,
  where,
  setDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  serverTimestamp,
} from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";

const firebaseConfig = {
  apiKey: "AIzaSyC0WqYCQnZDmL-qg6hpwRapRliLzfUTQIA",
  authDomain: "befpef-57796.firebaseapp.com",
  databaseURL: "https://befpef-57796-default-rtdb.firebaseio.com",
  projectId: "befpef-57796",
  storageBucket: "befpef-57796.appspot.com",
  messagingSenderId: "442664545024",
  appId: "1:442664545024:web:0e03918514084995bd21e5",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const store = getFirestore(app);

export const register = async (user) => {
  const res = await createUserWithEmailAndPassword(
    auth,
    user.email,
    user.password
  );

  await updateProfile(auth.currentUser, {
    displayName: user.displayName,
  });

  await setDoc(doc(store, "users", res.user.uid), {
    ...user,
    uid: res.user.uid,
  });

  return res;
};

export const login = async (user) => {
  await signInWithEmailAndPassword(auth, user.email, user.password);
};

export const onUserStateChange = (callback) => {
  onAuthStateChanged(auth, async (user) => {
    callback(user);
  });
};

export const logout = async () => {
  await signOut(auth);
};

export const addNewPost = async (user, data, url) => {
  const postId = uuidv4();
  await setDoc(doc(store, "posts", postId), {
    ...data,
    postId,
    writer: user.displayName,
    writerId: user.uid,
    img: url,
    comments: [],
    timestamp: serverTimestamp(),
  });
};

export const getPosts = async () => {
  let posts = [];
  const docSnap = await getDocs(collection(store, "posts"));
  docSnap.forEach((doc) => {
    posts.push(doc.data());
  });
  return posts;
};

export const getPost = async (postId) => {
  const docRef = doc(store, "posts", postId);
  const snapShot = await getDoc(docRef);
  if (snapShot.exists()) {
    return snapShot.data();
  }
  return {};
};

export const getPostComments = async (postId) => {
  const docRef = doc(store, "posts", postId);
  const snapShot = await getDoc(docRef);
  if (snapShot.exists()) {
    return snapShot.data().comments;
  }
  return [];
};

// doc으로 하면 되고 collection으로 하면 에러 => 일단 doc으로 포스팅을 했으니까요??
export const updatePost = async (postId, data, url) => {
  url
    ? await updateDoc(doc(store, "posts", postId), {
        ...data,
        img: url,
        timestamp: serverTimestamp(),
      })
    : await updateDoc(doc(store, "posts", postId), {
        ...data,
        timestamp: serverTimestamp(),
      });
};

export const deletePost = async (postId) => {
  await deleteDoc(doc(store, "posts", postId));
};

export const getPostsById = async (userId) => {
  const posts = [];
  const postsRef = collection(store, "posts");
  const q = query(postsRef, where("writerId", "==", userId));

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    posts.push(doc.data());
  });
  return posts;
};

export const updateComments = async (postId, comments, comment) => {
  const commentsRef = doc(store, "posts", postId);
  //await setDoc(commentsRef, {
  //    name: "Frank",
  //    favorites: { food: "Pizza", color: "Blue", subject: "recess" },
  //    age: 12
  //});

  // To update age and favorite color:

  await updateDoc(commentsRef, {
    comments: [
      ...comments,
      comment,
      // {
      //   id: postId + uuidv4(),
      //   writer: user.displayName,
      //   writerId: user.uid,
      //   text: comment,
      //   timeStamp: new Date(),
      // },
    ],
    //"favorites.color": "Red",
  });
};
