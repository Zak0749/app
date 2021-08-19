const historySchema = {
  bsonType: 'object',
  required: ['date', 'quizId', 'progress'],
  additionalProperties: false,
  properties: {
    date: {
      bsonType: 'date',
      description: 'must be a date and is required',
    },
    quizId: {
      bsonType: 'objectId',
      description: 'must be a objectId and is required',
    },
    progress: {
      bsonType: 'number',
      description: 'must be a double and is required',
      minimum: 0,
      maximum: 1,
    },
  },
};

export default historySchema;
