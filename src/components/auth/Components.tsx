import styled from "styled-components";

interface StyledProps {
  signingIn?: boolean;
}

export const Container = styled.div`
  background-color: #000;
  border-radius: 10px;
  box-shadow: 0 14px 28px rgba(255, 198, 0, 0.25),
    0 10px 10px rgba(255, 198, 0, 0.22);
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  overflow: hidden;
  width: 768px;
  max-width: 90vw;
  min-height: 480px;
  z-index: 1000;
`;

export const SignUpContainer = styled.div`
  position: absolute;
  top: 0;
  height: 100%;
  transition: all 0.6s ease-in-out;
  left: 0;
  width: 50%;
  opacity: 0;
  z-index: 1;
  ${(props) =>
    props.signingIn !== true
      ? `
  transform: translateX(100%);
  opacity: 1;
  z-index: 5;
  `
      : null}
`;

export const SignInContainer = styled.div`
  position: absolute;
  top: 0;
  height: 100%;
  transition: all 0.6s ease-in-out;
  left: 0;
  width: 50%;
  z-index: 2;
  ${(props) =>
    props.signingIn !== true ? `transform: translateX(100%);` : null}
`;

export const Form = styled.form`
  background-color: #111;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 50px;
  height: 100%;
  text-align: center;
`;

export const Title = styled.h1`
  font-weight: bold;
  margin: 0;
  color: #ffc600;
`;

export const Input = styled.input`
  background-color: #222;
  border: 1px solid #333;
  padding: 12px 15px;
  margin: 8px 0;
  width: 100%;
  color: #fff;
  &:focus {
    outline: none;
    border-color: #ffc600;
  }
`;

export const Button = styled.button`
  border-radius: 20px;
  border: 1px solid #ffc600;
  background-color: #ffc600;
  color: #000;
  font-size: 12px;
  font-weight: bold;
  padding: 12px 45px;
  letter-spacing: 1px;
  text-transform: uppercase;
  transition: all 200ms ease-in;
  &:active {
    transform: scale(0.95);
  }
  &:focus {
    outline: none;
  }
  &:hover {
    background-color: #e6b200;
    border-color: #e6b200;
  }
`;

export const GhostButton = styled(Button)`
  background-color: transparent;
  border-color: #fff;
  color: #fff;
  &:hover {
    background-color: rgba(255, 198, 0, 0.1);
    border-color: #ffc600;
    color: #ffc600;
  }
`;

export const Anchor = styled.a`
  color: #ffc600;
  font-size: 14px;
  text-decoration: none;
  margin: 15px 0;
  &:hover {
    text-decoration: underline;
  }
`;

export const OverlayContainer = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  width: 50%;
  height: 100%;
  overflow: hidden;
  transition: transform 0.6s ease-in-out;
  z-index: 100;
  ${(props) =>
    props.signingIn !== true ? `transform: translateX(-100%);` : null}
`;

export const Overlay = styled.div`
  background: #000;
  background: linear-gradient(
    to right,
    rgba(255, 198, 0, 0.8),
    rgba(255, 198, 0, 0.9)
  );
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 0 0;
  color: #000;
  position: relative;
  left: -100%;
  height: 100%;
  width: 200%;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
  ${(props) =>
    props.signingIn !== true ? `transform: translateX(50%);` : null}
`;

export const OverlayPanel = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 40px;
  text-align: center;
  top: 0;
  height: 100%;
  width: 50%;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
`;

export const LeftOverlayPanel = styled(OverlayPanel)`
  transform: translateX(-20%);
  ${(props) => (props.signingIn !== true ? `transform: translateX(0);` : null)}
`;

export const RightOverlayPanel = styled(OverlayPanel)`
  right: 0;
  transform: translateX(0);
  ${(props) =>
    props.signingIn !== true ? `transform: translateX(20%);` : null}
`;

export const Paragraph = styled.p`
  font-size: 14px;
  font-weight: 100;
  line-height: 20px;
  letter-spacing: 0.5px;
  margin: 20px 0 30px;
`;

export const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 999;
`;
