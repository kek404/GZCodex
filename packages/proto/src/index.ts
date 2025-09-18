export type EventSchema = {
  name: string;
  version: string;
  definition: Record<string, unknown>;
};

export const schemas: EventSchema[] = [
  {
    name: 'DemandCreated',
    version: '1.0.0',
    definition: {
      type: 'record',
      name: 'DemandCreated',
      namespace: 'echo.events'
    }
  }
];

export function getSchema(name: string): EventSchema | undefined {
  return schemas.find((schema) => schema.name === name);
}
