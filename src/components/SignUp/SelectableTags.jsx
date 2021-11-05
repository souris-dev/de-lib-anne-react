import { useState } from "react";

const SelectableTag = (props) => {
  const [isOn, setIsOn] = useState(false);

  const handleToggle = () => {
    setIsOn(!isOn, () => props.onClick(props.tag));
  };

  return (
    <div
      onClick={handleToggle}
      className={`cursor-pointer ${
        isOn ? "bg-yellow-900 text-white" : "bg-yellow-300 text-black"
      } px-3 mr-3 mt-3 py-1 rounded-lg text-sm flex flex-row item-center my-auto`}
    >
      {props.tag}
    </div>
  );
};

// utility function
const addOrRemoveTag = (arr, item) =>
  arr.includes(item) ? arr.filter((i) => i !== item) : [...arr, item];

export function SelectableTags(props) {
  const [tags, setTags] = useState([]);

  return (
    <div
      className="flex flex-row flex-wrap"
      onClick={() => props.onClick(tags)}
    >
      {props.tags.map((tag) => (
        <SelectableTag
          tag={tag}
          key={Math.random() * 100}
          onClick={(tagName) => {
            setTags(addOrRemoveTag(tags, tagName));
          }}
        />
      ))}
    </div>
  );
}
