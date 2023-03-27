import * as SecureStore from 'expo-secure-store';
import { IdentityAuthTokenLoginStored } from '../../FarmServiceTypes/User/LoginUser';
/**
 * FN check if session is present IF SESSION IS PRESENT RETURNS TRUE
 */
export async function checkCurrentSession() {
  try {
    const session = await SecureStore.getItemAsync('Tokens');
    if (!session) return false;
    const token: IdentityAuthTokenLoginStored = await JSON.parse(session);
    const now = new Date();
    const tokenDate = new Date(token.last_updated_refresh_token_at);
    return !(now.getTime() - tokenDate.getTime() > 604800000);
  } catch (e) {
    return false;
  }
}
