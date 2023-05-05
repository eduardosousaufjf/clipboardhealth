import { Worker } from '../model/worker';
import { Shift } from '../../Shift/model/shift';
import { Facility } from '../../Facility/model/facility';
import getDateFromString from '../../../commons/date/getDateFromString';

export interface WorkerShiftQueryResponse {
  wor_id: number;
  wor_name: string;
  wor_is_active: boolean;
  wordoc_document_id: number;
  wordoc_worker_id: number;
  doc_id: number;
  doc_name: string;
  doc_is_active: boolean;
  fac_id: number;
  fac_name: string;
  fac_is_active: boolean;
  docFac_id: number;
  docFac_name: string;
  docFac_is_active: boolean;
  shi_id: number;
  shi_start: string;
  shi_end: string;
  shi_profession: string;
  shi_is_deleted: boolean;
  shi_facility_id: number;
  shi_worker_id?: number;
}

export interface ShiftFacility {
  shift: Shift;
  facility: Facility;
}
export class WorkerShiftsDto {
  worker: Worker;
  shifts: Record<string, ShiftFacility[]>;

  constructor(response: WorkerShiftQueryResponse[]) {
    if (!response[0]) return { worker: new Worker(), shifts: {} };
    const shifts: Record<string, ShiftFacility[]> = {};

    const worker = new Worker();
    worker.id = response[0].wor_id;
    worker.name = response[0].wor_name;
    worker.is_active = response[0].wor_is_active;

    response.forEach((queryResponseRow) => {
      const shift = new Shift();
      shift.id = queryResponseRow.shi_id;
      shift.start = queryResponseRow.shi_start;
      shift.end = queryResponseRow.shi_end;
      shift.profession = queryResponseRow.shi_profession;
      shift.is_deleted = queryResponseRow.shi_is_deleted;

      const facility = new Facility();
      facility.id = queryResponseRow.fac_id;
      facility.name = queryResponseRow.fac_name;
      facility.is_active = queryResponseRow.fac_is_active;

      const shiftDate = getDateFromString(shift.start);
      if (!shifts[shiftDate]) shifts[shiftDate] = [];
      shifts[shiftDate].push({ shift, facility });
    });

    return {
      worker,
      shifts,
    };
  }
}
