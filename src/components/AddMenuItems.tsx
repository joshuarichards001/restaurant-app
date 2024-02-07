import { IRestaurant } from "../services/types";

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

  const onChangeCheckbox = (
    mI: IRestaurant["menuItems"][number],
    checked: boolean,
  ) => {
    const newMenuItems = menuItems.map((item) => {
      return item.name === mI.name ? { ...item, wouldEatAgain: checked } : item;
    });
    setMenuItems(newMenuItems);
  };

  return (
    <div className="mb-8">
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
            className="input input-sm bg-neutral mr-2"
          />
          <input
            type="checkbox"
            name="wouldEatAgain"
            className="checkbox mr-10"
            checked={mI.wouldEatAgain}
            onChange={(e) => {
              onChangeCheckbox(mI, e.target.checked);
            }}
          />
          <button
            className="btn btn-xs btn-outline btn-error"
            onClick={() => {
              setMenuItems(menuItems.filter((item) => item.name !== mI.name));
            }}
          >
            delete
          </button>
        </div>
      ))}
      <button
        onClick={() => {
          setMenuItems([
            ...menuItems,
            { id: Date.now(), name: "", wouldEatAgain: false },
          ]);
        }}
        className="btn btn-sm"
      >
        + Add Menu Item
      </button>
    </div>
  );
}
