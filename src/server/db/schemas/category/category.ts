const categorySchema = {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['title'],
      additionalProperties: false,
      properties: {
        _id: {
          bsonType: 'objectId',
        },
        title: {
          bsonType: 'string',
          description: 'must be a string and is required',
          maxLength: 32,
        },
      },
    },
  },
};

export default categorySchema;
