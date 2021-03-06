import styled from "styled-components";
import { ReactionType } from "../../common";

const Root = styled.span``;

interface Props {
  type: ReactionType;
  amount: number;
}

const Reaction = ({ type, amount }: Props) => {
  const getEmoji = () => {
    switch (type) {
      case "+1":
        return "👍";
      case "-1":
        return "👎";
      case "laugh":
        return "😆";
      case "hooray":
        return "🎉";
      case "confused":
        return "😕";
      case "heart":
        return "❤️";
      case "eyes":
        return "👀";
      case "rocket":
        return "🚀";
    }
  };

  return (
    <Root>
      {getEmoji()}&nbsp;&nbsp;{amount}
    </Root>
  );
};

export { Reaction };
