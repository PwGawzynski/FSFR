import { SafeAreaView } from 'react-native';
import { useMemo, useState } from 'react';
import { ScreenTitleHeader } from '../../../../Atoms/ScreenTitleHeader';
import { OwnerMobiOrdersTopTabProps } from '../../../../../FrontendSelfTypes/navigation/types';
import { FieldList } from '../../../../Molecules/FieldList';
import { SelectWorkerPanel } from '../../../../Organisms/SelectWorkerPanel';
import { LineDivider } from '../../../../Atoms/LineDivider';

export function AssignedWorkers({
  route,
  navigation,
}: OwnerMobiOrdersTopTabProps<'assignedWorkers', 'orders'>) {
  const orderId = route.params?.orderId;
  const [selectedFields, setSelectedFields] = useState<Array<string>>([]);
  const [validationError, setValidationError] = useState(false);

  const fieldTable = useMemo(
    () => (
      <FieldList
        orderId={orderId}
        navigation={navigation}
        lPOff
        checkOn
        setSelected={setSelectedFields}
        shownFieldKeys={[
          { key: 'id' },
          { key: 'polishSystemId', alternativeName: 'PLID' },
          { key: 'area' },
        ]}
      />
    ),
    [orderId],
  );
  return (
    <SafeAreaView className="flex flex-col justify-center mr-4 ml-4 mt-4 h-full">
      <ScreenTitleHeader variant="lg">Assign Employee</ScreenTitleHeader>
      {orderId && (
        <SelectWorkerPanel
          orderId={orderId}
          navigation={navigation}
          fieldsIds={selectedFields}
          validationError={validationError}
          setValidationError={setValidationError}
        />
      )}
      <LineDivider abs="mt-2" />
      <ScreenTitleHeader
        variant="sm"
        ats={validationError ? 'text-[#f00]' : ''}
      >
        Select fields
      </ScreenTitleHeader>
      {orderId && fieldTable}
    </SafeAreaView>
  );
}
