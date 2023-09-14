import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import Star from './Star';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function NonStyledStarRating({ className, product, userId }) {
  let navigate = useNavigate();
  const [hoverLocation, setHoverLocation] = useState(0);
  const [clickLocation, setClickLocation] = useState(0);

  const crucialRenderCount = useRef(0);
  const foundComment = useRef(undefined);
  const commentId = useRef(undefined);

  const rates = [1, 2, 3, 4, 5];
  const starList = rates.map((rate, index) => {
    return (
      <Star
        clickLocation={clickLocation}
        active={hoverLocation >= rate || clickLocation >= rate}
        setHoverLocation={setHoverLocation}
        setClickLocation={setClickLocation}
        key={index}
        rate={rate}></Star>
    );
  });

  useEffect(
    function crucialRenderCounter() {
      if (crucialRenderCount.current < 3) {
        crucialRenderCount.current++;
      }
    },
    [clickLocation],
  );

  useEffect(function showExistingComment() {
    if (product.comments.length !== 0) {
      foundComment.current = product.comments.find((comment) => {
        return comment.user._id === userId;
      });
    }

    if (foundComment.current !== undefined) {
      setClickLocation(foundComment.current.rate);
      commentId.current = foundComment.current._id;
      console.log(foundComment);
    }
  }, []);

  useEffect(
    function postComment() {
      if (foundComment.current === undefined && crucialRenderCount.current !== 1) {
        axios
          .post(
            `http://localhost:3001/products/${product._id}/comments`,
            {
              rate: clickLocation,
              userId: userId,
            },
            { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } },
          )
          .then((response) => {
            console.log(response);
            foundComment.current = { rate: clickLocation, userId: userId };
            commentId.current = response.data._id;
          })
          .catch((error) => {
            console.log(error);
            if (error.response.status === 401 || error.response.status === 403) {
              navigate('/welcome');
            }
          });
      }
    },
    [clickLocation],
  );

  useEffect(
    function deleteComment() {
      if (foundComment.current !== undefined && crucialRenderCount.current === 3) {
        axios
          .delete(`http://localhost:3001/products/${product._id}/comments/${commentId.current}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
          })
          .then((response) => {
            console.log(response);
            foundComment.current = undefined;
          })
          .catch((error) => {
            console.log(error);
            if (error.response.status === 401 || error.response.status === 403) {
              navigate('/welcome');
            }
          });
      }
    },
    [clickLocation],
  );

  return <div className={className}>{starList}</div>;
}

const StarRating = styled(NonStyledStarRating)``;
export default StarRating;
