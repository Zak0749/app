const savedSchema = {
  bsonType: 'object',
  required: ['date', 'quizId'],
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
  },
};

export default savedSchema;
