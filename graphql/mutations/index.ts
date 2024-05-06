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
  mutation m_ordersPlace($data: JsonData!, $items: JsonData!) {
    ordersPlace(data: $data, items: $items)
  }
`;

export const M_postsUpsert = gql`
  mutation m_postsUpsert($data: InputPost!, $id: ID) {
    postsUpsert(data: $data, id: $id) {
      id
      title
      content
      user_id
      tags
      docs
      created_at
      updated_at
    }
  }
`;

export const M_postsRemove = gql`
  mutation m_postsRemove($id: ID!) {
    postsRemove(id: $id) {
      id
      title
      content
      user_id
      created_at
      updated_at
    }
  }
`;

export const M_postsImagesDrop = gql`
  mutation m_postsImagesDrop($id: ID!) {
    postsImagesDrop(id: $id) {
      id
      title
      content
      user_id
      created_at
      updated_at
    }
  }
`;
