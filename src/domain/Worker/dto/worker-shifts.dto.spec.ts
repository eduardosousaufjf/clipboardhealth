import { WorkerShiftsDto, WorkerShiftQueryResponse } from './worker-shifts-dto';
import { Worker } from '../model/worker';
import { Shift } from '../../Shift/model/shift';
import { Facility } from '../../Facility/model/facility';

// Mock response data
const mockResponse: WorkerShiftQueryResponse[] = [
  {
    wor_id: 1,
    wor_name: 'John Doe',
    wor_is_active: true,
    wordoc_document_id: 1,
    wordoc_worker_id: 1,
    doc_id: 1,
    doc_name: 'Driver License',
    doc_is_active: true,
    fac_id: 1,
    fac_name: 'Hospital A',
    fac_is_active: true,
    docFac_id: 1,
    docFac_name: 'License A',
    docFac_is_active: true,
    shi_id: 1,
    shi_start: '2022-05-01T08:00:00Z',
    shi_end: '2022-05-01T16:00:00Z',
    shi_profession: 'Nurse',
    shi_is_deleted: false,
    shi_facility_id: 1,
  },
];

describe('workerShiftsDto', () => {
  it('should create a new instance with correct data', () => {
    const dto = new WorkerShiftsDto(mockResponse);

    // Check that worker data is correctly mapped
    expect(dto.worker).toBeInstanceOf(Worker);
    expect(dto.worker.id).toBe(1);
    expect(dto.worker.name).toBe('John Doe');
    expect(dto.worker.is_active).toBe(true);

    // Check that shifts data is correctly mapped
    expect(dto.shifts).toEqual({
      '2022-5-1': [
        {
          shift: expect.any(Shift),
          facility: expect.any(Facility),
        },
      ],
    });

    // Check that the mapped Shift and Facility objects have the expected properties
    const mappedShift = dto.shifts['2022-5-1'][0].shift;
    expect(mappedShift.id).toBe(1);
    expect(mappedShift.start).toBe('2022-05-01T08:00:00Z');
    expect(mappedShift.end).toBe('2022-05-01T16:00:00Z');
    expect(mappedShift.profession).toBe('Nurse');
    expect(mappedShift.is_deleted).toBe(false);

    const mappedFacility = dto.shifts['2022-5-1'][0].facility;
    expect(mappedFacility.id).toBe(1);
    expect(mappedFacility.name).toBe('Hospital A');
    expect(mappedFacility.is_active).toBe(true);
  });

  it('should return default values when input is empty', () => {
    const dto = new WorkerShiftsDto([]);

    // Check that worker data and shifts data are set to default values
    expect(dto.worker).toBeInstanceOf(Worker);
    expect(dto.worker.id).toBeUndefined();
    expect(dto.worker.name).toBeUndefined();
    expect(dto.worker.is_active).toBeUndefined();
    expect(dto.shifts).toEqual({});
  });
});
