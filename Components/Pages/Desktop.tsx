import { useContext, useEffect } from 'react';
import { useMutation } from 'react-query';
import { AxiosError, HttpStatusCode } from 'axios';
import { getUserDataService } from '../../helpers/api/Services/User';
import { AppSettings, ModalState } from '../../helpers/appSettings/contexts';
import { OwnerDesktopMobiRootStack } from '../Navigators/OwnerDesktopRootStack';
import { WorkerDesktopRootStack } from './Mobi/WorkerPages/WorkerDesktopRootStack';
import { UserRole } from '../../FarmServiceTypes/User/Enums';

export function Desktop() {
  const {
    mutate: currentUserMutate,
    isSuccess: isCurrentUserMutateSuccess,
    data: currentUserFetchData,
    isError: isCurrentUserMutateError,
    error: currentUserMutateError,
  } = useMutation(getUserDataService);

  const { setCurrentUser, setModalContext, setLogged } =
    useContext(AppSettings).setters;

  const { currentUser } = useContext(AppSettings).settings;

  useEffect(() => {
    setCurrentUser(currentUserFetchData);
  }, [isCurrentUserMutateSuccess]);

  useEffect(() => {
    if (isCurrentUserMutateError)
      setModalContext({
        isOn: ModalState.on,
        context:
          (currentUserMutateError as AxiosError).response?.status ===
          HttpStatusCode.Unauthorized
            ? 'Session expired, please login again'
            : 'Something went wrong, please login again',
        onApproveCallback: () => setLogged(false),
        customApproveButtonText: 'Login',
      });
  }, [isCurrentUserMutateError]);

  useEffect(() => {
    if (!currentUser) currentUserMutate();
  }, [currentUser]);

  return (
    (currentUser?.role === UserRole.Owner && <OwnerDesktopMobiRootStack />) ||
    (currentUser?.role === UserRole.Worker && <WorkerDesktopRootStack />)
  );
}
