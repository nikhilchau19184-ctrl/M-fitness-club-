import { collection, doc, getDocs, getDoc, setDoc, updateDoc, deleteDoc, query, where, orderBy, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from './firebase';

// Members
export const membersCol = collection(db, 'members');
export const getMembers = async () => {
  const q = query(membersCol, orderBy('joinDate', 'desc'));
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
};
export const getMember = async (id: string) => {
  const snap = await getDoc(doc(db, 'members', id));
  return snap.exists() ? { id: snap.id, ...snap.data() } : null;
};
export const getMemberByAuthId = async (authId: string) => {
  const q = query(membersCol, where('userId', '==', authId));
  const snap = await getDocs(q);
  if (snap.empty) return null;
  return { id: snap.docs[0].id, ...snap.docs[0].data() };
};
export const addMember = async (data: any) => {
  const ref = doc(membersCol);
  await setDoc(ref, {
    ...data,
    joinDate: serverTimestamp(),
  });
  return ref.id;
};
export const updateMember = async (id: string, data: any) => {
  await updateDoc(doc(db, 'members', id), data);
};
export const deleteMember = async (id: string) => {
  await deleteDoc(doc(db, 'members', id));
};

// Attendance
export const attendanceCol = collection(db, 'attendance');
export const getAttendance = async () => {
  const q = query(attendanceCol, orderBy('checkIn', 'desc'));
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
};
export const addAttendance = async (data: any) => {
  const ref = doc(attendanceCol);
  await setDoc(ref, {
    ...data,
    checkIn: serverTimestamp()
  });
  return ref.id;
};

// Payments
export const paymentsCol = collection(db, 'payments');
export const getPayments = async () => {
  const q = query(paymentsCol, orderBy('date', 'desc'));
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
};
export const addPayment = async (data: any) => {
  const ref = doc(paymentsCol);
  await setDoc(ref, {
    ...data,
    date: serverTimestamp()
  });
  return ref.id;
};
