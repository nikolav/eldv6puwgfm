export const M_STORAGE_FILE_REMOVE = gql`
  mutation m_storageRemoveFile($fileID: String!) {
    storageRemoveFile(file_id: $fileID) {
      error
      file {
        id
        data {
          file_id
        }
      }
    }
  }
`;

export const M_docsUpsert = gql`
  mutation m_docsUpsert($topic: String!, $data: JsonData!, $id: ID) {
    docsUpsert(topic: $topic, data: $data, id: $id)
  }
`;

export const M_docsRm = gql`
  mutation m_docsRm($topic: String!, $id: ID!) {
    docsRm(topic: $topic, id: $id)
  }
`;

export const M_docUpsert = gql`
  mutation m_docUpsert($doc_id: String!, $data: JsonData!) {
    docUpsert(doc_id: $doc_id, data: $data)
  }
`;

export const M_docsUsersAdd = gql`
  mutation m_docsUsersAdd($email: String!, $password: String!) {
    docsUsersAdd(email: $email, password: $password)
  }
`;

export const M_docsTags = gql`
  mutation m_docsTags($id: ID!, $tags: JsonDocsTags!) {
    docsTags(id: $id, tags: $tags)
  }
`;

export const M_docsRmById = gql`
  mutation m_docsRmById($id: ID!) {
    docsRmById(id: $id)
  }
`;

export const M_productsUpsert = gql`
  mutation m_productsUpsert($data: InputProduct!, $id: ID) {
    productsUpsert(data: $data, id: $id) {
      id
      user_id
      name
      price
      stock
      stockType
      onSale
      description
      created_at
      updated_at
    }
  }
`;

export const M_productsRemove = gql`
  mutation m_productsRemove($id: ID!) {
    productsRm(id: $id) {
      id
      user_id
      name
      price
      stock
      stockType
      onSale
      description
      created_at
      updated_at
    }
  }
`;

export const M_ordersPlace = gql`
  mutation m_ordersPlace($code: String, $description: String, $items: JsonData!) {
    ordersPlace(code: $code, description: $description, items: $items)
  }
`;


// schema {
//   query: Query
//   mutation: Mutation
// }

// scalar JsonData
// scalar JsonDocsTags
// scalar NumberReal

// #########
// ## @types

// type Var {
//   id: ID!
//   name: String!
//   value: String
// }

// type StorageFileInfo {
//   id: ID!
//   file_id: String!
//   user_id: Int!
//   title: String!
//   description: String!
//   filename: String!
//   path: String!
//   size: Int!
//   mimetype: String!
//   public: Boolean!
//   created_at: String!
//   updated_at: String!
// }

// type StorageFileRemovedDataInfo {
//   file_id: String!
//   user_id: Int!
//   title: String!
//   description: String!
//   filename: String!
//   path: String!
//   size: Int!
//   mimetype: String!
//   public: Boolean!
// }

// type StorageFileRemovedInfoSuccess {
//   id: ID!
//   data: StorageFileRemovedDataInfo!
//   created_at: String!
//   updated_at: String!
// }

// type StorageFileRemovedInfo {
//   error: String
//   file: StorageFileRemovedInfoSuccess
// }

// type Product {
//   id: ID!
//   user_id: ID
//   name: String!
//   price: NumberReal
//   stock: NumberReal
//   stockType: String
//   onSale: Boolean
//   description: String
//   created_at: String!
//   updated_at: String!
// }

// type Company {
//   id: ID!
//   email: String!
//   password: String!
//   created_at: String!
//   updated_at: String!
// }

// input InputProduct {
//   name: String
//   category: String
//   price: NumberReal
//   stock: NumberReal
//   stockType: String
//   onSale: Boolean
//   description: String
// }

// #########
// ## @Query

// type Query {

//   # api --status
//   status: String!

//   # vars
//   vars: [Var!]!

//   # companies
//   companiesList(approved: Boolean): [Company!]!

//   # products
//   productsListByUser(user_id: ID!): [Product!]!
//   productsListByTags(tags: [String!]!): [Product!]!

//   # storage
//   storageList: [StorageFileInfo!]!

//   # docs
//   docsByTopic(topic: String!): [JsonData!]!
//   docByDocId(doc_id: String!): JsonData!
//   tagsByDocId(id: ID!): [String!]!
// }

// ############
// ## @Mutation

// type Mutation {

//   # products
//   productsUpsert(data: InputProduct!, id: ID): Product!
//   productsRm(id: ID!): Product

//   # docs
//   docsUpsert(topic: String!, data: JsonData!, id: ID): JsonData!
//   docsRm(topic: String!, id: ID!): JsonData
//   docUpsert(doc_id: String!, data: JsonData!): JsonData!
//   docsRmById(id: ID!): JsonData
//   # manage docs/tags: id, { "@tag/foo": true, "@tag/bar": false }
//   docsTags(id: ID!, tags: JsonDocsTags!): JsonDocsTags!

//   # storage
//   storageRemoveFile(file_id: String!): StorageFileRemovedInfo
// }
