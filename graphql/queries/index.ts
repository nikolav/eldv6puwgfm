export const Q_statusCheck = gql`
  query q_statusCheck {
    status
  }
`;

export const Q_vars = gql`
  query q_vars {
    vars {
      id
      name
      value
    }
  }
`;

export const Q_storageList = gql`
  query q_storageList {
    storageList {
      id
      file_id
      title
      description
      filename
      path
      size
      mimetype
      public
      created_at
      updated_at
    }
  }
`;

export const Q_storageListAll = gql`
  query q_storageListAll {
    storageListAll {
      id
      file_id
      title
      description
      filename
      path
      size
      mimetype
      public
      created_at
      updated_at
    }
  }
`;

export const Q_docsByTopic = gql`
  query q_docsByTopic($topic: String!) {
    docsByTopic(topic: $topic)
  }
`;

export const Q_docByDocId = gql`
  query q_docByDocId($doc_id: String!) {
    docByDocId(doc_id: $doc_id)
  }
`;

export const Q_tagsByDocId = gql`
  query q_tagsByDocId($id: ID!) {
    tagsByDocId(id: $id)
  }
`;

export const Q_productsByUser = gql`
  query q_productsByUser($user_id: ID!) {
    productsListByUser(user_id: $user_id) {
      id
      user_id
      name
      description
      price
      price_history
      stockType
      stock
      onSale
      tags
      created_at
      updated_at
    }
  }
`;

export const Q_productsListAll = gql`
  query q_productsListAll {
    productsListAll {
      id
      user_id
      name
      description
      price
      price_history
      stockType
      stock
      onSale
      tags
      created_at
      updated_at
    }
  }
`;

export const Q_productsListExact = gql`
  query q_productsListExact($products: [ID!]!) {
    productsListExact(products: $products) {
      id
      user_id
      name
      description
      price
      price_history
      stockType
      stock
      onSale
      tags
      user {
        id
        email
        created_at
        updated_at
      }
      created_at
      updated_at
    }
  }
`;

export const Q_productsListPopular = gql`
  query q_productsListPopular($length: Int) {
    productsListPopular(length: $length) {
      id
      user_id
      name
      description
      price
      price_history
      stockType
      stock
      onSale
      tags
      created_at
      updated_at
    }
  }
`;

export const Q_ordersReceived = gql`
  query q_ordersReceived {
    ordersReceived {
      user_id
      id
      code
      description
      completed
      canceled
      created_at
      updated_at
    }
  }
`;

export const Q_ordersReceivedProducts = gql`
  query q_ordersReceivedProducts($order_id: ID!) {
    ordersReceivedProducts(order_id: $order_id) {
      amount
      id
      user_id
      name
      price
      price_history
      stock
      stockType
      onSale
      description
      tags
      created_at
      updated_at
    }
  }
`;

export const Q_users = gql`
  query q_users {
    users {
      id
      email
      created_at
      updated_at
    }
  }
`;

export const Q_usersSingle = gql`
  query q_usersSingle($uid: ID!) {
    usersById(uid: $uid) {
      id
      email
      products {
        id
        name
        price
        price_history
        stock
        stockType
        onSale
        description
        tags
        created_at
        updated_at
      }
      created_at
      updated_at
    }
  }
`;

export const Q_postsList = gql`
  query q_postsList($uid: ID) {
    postsList(uid: $uid) {
      id
      title
      content
      user_id
      user {
        id
        email
      }
      tags
      docs
      created_at
      updated_at
    }
  }
`; 

export const Q_postsImages = gql`
  query q_postsImages($id: ID) {
    postsImages(id: $id)
  }
`;

