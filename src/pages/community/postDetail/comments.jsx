import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Comment from "./comment";
import { PopUp2, PopUp3 } from "../../../elements/index";

import { actionCreators as userActions } from "../../../redux/modules/user";
import { actionCreators as postActions } from "../../../redux/modules/post";
import { requestAuthData, deleteAction } from "../../../shared/axios";
import { history } from "../../../redux/configureStore";

const Comments = ({ postId }) => {
  const dispatch = useDispatch();

  const { comments, commentId, isSecretComment } = useSelector((state) => ({
    comments: state.post.comments,
    commentId: state.post.commentId,
    isSecretComment: state.post.isSecretComment,
  }));
  const [commentState, setCommentState] = useState("일반 댓글");

  useEffect(() => {
    if (isSecretComment) {
      setCommentState("일반 댓글");
    } else {
      setCommentState("비밀 댓글");
    }
  }, [isSecretComment]);

  const requestCommentData = async () => {
    const result = await requestAuthData(`v2/comments/${postId}`);
    return result;
  };
  const fnEffect = async () => {
    const getComments = await requestCommentData();
    console.log(getComments);

    if (getComments < 0) {
      history.push("/error");
      return;
    }

    dispatch(postActions.setComments(getComments));
  };
  useEffect(fnEffect, []);

  const [showPopup1, setShowPopup1] = useState(false); // 옵션 1개
  const [showPopup2, setShowPopup2] = useState(false); // 옵션 2개

  const hidePopup1 = () => {
    setShowPopup1(false);
  };
  const hidePopup2 = () => {
    setShowPopup2(false);
  };

  const handleClick = (isMyComment) => {
    if (isMyComment) {
      setShowPopup2(true);
      setShowPopup1(false);
    } else {
      setShowPopup1(true);
      setShowPopup2(false);
    }
  };

  const reqChangeState = async () => {
    const result = await requestAuthData(
      `v1/comments/${commentId}/change-state`,
    );
    return result;
  };
  const handleChangeState = async () => {
    const _handleChangeState = await reqChangeState();
    if (_handleChangeState < 0) {
      history.push("/error");
      return;
    }

    dispatch(
      postActions.updateToCommentStatusAction(commentId, !isSecretComment),
    );
    dispatch(userActions.setShowNotification(true));
    dispatch(
      userActions.setNotificationBody(`${commentState}로 수정했습니다.`),
    );
  };

  const reqDeleteComment = async () => {
    const result = await deleteAction(`v1/comments/${commentId}`);
    return result;
  };
  const handleDelete = async () => {
    const _handleDelete = await reqDeleteComment();
    if (_handleDelete < 0) {
      history.push("/error");
      return;
    }

    dispatch(postActions.deleteCommentAction(commentId));
    dispatch(userActions.setShowNotification(true));
    dispatch(userActions.setNotificationBody("댓글을 삭제했습니다."));
  };

  return (
    <>
      {showPopup1 && (
        <PopUp3
          text="댓글 신고하기"
          _onClick1={() => {
            history.push(`/report/comments/${postId}`);
          }}
          _onClick2={() => {
            hidePopup1();
          }}
          comment
        />
      )}
      {showPopup2 && (
        <PopUp2
          text1={`${commentState}로 수정`}
          text2="댓글 삭제하기"
          _onClick1={() => {
            handleChangeState();
            hidePopup2();
          }}
          _onClick2={() => {
            handleDelete();
            hidePopup2();
          }}
          _onClick3={() => hidePopup2()}
          isRed
          comment
        />
      )}
      {comments && (
        <div style={{ marginBottom: "50px" }}>
          {comments.map((comment) => (
            <Comment
              key={comment.commentId}
              comment={comment}
              onClick={handleClick}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default Comments;
