import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchArtistProfile } from "../../helpers/apiHelpers";
import {
  requestArtistData,
  receiveArtistData,
  receiveArtistDataError,
} from "../../actions";
import styled from "styled-components";

export const ArtistRoute = () => {
  const dispatch = useDispatch();
  let { id } = useParams();
  const accessToken = useSelector((state) => state.authReducer.token);
  let currentArtist = useSelector((state) => state.artistReducer.currentArtist);
  let numFollowers;

  const numberFormat = (labelValue) => {
    // Nine Zeroes for Billions
    return Math.abs(Number(labelValue)) >= 1.0e9
      ? Math.abs(Number(labelValue)) / 1.0e9 + "B"
      : // Six Zeroes for Millions
      Math.abs(Number(labelValue)) >= 1.0e6
      ? Math.abs(Number(labelValue)) / 1.0e6 + "M"
      : // Three Zeroes for Thousands
      Math.abs(Number(labelValue)) >= 1.0e3
      ? Math.abs(Number(labelValue)) / 1.0e3 + "K"
      : Math.abs(Number(labelValue));
  };

  if (currentArtist) {
    currentArtist = currentArtist.profile;
    numFollowers = numberFormat(currentArtist.followers.total);
    numFollowers =
      parseFloat(numFollowers).toPrecision(2) +
      numFollowers.replace(/[^B|M|K]/g, "");
  }

  console.log(currentArtist);
  useEffect(() => {
    dispatch(requestArtistData());
    if (!accessToken) {
      dispatch(receiveArtistDataError());
      return;
    }
    fetchArtistProfile(accessToken, id).then((res) => {
      dispatch(receiveArtistData(res));
    });
  }, [accessToken]);

  return (
    <Wrapper>
      {currentArtist ? (
        <ArtistContentWrapper>
          <ArtistAvatar src={currentArtist.images[1].url} />
          <ArtistName>{currentArtist.name}</ArtistName>
          <Followers>
            <FollowersCount>{numFollowers}</FollowersCount> followers
          </Followers>
          <TopTracks>top tracks</TopTracks>
          <TagsContainer>
            <TagsP>tags</TagsP>
            <DisplayTagsContainers>
              <DisplayTag>{currentArtist.genres[0]}</DisplayTag>
              <DisplaySecondTag>{currentArtist.genres[1]}</DisplaySecondTag>
            </DisplayTagsContainers>
          </TagsContainer>
        </ArtistContentWrapper>
      ) : (
        <div>Loading...</div>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background-color: #202020;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ArtistContentWrapper = styled.div`
  background-color: #0b0f14;
  width: 90%;
  height: 90vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
  text-align: center;
`;
const ArtistName = styled.p`
  font-size: 3rem;
  z-index: 1;
  margin-top: -70px;
  font-weight: bold;
  margin-bottom: 10px;
`;
const ArtistAvatar = styled.img`
  width: 250px;
  height: 250px;
  border-radius: 190px;
  margin-top: 20px;
`;
const FollowersCount = styled.span`
  color: #ff4fd8;
`;
const Followers = styled.p``;

const TopTracks = styled.div`
  font-size: 1.5rem;
  margin-top: 100px;
`;

const TagsContainer = styled.div`
  margin-top: 40px;
  margin-top: 130px;
`;
const DisplayTagsContainers = styled.div`
  display: flex;
  justify-content: space-between;
`;
const TagsP = styled.p`
  font-size: 1.5rem;
`;

const DisplayTag = styled.div`
  background: rgba(75, 75, 75, 0.4);
  padding: 10px;
  border-radius: 5px;
`;

const DisplaySecondTag = styled(DisplayTag)`
  margin-left: 5px;
`;
