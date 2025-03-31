// 引入創建文章、載入文章、按讚和收藏的 API 函式
import {
  createPost,
  loadPosts,
  likePost,
  favorPost,
} from "../../apis/post";

export const post = {
  // 設定 state，儲存文章相關的資料
  state() {
    return {
      list: [],  // 儲存文章的列表
      searchResult: [],  // 儲存搜尋結果
      currentId: null,  // 儲存當前查看的文章 ID
    };
  },
  mutations: {
    // 初始化文章列表
    initializePosts(state, posts) {
      state.list = posts;  // 將 API 回傳的文章資料賦值給 state.list
    },
    // 切換文章的按讚狀態
    toggleLike(state, { id, isLike }) {
      const post = state.list.find((post) => post.id === id);  // 找到該文章
      if (isLike) {
        post.liked_bies = (post.liked_bies || 0) + 1;  // 如果按讚，增加按讚數
      } else {
        post.liked_bies--;  // 如果取消按讚，減少按讚數
      }
      post.likedByMe = isLike;  // 更新當前使用者的按讚狀態
    },
    // 切換文章的收藏狀態
    toggleFavor(state, { id, isFavor }) {
      const post = state.list.find((post) => post.id === id);  // 找到該文章
      if (isFavor) {
        post.favored_bies = (post.favored_bies || 0) + 1;  // 如果收藏，增加收藏數
      } else {
        post.favored_bies--;  // 如果取消收藏，減少收藏數
      }
      post.favoredByMe = isFavor;  // 更新當前使用者的收藏狀態
    },
    // 設定當前查看的文章 ID
    setCurrentId(state, id) {
      state.currentId = id;  // 設定當前文章 ID
    },
    // 增加文章的留言數量
    increaseCommentCount(state, id) {
      const post = state.list.find((post) => post.id === id);  // 找到該文章
      post.comments++;  // 增加留言數
    },
    // 設定搜尋結果
    setPostsSearchResult(state, posts) {
      state.searchResult = posts;  // 更新搜尋結果
    },
  },
  actions: {
    // 上傳新文章
    async uploadPost({ commit, dispatch }, { image, description }) {
      await createPost(image, description);  // 呼叫 API 創建文章
      dispatch("loadAllPosts");  // 重新載入所有文章
      commit("changeShowPostUpload", false);  // 關閉文章上傳的對話框
    },
    // 載入所有文章
    async loadAllPosts({ commit }) {
      const posts = await loadPosts();  // 呼叫 API 載入所有文章
      commit("initializePosts", posts);  // 將文章資料存入 state
    },
    // 切換文章的按讚狀態
    async toggleLike({ commit }, id) {
      const isLike = await likePost(id);  // 呼叫 API 按讚
      commit("toggleLike", { id, isLike });  // 更新文章的按讚狀態
    },
    // 切換文章的收藏狀態
    async toggleFavor({ commit }, id) {
      const isFavor = await favorPost(id);  // 呼叫 API 收藏文章
      commit("toggleFavor", { id, isFavor });  // 更新文章的收藏狀態
    },
    // 顯示文章詳情
    async showPostDetails({ commit, dispatch }, id) {
      commit("setCurrentId", id);  // 設定當前文章 ID
      dispatch("loadAllComments", id);  // 載入文章留言
      commit("changeShowPostDetails", true);  // 顯示文章詳情
    },
    // 隱藏文章詳情
    async hidePostDetails({ commit }) {
      commit("setCurrentId", null);  // 清空當前文章 ID
      commit("changeShowPostDetails", false);  // 隱藏文章詳情
    },
    // 搜尋文章
    async searchPosts({ commit }, term) {
      const posts = await loadPosts(
        "filters[description][$contains]=" + term  // 依照描述搜尋文章
      );
      commit("setPostsSearchResult", posts);  // 更新搜尋結果
    },
  },
  getters: {
    // 取得當前文章詳情
    postDetails(state) {
      return state.list.find((post) => post.id === state.currentId);  // 找到當前查看的文章
    },
  },
};
