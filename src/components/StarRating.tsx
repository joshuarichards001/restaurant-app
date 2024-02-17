import { EmptyStar, FullStar, HalfStar } from "./Icons";

type Props = {
  rating: number;
  setRating?: (value: number) => void;
};

export default function StarRating({ rating, setRating }: Props) {
  const onClickStar = (index: number) => {
    // If setRating is not defined then star is view only
    if (!setRating) return;

    setRating(index === rating ? index - 0.5 : index);
  };

  return (
    <div className="flex items-center">
      <StarComponent index={1} rating={rating} onClick={() => onClickStar(1)} />
      <StarComponent index={2} rating={rating} onClick={() => onClickStar(2)} />
      <StarComponent index={3} rating={rating} onClick={() => onClickStar(3)} />
      <StarComponent index={4} rating={rating} onClick={() => onClickStar(4)} />
      <StarComponent index={5} rating={rating} onClick={() => onClickStar(5)} />
    </div>
  );
}

const StarComponent = ({
  index,
  rating,
  onClick,
}: {
  index: number;
  rating: number;
  onClick: () => void;
}) => {
  return (
    <div className="pr-1 cursor-pointer" onClick={onClick}>
      {index <= rating ? (
        <FullStar />
      ) : index - 0.5 === rating ? (
        <HalfStar />
      ) : (
        <EmptyStar />
      )}
    </div>
  );
};
