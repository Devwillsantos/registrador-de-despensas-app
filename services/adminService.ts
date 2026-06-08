import { firestore } from '@/config/firebase'
import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore'

export interface AdminUser {
  uid: string
  email: string | null
  name: string | null
  image?: any
}

export const fetchAllUsers = async (): Promise<{
  success: boolean
  data?: AdminUser[]
  message?: string
}> => {
  try {
    const usersRef = collection(firestore, 'users')
    const snapshot = await getDocs(usersRef)
    const users: AdminUser[] = []

    snapshot.forEach((doc) => {
      users.push({
        uid: doc.id,
        email: doc.data().email,
        name: doc.data().name,
        image: doc.data().image
      })
    })

    return { success: true, data: users }
  } catch (error: any) {
    console.log('Error fetching users:', error)
    return {
      success: false,
      message: error?.message || 'Failed to fetch users'
    }
  }
}

export const deleteUserFromFirestore = async (uid: string): Promise<{
  success: boolean
  message?: string
}> => {
  try {
    const userRef = doc(firestore, 'users', uid)
    await deleteDoc(userRef)
    return { success: true, message: 'User deleted from Firestore' }
  } catch (error: any) {
    console.log('Error deleting user from Firestore:', error)
    return {
      success: false,
      message: error?.message || 'Failed to delete user from Firestore'
    }
  }
}

export const deleteUser = async (uid: string): Promise<{
  success: boolean
  message?: string
}> => {
  try {
    const firestoreResult = await deleteUserFromFirestore(uid)

    if (firestoreResult.success) {
      return {
        success: true,
        message:
          'User deleted successfully from Firestore. Note: To delete user authentication data, use Firebase Console or Backend API.'
      }
    } else {
      return firestoreResult
    }
  } catch (error: any) {
    console.log('Error deleting user:', error)
    return {
      success: false,
      message: error?.message || 'Failed to delete user'
    }
  }
}
