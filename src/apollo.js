import ApolloClient from "apollo-boost";


//field操作可能
const client = new ApolloClient({
  uri: "http://localhost:4000/",
  //resolvers:client側で操作
  resolvers: {
    Movie: {
      isLiked: () => false,
    },
    Mutation: {
      //resoverのrootは必要無いので_
      //以下はGraphQLのresolverのように動作する
      toggleLikeMovie: (_, { id, isLiked }, { cache }) => {
        //console.log(id);
        cache.writeData({
          id: `Movie:${id}`,
          data: {
            isLiked: !isLiked,
          },
        });
      },
    },
  },
  //isLikedを使う為mutationを設定
});

export default client;
