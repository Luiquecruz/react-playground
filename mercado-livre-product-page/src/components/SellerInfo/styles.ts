import styled, { css } from "styled-components";
import {
  HiOutlineLocationMarker,
  HiOutlineChatAlt2,
  HiOutlineClock,
} from "react-icons/hi";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  border-top: 1px solid var(--color-border);
  padding: 48px 32px;
`;

export const Title = styled.div`
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 20px;
`;

export const LocationCard = styled.div`
  display: flex;
  align-items: center;
  padding: 7px 0;

  > div {
    margin-left: 8px;

    p {
      font-size: 16px;
    }

    span {
      font-size: 14px;
      flex-wrap: 400;
      color: var(--color-gray);
    }
  }
`;

export const ReputationCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 33px;
`;

export const ReputationThermometer = styled.ol`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 7px;
  width: 100%;
  list-style: none;
  padding: 0 4px;

  > li {
    width: 100%;
    height: 8px;

    &:nth-child(1) {
      background: var(--reputation-1);
    }
    &:nth-child(2) {
      background: var(--reputation-2);
    }
    &:nth-child(3) {
      background: var(--reputation-3);
    }
    &:nth-child(4) {
      background: var(--reputation-4);
    }
    &:nth-child(5) {
      background: var(--reputation-5);
    }

    &.active {
      height: 12px;
    }
  }
`;

export const ReputationRow = styled.div`
  display: flex;
  align-items: flex-start;
  margin-top: 10px;

  > div {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    width: 33%;
    padding: 0 10px;

    strong {
      font-size: 24px;
      font-weight: 400;
      height: 30px;
    }

    span {
      font-size: 12px;
    }

    & + div {
      &::before {
        content: "";
        position: absolute;
        top: 50%;
        left: 0;
        height: 36px;
        transform: translateY(-50%);
        border-left: 1px solid var(--color-border);
      }
    }
  }
`;

export const More = styled.a`
  color: var(--color-blue);
  text-decoration: none;
  font-size: 14px;
  font-weight: 600;
  margin-top: 24px;
`;

// icons

const iconCSS = css`
  width: 30px;
  height: 30px;
`;

export const LocationIcon = styled(HiOutlineLocationMarker)`
  ${iconCSS}
`;

export const SupportIcon = styled(HiOutlineChatAlt2)`
  ${iconCSS}
`;

export const ClockIcon = styled(HiOutlineClock)`
  ${iconCSS}
`;
