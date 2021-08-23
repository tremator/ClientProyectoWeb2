import gql from 'graphql-tag';

export const CHARGE = gql`
query($input: Int) {
    charge(input: $input) {
        id
        title
        description
        link
        date
        category{
            id
            name
        }
        tags
    }
}
`;
export const SEARCH = gql`
query($id: Int, $word: String){
    search(id: $id, word: $word){
        id
        title
        description
        link
        date
        category{
            id
            name
        }
        tags
    }
}
`;
export const USER_TAGS = gql`
query($id: Int){
    userTags(id: $id){
        id
        tag
    }
}
`;
export const NEWS_FILTER = gql`
query($userId: Int,$tag: String, $category: Int){
    newsFilter(userId: $userId, tag: $tag, category: $category){
        id
        title
        description
        link
        date
        category{
            id
            name
        }
        tags
    }
}
`;
