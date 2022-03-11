import React, { useEffect } from "react";
import { getAccountNameFromloacalStorage } from "../../../util/getWhichUser";
import styled from "styled-components";
import EllipseImg from "../../../asset/basic-profile-img-small.svg";
import MoreButton from "../../../asset/icon/icon-more-vertical.png";
import { timeForToday } from "../../../util/timeForToday";

const CommentLayout = styled.section`
  width: 100%;
  padding: 20px 16px;
  box-sizing: border-box;
  border-top: 1px solid #dbdbdb;
`;

const CommentContainer = styled.ul`
  display: flex;
  flex-direction: column-reverse;
  max-width: 390px;
  margin: 0 auto;
  list-style: none;
`;
const CommentItem = styled.li`
  margin-bottom: 16px;
  position: relative;
`;

const CommentWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: 4px;

  img {
    margin-right: 12px;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    border: 0.5px solid #dbdbdb;
  }

  strong {
    margin: 6px 6px 0 0;
    font-weight: 500;
    font-size: 14px;
    line-height: 18px;
  }

  span {
    font-size: 10px;
    font-weight: 400;
    line-height: 13px;
    color: #767676;
    margin-top: 8.5px;
    &::before {
      content: "·";
      margin-right: 4px;
    }
  }
`;

const CommentText = styled.p`
  padding-left: 48px;
  font-size: 14px;
  line-height: 18px;
  color: #333333;
`;

const CommentBox = styled.button`
  content: "";
  position: absolute;
  top: 10px;
  right: 0px;
  width: 20px;
  height: 20px;
  background-image: url(${MoreButton});
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
`;

export function CommentList({ children }) {
  return (
    <CommentLayout>
      <CommentContainer>{children}</CommentContainer>
    </CommentLayout>
  );
}

export function ReplyBox({
  img,
  username,
  time,
  comment,
  alt,
  isDialog,
  commentId,
  setIsAuthorization,
  accountname,
}) {
  useEffect(() => {
    if (accountname === getAccountNameFromloacalStorage()) {
      setIsAuthorization(true);
    } else {
      setIsAuthorization(false);
    }
  }, [accountname]);

  return (
    <CommentItem onClick={() => isDialog(commentId)}>
      <CommentWrapper>
        <img src={img || EllipseImg} alt={alt} />
        <strong>{username}</strong>
        <span>{timeForToday(time)}</span>
      </CommentWrapper>
      <CommentText>{comment}</CommentText>
      <CommentBox></CommentBox>
    </CommentItem>
  );
}
