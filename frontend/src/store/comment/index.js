// 引入創建留言和載入留言的 API 函式
import { createComment, loadComments } from "../../apis/comment";

export const comment = {
  // 設定 state，儲存留言的資料
  state() {
    return {
      list: [],  // 儲存留言的陣列
    };
  },
  mutations: {
    // 初始化留言列表，將 API 回傳的留言資料設定到 state 中
    initializeComments(state, comments) {
      state.list = comments;  // 將回傳的留言資料賦值給 state.list
    },
  },
  actions: {
    // 新增留言的動作
    async addComment({ commit, dispatch }, { content, postId }) {
      await createComment(content, postId);  // 呼叫 API 創建留言
      dispatch("loadAllComments", postId);  // 新增留言後，重新載入所有留言
      commit("increaseCommentCount", postId);  // 更新文章的留言數量（假設有 mutation 處理）
    },
    // 載入所有留言的動作
    async loadAllComments({ commit }, postId) {
      const comments = await loadComments(postId);  // 呼叫 API 載入指定文章的所有留言
      commit("initializeComments", comments);  // 將留言資料存入 state 中
    },
  },
};
