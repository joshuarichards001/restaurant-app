import { IRestaurant } from "../services/types";
import { ThumbsDownIcon, ThumbsUpIcon } from "./Icons";

type Props = {
  menuItems: IRestaurant["menuItems"];
  setMenuItems: (value: IRestaurant["menuItems"]) => void;
};

export default function AddMenuItems({ menuItems, setMenuItems }: Props) {
  const onChangeInput = (
    mI: IRestaurant["menuItems"][number],
    text: string,
  ) => {
    const newMenuItems = menuItems.map((item) => {
      return item.name === mI.name ? { ...item, name: text } : item;
    });
    setMenuItems(newMenuItems);
  };

  const onChangeToggle = (mI: IRestaurant["menuItems"][number]) => {
    const newMenuItems = menuItems.map((item) => {
      return item.name === mI.name
        ? { ...item, wouldEatAgain: !mI.wouldEatAgain }
        : item;
    });
    setMenuItems(newMenuItems);
  };

  return (
    <div className="mb-14">
      <p className="mb-2">Menu Items (Eat Again?)</p>
      {menuItems.map((mI) => (
        <div key={mI.id} className="flex flex-row items-center mb-4">
          <input
            type="text"
            name="name"
            value={mI.name}
            onChange={(e) => {
              onChangeInput(mI, e.target.value);
            }}
            className="input input-sm bg-neutral mr-4 w-60 text-base"
          />
          <button
            className="btn btn-sm btn-neutral mr-4"
            onClick={() => onChangeToggle(mI)}
          >
            {mI.wouldEatAgain ? <ThumbsUpIcon /> : <ThumbsDownIcon />}
          </button>
          <button
            className="btn btn-sm btn-outline btn-error"
            onClick={() => {
              setMenuItems(menuItems.filter((item) => item.name !== mI.name));
            }}
          >
            x
          </button>
        </div>
      ))}
      <button
        onClick={() => {
          setMenuItems([
            ...menuItems,
            { id: Date.now(), name: "", wouldEatAgain: true },
          ]);
        }}
        className="btn btn-sm"
      >
        + Add Menu Item
      </button>
    </div>
  );
}
