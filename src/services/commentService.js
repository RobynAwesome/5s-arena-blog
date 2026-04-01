import api from "./api";

export async function getComments(postId) {
  try {
    const response = await api.get(`/comments/${postId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching comments for post ${postId}:`, error);
    return [];
  }
}

export async function postComment(postId, content) {
  try {
    const token = localStorage.getItem("5s_token");
    const response = await api.post(`/comments/${postId}`, 
      { content },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
  } catch (error) {
    console.error(`Error posting comment to post ${postId}:`, error);
    throw error;
  }
}

export async function deleteComment(commentId) {
  try {
    const token = localStorage.getItem("5s_token");
    const response = await api.delete(`/comments/${commentId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error(`Error deleting comment ${commentId}:`, error);
    throw error;
  }
}
