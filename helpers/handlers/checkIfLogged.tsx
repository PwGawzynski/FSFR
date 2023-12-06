import * as SecureStore from 'expo-secure-store';
import { IdentityAuthTokenLoginStored } from '../../FarmServiceTypes/User/LoginUser';
/**
 * FN check if session is present
 * @return True if session is present or
 * False If session expired
 */
export async function checkCurrentSession(): Promise<boolean> {
  try {
    console.log('sessionCHeck');
    const session = await SecureStore.getItemAsync('Tokens');
    if (!session) return false;
    const token: IdentityAuthTokenLoginStored = await JSON.parse(session);
    const now = new Date();
    const tokenDate = new Date(token.last_updated_access_token_at);
    // time is minute reduced to prevent logout after loading desktop and to give time to restore tokens
    return now.getTime() - tokenDate.getTime() < 850000;
  } catch (e) {
    return false;
  }
}
