import { StandardSchemaV1 } from '@standard-schema/spec';
import { ArrayValues } from 'type-fest';

import { useStore } from '@wsh-2025/client/src/app/StoreContext';
import { getTimetableResponse } from '@wsh-2025/schema/src/openapi/schema';

type Program = ArrayValues<StandardSchemaV1.InferOutput<typeof getTimetableResponse>>;

export function useSelectedProgramId() {
  const state = useStore((s) => s);
  const setProgram = (program: Program | null) => {
    state.pages.timetable.selectProgram(program);
  };
  return [state.pages.timetable.selectedProgramId, setProgram] as const;
}
