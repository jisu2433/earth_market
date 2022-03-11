import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import basicImg from "../../../asset/basic-profile-img.svg";

const LayOut = styled.section`
  display: flex;
  align-items: center;
  margin-bottom: 12px;
  cursor: pointer;
`;

const ProfileImg = styled.img.attrs(props => ({
  src: props.src || basicImg,
}))`
  width: 42px;
  height: 42px;
  border: 0.5px solid #dbdbdb;
  border-radius: 50%;
  margin-right: 12px;
  overflow: hidden;
  object-fit: cover;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Name = styled.strong`
  font-weight: 500;
  font-size: 14px;
  line-height: 18px;
  margin-bottom: 2px;
`;
const Id = styled.strong`
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
  color: #767676;
  &::before {
    content: "@";
    margin-right: 3px;
  }
`;

export function UserInfoBox({ profileImage, name, id }) {
  return (
    <LayOut>
      <Link to={`/profile/you/${id}`}>
        <ProfileImg  src={profileImage} alt="프로필 이미지" />
      </Link>
      <Link to={`/profile/you/${id}`}>
      <Wrapper>
        <Name>{name}</Name>
        <Id>{id}</Id>
      </Wrapper>
      </Link>
    </LayOut>
  );
}
export function UserInfoBoxInMyProfile({ profileImage, name, id }) {
  return (
    <LayOut>
      <Link to="/profile/my">
        <ProfileImg src={profileImage} />
      </Link>
      <Link to="/profile/my">
      <Wrapper>
        <Name>{name}</Name>
        <Id>{id}</Id>
      </Wrapper>
      </Link>
    </LayOut>
  );
}
