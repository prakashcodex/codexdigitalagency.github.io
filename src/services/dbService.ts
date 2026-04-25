import { 
  collection, 
  doc, 
  setDoc, 
  getDoc, 
  addDoc, 
  serverTimestamp, 
  query, 
  where, 
  getDocs,
  updateDoc,
  increment
} from 'firebase/firestore';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { db, auth } from '../lib/firebase';

enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
  }
}

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
    },
    operationType,
    path
  }
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

export async function findUserByReferralCode(code: string) {
  const path = 'users';
  try {
    const q = query(collection(db, 'users'), where('referralCode', '==', code));
    const snap = await getDocs(q);
    return snap.empty ? null : snap.docs[0];
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, path);
  }
}

export async function createUserProfile(uid: string, data: any) {
  const path = `users/${uid}`;
  try {
    const userDoc = {
      ...data,
      uid,
      createdAt: serverTimestamp(),
      role: 'student',
      referralCount: 0,
      referralRewards: 0,
      referralCode: data.referralCode || `CDX-${Math.random().toString(36).substring(2, 8).toUpperCase()}`
    };

    await setDoc(doc(db, 'users', uid), userDoc);

    // If there's a referrer, track it
    if (data.referredBy) {
      const referrerDoc = await findUserByReferralCode(data.referredBy);
      if (referrerDoc) {
        const referrerId = referrerDoc.id;
        // Create referral record
        await setDoc(doc(db, `users/${referrerId}/referrals`, uid), {
          referredUid: uid,
          name: data.name,
          createdAt: serverTimestamp()
        });
        
        // Update referrer's count and rewards
        await updateDoc(doc(db, 'users', referrerId), {
          referralCount: increment(1),
          referralRewards: increment(500) // Example reward: 500 units discount
        });
      }
    }
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, path);
  }
}

export async function signInWithGoogle(referralCode?: string) {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    
    // Check if profile exists
    const profile = await getUserProfile(user.uid);
    if (!profile) {
      await createUserProfile(user.uid, {
        name: user.displayName || 'Anonymous User',
        email: user.email,
        referredBy: referralCode || null
      });
    }
    return user;
  } catch (error) {
    console.error("Google Auth error:", error);
    throw error;
  }
}

export async function getUserProfile(uid: string) {
  const path = `users/${uid}`;
  try {
    const snap = await getDoc(doc(db, 'users', uid));
    return snap.exists() ? snap.data() : null;
  } catch (error) {
    handleFirestoreError(error, OperationType.GET, path);
  }
}

export async function getReferralCount(uid: string) {
  const path = `users/${uid}/referrals`;
  try {
    const q = collection(db, `users/${uid}/referrals`);
    const snap = await getDocs(q);
    return snap.size;
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, path);
  }
}

export async function submitEnquiry(data: any) {
  const path = 'enquiries';
  try {
    await addDoc(collection(db, 'enquiries'), {
      ...data,
      createdAt: serverTimestamp()
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, path);
  }
}
